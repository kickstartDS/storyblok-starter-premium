import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, unpack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Header as HeaderComponent } from "./HeaderComponent";
import schema from "./header.schema.dereffed.json";
import customProperties from "./header-tokens.json";
import { dsa } from "../../themes";

const { args, argTypes } = getArgsShared(schema as JSONSchema7);
// The schema's `navItems` example is the component's published demo content;
// the story carries Dr. Hubert's navigation instead, because it is the source
// of the component's Storyblok preview image.
export const headerProps = {
  ...unpack(args),
  logo: dsa.logo,
  navItems: [
    {
      label: "Produkte",
      url: "/produkte",
      active: true,
      items: [
        { label: "Übersicht", url: "/produkte" },
        { label: "Serie A1110", url: "/produkte/serie-a1110" },
        { label: "Serie A1230", url: "/produkte/serie-a1230" },
        { label: "Serie A1020", url: "/produkte/serie-a1020" },
        { label: "Serie A1500", url: "/produkte/a1500" },
        { label: "A1340-C1", url: "/produkte/a1340-c1" },
        { label: "FPS-200", url: "/produkte/fps-200" },
        { label: "CMD-100", url: "/produkte/cmd-100" },
        { label: "Zubehör", url: "/produkte/a1110-p4" },
      ],
    },
    { label: "Anwendungen", url: "/anwendungen" },
    { label: "Wissen", url: "/wissen" },
    { label: "Support", url: "/support" },
    { label: "Kontakt", url: "/kontakt" },
    { label: "Über uns", url: "/ueber-uns" },
    { label: "Jobs", url: "/jobs" },
  ],
};
const meta: Meta = {
  title: "Layout/Header",
  args: pack(headerProps),
  argTypes,
  component: HeaderComponent,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  excludeStories: ["headerProps"],
};

export default meta;

type Story = StoryObj<typeof HeaderComponent>;

export const Header: Story = {
  parameters: {
    viewport: {
      width: 1280,
      height: 226,
    },
  },
};
