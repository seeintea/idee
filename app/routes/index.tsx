import { Button } from "~/components/ui/button";
import { CodeFragment, CodeFragments } from "~/components/code-fragment";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";
import Typography from "~/components/ui/typography";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

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
      <div className={"pb-2 flex gap-4 flex-col"}>
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>You can add components to your app using the cli.</AlertDescription>
        </Alert>
        <Alert variant={"destructive"}>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>You can add components to your app using the cli.</AlertDescription>
        </Alert>
      </div>
      <div className={"flex gap-2 flex-col"}>
        <Typography type="h1">Material Tailwind (H1)</Typography>
        <Typography type="h2">Material Tailwind (H2)</Typography>
        <Typography type="h3">Material Tailwind (H3)</Typography>
        <Typography type="h4">Material Tailwind (H4)</Typography>
        <Typography type="h5">Material Tailwind (H5)</Typography>
        <Typography type="h6">Material Tailwind (H6)</Typography>
        <Typography>
          Material Tailwind is an easy to use components library for Tailwind CSS and Material Design. It provides a
          simple way to customize your components, you can change the colors, fonts, breakpoints and everything you
          need.
        </Typography>
        <Typography type="lead">
          Material Tailwind is an easy to use components library for Tailwind CSS and Material Design. It provides a
          simple way to customize your components, you can change the colors, fonts, breakpoints and everything you
          need.
        </Typography>
        <Typography type="small">
          Material Tailwind is an easy to use components library for Tailwind CSS and Material Design. It provides a
          simple way to customize your components, you can change the colors, fonts, breakpoints and everything you
          need.
        </Typography>
        <Typography type="h1" color="primary">
          Material Tailwind
        </Typography>
        <Typography type="h1" color="secondary">
          Material Tailwind
        </Typography>
        <Typography type="h1" color="info">
          Material Tailwind
        </Typography>
        <Typography type="h1" color="error">
          Material Tailwind
        </Typography>
      </div>
      <div className={"flex gap-2"}>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
