import localFont from "next/font/local";

const displayFont = localFont({
  src: [
    {
      path: "../token/fonts/Metropolis-Thin.woff2",
      weight: "100",
    },
    {
      path: "../token/fonts/Metropolis-Thin.woff",
      weight: "100",
    },
    {
      path: "../token/fonts/Metropolis-Regular.woff2",
      weight: "400",
    },
    {
      path: "../token/fonts/Metropolis-Regular.woff",
      weight: "400",
    },
    {
      path: "../token/fonts/Metropolis-Bold.woff2",
      weight: "700",
    },
    {
      path: "../token/fonts/Metropolis-Bold.woff",
      weight: "700",
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
      path: "../token/fonts/Metropolis-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../token/fonts/Metropolis-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../token/fonts/Metropolis-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../token/fonts/Metropolis-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../token/fonts/Metropolis-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../token/fonts/Metropolis-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../token/fonts/Metropolis-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../token/fonts/Metropolis-Thin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../token/fonts/Metropolis-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../token/fonts/Metropolis-Bold.woff",
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
