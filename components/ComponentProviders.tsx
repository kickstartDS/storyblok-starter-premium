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
  ComponentProps,
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
import {
  StorytellingContext,
  StorytellingContextDefault,
} from "@kickstartds/content/lib/storytelling";
import { StorytellingProps } from "@kickstartds/content/lib/storytelling/typing";

import { BlogTeaserContext } from "@kickstartds/ds-agency-premium/blog-teaser";
import { BlogAsideContext } from "@kickstartds/ds-agency-premium/blog-aside";
import { BlogAuthorContext } from "@kickstartds/ds-agency-premium/blog-author";
import { BlogHeadContext } from "@kickstartds/ds-agency-premium/blog-head";
import { CtaContext } from "@kickstartds/ds-agency-premium/cta";
import { FeatureContext } from "@kickstartds/ds-agency-premium/feature";
import { StatContext } from "@kickstartds/ds-agency-premium/stat";
import {
  SplitEvenContext,
  SplitEvenContextDefault,
} from "@kickstartds/ds-agency-premium/split-even";
import {
  SplitWeightedContext,
  SplitWeightedContextDefault,
} from "@kickstartds/ds-agency-premium/split-weighted";
import { TestimonialContext } from "@kickstartds/ds-agency-premium/testimonial";
import {
  HeroContextDefault,
  HeroContext,
} from "@kickstartds/ds-agency-premium/hero";

import { StoryblokSubComponent } from "./StoryblokSubComponent";
import { TeaserProvider } from "./TeaserProvider";
import { IconProvider } from "./icon/IconProvider";

import { useBlurHashes } from "./BlurHashContext";
import { useImagePriority } from "./ImagePriorityContext";
import { useImageSize } from "./ImageSizeContext";
import { useImageRatio } from "./ImageRatioContext";
import { StoryblokComponent } from "@storyblok/react";
import { unflatten } from "@/helpers/unflatten";

const Link = forwardRef<
  HTMLAnchorElement,
  LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>
>(({ href, ...props }, ref) => (
  <NextLink ref={ref} href={href || "#"} {...props} />
));

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
  const size = useImageSize();
  const ratio = useImageRatio();

  useImperativeHandle<HTMLImageElement | null, HTMLImageElement | null>(
    ref,
    () => internalRef.current
  );

  useEffect(() => {
    if (internalRef.current) resetBackgroundBlurHash(internalRef.current);
  }, []);

  if (!src) return;
  const fileUrl = !src.startsWith("http") ? `https:${src}` : src;
  const [width, height] = fileUrl.match(/\/(\d+)x(\d+)\//)?.slice(1) || [];
  const maxWidth = parseInt(width) > size ? Math.floor(size) : parseInt(width);
  const maxHeight =
    parseInt(width) > size
      ? Math.floor((parseInt(height) * size) / parseInt(width))
      : parseInt(height);

  // Don't optimize SVG images - https://github.com/kickstartDS/storyblok-starter/issues/19
  return fileUrl.endsWith(".svg") ? (
    <PictureContextDefault
      ref={internalRef}
      {...props}
      src={fileUrl}
      width={maxWidth}
      height={maxHeight}
      alt={props.alt || ""}
      lazy={priority ? false : lazy}
      fetchPriority="high"
      loading={priority ? "eager" : "lazy"}
    />
  ) : (
    <Image
      ref={internalRef}
      {...props}
      alt={props.alt || ""}
      src={
        priority
          ? `${fileUrl}/${
              fileUrl.includes("/m/") ? "" : "m/"
            }filters:quality(50)`
          : fileUrl
      }
      layout={autoSize ? "fullWidth" : "constrained"}
      aspectRatio={ratio > 0 ? ratio : undefined}
      width={maxWidth}
      height={autoSize || ratio > 0 ? undefined : maxHeight}
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
  ComponentProps<typeof HeroContextDefault> & HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { image, ...rest } = props;

  const src =
    (image &&
      (image.src && !image.src.endsWith("/m/600x0")
        ? `${image.src}/m/600x0`
        : image.src)) ||
    undefined;
  const srcMobile =
    (image &&
      (image.srcMobile && !image.srcMobile.endsWith("/m/600x0")
        ? `${image.srcMobile}/m/600x0`
        : image.srcMobile)) ||
    src ||
    "";
  const srcTablet =
    (image &&
      (image.srcTablet && !image.srcTablet.endsWith("/m/950x0")
        ? `${image.srcTablet}/m/950x0`
        : image.srcTablet)) ||
    undefined;
  const srcDesktop =
    (image &&
      (image.srcDesktop && !image.srcDesktop.endsWith("/m/1600x0")
        ? `${image.srcDesktop}/m/1600x0`
        : image.srcDesktop)) ||
    undefined;

  return (
    <HeroContextDefault
      {...rest}
      image={{
        ...image,
        srcMobile,
        srcTablet,
        srcDesktop,
        src,
      }}
      ref={ref}
    />
  );
});

