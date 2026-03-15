import Link from "next/link";

export function GithubRepo({ url }: { url: string }) {
  const repoName = url.replace("https://github.com/", "");

  return (
    <div className="my-8 flex justify-center">
      <Link
        href={url}
        target="_blank"
        className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm text-neutral-900 transition-all hover:bg-neutral-50 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900"
      >
        <svg role="img" viewBox="0 0 20 20" className="size-4 fill-black/80 dark:fill-gray-200">
          <title>Github</title>
          <path d="M10 0C4.475 0 0 4.475 0 10a9.994 9.994 0 006.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.287-.6-1.175-1.025-1.412-.35-.188-.85-.65-.013-.663.788-.013 1.35.725 1.538 1.025.9 1.512 2.337 1.087 2.912.825.088-.65.35-1.088.638-1.338-2.225-.25-4.55-1.112-4.55-4.937 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.274.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 012.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0020 10c0-5.525-4.475-10-10-10z" />
        </svg>
        <span className="font-medium">View on GitHub</span>
        <span className="text-neutral-400 dark:text-neutral-500">|</span>
        <span className="text-neutral-600 dark:text-neutral-400">{repoName}</span>
      </Link>
    </div>
  );
}
