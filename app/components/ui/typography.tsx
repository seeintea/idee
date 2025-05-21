import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils/tailwind";

// MIT License
// Copyright © 2022 Material Tailwind by [Creative Tim](https://www.creative-tim.com?ref=material-tailwind)
// https://github.com/creativetimofficial/material-tailwind/blob/v3/packages/react/src/theme/typography.ts
const typographyVariants = cva("font-sans antialiased", {
  variants: {
    color: {
      inherit: "text-inherit",
      primary: "text-primary",
      secondary: "text-secondary",
      info: "text-muted",
      error: "text-destructive",
    },
    type: {
      h1: "font-bold text-4xl md:text-5xl lg:text-6xl",
      h2: "font-bold text-3xl md:text-4xl lg:text-5xl",
      h3: "font-bold text-2xl md:text-3xl lg:text-4xl",
      h4: "font-bold text-xl md:text-2xl lg:text-3xl",
      h5: "font-bold text-lg md:text-xl lg:text-2xl",
      h6: "font-bold text-base md:text-lg lg:text-xl",
      lead: "text-base md:text-lg",
      p: " text-base",
      small: "text-sm",
    },
  },
  defaultVariants: {
    color: "inherit",
    type: "p",
  },
});

interface TypographyProps extends VariantProps<typeof typographyVariants> {
  className?: string;
  children: React.ReactNode | undefined;
  asChild?: boolean;
}

type TypographyElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

export default function Typography({ asChild, color, type, className, ...props }: TypographyProps) {
  const elem = (["h1", "h2", "h3", "h4", "h5", "h6"].includes(type as string) ? type : "p") as TypographyElement;
  const Comp = asChild ? Slot : elem;
  return <Comp className={cn(typographyVariants({ color, type, className }))} {...props} />;
}
