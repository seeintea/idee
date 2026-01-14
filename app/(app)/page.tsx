import Link from "next/link";

export default function Index() {
  return (
    <div className={"flex flex-col gap-4"}>
      <Link href="/post/wasm-obfuscation">WASM 混淆</Link>
      <Link href="/eoy-review/eoy-2025">2025：重启</Link>
    </div>
  );
}
