import { CodeFragment, CodeFragments } from "~/components/code-fragment";
import Typography from "~/components/ui/typography";
import { OriginDemo, FLIPDemo, ViewTransitionDemo } from "./impl/components";
import { origin, flip, viewTransition } from "./impl/code";
import "./index.css";

export default function ViewTransitionAPI() {
  return (
    <div className={"flex flex-col gap-6"}>
      <Typography type={"h2"}>Origin Demo</Typography>
      <OriginDemo />
      <CodeFragment code={origin.code} language={origin.language} />
      <Typography type={"h2"}>FLIP Demo</Typography>
      <FLIPDemo />
      <CodeFragment code={flip.code} language={flip.language} />
      <Typography type={"h2"}>View Transition Demo</Typography>
      <ViewTransitionDemo />
      <CodeFragments items={viewTransition} />
    </div>
  );
}
