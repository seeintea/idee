import { type RouteConfigEntry, route } from "@react-router/dev/routes";
import config, { type RouteItem, type RouteTag } from "../routes/_routes";

export interface MenusItem {
  group: RouteTag;
  children: RouteItem[];
}

const register = (): RouteConfigEntry[] => config.map((conf) => route(conf.path, conf.filePath));

const getMenus = (): MenusItem[] => {
  const kv: Record<string, RouteItem[]> = {};
  config.forEach((route) => {
    const { group } = route;
    if (!kv[group]) kv[group] = [];
    kv[group].push(route);
  });
  return Object.entries(kv).map(([group, children]) => ({ group: group as RouteTag, children }));
};

export const routes = register();
export const menus = getMenus();
