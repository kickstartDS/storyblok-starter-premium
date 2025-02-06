const cspHeader = `
    default-src 'self';
    connect-src 'self' https://data.debugbear.com https://*.clarity.ms https://app.lemcal.com;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://app.storyblok.com https://cdn.debugbear.com https://www.clarity.ms https://cdn.lemcal.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    frame-src 'self' https://youtube.com https://www.youtube.com https://player.vimeo.com https://www.youtube-nocookie.com/ *.google.com;
    img-src 'self' blob: data: https://a.storyblok.com https://assets.lemcal.com https://videos.lemcal.com https://app.lemcal.com;
    media-src 'self' blob: data: https://a.storyblok.com;
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors https://app.storyblok.com;
    block-all-mixed-content;
    upgrade-insecure-requests;
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@kickstartds/base",
    "@kickstartds/blog",
    "@kickstartds/content",
    "@kickstartds/core",
    "@kickstartds/form",
    "@kickstartds/ds-agency-premium",
  ],
};

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
  ...nextConfig,
};
