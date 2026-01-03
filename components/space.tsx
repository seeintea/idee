import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/utils/tailwind";

const spaceVariants = cva("flex gap-base", {
  variants: {
    align: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      baseline: "items-baseline",
    },
    direction: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  defaultVariants: {
    align: "start",
    direction: "horizontal",
    wrap: false,
  },
});

interface SpaceProps extends React.ButtonHTMLAttributes<HTMLDivElement>, VariantProps<typeof spaceVariants> {
  children: React.ReactNode | undefined;
  asChild?: boolean;
}

export default function Space({ asChild, align, direction, wrap, className, ...props }: SpaceProps) {
  const Element = asChild ? Slot.Root : "div";
  return <Element className={cn(spaceVariants({ align, direction, wrap, className }))} {...props} />;
}
