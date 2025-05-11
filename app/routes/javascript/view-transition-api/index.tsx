import WithoutVTA from "./components/without-vta";
import CodeRenderer from "~/components/code-renderer";
import CodeRenderTab from "~/components/code-renderer-tab";

const codeBlock = `const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
}`;

const jsCodeBlock = `const a = 1;
const b = 2;

function add(x: number, y: number) {
  return x + y;
}

add(a, b); // 3`;

const codeBlocks = [
  { filename: "index.tsx", code: codeBlock, language: "tsx" },
  { filename: "index.tx", code: jsCodeBlock, language: "ts" },
];

export default function ViewTransitionAPI() {
  return (
    <div>
      <div className={"max-w-[800px]"}>
        <CodeRenderTab codes={codeBlocks} />
        <CodeRenderer code={codeBlock} language="tsx" className={"mt-base"} />
        <CodeRenderer code={jsCodeBlock} language="ts" className={"mt-base"} />
        <p>view transition api</p>
        <WithoutVTA />
      </div>
    </div>
  );
}
