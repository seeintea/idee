import { Button } from "~/components/shadcn-ui/ui/button";
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "~/components/shadcn-ui/ui/sidebar";
import route, { type RouteType } from "~/config/route";
import { getGroupMenus } from "~/utils/layout";

const groupMenus = getGroupMenus(route);

export default function AppSideBar() {
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <Button variant="ghost" asChild className={"h-auto justify-start px-2"}>
          <a href="/">
            <img className={"h-9"} src="/images/layout.logo.png" alt="leviegu.logo" />
          </a>
        </Button>
      </SidebarHeader>
      {groupMenus.map(({ group, items }) => (
        <SidebarGroup key={group}>
          <SidebarGroupLabel>{group}</SidebarGroupLabel>
          <Menu items={items} />
        </SidebarGroup>
      ))}
    </Sidebar>
  );
}

function Menu(props: { items: RouteType[] }) {
  return (
    <SidebarMenu>
      {props.items.map((item) => (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton asChild>
            <a href={item.path}>
              <span>{item.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
