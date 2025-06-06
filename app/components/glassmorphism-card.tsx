import { cn } from "~/utils/tailwind";

interface GlassmorphismCardProps {
  children?: React.ReactNode | undefined;
  className?: string;
}

export default function GlassmorphismCard(props: GlassmorphismCardProps) {
  return (
    <div className={cn("rounded-base bg-[#ffffff4d] backdrop-blur-[1px] border-1", props.className)}>
      {props.children}
    </div>
  );
}
