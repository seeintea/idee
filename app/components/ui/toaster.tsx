// MIT License
// Copyright (c) 2023 shadcn
// https://github.com/shadcn-ui/ui/blob/main/apps/www/registry/new-york/ui/sonner.tsx

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        style: {
          borderRadius: "var(--base-radius)",
          borderColor: "var(--border)",
          backgroundColor: "var(--popover)",
          color: "var(--popover-foreground)",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
