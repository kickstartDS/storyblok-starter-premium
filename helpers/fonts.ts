import localFont from "next/font/local";

const displayFont = localFont({
  src: [
    {
      path: "../token/fonts/Montserrat-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../token/fonts/Montserrat-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../token/fonts/Montserrat-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../token/fonts/Montserrat-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  preload: true,
  display: "swap",
  variable: "--ks-font-family-display",
  fallback: [
    "Baskerville",
    "'Baskerville Old Face'",
    "'Hoefler Text'",
    "'Times New Roman'",
    "serif",
  ],
  adjustFontFallback: false,
});

const displayFontPreview = localFont({
  src: [
    {
      path: "../token/fonts/Montserrat-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../token/fonts/Montserrat-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../token/fonts/Montserrat-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../token/fonts/Montserrat-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  preload: false,
  display: "auto",
  variable: "--ks-font-family-display",
  fallback: [
    "Baskerville",
    "'Baskerville Old Face'",
    "'Hoefler Text'",
    "'Times New Roman'",
    "serif",
  ],
  adjustFontFallback: false,
});

export const fontClassNames = `${displayFont.variable}`;
export const fontClassNamesPreview = `${displayFontPreview.variable}`;
