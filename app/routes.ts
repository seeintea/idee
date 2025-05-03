import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("views/index.tsx"),
  route("/javascript/view-transition-api", "views/javascript/view-transition-api.tsx"),
  route("/react/memo-api", "views/react/memo-api.tsx"),
  route("/playground/crypto-in-wasm", "views/playground/crypto-in-wasm.tsx"),
] satisfies RouteConfig;
