import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-center"
      toastOptions={{
        style: {
          fontFamily: "Source Han Serif SC VF",
        },
      }}
    />
  );
}
