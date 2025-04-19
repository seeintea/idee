import type { MenuItem, GroupMenuProps } from "./index";

const config: (MenuItem[] | GroupMenuProps)[] = [
  {
    title: "Javascript",
    items: [
      { title: "View Transition API", path: "/javascript/view-transition-api" },
    ],
  },
  {
    title: "React",
    items: [
      { title: "memo API", path: "/react/memo-api" },
    ],
  },
  {
    title: "Playground",
    items: [
      { title: "Crypto In Wasm", path: "/playground/crypto-in-wasm" },
    ],
  },
];

export default config;
