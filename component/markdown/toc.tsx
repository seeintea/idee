"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Heading = { id: string; text: string; depth: number };

function collectHeadings(root: HTMLElement | null): Heading[] {
  if (!root) return [];
  const nodes = Array.from(root.querySelectorAll("h2, h3"));
  return nodes
    .map((el) => {
      const id = el.getAttribute("id") || "";
      const text = (el.textContent || "").trim();
      const depth = el.tagName.toLowerCase() === "h2" ? 2 : 3;
      return { id, text, depth };
    })
    .filter((h) => h.id && h.text);
}

type TocProps = { rootId: string; className?: string; offsetTop?: number };

export function Toc({ rootId, className = "", offsetTop = 96 }: TocProps) {
  const [items, setItems] = useState<Heading[]>([]);
  const [activeIds, setActiveIds] = useState<Set<string>>(() => new Set());
  const [scanned, setScanned] = useState(false);
  const lastActiveIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const el = document.getElementById(rootId);
    if (!el) return;
    const update = () => {
      setItems(collectHeadings(el));
      setScanned(true);
    };
    update();
    const observer = new MutationObserver(() => update());
    observer.observe(el, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [rootId]);

  const orderedIds = useMemo(() => items.map((i) => i.id), [items]);

  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    if (items.length === 0) return;

    const getDocY = (node: HTMLElement) => node.getBoundingClientRect().top + window.scrollY;
    const getHeadingNode = (id: string) => root.querySelector<HTMLElement>(`#${CSS.escape(id)}`);

    const compute = () => {
      const viewTop = window.scrollY + offsetTop;
      const viewBottom = window.scrollY + window.innerHeight;
      const rootBottom = root.getBoundingClientRect().bottom + window.scrollY;

      const next = new Set<string>();
      for (let i = 0; i < orderedIds.length; i++) {
        const id = orderedIds[i];
        const start = getHeadingNode(id);
        if (!start) continue;

        const nextHeadingId = orderedIds[i + 1];
        const endHeading = nextHeadingId ? getHeadingNode(nextHeadingId) : null;

        const sectionTop = getDocY(start);
        const sectionBottom = endHeading ? getDocY(endHeading) : rootBottom;

        const intersects = Math.max(sectionTop, viewTop) < Math.min(sectionBottom, viewBottom);
        if (intersects) next.add(id);
      }

      const prev = lastActiveIdsRef.current;
      if (prev.size === next.size) {
        let same = true;
        for (const id of next) {
          if (!prev.has(id)) {
            same = false;
            break;
          }
        }
        if (same) return;
      }

      lastActiveIdsRef.current = next;
      setActiveIds(next);
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    const onResize = () => compute();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    compute();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [rootId, offsetTop, items.length, orderedIds]);

  const body = (() => {
    if (!scanned) {
      const rows = ["w-28", "w-24", "w-32", "w-20", "w-22"];
      return (
        <div className="space-y-2">
          {rows.map((w) => (
            <div key={w} className={`h-3 ${w} rounded bg-zinc-200/70`} />
          ))}
        </div>
      );
    }

    if (items.length > 0) {
      return (
        <ul className="space-y-2 text-sm">
          {items.map((h) => {
            const isActive = activeIds.has(h.id);
            return (
              <li key={h.id} className={h.depth === 3 ? "pl-4" : ""}>
                <a
                  href={`#${h.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={
                    isActive ? "text-zinc-900 font-medium" : "text-zinc-400 hover:text-zinc-900 transition-colors"
                  }
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      );
    }

    return <div className="text-sm text-zinc-400">暂无目录</div>;
  })();

  return (
    <nav className={className}>
      <div className="text-sm font-medium mb-3">目录</div>
      {body}
    </nav>
  );
}
