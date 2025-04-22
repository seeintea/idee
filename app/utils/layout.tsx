export function getGroupMenus<T extends { group: string }>(routes: T[]): Array<{ group: string; items: T[] }> {
  const kv: Record<string, T[]> = {};
  routes.forEach((route) => {
    const { group } = route;
    if (!kv[group]) kv[group] = [];
    kv[group].push(route);
  });
  return Object.entries(kv).map(([group, items]) => ({ group: group.toUpperCase(), items }));
}
