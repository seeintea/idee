import { Fragment, useCallback, useRef, useState } from "react";
import {
  Dialog,
  DialogPureContent,
  DialogOverlay,
  DialogPortal,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { delay } from "~/utils/utils";
import { List, type Item } from "./list";

const dialogTransition = "transition-[opacity] duration-600 ease-in";

type OpacityItem = "image" | "dialog";

export interface TransitionParams {
  element: HTMLElement;
  nextElement: HTMLElement;
  opacity: (key: OpacityItem, value: number) => void;
  callback?: () => void;
}

interface TemplateProps {
  onTransition: (params: TransitionParams) => Promise<void> | void;
}

export default function Template(props: TemplateProps) {
  const { onTransition } = props;

  const prevent = useRef(true);
  const image = useRef<HTMLImageElement>(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Item | null>(null);
  const { imageOpacity, dialogOpacity, setOpacity } = useDialogTransition();

  const onAction = (element: HTMLElement, data: Item) => {
    setCurrent(data);
    setOpen(true);
    delay().then(() => {
      if (!image.current) return;
      onTransition({
        element,
        nextElement: image.current,
        opacity: setOpacity,
        callback: () => (prevent.current = false),
      });
    });
  };

  const onOpenChange = (change: boolean) => {
    if (!change && prevent.current) return;
    setOpen(change);
    if (change) return;
    prevent.current = true;
    ["image", "dialog"].map((key) => setOpacity(key as "image" | "dialog", 0));
  };

  return (
    <Fragment>
      <List onAction={onAction} />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogPortal data-slot="dialog-portal">
          <DialogOverlay className={dialogTransition} style={{ opacity: dialogOpacity }} />
          <DialogPureContent className={`sm:max-w-2xl ${dialogTransition}`} style={{ opacity: dialogOpacity }}>
            <DialogHeader>
              <DialogTitle>{current?.title}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className={"flex gap-base"}>
              <img
                ref={image}
                className={"w-[350px] shrink-0 rounded-base"}
                src={current?.url}
                alt={current?.title}
                style={{ opacity: imageOpacity }}
              />
              <div>{current?.desc}</div>
            </div>
          </DialogPureContent>
        </DialogPortal>
      </Dialog>
    </Fragment>
  );
}

function useDialogTransition() {
  const [image, setImage] = useState(0);
  const [dialog, setDialog] = useState(0);

  const setOpacity = useCallback((key: OpacityItem, value: number) => {
    const set = key === "image" ? setImage : setDialog;
    set(value);
  }, []);

  return {
    imageOpacity: image,
    dialogOpacity: dialog,
    setOpacity,
  };
}
