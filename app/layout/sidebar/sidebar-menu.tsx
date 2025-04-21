import {
  SidebarContent,
  SidebarMenu as UISidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "~/components/shadcn-ui/ui/sidebar";

import type { MenuItemsProps, MenuProps, GroupMenuProps } from "./index";

export default function SidebarMenu(props: MenuItemsProps) {
  const { items } = props;
  return (
    <SidebarContent>
      {items.map((item) => {
        const renderToMenu = Array.isArray(item);
        if (renderToMenu) {
          return <Menu key={item[0].title} items={item} />;
        }
        return <GroupMenu key={item.title} {...item} />;
      })}
    </SidebarContent>
  );
}

function Menu(props: MenuProps) {
  return (
    <UISidebarMenu>
      {props.items.map((menu) => (
        <SidebarMenuItem key={menu.title}>
          <SidebarMenuButton asChild>
            <a href={menu.path}>
              {menu.icon && <menu.icon />}
              <span>{menu.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </UISidebarMenu>
  );
}

function GroupMenu(props: GroupMenuProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{props.title}</SidebarGroupLabel>
      <Menu items={props.items} />
    </SidebarGroup>
  );
}
