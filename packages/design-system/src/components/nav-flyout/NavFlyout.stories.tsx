import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { getArgsShared, pack, unpack } from "@kickstartds/core/lib/storybook";

import { NavFlyout } from "./NavFlyoutComponent";
import schema from "./nav-flyout.schema.dereffed.json";
import customProperties from "./nav-flyout-tokens.json";
import { Text } from "../text/TextComponent";
import { dsa } from "../../themes";

const { args, argTypes } = getArgsShared(schema as JSONSchema7);

const navItems = [
  { label: "Produkte", url: "#", active: true },
  { label: "Anwendungen", url: "#" },
  {
    label: "Service",
    url: "#",
    items: [
      { label: "Downloads", url: "#" },
      { label: "Kontakt", url: "#" },
    ],
  },
];

const meta: Meta<typeof NavFlyout> = {
  title: "Layout/Nav Flyout",
  component: NavFlyout,
  args: pack({ ...unpack(args), logo: dsa.logo, items: navItems }),
  argTypes,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
};

export default meta;

type Story = StoryObj<typeof NavFlyout>;

/**
 * The panel the header swaps the navigation bar for below `62rem`, pictured at
 * a mobile viewport and opened the way the site opens it: `overlay-open` on the
 * document root, which is what the toggle's client behaviour sets.
 *
 * The `Text` stands in for the content a consuming app puts in the panel - the
 * website passes its language switch, which is the only place a mobile visitor
 * can reach it. The design system renders the content; the app owns it.
 */
export const MobileMenu: Story = {
  parameters: {
    viewport: {
      width: 390,
      height: 844,
    },
  },
  render: (args) => (
    <div className="overlay-open">
      <NavFlyout {...args}>
        <Text text="Content the consuming app places in the panel, next to the navigation — the website puts its language switch here." />
      </NavFlyout>
    </div>
  ),
};
