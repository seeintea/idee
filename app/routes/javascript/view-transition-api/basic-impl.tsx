import { Fragment, useRef, useState } from "react";
import {
  Dialog,
  DialogPureContent,
  DialogOverlay,
  DialogPortal,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import ListItem from "./list-item";
import data, { type Item } from "./data";
import { CodeFragment } from "~/components/code-fragment";

const code = `const onAction = (element: HTMLElement, data: Item) => {
  setSelected(data);
  setOpen(true);
  // clone new element and setting position
  const rect = element.getBoundingClientRect();
  const { top, left, width, height } = rect;
  const node = element.cloneNode() as HTMLElement;
  node.style.cssText = \`position: absolute; left: \${left}px; top: \${top}px; width: \${width}px; height: \${height}px; z-index: 999\`;
  node.className = "rounded-base transition-all duration-350 ease-linear";
  document.body.appendChild(node);
  // get new position and setting for clone element
  requestAnimationFrame(() => {
    if (!image.current) return;
    const { left, top, width, height } = image.current.getBoundingClientRect();
    node.style.left = \`\${left}px\`;
    node.style.top = \`\${top}px\`;
    node.style.width = \`\${width}px\`;
    node.style.height = \`\${height}px\`;
    setDialogOpacity(1);
  });
  // remove clone element
  setTimeout(() => {
    setImageOpacity(1);
    document.body.removeChild(node);
    prevent.current = false
  }, 650);
}`;

const dialogTransition = "transition-[opacity] duration-600 ease-in";

export default function BasicImpl() {
  const image = useRef<HTMLImageElement>(null);
  const prevent = useRef(true);

  const [selected, setSelected] = useState<Item>();
  const [open, setOpen] = useState(false);
  const [dialogOpacity, setDialogOpacity] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(0);

  const onAction = (element: HTMLElement, data: Item) => {
    setSelected(data);
    setOpen(true);
    const rect = element.getBoundingClientRect();
    const { top, left, width, height } = rect;
    const node = element.cloneNode() as HTMLElement;
    node.style.cssText = `position: absolute; left: ${left}px; top: ${top}px; width: ${width}px; height: ${height}px; z-index: 999`;
    node.className = "rounded-base transition-all duration-350 ease-linear";
    document.body.appendChild(node);
    requestAnimationFrame(() => {
      if (!image.current) return;
      const { left, top, width, height } = image.current.getBoundingClientRect();
      node.style.left = `${left}px`;
      node.style.top = `${top}px`;
      node.style.width = `${width}px`;
      node.style.height = `${height}px`;
      setDialogOpacity(1);
    });
    setTimeout(() => {
      setImageOpacity(1);
      document.body.removeChild(node);
      prevent.current = false;
    }, 650);
  };

  const onOpenChange = (open$: boolean) => {
    if (!open$ && prevent.current) {
      return;
    }
    setOpen(open$);
    if (!open$) {
      prevent.current = true;
      setDialogOpacity(0);
      setImageOpacity(0);
    }
  };

  return (
    <Fragment>
      <div className={"flex flex-wrap flex-row gap-6 relative"}>
        {data.map((item) => (
          <ListItem key={item.url} data={item} onAction={onAction} />
        ))}
      </div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogPortal data-slot="dialog-portal">
          <DialogOverlay className={dialogTransition} style={{ opacity: dialogOpacity }} />
          <DialogPureContent className={`sm:max-w-2xl ${dialogTransition}`} style={{ opacity: dialogOpacity }}>
            <DialogHeader>
              <DialogTitle>{selected?.title}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className={"flex gap-base"}>
              <img
                ref={image}
                className={"w-[350px] shrink-0 rounded-base"}
                src={selected?.url}
                alt={selected?.title}
                style={{ opacity: imageOpacity }}
              />
              <div>{selected?.desc}</div>
            </div>
          </DialogPureContent>
        </DialogPortal>
      </Dialog>
      <CodeFragment className={"mt-base"} code={code} language="ts" />
    </Fragment>
  );
}
