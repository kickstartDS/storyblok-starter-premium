const { parse } = require("svg-parser");
const toJsx = require("@mapbox/hast-util-to-jsx");

module.exports = ({ dictionary }) => {
  let result = `\
import { FC, SVGAttributes } from "react";
import classNames from "classnames";
import type { IconProps } from "@kickstartds/base/lib/icon/typing";

const icons: Record<string, FC<SVGAttributes<SVGElement>>> = {
`;

  for (const icon of Object.values(dictionary.tokens.icons)) {
    const tree = parse(icon.value);
    const jsx = toJsx(tree);
    result += `  "${icon.name}": (props) => ${jsx.replace(
      "<svg ",
      "<svg {...props} "
    )},\n`;
  }
  result += "};\n";

  result += `
export const InlineIcon: FC<IconProps & SVGAttributes<SVGElement>> = ({
  icon,
  className,
  ...props
}) => {
  const Icon = icons[icon];
  if (!Icon) {
    throw \`unknown icon: \${icon}\`;
  }
  return <Icon className={classNames("icon", className)} {...props} />;
}
`;
  return result;
};
