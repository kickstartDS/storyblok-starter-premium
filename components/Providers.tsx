/*  eslint react/display-name: 0 */
import {
  AnchorHTMLAttributes,
  FC,
  HTMLAttributes,
  ImgHTMLAttributes,
  PropsWithChildren,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import NextLink from "next/link";
import { blurhashToCssGradientString } from "@unpic/placeholder";
import { Image } from "@unpic/react/nextjs";

import {
  PictureContext,
  PictureContextDefault,
} from "@kickstartds/base/lib/picture";
import { LinkContext, LinkProps } from "@kickstartds/base/lib/link";
import { PictureProps } from "@kickstartds/base/lib/picture/typing";

import { BlogTeaserContext } from "@kickstartds/ds-agency-premium/blog-teaser";
import { BlogAsideContext } from "@kickstartds/ds-agency-premium/blog-aside";
import { BlogHeadContext } from "@kickstartds/ds-agency-premium/blog-head";
import { CtaContext } from "@kickstartds/ds-agency-premium/cta";
import { FeatureContext } from "@kickstartds/ds-agency-premium/feature";
import { StatContext } from "@kickstartds/ds-agency-premium/stat";
import { TestimonialContext } from "@kickstartds/ds-agency-premium/testimonial";

import { INDEX_SLUG } from "@/helpers/storyblok";

import { StoryblokSubComponent } from "./StoryblokSubComponent";
import { TeaserProvider } from "./TeaserProvider";
import { useBlurHashes } from "./BlurHashContext";
import { useImagePriority } from "./ImagePriorityContext";
import { AssetStoryblok, MultilinkStoryblok } from "@/types/components-schema";
import { HeroProps } from "@kickstartds/ds-agency-premium/HeroProps-cf82a16d.js";
import {
  HeroContextDefault as DsaHero,
  HeroContext,
} from "@kickstartds/ds-agency-premium/hero";

function isStoryblokLink(object: unknown): object is MultilinkStoryblok {
  return (object as MultilinkStoryblok)?.linktype !== undefined;
}

function isStoryblokAsset(object: unknown): object is AssetStoryblok {
  return (object as AssetStoryblok)?.filename !== undefined;
}

const Link = forwardRef<
  HTMLAnchorElement,
  LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>
>(({ href, ...props }, ref) => {
  if (isStoryblokLink(href)) {
    const linkTarget =
      href.linktype === "email"
        ? `mailto:${href.email}`
        : href.story?.full_slug === INDEX_SLUG
        ? "/"
        : href.cached_url || href.story?.full_slug;
    return (
      <NextLink
        {...props}
        ref={ref}
        href={linkTarget || ""}
        target={href.target}
      />
    );
  }

  return <NextLink ref={ref} {...props} href={href || ""} />;
});

const LinkProvider: FC<PropsWithChildren> = (props) => (
  <LinkContext.Provider value={Link} {...props} />
);

const resetBackgroundBlurHash = (image: HTMLImageElement) => {
  requestAnimationFrame(() => {
    image.style.background = "";
  });
};

const Picture = forwardRef<
  HTMLImageElement,
  PictureProps & ImgHTMLAttributes<HTMLImageElement> & { autoSize?: boolean }
>(({ src, lazy, autoSize, ...props }, ref) => {
  const internalRef = useRef<HTMLImageElement>(null);

  const blurHashes = useBlurHashes();
  const priority = useImagePriority();

  useImperativeHandle<HTMLImageElement | null, HTMLImageElement | null>(
    ref,
    () => internalRef.current
  );

  useEffect(() => {
    if (internalRef.current) resetBackgroundBlurHash(internalRef.current);
  }, []);

  if (!src || (isStoryblokAsset(src) && !src.filename)) return;
  const source = isStoryblokAsset(src) ? src.filename : src;
  const fileUrl = !source.startsWith("http") ? `https:${source}` : source;
  const [width, height] = fileUrl.match(/\/(\d+)x(\d+)\//)?.slice(1) || [];

  // Don't optimize SVG images - https://github.com/kickstartDS/storyblok-starter/issues/19
  return fileUrl.endsWith(".svg") ? (
    <PictureContextDefault
      ref={internalRef}
      {...props}
      src={fileUrl}
      width={parseInt(width, 10)}
      height={parseInt(height, 10)}
      alt={isStoryblokAsset(src) ? src.alt || "" : props.alt || ""}
      lazy={lazy}
    />
  ) : (
    <Image
      ref={internalRef}
      {...props}
      alt={isStoryblokAsset(src) ? src.alt || "" : props.alt || ""}
      src={priority ? `${fileUrl}/m/filters:quality(50)` : fileUrl}
      width={autoSize ? undefined : parseInt(width, 10)}
      height={autoSize ? undefined : parseInt(height, 10)}
      priority={lazy === false || priority}
      onLoad={(event) => {
        if (event.target instanceof HTMLImageElement) {
          resetBackgroundBlurHash(event.target);
        }
      }}
      background={
        blurHashes[fileUrl]
          ? blurhashToCssGradientString(blurHashes[fileUrl])
          : undefined
      }
      // @ts-expect-error `null` is not documented
      objectFit={null}
    />
  );
});

const PictureProvider: FC<PropsWithChildren> = (props) => (
  <PictureContext.Provider {...props} value={Picture} />
);

const Hero = forwardRef<
  HTMLDivElement,
  HeroProps & HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { image, ...rest } = props;

  const srcMobile =
    image && image.srcMobile && isStoryblokAsset(image?.srcMobile)
      ? `${image.srcMobile.filename}/m/1600x0`
      : image?.srcMobile || "";
  const srcTablet =
    image && image.srcTablet && isStoryblokAsset(image?.srcTablet)
      ? `${image.srcTablet.filename}/m/950x0`
      : image?.srcTablet || "";
  const srcDesktop =
    image && image.srcDesktop && isStoryblokAsset(image?.srcDesktop)
      ? `${image.srcDesktop.filename}/m/600x0`
      : image?.srcDesktop || "";

  return (
    <DsaHero
      {...rest}
      image={{
        ...image,
        srcMobile,
        srcTablet,
        srcDesktop,
        src: image?.srcMobile || "",
      }}
      ref={ref}
    />
  );
});

