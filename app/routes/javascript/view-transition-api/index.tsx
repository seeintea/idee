import WithoutVTA from "./components/without-vta";
import CodeRenderer from "~/components/code-renderer";

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

export default function ViewTransitionAPI() {
  return (
    <div>
      <CodeRenderer code={codeBlock} language="tsx" className={"p-base rounded-xl"} />
      <CodeRenderer code={jsCodeBlock} language="ts" className={"p-base rounded-xl mt-base"} />
      <p>view transition api</p>
      <WithoutVTA />
    </div>
  );
}
