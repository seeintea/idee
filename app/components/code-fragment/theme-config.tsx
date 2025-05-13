import { themes as themes$ } from "prism-react-renderer";

export type Theme = keyof typeof themes$;

interface ThemeConfig {
  button: string;
  fragments: {
    container: string;
    tabs: string;
    active: string;
  };
}

const themeConfig: Record<Theme, ThemeConfig> = {
  oneDark: {
    button: "hover:bg-[#33373f] hover:text-white",
    fragments: {
      container: "bg-[#282c34] border-[#393d46] text-white",
      tabs: "text-[#a1a1aa]",
      active: "border-white text-white",
    },
  },
  // TODO current only use oneDark theme
  dracula: { button: "", fragments: { container: "", tabs: "", active: "" } },
  duotoneDark: { button: "", fragments: { container: "", tabs: "", active: "" } },
  duotoneLight: { button: "", fragments: { container: "", tabs: "", active: "" } },
  github: { button: "", fragments: { container: "", tabs: "", active: "" } },
  gruvboxMaterialDark: { button: "", fragments: { container: "", tabs: "", active: "" } },
  gruvboxMaterialLight: { button: "", fragments: { container: "", tabs: "", active: "" } },
  jettwaveDark: { button: "", fragments: { container: "", tabs: "", active: "" } },
  jettwaveLight: { button: "", fragments: { container: "", tabs: "", active: "" } },
  nightOwl: { button: "", fragments: { container: "", tabs: "", active: "" } },
  nightOwlLight: { button: "", fragments: { container: "", tabs: "", active: "" } },
  oceanicNext: { button: "", fragments: { container: "", tabs: "", active: "" } },
  okaidia: { button: "", fragments: { container: "", tabs: "", active: "" } },
  oneLight: { button: "", fragments: { container: "", tabs: "", active: "" } },
  palenight: { button: "", fragments: { container: "", tabs: "", active: "" } },
  shadesOfPurple: { button: "", fragments: { container: "", tabs: "", active: "" } },
  synthwave84: { button: "", fragments: { container: "", tabs: "", active: "" } },
  ultramin: { button: "", fragments: { container: "", tabs: "", active: "" } },
  vsDark: { button: "", fragments: { container: "", tabs: "", active: "" } },
  vsLight: { button: "", fragments: { container: "", tabs: "", active: "" } },
};

export default themeConfig;
