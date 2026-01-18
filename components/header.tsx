import { AtSign } from "lucide-react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

import { ThemeToggler } from "./theme-toggler";

export function Header({ className }: { className?: string }) {
  return (
    <header className={twMerge("flex gap-4 items-center flex-row flex-nowrap", className)}>
      <a href="/">
        <Image width={50} height={50} className="rounded-4xl" src="/avatar.webp" alt="avatar" loading="eager" />
      </a>
      <div className="flex-1">
        <p className="font-bold text-lg">leviegu</p>
        <div className="flex gap-2.5 text-sm text-secondary items-center">
          <a aria-label="Email" href="mailto:leviegu@gmail.com">
            <AtSign size={14} />
          </a>
          <a aria-label="Github" href="https://github.com/seeintea" target="_blank" rel="noreferrer">
            <svg role="img" viewBox="0 0 20 20" className="size-3.5 fill-black/40 dark:fill-gray-400">
              <title>Github</title>
              <path d="M10 0C4.475 0 0 4.475 0 10a9.994 9.994 0 006.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.287-.6-1.175-1.025-1.412-.35-.188-.85-.65-.013-.663.788-.013 1.35.725 1.538 1.025.9 1.512 2.337 1.087 2.912.825.088-.65.35-1.088.638-1.338-2.225-.25-4.55-1.112-4.55-4.937 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.274.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 012.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0020 10c0-5.525-4.475-10-10-10z"></path>
            </svg>
          </a>
          <a aria-label="X" href="https://x.com/levie_gu" target="_blank" rel="noreferrer">
            <svg role="img" viewBox="0 0 24 24" className="size-3 fill-black/40 dark:fill-gray-400">
              <title>X</title>
              <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
            </svg>
          </a>
        </div>
      </div>
      <ThemeToggler />
    </header>
  );
}
