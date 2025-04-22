import { SidebarProvider } from "~/components/shadcn-ui/ui/sidebar";
import Content from "./content";
import AppSideBar from "./sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSideBar />
      <Content />
    </SidebarProvider>
  );
}
