import { type RouteConfig, index } from "@react-router/dev/routes";
import { routes } from "./utils/routes";

export default [index("routes/index.tsx"), ...routes] satisfies RouteConfig;
