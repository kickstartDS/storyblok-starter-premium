import { DeepPartial } from "../helpers";
import { SectionProps } from "./SectionProps";

const defaults: DeepPartial<SectionProps> = {
  "width": "default",
  "style": "default",
  "backgroundColor": "default",
  "transition": "none",
  "spotlight": false,
  "spaceBefore": "default",
  "spaceAfter": "default",
  "inverted": false,
  "headerSpacing": false,
  "headline": {
    "large": false,
    "width": "unset"
  },
  "content": {
    "width": "unset",
    "align": "center",
    "gutter": "default",
    "mode": "default",
    "tileWidth": "default"
  },
  "components": [],
  "buttons": []
};

export default defaults;