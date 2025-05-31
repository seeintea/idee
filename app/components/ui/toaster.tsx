// MIT License
// Copyright (c) 2023 shadcn
// https://github.com/shadcn-ui/ui/blob/main/apps/www/registry/new-york/ui/sonner.tsx

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={"light"}
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
