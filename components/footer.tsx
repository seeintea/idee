"use client";
import { twMerge } from "tailwind-merge";

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={twMerge("text-sm text-secondary border-t pt-2", className)}>@{new Date().getFullYear()}</footer>
  );
}
