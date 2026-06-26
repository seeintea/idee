import { twMerge } from "tailwind-merge";

export function Footer({ className, bordered = true }: { className?: string; bordered?: boolean }) {
  return (
    <footer
      className={twMerge(
        "text-sm text-secondary mt-4 pt-6 font-ioskeley tabular-nums",
        bordered && "border-t",
        className,
      )}
    >
      @{new Date().getFullYear()}
    </footer>
  );
}
