import { Button } from "~/components/ui/button";
import { CodeFragment, CodeFragments } from "~/components/code-fragment";

const fragment0 = `const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
}`;

const fragment1 = `const a = 1;
const b = 2;

function add(x: number, y: number) {
  return x + y;
}

add(a, b); // 3`;

const fragments = [
  { filename: "index.tsx", code: fragment0, language: "tsx" },
  { filename: "index.tx", code: fragment1, language: "ts" },
];

export default function Index() {
  return (
    <div className={"h-[1000px]"}>
      <div className={"flex gap-2"}>
        <Button variant={"default"}>default</Button>
        <Button variant={"destructive"}>destructive</Button>
        <Button variant={"ghost"}>ghost</Button>
        <Button variant={"link"}>link</Button>
        <Button variant={"outline"}>outline</Button>
        <Button variant={"secondary"}>secondary</Button>
      </div>
      <div>
        <CodeFragments items={fragments} className={"mt-base"} />
        <CodeFragment code={fragment0} language="tsx" className={"mt-base"} />
        <CodeFragment code={fragment1} language="ts" className={"mt-base"} />
      </div>
    </div>
  );
}
