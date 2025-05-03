export type RouteTag = "JAVASCRIPT" | "REACT";

export interface RouteItem {
  name: string;
  path: string;
  filePath: string;
  group: RouteTag;
}

const routes = [
  {
    name: "view transition api",
    path: "/javascript/view-transition-api",
    filePath: "routes/javascript/view-transition-api/index.tsx",
    group: "JAVASCRIPT",
  },
  {
    name: "crypto.js in webassembly",
    path: "/javascript/crypto-in-wasm",
    filePath: "routes/javascript/crypto-in-wasm/index.tsx",
    group: "JAVASCRIPT",
  },
  {
    name: "memo api",
    path: "/react/memo-api",
    filePath: "routes/react/memo-api.tsx",
    group: "REACT",
  },
] as RouteItem[];

export default routes;
