"use client";
import { Monitor, MoonStar, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ThemePreference = "system" | "light" | "dark";

const STORAGE_KEY = "__idee_theme";

const THEME_OPTIONS = [
  { value: "system", ariaLabel: "System theme", Icon: Monitor, size: 12 },
  { value: "light", ariaLabel: "Light theme", Icon: Sun, size: 14 },
  { value: "dark", ariaLabel: "Dark theme", Icon: MoonStar, size: 14 },
] as const satisfies ReadonlyArray<{
  value: ThemePreference;
  ariaLabel: string;
  Icon: typeof Monitor;
  size: number;
}>;

const ITEM_CLASS_NAME =
  "relative z-10 rounded-full size-5 flex items-center justify-center cursor-pointer text-gray-950/70 transition-colors dark:text-white/70 data-checked:text-gray-950 dark:data-checked:text-white";

const INDICATOR_CLASS_NAME = "pointer-events-none absolute rounded-full size-5 bg-white shadow-sm dark:bg-gray-700";

function isValidThemePreference(value: unknown): value is ThemePreference {
  return THEME_OPTIONS.some((option) => option.value === value);
}

function applyResolvedTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
}

function resolveIsDark(preference: ThemePreference) {
  if (preference === "dark") return true;
  if (preference === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggler() {
  const [preference, setPreference] = useState<ThemePreference | null>(null);
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(false);

  const activeIndex = useMemo(() => {
    if (!preference) return 0;
    const idx = THEME_OPTIONS.findIndex((option) => option.value === preference);
    return idx >= 0 ? idx : 0;
  }, [preference]);

  useEffect(() => {
    const stored = globalThis.localStorage?.getItem(STORAGE_KEY);
    setPreference(isValidThemePreference(stored) ? stored : "system");
    requestAnimationFrame(() => setIsAnimationEnabled(true));
  }, []);

  useEffect(() => {
    if (!preference) return;
    globalThis.localStorage?.setItem(STORAGE_KEY, preference);
    applyResolvedTheme(resolveIsDark(preference));

    if (preference !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyResolvedTheme(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [preference]);

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="relative z-0 inline-grid grid-cols-3 gap-0.5 rounded-full bg-gray-950/5 p-0.75 text-gray-950 dark:bg-white/10 dark:text-white"
    >
      {preference ? (
        <span
          aria-hidden="true"
          className={`${INDICATOR_CLASS_NAME} ${isAnimationEnabled ? "transition-transform duration-200 ease-out" : ""}`}
          style={{
            top: "0.1875rem",
            left: "0.1875rem",
            transform: `translateX(${activeIndex * 1.375}rem)`,
          }}
        />
      ) : null}
      {THEME_OPTIONS.map(({ value, ariaLabel, Icon, size }) => (
        <label key={value} data-checked={preference === value ? "" : undefined} className={ITEM_CLASS_NAME}>
          <input
            className="sr-only"
            type="radio"
            name="theme-preference"
            value={value}
            aria-label={ariaLabel}
            checked={preference === value}
            onChange={() => setPreference(value)}
          />
          <Icon size={size} />
        </label>
      ))}
    </div>
  );
}
