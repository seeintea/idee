import { Button } from "~/components/ui/button";

export default function Index() {
  return (
    <div className={"flex gap-2 h-[1000px]"}>
      <Button variant={"default"}>default</Button>
      <Button variant={"destructive"}>destructive</Button>
      <Button variant={"ghost"}>ghost</Button>
      <Button variant={"link"}>link</Button>
      <Button variant={"outline"}>outline</Button>
      <Button variant={"secondary"}>secondary</Button>
    </div>
  );
}
