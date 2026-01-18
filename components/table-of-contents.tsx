"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type PureTocObject = Omit<TocObject, "children">;

function getIdFromItem(item: PureTocObject): string {
  const attrId = typeof item.attributes?.id === "string" ? (item.attributes?.id as string) : "";
  if (attrId) return attrId;
  const val = (item.value || "").trim();
  return val;
}

type TableOfContentsProps = {
  items: PureTocObject[];
  rootId: string;
  className?: string;
  offsetTop?: number;
};

export function TableOfContents({ items, rootId, className = "", offsetTop = 96 }: TableOfContentsProps) {
  const [activeIds, setActiveIds] = useState<Set<string>>(() => new Set());
  const lastActiveIdsRef = useRef<Set<string>>(new Set());

  const orderedIds = useMemo(() => items.map((i) => getIdFromItem(i)).filter(Boolean), [items]);

  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    if (orderedIds.length === 0) return;

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
  }, [rootId, offsetTop, orderedIds]);

  const body = (() => {
    if (items.length > 0) {
      return (
        <ul className="space-y-2 text-sm">
          {items.map((toc, idx) => {
            const id = orderedIds[idx] || "";
            const isActive = id ? activeIds.has(id) : false;
            return (
              <li key={`${id}-${toc.depth}`} className={toc.depth === 3 ? "pl-4" : ""}>
                <a
                  href={id ? `#${id}` : undefined}
                  aria-current={isActive ? "true" : undefined}
                  className={
                    isActive ? "text-zinc-900 font-medium" : "text-zinc-400 hover:text-zinc-900 transition-colors"
                  }
                >
                  {toc.value}
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
