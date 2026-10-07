import { RefObject, useState, useEffect, useMemo } from "react";
import tinycolor from "tinycolor2";

const format = (property: string, value: string | undefined) => {
  if (value && property?.toLowerCase().endsWith("color")) {
    let color: any = value;
    if (color.startsWith("color(srgb")) {
      const [, r, g, b, _, a] = value.replace(")", "").split(" ");
      color = {
        r: Number(r) * 255,
        g: Number(g) * 255,
        b: Number(b) * 255,
        a,
      };
    }
    return tinycolor(color).toString();
  }
  return value;
};

export const useCssValue = (
  property: string,
  ref: RefObject<HTMLElement | null>
): string | undefined => {
  const [computedStyle, setComputedStyle] = useState<CSSStyleDeclaration>();

  useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);

  return useMemo(() => {
    const value = computedStyle?.[property];
    return format(property, value);
  }, [computedStyle, property]);
};