const HeroProvider: FC<PropsWithChildren> = (props) => (
  <HeroContext.Provider {...props} value={Hero} />
);

const Providers = (props: PropsWithChildren) => (
  <PictureProvider>
    <HeroProvider>
      <LinkProvider>
        <TeaserProvider>
          {/* @ts-expect-error */}
          <CtaContext.Provider value={StoryblokSubComponent}>
            {/* @ts-expect-error */}
            <FeatureContext.Provider value={StoryblokSubComponent}>
              {/* @ts-expect-error */}
              <StatContext.Provider value={StoryblokSubComponent}>
                {/* @ts-expect-error */}
                <TestimonialContext.Provider value={StoryblokSubComponent}>
                  {/* @ts-expect-error */}
                  <BlogHeadContext.Provider value={StoryblokSubComponent}>
                    {/* @ts-expect-error */}
                    <BlogAsideContext.Provider value={StoryblokSubComponent}>
                      {/* @ts-expect-error */}
                      <BlogTeaserContext.Provider value={StoryblokSubComponent}>
                        {props.children}
                      </BlogTeaserContext.Provider>
                    </BlogAsideContext.Provider>
                  </BlogHeadContext.Provider>
                </TestimonialContext.Provider>
              </StatContext.Provider>
            </FeatureContext.Provider>
          </CtaContext.Provider>
        </TeaserProvider>
      </LinkProvider>
    </HeroProvider>
  </PictureProvider>
);

export default Providers;
