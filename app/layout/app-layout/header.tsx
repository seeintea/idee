import { useLocation } from "react-router";
import { CgFileDocument } from "react-icons/cg";
import GlassmorphismCard from "~/components/glassmorphism-card";
import Space from "~/components/space";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <Space asChild align={"center"} className={"w-full h-16 px-base"}>
      <GlassmorphismCard>
        <CgFileDocument size={18} />
        <p>{`IDÉE${pathname.split("/").join(" / ")}`}</p>
      </GlassmorphismCard>
    </Space>
  );
}
