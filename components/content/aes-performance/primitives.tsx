import type { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function ControlButton(props: ComponentProps<"button">) {
  const { className, type, ...rest } = props;
  return (
    <button
      type={type ?? "button"}
      className={twMerge(
        "inline-flex items-center justify-center h-8 px-3 rounded border border-border",
        "text-sm text-primary bg-background cursor-pointer",
        "transition-colors duration-150",
        "hover:bg-foreground/4",
        "focus-visible:outline-2 focus-visible:outline-offset-4 outline-ring/50",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-background",
        className,
      )}
      {...rest}
    />
  );
}

export function NumberField(props: {
  label: ReactNode;
  value: number;
  onChange: (next: number) => void;
  min?: number;
  step?: number;
}) {
  const { label, value, onChange, min = 1, step = 1 } = props;
  return (
    <label className="flex flex-col gap-2 text-xs text-secondary">
      {label}
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={twMerge(
          "w-24 h-8 px-2 rounded border border-border bg-background",
          "text-sm text-primary font-ioskeley tabular-nums",
          "transition-colors duration-150",
          "focus-visible:outline-2 focus-visible:outline-offset-4 outline-ring/50",
        )}
      />
    </label>
  );
}

type StatusTone = "success" | "danger";

const STATUS_TONE_CLASS: Record<StatusTone, string> = {
  success:
    "border-green-300/70 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400",
  danger: "border-red-300/70 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400",
};

export function StatusTag({ tone, children }: { tone: StatusTone; children: ReactNode }) {
  return (
    <div
      className={twMerge(
        "mt-4 rounded border p-3 text-xs font-ioskeley tabular-nums whitespace-pre-line break-all",
        STATUS_TONE_CLASS[tone],
      )}
    >
      {children}
    </div>
  );
}
