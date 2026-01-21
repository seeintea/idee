// forked https://github.com/hyoban/remark-github-alerts/blob/main/src/index.ts

import { visit } from "unist-util-visit";

const remarkGithubAlerts = (options = {}) => {
  const {
    markers = ["WARN", "DANGER"],
    titles = {},
    classPrefix = "idee-alert",
    ignoreSquareBracket = false,
  } = options;

  const markerNameRE = markers === "*" ? "\\w+" : markers.join("|");
  const RE = new RegExp(
    ignoreSquareBracket ? `^!(${markerNameRE})([^\\n\\r]*)` : `^\\[\\!(${markerNameRE})\\]([^\\n\\r]*)`,
    "i",
  );

  return (tree) => {
    visit(tree, "blockquote", (node, index, parent) => {
      const children = node.children;
      const firstParagraph = children[0];
      if (!firstParagraph) return;
      let firstContent = firstParagraph.children?.[0];
      if (!firstContent) return;
      if (!("value" in firstContent) && "children" in firstContent && firstContent.children[0]) {
        firstContent = firstContent.children[0];
      }

      if (firstContent.type !== "text") return;
      const match = firstContent.value.match(RE);
      if (!match) return;

      const type = match[1]?.toLowerCase();
      const title = match[2]?.trim() || titles[type];

      if (index === undefined || !parent) return;

      firstContent.value = firstContent.value.slice(match[0].length).trimStart();

      node.data = {
        hName: "div",
        hProperties: {
          class: `not-prose ${classPrefix} ${classPrefix}-${type}`,
        },
      };
      node.children = [
        {
          type: "paragraph",
          data: {
            hName: "p",
            hProperties: {
              class: `${classPrefix}-content`,
            },
          },
          children: [
            {
              type: "text",
              value: title,
            },
          ],
        },
      ];
    });

    return tree;
  };
};

export default remarkGithubAlerts;
