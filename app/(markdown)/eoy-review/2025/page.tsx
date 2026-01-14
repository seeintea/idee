import content from "content";

const { mdx } = content;

const Comp = mdx[0].default;

export default function Page() {
  return (
    <div>
      <Comp />
    </div>
  );
}
