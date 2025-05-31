export const origin = {
  language: "typescript",
  code: `const onTransition = (params: TransitionParams) => {
  const { element, nextElement, opacity, callback } = params;
  const rect = element.getBoundingClientRect();
  const node = element.cloneNode() as HTMLElement;
  node.className = "rounded-base transition-all duration-350 ease-linear";
  node.style.cssText = \`position: absolute; left: \${rect.left}px; top: \${rect.top}px; width: \${rect.width}px; height: \${rect.height}px; z-index: 999\`;
  document.body.appendChild(node);
  requestAnimationFrame(() => {
    const next = nextElement.getBoundingClientRect();
    node.style.left = \`\${next.left}px\`;
    node.style.top = \`\${next.top}px\`;
    node.style.width = \`\${next.width}px\`;
    node.style.height = \`\${next.height}px\`;
    opacity("dialog", 1);
  });
  delay(600).then(() => {
    opacity("image", 1);
    document.body.removeChild(node);
    if (callback) callback();
  });
};`,
};

export const flip = {
  language: "typescript",
  code: `const onTransition = (params: TransitionParams) => {
  const { element, nextElement, opacity, callback } = params;
  const rect = element.getBoundingClientRect();
  const node = element.cloneNode() as HTMLElement;
  node.className = "rounded-base";
  document.body.appendChild(node);
  const next = nextElement.getBoundingClientRect();
  node.style.cssText = \`position: absolute; left: \${next.left}px; top: \${next.top}px; width: \${next.width}px; height: \${next.height}px; z-index: 999\`;
  opacity("dialog", 1);
  const animate = node.animate(
    [
      {
        transform: \`translate(\${rect.left - next.left}px, \${rect.top - next.top}px)\`,
        width: \`\${rect.width}px\`,
        height: \`\${rect.height}px\`,
      },
      { transform: "translate(0px, 0px)" },
    ],
    { duration: 450 },
  );
  animate.onfinish = () => {
    opacity("image", 1);
    delay(100).then(() => document.body.removeChild(node));
    if (callback) callback();
  };
};`,
};

export const viewTransition = [
  {
    filename: "index.tsx",
    language: "tsx",
    code: `function ViewTransitionDemo() {
  const onTransition = (params: TransitionParams) => {
    const { element, nextElement, opacity, callback } = params;
    const rect = element.getBoundingClientRect();
    const node = element.cloneNode() as HTMLElement;
    node.className = "rounded-base";
    document.body.appendChild(node);
    const next = nextElement.getBoundingClientRect();
    const transition = document.startViewTransition(() => {
      node.style.cssText = \`position: absolute; left: \${next.left}px; top: \${next.top}px; width: \${next.width}px; height: \${next.height}px; z-index: 999\`;
    });
    transition.ready.then(() => {
      opacity("dialog", 1);
      node.animate(
        [
          {
            transform: \`translate(\${rect.left - next.left}px, \${rect.top - next.top}px)\`,
            width: \`\${rect.width}px\`,
            height: \`\${rect.height}px\`,
          },
          { transform: "translate(0px, 0px)" },
        ],
        { duration: 450 },
      );
    });
    transition.finished.then(() => {
      opacity("image", 1);
      delay(100).then(() => document.body.removeChild(node));
      if (callback) callback();
    });
  };

  useEffect(() => {
    document.body.classList.add("view-transition-api");
    return () => document.body.classList.remove("view-transition-api");
  }, []);

  return <Template onTransition={onTransition} />;
}`,
  },
  {
    filename: "index.css",
    language: "css",
    code: `.view-transition-api {
  view-transition-name: vta;
}

::view-transition-group(vta) {
  animation-duration: 0.45s;
}`,
  },
  {
    filename: "template.tsx",
    language: "tsx",
    code: `const dialogTransition = "transition-[opacity] duration-600 ease-in";
type OpacityItem = "image" | "dialog";

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
          <DialogPureContent className={\`sm:max-w-2xl \${dialogTransition}\`} style={{ opacity: dialogOpacity }}>
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
}`,
  },
];
