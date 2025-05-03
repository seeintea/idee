import type { MouseEvent } from "react";
import type { DataType } from "./data";

const loop = () => {};

interface ListItemProps {
  item: DataType;
  onClick?: (el: HTMLElement, item: DataType) => void;
}

export default function ListItem(props: ListItemProps) {
  const { item } = props;

  const handleFindImageTag = (event: MouseEvent<HTMLDivElement>) => {
    if (!props.onClick) return;
    let target = event.target as HTMLElement;
    const { nodeName } = target;
    if (nodeName === "P") {
      let parent = target.parentElement as HTMLDivElement;
      const img = [...parent.children].find((node) => node.nodeName === "IMG") as HTMLImageElement;
      target = img;
    }
    props.onClick(target, props.item);
  };

  return (
    <div role="button" tabIndex={0} onKeyDown={loop} onClick={handleFindImageTag}>
      <img className={"w-56 rounded hover:brightness-50"} src={item.url} alt={item.title} />
      <p className={"py-1 text-base"}>{item.title}</p>
    </div>
  );
}
