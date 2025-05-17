import type { MouseEvent, KeyboardEvent } from "react";
import type { Item } from "./data";
import { cn } from "~/utils/tailwind";

interface ListItemProps {
  className?: string;
  data: Item;
  onAction: (element: HTMLElement, data: Item) => void;
}

export default function ListItem(props: ListItemProps) {
  const { data, onAction, className = "" } = props;

  const handleFindImageElement = (event: MouseEvent<HTMLDivElement> | KeyboardEvent) => {
    let target = event.target as HTMLElement;
    const { nodeName } = target;
    if (nodeName === "P") {
      const parent = target.parentElement as HTMLDivElement;
      const image = [...parent.children].find((node) => node.nodeName === "IMG") as HTMLImageElement;
      target = image;
    }
    onAction(target, data);
  };

  return (
    <div
      role="button"
      className={cn("cursor-pointer w-54", className)}
      tabIndex={0}
      onClick={handleFindImageElement}
      onKeyDown={handleFindImageElement}
    >
      <img className={"w-full rounded-base hover:brightness-50"} src={data.url} alt={data.title} />
      <p className={"py-1 text-base"}>{data.title}</p>
    </div>
  );
}
