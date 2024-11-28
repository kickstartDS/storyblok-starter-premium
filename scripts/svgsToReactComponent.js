const { parse } = require("svg-parser");
const toJsx = require("@mapbox/hast-util-to-jsx");

module.exports = ({ dictionary }) => {
  let result = "const icons: Record<string, JSX.Element> = {\n";

  for (const icon of Object.values(dictionary.tokens.icons)) {
    const tree = parse(icon.value);
    const svgProperties = (tree.children[0].properties ??= {});
    svgProperties.class = (svgProperties.class ? " " : "") + "icon";
    const jsx = toJsx(tree);
    result += `  "${icon.name}": ${jsx},\n`;
  }
  result += "};";

  result += `
export const InlineIcon = ({ icon }: { icon: string }) => icons[icon];
`;
  return result;
};
