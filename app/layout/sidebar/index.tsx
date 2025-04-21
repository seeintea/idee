import type { PropsWithChildren, JSX } from "react";
import { SidebarProvider, Sidebar as UISidebar } from "~/components/shadcn-ui/ui/sidebar";

import SidebarMenu from "./sidebar-menu";
import config from "./config";

export interface MenuItem {
  title: string;
  path: string;
  icon?: () => JSX.Element;
}

export interface MenuProps {
  items: MenuItem[];
}

export interface GroupMenuProps extends MenuProps {
  title: string;
}

export interface MenuItemsProps {
  items: (MenuItem[] | GroupMenuProps)[];
}

export default function Sidebar(props: PropsWithChildren) {
  return (
    <SidebarProvider>
      <UISidebar>
        <SidebarMenu items={config} />
      </UISidebar>
      {props.children}
    </SidebarProvider>
  );
}
