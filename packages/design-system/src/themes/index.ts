// The logo files in `static/` are byte copies of Dr. Hubert's own Storyblok
// assets, taken from space 303819 so that the design system ships the client's
// logo as its own stand-alone copy and carries no CMS reference in code:
//
//   static/logo.svg          <- https://a.storyblok.com/f/303819/740x180/02e353b0dc/logo-hubert.svg
//   static/logo-inverted.svg <- https://a.storyblok.com/f/303819/740x180/59101aa35f/logo-hubert-inverted.svg
//
// The Header story reads this registry, and the Footer, BusinessCard and
// Token/Playground stories reference the same static paths, so all of their
// screenshots - and with them the Storyblok component previews - show the
// client's logo.
export const dsa = {
  title: "DS Agency",
  tokens: "/tokens.css",
  logo: {
    src: "/logo.svg",
    srcInverted: "/logo-inverted.svg",
    homepageHref: "#",
    alt: "HUBERT Logo",
    width: 740,
    height: 180,
  },
};
