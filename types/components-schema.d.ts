import { StoryblokStory } from "storyblok-generate-ts";

export interface BlogAsideStoryblok {
  author?: BlogAuthorStoryblok[];
  socialSharing?: SocialSharingStoryblok[];
  readingTime?: string;
  date?: string;
  className?: string;
  type?: string;
  _uid: string;
  component: "blog-aside";
}

export interface AssetStoryblok {
  _uid?: string;
  id: number;
  alt?: string;
  name: string;
  focus?: string;
  source?: string;
  title?: string;
  filename: string;
  copyright?: string;
  fieldtype?: string;
  meta_data?: null | {};
  is_external_url?: boolean;
}

export interface BlogAuthorStoryblok {
  name?: string;
  byline?: string;
  image_src?: AssetStoryblok;
  image_alt?: string;
  image_fullWidth?: boolean;
  image_aspectRatio?: "" | "wide" | "square" | "vertical";
  links?: LinksStoryblok[];
  type?: string;
  _uid: string;
  component: "blog-author";
}

export interface BlogHeadStoryblok {
  date?: string;
  tags?: TagsStoryblok[];
  headline: string;
  image?: AssetStoryblok;
  type?: string;
  _uid: string;
  component: "blog-head";
}

export interface BlogOverviewStoryblok {
  section?: SectionStoryblok[];
  latestTitle?: string;
  latest?: (StoryblokStory<BlogPostStoryblok> | string)[];
  listTitle?: string;
  list?: BlogTeaserStoryblok[];
  moreTitle?: string;
  more?: BlogTeaserStoryblok[];
  cta?: CtaStoryblok[];
  seo?: SeoStoryblok[];
  type?: string;
  _uid: string;
  component: "blog-overview";
}

export interface BlogPostStoryblok {
  head: BlogHeadStoryblok[];
  aside?: BlogAsideStoryblok[];
  content?: string;
  section?: SectionStoryblok[];
  cta?: GlobalReferenceStoryblok[];
  seo?: SeoStoryblok[];
  type?: string;
  _uid: string;
  component: "blog-post";
}

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      target?: "_self" | "_blank";
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      target?: "_self" | "_blank";
    }
  | {
      email?: string;
      linktype?: "email";
      target?: "_self" | "_blank";
    };

export interface BlogTeaserStoryblok {
  date?: string;
  tags?: TagsStoryblok[];
  headline: string;
  teaserText: string;
  image?: AssetStoryblok;
  link_url?: MultilinkStoryblok;
  link_label?: string;
  readingTime?: string;
  author_name?: string;
  author_title?: string;
  author_image?: AssetStoryblok;
  className?: string;
  type?: string;
  _uid: string;
  component: "blog-teaser";
}

export interface ButtonsStoryblok {
  label?: string;
  icon?: string;
  target?: MultilinkStoryblok;
  _uid: string;
  component: "buttons";
}

export interface ContactStoryblok {
  title?: string;
  subtitle?: string;
  links?: LinksStoryblok[];
  copy?: string;
  className?: string;
  type?: string;
  image_src?: AssetStoryblok;
  image_alt?: string;
  image_fullWidth?: boolean;
  image_aspectRatio?: "" | "wide" | "square" | "vertical";
  _uid: string;
  component: "contact";
}

export interface CtaStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  highlightText?: boolean;
  colorNeutral?: boolean;
  fullWidth?: boolean;
  buttons?: ButtonsStoryblok[];
  backgroundColor?: string;
  backgroundImage?: AssetStoryblok;
  image_src?: AssetStoryblok;
  image_padding?: boolean;
  image_alt?: string;
  order_mobileImageLast?: boolean;
  order_desktopImageLast?: boolean;
  textAlign?: "" | "left" | "center";
  contentAlign?: "" | "center" | "top" | "bottom";
  type?: string;
  _uid: string;
  component: "cta";
}

