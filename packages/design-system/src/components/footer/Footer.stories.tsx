import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, unpack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Footer as FooterComponent } from "./FooterComponent";
import schema from "./footer.schema.dereffed.json";
import customProperties from "./footer-tokens.json";

const { args, argTypes } = getArgsShared(schema as JSONSchema7);
// The story is the source of the component's Storyblok preview image, so it
// carries Dr. Hubert's own footer - the client's logo and the flat column
// navigation of the live site - instead of design system placeholder content.
export const footerProps = {
  ...unpack(args),
  logo: {
    src: "/logo.svg",
    srcInverted: "/logo-inverted.svg",
    inverted: false,
    homepageHref: "#",
    alt: "HUBERT Logo",
    width: 740,
    height: 180,
  },
  navGroups: [
    { heading: "Startseite", headingUrl: "/" },
    { heading: "Produkte", headingUrl: "/produkte" },
    { heading: "Über uns", headingUrl: "/ueber-uns" },
    { heading: "Impressum", headingUrl: "/impressum" },
    { heading: "Datenschutz", headingUrl: "/datenschutz" },
  ],
  socialLinks: [
    { icon: "facebook", url: "https://example.com", ariaLabel: "Facebook" },
    { icon: "twitter", url: "https://example.com", ariaLabel: "Twitter" },
    { icon: "linkedin", url: "https://example.com", ariaLabel: "LinkedIn" },
    { icon: "xing", url: "https://example.com", ariaLabel: "Xing" },
  ],
  copyright: "© 2026 Dr. Hubert GmbH | Dietrich-Benking-Strasse 41 | 44805 Bochum",
  legalLink: {
    label: "Legal",
    url: "#",
  },
};

const meta: Meta = {
  title: "Layout/Footer",
  args: pack(footerProps),
  argTypes,
  component: FooterComponent,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  excludeStories: ["footerProps"],
};

export default meta;

type Story = StoryObj<typeof FooterComponent>;

export const Footer: Story = {
  parameters: {
    viewport: {
      width: 1280,
      height: 330,
    },
  },
};

// The round back-to-top button only renders when the CMS provides a label, so
// it needs its own story - the shared props must not render it incidentally.
// The site footer is inverted (dark), which is where the light-blue circle and
// dark-blue arrow from the mockup apply.
export const BackToTop: Story = {
  args: pack({
    ...footerProps,
    inverted: true,
    backToTop: { label: "Zurück nach oben" },
  }),
  parameters: {
    viewport: {
      width: 1280,
      height: 330,
    },
  },
};
