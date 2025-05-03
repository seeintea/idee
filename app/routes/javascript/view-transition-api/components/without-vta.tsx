import { IoClose } from "react-icons/io5";
import { Button } from "~/components/ui/button";
import data, { type DataType } from "./data";
import ListItem from "./list-item";
import { useRef, useState, type CSSProperties } from "react";

export default function WithoutVTA() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [current, setCurrent] = useState<DataType>();
  const [maskStyle, setMaskStyle] = useState<CSSProperties>({});

  const handleItemRect = (el: HTMLElement, item: DataType) => {
    setCurrent(item);
    setMaskStyle({ opacity: 1, zIndex: 1 });
    const { left, top, width, height } = el.getBoundingClientRect();
    setTimeout(() => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      imgRef.current.style.transform = `translateX(${left - rect.left}px) translateY(${top - rect.top}px)`;
      imgRef.current.style.width = `${width}px`;
      imgRef.current.style.height = `${height}px`;
      setTimeout(() => {
        if (!imgRef.current) return;
        imgRef.current.style.transition = "all 0.5s ease-in";
      }, 20);
      setTimeout(() => {
        if (!imgRef.current) return;
        imgRef.current.style.transform = `translateX(0px) translateY(0px)`;
        imgRef.current.style.width = `${rect.width}px`;
        imgRef.current.style.height = `${rect.height}px`;
      }, 20);
    }, 20);
  };

  return (
    <div className={"w-[780px]"}>
      <div className={"px-6 my-3 relative"}>
        <div className={"flex flex-wrap flex-row gap-6"}>
          {data.map((item) => (
            <ListItem key={item.url} item={item} onClick={handleItemRect} />
          ))}
        </div>
        {/* bg-white */}
        <div
          className={"absolute w-full h-full left-0 top-0 rounded-2xl p-6 gap-6 flex flex-row -z-10"}
          style={maskStyle}
        >
          <img ref={imgRef} className={"rounded"} src={current?.url} alt={current?.title} />
          <div>
            <div>{current?.title}</div>
            <p>{current?.desc}</p>
            <div className={"flex justify-end pt-2"}>
              <Button variant="outline" size="icon">
                <IoClose />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
