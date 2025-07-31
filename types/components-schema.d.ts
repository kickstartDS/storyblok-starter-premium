import {StoryblokStory} from 'storyblok-generate-ts'

export interface BlogAsideStoryblok {
  author?: BlogAuthorStoryblok[];
  socialSharing?: SocialSharingStoryblok[];
  readingTime?: string;
  date?: string;
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
  _uid: string;
  component: "blog-author";
}

export interface BlogHeadStoryblok {
  date?: string;
  tags?: TagsStoryblok[];
  headline?: string;
  image?: AssetStoryblok;
  alt?: string;
  _uid: string;
  component: "blog-head";
}

export interface BlogOverviewStoryblok {
  section?: SectionStoryblok[];
  latestTitle?: string;
  latest?: BlogTeaserStoryblok[];
  listTitle?: string;
  list?: BlogTeaserStoryblok[];
  moreTitle?: string;
  more?: BlogTeaserStoryblok[];
  cta?: CtaStoryblok[];
  seo?: SeoStoryblok[];
  _uid: string;
  component: "blog-overview";
}

export interface BlogPostStoryblok {
  head?: BlogHeadStoryblok[];
  aside?: BlogAsideStoryblok[];
  content?: string;
  section?: SectionStoryblok[];
  cta?: CtaStoryblok[];
  seo?: SeoStoryblok[];
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
  headline?: string;
  teaserText?: string;
  image?: AssetStoryblok;
  alt?: string;
  link_url?: MultilinkStoryblok;
  link_text?: string;
  readingTime?: string;
  author_name?: string;
  author_title?: string;
  author_image?: AssetStoryblok;
  _uid: string;
  component: "blog-teaser";
}

export interface ButtonsStoryblok {
  label?: string;
  target?: MultilinkStoryblok;
  _uid: string;
  component: "buttons";
}

export interface CtaStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  buttons?: ButtonsStoryblok[];
  image_src?: AssetStoryblok;
  image_padding?: boolean;
  image_alt?: string;
  order_mobileImageLast?: boolean;
  order_desktopImageLast?: boolean;
  _uid: string;
  component: "cta";
}

export interface DividerStoryblok {
  variant?: "" | "default" | "accent";
  _uid: string;
  component: "divider";
}

export interface FaqStoryblok {
  questions?: QuestionsStoryblok[];
  _uid: string;
  component: "faq";
}

export interface FeatureStoryblok {
  title?: string;
  text?: string;
  cta_target?: MultilinkStoryblok;
  cta_label?: string;
  _uid: string;
  component: "feature";
}

export interface FeaturesStoryblok {
  layout?: "" | "largeTiles" | "smallTiles" | "list";
  style?: "" | "intext" | "stack" | "centered" | "besideLarge" | "besideSmall";
  ctas_toggle?: boolean;
  ctas_style?: "" | "button" | "link" | "intext";
  feature?: FeatureStoryblok[];
  _uid: string;
  component: "features";
}

export interface FooterStoryblok {
  logo_src?: AssetStoryblok;
  logo_srcInverted?: AssetStoryblok;
  logo_alt?: string;
  logo_homepageHref?: MultilinkStoryblok;
  logo_width?: string;
  logo_height?: string;
  byline?: string;
  navItems?: NavItemsStoryblok[];
  _uid: string;
  component: "footer";
}

export interface GalleryStoryblok {
  images?: ImagesStoryblok[];
  layout?: "" | "stack" | "smallTiles" | "largeTiles";
  aspectRatio?: "" | "unset" | "square" | "wide" | "landscape";
  lightbox?: boolean;
  _uid: string;
  component: "gallery";
}

export interface GlobalStoryblok {
  global?: (
    | BlogTeaserStoryblok
    | CtaStoryblok
    | DividerStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeroStoryblok
    | HtmlStoryblok
    | ImageStoryStoryblok
    | ImageTextStoryblok
    | InfoTableStoryblok
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
  logo_src?: AssetStoryblok;
  logo_srcInverted?: AssetStoryblok;
  logo_alt?: string;
  logo_homepageHref?: MultilinkStoryblok;
  logo_width?: string;
  logo_height?: string;
  navItems?: NavItemsStoryblok[];
  _uid: string;
  component: "header";
}

export interface HeroStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  buttons?: ButtonsStoryblok[];
  image_srcMobile?: AssetStoryblok;
  image_srcTablet?: AssetStoryblok;
  image_srcDesktop?: AssetStoryblok;
  image_src?: AssetStoryblok;
  image_indent?: "" | "none" | "left" | "right";
  image_alt?: string;
  _uid: string;
  component: "hero";
}

