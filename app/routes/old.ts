export interface RouteType {
  name: string;
  path: string;
  filePath: string;
  group: string;
}

const route: RouteType[] = [
  {
    name: "View Transition",
    path: "/javascript/view-transition-api",
    filePath: "routes/javascript/view-transition-api.tsx",
    group: "javascript",
  },
  {
    name: "API memo",
    path: "/react/memo-api",
    filePath: "routes/react/memo-api.tsx",
    group: "react",
  },
  {
    name: "Crypto.js in WebAssembly",
    path: "/playground/crypto-in-wasm",
    filePath: "routes/playground/crypto-in-wasm.tsx",
    group: "playground",
  },
];

export default route;
