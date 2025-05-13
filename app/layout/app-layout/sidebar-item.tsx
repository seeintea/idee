import { Fragment } from "react/jsx-runtime";
import { useLocation } from "react-router";
import { RiJavascriptFill, RiReactjsLine } from "react-icons/ri";
import { type MenusItem } from "~/utils/routes";
import Space from "~/components/space";
import { Button } from "~/components/ui/button";
import { cn } from "~/utils/tailwind";

const icons = {
  JAVASCRIPT: <RiJavascriptFill size={20} />,
  REACT: <RiReactjsLine size={20} />,
};

export default function SidebarItem(props: MenusItem) {
  const { pathname } = useLocation();
  return (
    <Fragment>
      <Space align={"center"} className={"text-base text-secondary-foreground font-semibold gap-1 py-2"}>
        {icons[props.group]}
        {props.group}
      </Space>
      {props.children.map((route) => (
        <Button
          key={route.path}
          variant={pathname === route.path ? "outline" : "link"}
          asChild
          className={cn("w-full justify-start my-1", pathname === route.path ? "bg-background!" : "")}
        >
          <a href={route.path}>{route.name}</a>
        </Button>
      ))}
    </Fragment>
  );
}