export interface HtmlStoryblok {
  html?: string;
  consent?: boolean;
  consentText?: string;
  consentButtonLabel?: string;
  consentBackgroundImage?: AssetStoryblok;
  consentAspectRatio?: "" | "VALUE_16_9" | "VALUE_16_10" | "VALUE_4_3" | "VALUE_1_1";
  _uid: string;
  component: "html";
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
  sub?: string;
  text?: string;
  layout?: "" | "textLeft" | "imageLeft";
  buttons?: ButtonsStoryblok[];
  image_src?: AssetStoryblok;
  image_aspectRatio?: "" | "unset" | "square" | "wide" | "landscape";
  image_alt?: string;
  image_vAlign?: "" | "center" | "top" | "bottom";
  _uid: string;
  component: "image-story";
}

export interface ImageTextStoryblok {
  text?: string;
  highlightText?: boolean;
  image_src?: AssetStoryblok;
  image_alt?: string;
  layout?: "" | "above" | "below" | "beside_right" | "beside_left";
  _uid: string;
  component: "image-text";
}

export interface TableStoryblok {
  thead: {
    _uid: string;
    value?: string;
    component: number;
  }[];
  tbody: {
    _uid: string;
    body: {
      _uid?: string;
      value?: string;
      component?: number;
    }[];
    component: number;
  }[];
}

export interface InfoTableStoryblok {
  data?: TableStoryblok;
  _uid: string;
  component: "info-table";
}

export interface ItemsStoryblok {
  href?: MultilinkStoryblok;
  label?: string;
  active?: boolean;
  _uid: string;
  component: "items";
}

export interface LinksStoryblok {
  label?: string;
  href?: MultilinkStoryblok;
  newTab?: boolean;
  _uid: string;
  component: "links";
}

export interface LogoStoryblok {
  src?: AssetStoryblok;
  alt?: string;
  _uid: string;
  component: "logo";
}

export interface LogosStoryblok {
  tagline?: string;
  logo?: LogoStoryblok[];
  logosPerRow?: string;
  cta_toggle?: boolean;
  cta_text?: string;
  cta_link?: MultilinkStoryblok;
  cta_label?: string;
  cta_style?: "" | "button" | "text";
  _uid: string;
  component: "logos";
}

export interface MosaicStoryblok {
  layout?: "" | "alternate" | "textLeft" | "textRight";
  largeHeadlines?: boolean;
  tile?: TileStoryblok[];
  _uid: string;
  component: "mosaic";
}

export interface NavItemsStoryblok {
  href?: MultilinkStoryblok;
  label?: string;
  active?: boolean;
  items?: ItemsStoryblok[];
  _uid: string;
  component: "navItems";
}

export interface PageStoryblok {
  section?: SectionStoryblok[];
  header_floating?: boolean;
  header_inverted?: boolean;
  footer_inverted?: boolean;
  seo?: SeoStoryblok[];
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
  backgroundImage?: AssetStoryblok;
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
  content_tileWidth?: "" | "smallest" | "default" | "medium" | "large" | "largest";
  components?: (
    | BlogTeaserStoryblok
    | CtaStoryblok
    | DividerStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeroStoryblok
    | HtmlStoryblok
    | ImageStoryStoryblok
    | ImageTextStoryblok
    | InfoTableStoryblok
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
  _uid: string;
  component: "section";
}

export interface SeoStoryblok {
  title?: string;
  description?: string;
  keywords?: string;
  image?: AssetStoryblok;
  _uid: string;
  component: "seo";
}

export interface SettingsStoryblok {
  header?: HeaderStoryblok[];
  footer?: FooterStoryblok[];
  seo?: SeoStoryblok[];
  iconSprite?: string;
  _uid: string;
  component: "settings";
}

export interface SliderStoryblok {
  autoplay?: boolean;
  nav?: boolean;
  teaseNeighbours?: boolean;
  equalHeight?: boolean;
  arrows?: boolean;
  variant?: "" | "slider" | "carousel";
  _uid: string;
  component: "slider";
}

export interface SocialSharingStoryblok {
  href?: MultilinkStoryblok;
  title?: string;
  _uid: string;
  component: "socialSharing";
}

export interface StatStoryblok {
  number?: string;
  description?: string;
  title?: string;
  _uid: string;
  component: "stat";
}

export interface StatsStoryblok {
  stat?: StatStoryblok[];
  _uid: string;
  component: "stats";
}

export interface TagsStoryblok {
  entry?: string;
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
  _uid: string;
  component: "testimonial";
}

export interface TestimonialsStoryblok {
  layout?: "" | "slider" | "list" | "alternating";
  quoteSigns?: "" | "normal" | "large" | "none";
  testimonial?: TestimonialStoryblok[];
  _uid: string;
  component: "testimonials";
}

export interface TextStoryblok {
  text?: string;
  layout?: "" | "singleColumn" | "multiColumn";
  highlightText?: boolean;
  _uid: string;
  component: "text";
}

export interface TileStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  image_src?: AssetStoryblok;
  image_alt?: string;
  button_toggle?: boolean;
  button_label?: string;
  button_target?: MultilinkStoryblok;
  backgroundColor?: string;
  backgroundImage?: AssetStoryblok;
  _uid: string;
  component: "tile";
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
  _uid: string;
  component: "video-curtain";
}
