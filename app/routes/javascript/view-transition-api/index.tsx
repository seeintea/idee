import { GoBrowser } from "react-icons/go";
import Space from "~/components/space";
import Typography from "~/components/ui/typography";
import { CodeFragment, CodeFragments } from "~/components/code-fragment";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { OriginDemo, FLIPDemo, ViewTransitionDemo } from "./impl/components";
import { origin, flip, viewTransition } from "./impl/code";
import "./index.css";

export default function ViewTransitionAPI() {
  return (
    <div className={"flex flex-col gap-base"}>
      <Space>
        <div className="flex flex-col gap-base">
          <Typography type={"lead"}>
            In native apps, we can see some animations that look very smooth as like the one shown below. These
            animations often begin and end using the same UI elements as transitions. This allows us to clearly see the
            elements changing shape, size, or position, rather than simply hiding one element and showing another. In
            Android development, this type of animation is called a shared element transition.
          </Typography>
          <Typography type={"lead"}>
            Now, on the web, we can also use this technique. It's called the View Transition API.
          </Typography>
          <Alert variant={"destructive"}>
            <GoBrowser />
            <AlertTitle>Browser Support</AlertTitle>
            <AlertDescription>Chrome/Edge 111+ / Safari 18.0+ / Firefox 142+</AlertDescription>
          </Alert>
        </div>
        <img
          className={"w-2xs m-auto border rounded-base"}
          src="/images/routes/view-transition-api/vta-doc-1.gif"
          alt=""
        />
      </Space>
      <Typography type={"h5"}>View Transition API</Typography>
      <Typography type={"lead"}>
        View Transitions are typically used for page navigation. For this demonstration, I'm using a modal to simulate a
        page change. While the View Transitions API provides the page-switching transition capability, the actual
        animation implementation is still achieved using the `animate()` method.
      </Typography>
      <ViewTransitionDemo />
      <Typography type={"lead"}>
        In conventional page navigation, View Transitions captures snapshots before and after the animation —
        ::view-transition-old and ::view-transition-new — and then performs the transition animation. In this
        demonstration, however, we’re primarily leveraging the transition capability itself. Instead of implementing a
        full page-level animation, we are targeting a specific element for the animation effects.
      </Typography>
      <CodeFragments items={viewTransition} />
      <Typography type={"h5"}>Implemented using JavaScript and CSS</Typography>
      <Typography type={"lead"}>
        As mentioned earlier, View Transitions are designed for page-level navigation. But can we achieve similar
        effects within a single page? I've explored implementing this using a combination of JavaScript and CSS.
      </Typography>
      <OriginDemo />
      <Typography type={"lead"}>
        This implementation primarily utilizes CSS transitions. JavaScript modifies animatable element properties (like
        width/height), allowing the browser to handle the actual animation rendering.
      </Typography>
      <CodeFragment code={origin.code} language={origin.language} />
      <Typography type={"h5"}>Implemented using JavaScript</Typography>
      <FLIPDemo />
      <Typography type={"lead"}>
        Unlike the previous CSS transition approach, this implementation leverages the Web Animations JavaScript API.
      </Typography>
      <CodeFragment code={flip.code} language={flip.language} />
    </div>
  );
}