const HeroProvider: FC<PropsWithChildren> = (props) => (
  <HeroContext.Provider {...props} value={Hero} />
);

const SplitEven = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof SplitEvenContextDefault> &
    HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { firstComponents, secondComponents, ...rest } = props;

  return (
    <SplitEvenContextDefault
      {...rest}
      firstComponents={
        firstComponents &&
        firstComponents.length > 0 && (
          <>
            {firstComponents.map((component) => (
              <StoryblokComponent
                key={component._uid}
                blok={unflatten(component)}
              ></StoryblokComponent>
            ))}
          </>
        )
      }
      secondComponents={
        secondComponents &&
        secondComponents.length > 0 && (
          <>
            {secondComponents.map((component) => (
              <StoryblokComponent
                key={component._uid}
                blok={unflatten(component)}
              ></StoryblokComponent>
            ))}
          </>
        )
      }
      ref={ref}
    />
  );
});

const SplitEvenProvider: FC<PropsWithChildren> = (props) => (
  <SplitEvenContext.Provider {...props} value={SplitEven} />
);

const SplitWeighted = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof SplitWeightedContextDefault> &
    HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { mainComponents, asideComponents, ...rest } = props;

  return (
    <SplitWeightedContextDefault
      {...rest}
      main={
        mainComponents &&
        mainComponents.length > 0 && (
          <>
            {mainComponents.map((component) => (
              <StoryblokComponent
                key={component._uid}
                blok={unflatten(component)}
              ></StoryblokComponent>
            ))}
          </>
        )
      }
      aside={
        asideComponents &&
        asideComponents.length > 0 && (
          <>
            {asideComponents.map((component) => (
              <StoryblokComponent
                key={component._uid}
                blok={unflatten(component)}
              ></StoryblokComponent>
            ))}
          </>
        )
      }
      ref={ref}
    />
  );
});

const SplitWeightedProvider: FC<PropsWithChildren> = (props) => (
  <SplitWeightedContext.Provider {...props} value={SplitWeighted} />
);

const Storytelling = forwardRef<
  HTMLDivElement,
  StorytellingProps & HTMLAttributes<HTMLDivElement>
>(({ backgroundImage, ...props }, ref) => {
  return (
    <StorytellingContextDefault
      {...props}
      backgroundImage={backgroundImage}
      ref={ref}
    />
  );
});

const StorytellingProvider: FC<PropsWithChildren> = (props) => (
  <StorytellingContext.Provider {...props} value={Storytelling} />
);

const ComponentProviders = (props: PropsWithChildren) => (
  <IconProvider>
    <StorytellingProvider>
      <PictureProvider>
        <SplitEvenProvider>
          <SplitWeightedProvider>
            <HeroProvider>
              <LinkProvider>
                <TeaserProvider>
                  {/* @ts-expect-error */}
                  <CtaContext.Provider value={StoryblokSubComponent}>
                    {/* @ts-expect-error */}
                    <FeatureContext.Provider value={StoryblokSubComponent}>
                      {/* @ts-expect-error */}
                      <StatContext.Provider value={StoryblokSubComponent}>
                        <TestimonialContext.Provider
                          // @ts-expect-error
                          value={StoryblokSubComponent}
                        >
                          <BlogHeadContext.Provider
                            // @ts-expect-error
                            value={StoryblokSubComponent}
                          >
                            <BlogAsideContext.Provider
                              // @ts-expect-error
                              value={StoryblokSubComponent}
                            >
                              <BlogTeaserContext.Provider
                                // @ts-expect-error
                                value={StoryblokSubComponent}
                              >
                                <BlogAuthorContext.Provider
                                  // @ts-expect-error
                                  value={StoryblokSubComponent}
                                >
                                  {props.children}
                                </BlogAuthorContext.Provider>
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
          </SplitWeightedProvider>
        </SplitEvenProvider>
      </PictureProvider>
    </StorytellingProvider>
  </IconProvider>
);

export default ComponentProviders;
