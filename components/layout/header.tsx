import { FileText } from "lucide-react";
import GlassmorphismCard from "@/components/glassmorphism-card";
import Space from "@/components/space";

export default function Header() {
  return (
    <Space asChild align={"center"} className={"w-full h-16 px-base"}>
      <GlassmorphismCard>
        <FileText size={18} />
        <p>{`IDÉE`}</p>
      </GlassmorphismCard>
    </Space>
  );
}
