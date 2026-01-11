export function ArticleHeader({ title, date }: { title: string; date: string }) {
  return (
    <>
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-0!">{title}</h1>
      <div className="text-zinc-500 dark:text-zinc-400">{date}</div>
    </>
  );
}