export interface FaqStoryblok {
  questions?: QuestionsStoryblok[];
  type?: string;
  _uid: string;
  component: "faq";
}

export interface FeatureStoryblok {
  icon?: string;
  title?: string;
  text?: string;
  style?: "" | "intext" | "stack" | "centered" | "besideLarge" | "besideSmall";
  cta_target?: MultilinkStoryblok;
  cta_label?: string;
  cta_toggle?: boolean;
  cta_style?: "" | "button" | "link" | "intext";
  type?: string;
  _uid: string;
  component: "feature";
}

export interface FeaturesStoryblok {
  layout?: "" | "largeTiles" | "smallTiles" | "list";
  style?: "" | "intext" | "stack" | "centered" | "besideLarge" | "besideSmall";
  ctas_toggle?: boolean;
  ctas_style?: "" | "button" | "link" | "intext";
  feature?: FeatureStoryblok[];
  type?: string;
  _uid: string;
  component: "features";
}

export interface FooterStoryblok {
  logo_homepageHref?: Exclude<
    MultilinkStoryblok,
    { linktype?: "email" } | { linktype?: "asset" }
  >;
  logo_src?: AssetStoryblok;
  logo_srcInverted?: AssetStoryblok;
  logo_alt?: string;
  logo_width?: string;
  logo_height?: string;
  byline?: string;
  inverted?: boolean;
  navItems?: NavItemsStoryblok[];
  type?: string;
  _uid: string;
  component: "footer";
}

export interface GalleryStoryblok {
  images?: ImagesStoryblok[];
  layout?: "" | "stack" | "smallTiles" | "largeTiles";
  aspectRatio?: "" | "unset" | "square" | "wide" | "landscape";
  lightbox?: boolean;
  type?: string;
  _uid: string;
  component: "gallery";
}

export interface GlobalStoryblok {
  global?: (
    | BlogTeaserStoryblok
    | ContactStoryblok
    | CtaStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeroStoryblok
    | ImageStoryStoryblok
    | ImageTextStoryblok
    | LogosStoryblok
    | MosaicStoryblok
    | SliderStoryblok
    | StatsStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
    | VideoCurtainStoryblok
  )[];
  _uid: string;
  component: "global";
  uuid?: string;
}

export interface GlobalReferenceStoryblok {
  reference?: unknown[];
  _uid: string;
  component: "global_reference";
}

export interface HeaderStoryblok {
  floating?: boolean;
  inverted?: boolean;
  flyoutInverted?: boolean;
  dropdownInverted?: boolean;
  navItems?: NavItemsStoryblok[];
  type?: string;
  logo_homepageHref?: Exclude<
    MultilinkStoryblok,
    { linktype?: "email" } | { linktype?: "asset" }
  >;
  logo_src?: AssetStoryblok;
  logo_srcInverted?: AssetStoryblok;
  logo_alt?: string;
  logo_width?: string;
  logo_height?: string;
  _uid: string;
  component: "header";
}

export interface HeroStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  highlightText?: boolean;
  colorNeutral?: boolean;
  height?: "" | "small" | "default" | "fullImage" | "fullScreen";
  textbox?: boolean;
  buttons?: ButtonsStoryblok[];
  overlay?: boolean;
  image_srcMobile?: AssetStoryblok;
  image_srcTablet?: AssetStoryblok;
  image_srcDesktop?: AssetStoryblok;
  image_src?: AssetStoryblok;
  image_indent?: "" | "none" | "left" | "right";
  image_alt?: string;
  textPosition?: "" | "center" | "below" | "left" | "right";
  type?: string;
  _uid: string;
  component: "hero";
}

export interface ImagesStoryblok {
  src?: AssetStoryblok;
  alt?: string;
  caption?: string;
  _uid: string;
  component: "images";
}

