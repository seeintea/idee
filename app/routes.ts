import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("/javascript/view-transition-api", "routes/javascript/view-transition-api.tsx"),
  route("/react/memo-api", "routes/react/memo-api.tsx"),
  route("/playground/crypto-in-wasm", "routes/playground/crypto-in-wasm.tsx"),
] satisfies RouteConfig;
