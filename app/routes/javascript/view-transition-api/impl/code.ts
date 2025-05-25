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
];