export interface ImageStoryStoryblok {
  headline?: string;
  image_aspectRatio?: "" | "wide" | "square" | "landscape" | "unset";
  largeHeadline?: boolean;
  sub?: string;
  text?: string;
  layout?: "" | "textLeft" | "imageLeft";
  padding?: boolean;
  buttons?: ButtonsStoryblok[];
  textAlign?: "" | "left" | "center";
  type?: string;
  image_src?: AssetStoryblok;
  image_alt?: string;
  image_vAlign?: "" | "top" | "center" | "bottom";
  _uid: string;
  component: "image-story";
}

export interface ImageTextStoryblok {
  text?: string;
  highlightText?: boolean;
  image_src?: AssetStoryblok;
  image_alt?: string;
  layout?: "" | "above" | "below" | "beside_right" | "beside_left";
  type?: string;
  _uid: string;
  component: "image-text";
}

export interface LinksStoryblok {
  icon?: string;
  label?: string;
  href?: MultilinkStoryblok;
  newTab?: boolean;
  type?: string;
  _uid: string;
  component: "links";
}

export interface LogoStoryblok {
  src?: AssetStoryblok;
  alt?: string;
  type?: string;
  _uid: string;
  component: "logo";
}

export interface LogosStoryblok {
  tagline?: string;
  logo?: LogoStoryblok[];
  align?: "" | "left" | "center";
  logosPerRow?: string;
  cta_toggle?: boolean;
  cta_text?: string;
  cta_link?: MultilinkStoryblok;
  cta_label?: string;
  cta_style?: "" | "button" | "text";
  type?: string;
  _uid: string;
  component: "logos";
}

export interface MosaicStoryblok {
  layout?: "" | "alternate" | "textLeft" | "textRight";
  largeHeadlines?: boolean;
  tiles?: TilesStoryblok[];
  type?: string;
  _uid: string;
  component: "mosaic";
}

export interface NavItemsStoryblok {
  href?: MultilinkStoryblok;
  label?: string;
  active?: boolean;
  items?: NavSubItemsStoryblok[];
  _uid: string;
  component: "navItems";
}

export interface NavSubItemsStoryblok {
  href?: Exclude<
    MultilinkStoryblok,
    { linktype?: "email" } | { linktype?: "asset" }
  >;
  label?: string;
  _uid: string;
  component: "navSubItems";
}

export interface PageStoryblok {
  section?: SectionStoryblok[];
  seo?: SeoStoryblok[];
  type?: string;
  header_floating?: boolean;
  header_inverted?: boolean;
  footer_inverted?: boolean;
  _uid: string;
  component: "page";
  uuid?: string;
}

export interface QuestionsStoryblok {
  question?: string;
  answer?: string;
  _uid: string;
  component: "questions";
}

export interface SectionStoryblok {
  width?: "" | "full" | "max" | "wide" | "default" | "narrow";
  style?:
    | ""
    | "stagelights"
    | "horizontalGradient"
    | "verticalGradient"
    | "accentTransition"
    | "boldTransition"
    | "symmetricGlow"
    | "anchorGlow";
  backgroundColor?: "" | "default" | "accent" | "bold";
  spotlight?: boolean;
  spaceBefore?: "" | "default" | "small" | "none";
  spaceAfter?: "" | "default" | "small" | "none";
  inverted?: boolean;
  headerSpacing?: boolean;
  headline_text?: string;
  headline_large?: boolean;
  headline_width?: "" | "unset" | "narrow" | "default" | "wide";
  headline_textAlign?: "" | "left" | "center" | "right";
  headline_align?: "" | "left" | "center" | "right";
  headline_sub?: string;
  headline_switchOrder?: boolean;
  content_width?: "" | "unset" | "narrow" | "default" | "wide";
  content_align?: "" | "left" | "center" | "right";
  content_gutter?: "" | "large" | "default" | "small" | "none";
  content_mode?: "" | "default" | "tile" | "list" | "slider";
  content_tileWidth?:
    | ""
    | "smallest"
    | "default"
    | "medium"
    | "large"
    | "largest";
  components?: (
    | BlogTeaserStoryblok
    | ContactStoryblok
    | CtaStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeroStoryblok
    | ImageStoryStoryblok
    | ImageTextStoryblok
    | LogosStoryblok
    | MosaicStoryblok
    | SliderStoryblok
    | StatsStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
    | VideoCurtainStoryblok
    | GlobalReferenceStoryblok
  )[];
  buttons?: ButtonsStoryblok[];
  type?: string;
  _uid: string;
  component: "section";
}

export interface SeoStoryblok {
  title?: string;
  description?: string;
  keywords?: string;
  image?: AssetStoryblok;
  cardImage?: string;
  type?: string;
  _uid: string;
  component: "seo";
}

export interface SettingsStoryblok {
  header?: HeaderStoryblok[];
  footer?: FooterStoryblok[];
  seo?: SeoStoryblok[];
  type?: string;
  _uid: string;
  component: "settings";
}

export interface SliderStoryblok {
  autoplay?: boolean;
  nav?: boolean;
  teaseNeighbours?: boolean;
  equalHeight?: boolean;
  gap?: string;
  arrows?: boolean;
  type?: string;
  className?: string;
  typeProp?: "" | "slider" | "carousel";
  _uid: string;
  component: "slider";
}

export interface SocialSharingStoryblok {
  icon?: string;
  href?: MultilinkStoryblok;
  title?: string;
  _uid: string;
  component: "socialSharing";
}

export interface StatStoryblok {
  number?: string;
  description?: string;
  title?: string;
  icon?: string;
  type?: string;
  _uid: string;
  component: "stat";
}

export interface StatsStoryblok {
  stat?: StatStoryblok[];
  type?: string;
  _uid: string;
  component: "stats";
}

export interface TagsStoryblok {
  entry: string;
  _uid: string;
  component: "tags";
}

export interface TeaserCardStoryblok {
  headline?: string;
  text?: string;
  label?: string;
  layout?: "" | "stack" | "row";
  target?: MultilinkStoryblok;
  button_label?: string;
  button_chevron?: boolean;
  button_hidden?: boolean;
  image?: AssetStoryblok;
  imageRatio?: "" | "wide" | "landscape" | "square" | "unset";
  type?: string;
  _uid: string;
  component: "teaser-card";
}

export interface TestimonialStoryblok {
  quote?: string;
  name?: string;
  title?: string;
  image_src?: AssetStoryblok;
  image_alt?: string;
  rating?: string;
  type?: string;
  _uid: string;
  component: "testimonial";
}

export interface TestimonialsStoryblok {
  layout?: "" | "slider" | "list" | "alternating";
  testimonial?: TestimonialStoryblok[];
  type?: string;
  _uid: string;
  component: "testimonials";
}

export interface TextStoryblok {
  text?: string;
  layout?: "" | "singleColumn" | "multiColumn";
  align?: "" | "left" | "center";
  highlightText?: boolean;
  type?: string;
  _uid: string;
  component: "text";
}

export interface TilesStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  image_src?: AssetStoryblok;
  image_alt?: string;
  button_toggle?: boolean;
  button_label?: string;
  button_target?: MultilinkStoryblok;
  button_icon?: string;
  backgroundColor?: string;
  backgroundImage?: AssetStoryblok;
  textColor?: string;
  _uid: string;
  component: "tiles";
}

export interface VideoCurtainStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  highlightText?: boolean;
  colorNeutral?: boolean;
  buttons?: ButtonsStoryblok[];
  overlay?: boolean;
  video_srcMobile?: AssetStoryblok;
  video_srcTablet?: AssetStoryblok;
  video_srcDesktop?: AssetStoryblok;
  textPosition?: "" | "center" | "left" | "right";
  type?: string;
  _uid: string;
  component: "video-curtain";
}
