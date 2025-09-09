import {StoryblokStory} from 'storyblok-generate-ts'

export interface BlogAsideStoryblok {
  author?: BlogAuthorStoryblok[];
  socialSharing?: SocialSharingStoryblok[];
  readingTime?: string;
  date?: string;
  className?: string;
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
  className?: string;
  _uid: string;
  component: "blog-teaser";
}

export interface BusinessCardStoryblok {
  centered?: boolean;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  logo_src?: MultilinkStoryblok;
  logo_alt?: string;
  logo_url?: MultilinkStoryblok;
  topic?: string;
  address?: string;
  avatar_src?: MultilinkStoryblok;
  avatar_alt?: string;
  contact?: ContactStoryblok[];
  buttons?: ButtonsStoryblok[];
  _uid: string;
  component: "business-card";
}

export interface ButtonsStoryblok {
  label?: string;
  url?: MultilinkStoryblok;
  _uid: string;
  component: "buttons";
}

export interface ContactStoryblok {
  label?: string;
  icon?: string;
  url?: MultilinkStoryblok;
  _uid: string;
  component: "contact";
}

export interface ContentNavStoryblok {
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  topic?: string;
  links?: LinksStoryblok[];
  initiallyShown?: string;
  _uid: string;
  component: "content-nav";
}

export interface CtaStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  highlightText?: boolean;
  colorNeutral?: boolean;
  buttons?: ButtonsStoryblok[];
  backgroundColor?: string;
  backgroundImage?: AssetStoryblok;
  image_src?: AssetStoryblok;
  image_padding?: boolean;
  image_alt?: string;
  image_align?: "" | "center" | "top" | "bottom";
  order_mobileImageLast?: boolean;
  order_desktopImageLast?: boolean;
  textAlign?: "" | "left" | "center";
  align?: "" | "center" | "top" | "bottom";
  padding?: boolean;
  _uid: string;
  component: "cta";
}

export interface DividerStoryblok {
  variant?: "" | "default" | "accent";
  className?: string;
  component: "divider";
  _uid: string;
}

export interface DownloadsStoryblok {
  name?: string;
  description?: string;
  previewImage?: MultilinkStoryblok;
  url?: MultilinkStoryblok;
  size?: string;
  format?: string;
  _uid: string;
  component: "downloads";
}

export interface EventLatestTeaserStoryblok {
  date?: string;
  calendar_month?: string;
  calendar_day?: string;
  title?: string;
  location?: string;
  url?: MultilinkStoryblok;
  cta?: string;
  ariaLabel?: string;
  className?: string;
  _uid: string;
  component: "event-latest-teaser";
}

export interface EventListTeaserStoryblok {
  category?: string;
  title?: string;
  text?: string;
  date?: string;
  time?: string;
  location_name?: string;
  location_address?: string;
  tags?: TagsStoryblok[];
  image_src?: AssetStoryblok;
  image_alt?: string;
  url?: MultilinkStoryblok;
  ctaText?: string;
  ariaLabel?: string;
  className?: string;
  _uid: string;
  component: "event-list-teaser";
}

export interface FaqStoryblok {
  questions?: QuestionsStoryblok[];
  _uid: string;
  component: "faq";
}

export interface FeatureStoryblok {
  title?: string;
  text?: string;
  cta_url?: MultilinkStoryblok;
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
  inverted?: boolean;
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

export interface HeaderStoryblok {
  logo_src?: AssetStoryblok;
  logo_srcInverted?: AssetStoryblok;
  logo_alt?: string;
  logo_homepageHref?: MultilinkStoryblok;
  logo_width?: string;
  logo_height?: string;
  flyoutInverted?: boolean;
  dropdownInverted?: boolean;
  floating?: boolean;
  inverted?: boolean;
  navItems?: NavItemsStoryblok[];
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
  invertText?: boolean;
  buttons?: ButtonsStoryblok[];
  skipButton?: boolean;
  overlay?: boolean;
  image_srcMobile?: AssetStoryblok;
  image_srcTablet?: AssetStoryblok;
  image_srcDesktop?: AssetStoryblok;
  image_src?: AssetStoryblok;
  image_indent?: "" | "none" | "left" | "right";
  image_alt?: string;
  textPosition?: "" | "center" | "below" | "offset" | "left" | "right" | "corner" | "bottom";
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
  inverted?: boolean;
  className?: string;
  component: "html";
  _uid: string;
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
  largeHeadline?: boolean;
  sub?: string;
  text?: string;
  layout?: "" | "textLeft" | "imageLeft";
  padding?: boolean;
  buttons?: ButtonsStoryblok[];
  image_src?: AssetStoryblok;
  image_aspectRatio?: "" | "unset" | "square" | "wide" | "landscape";
  image_alt?: string;
  image_vAlign?: "" | "center" | "top" | "bottom";
  textAlign?: "" | "left" | "center";
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
  url?: MultilinkStoryblok;
  label?: string;
  active?: boolean;
  _uid: string;
  component: "items";
}

export interface LinksStoryblok {
  label?: string;
  url?: MultilinkStoryblok;
  newTab?: boolean;
  ariaLabel?: string;
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
  align?: "" | "left" | "center";
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
  url?: MultilinkStoryblok;
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
  style?: "" | "default" | "framed" | "deko";
  backgroundColor?: "" | "default" | "accent" | "bold";
  transition?: "" | "none" | "to_default" | "to_accent" | "to_bold" | "to_inverted";
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
  content_tileWidth?: "" | "smallest" | "default" | "medium" | "large" | "largest" | "full";
  components?: (
    | CtaStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeroStoryblok
    | ImageTextStoryblok
    | InfoTableStoryblok
    | LogosStoryblok
    | SplitEvenStoryblok
    | SplitWeightedStoryblok
    | StatsStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
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
  cardImage?: AssetStoryblok;
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
  gap?: string;
  arrows?: boolean;
  variant?: "" | "slider" | "carousel";
  className?: string;
  components?: (
    | CtaStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeroStoryblok
    | ImageTextStoryblok
    | InfoTableStoryblok
    | LogosStoryblok
    | SplitEvenStoryblok
    | SplitWeightedStoryblok
    | StatsStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
  )[];
  _uid: string;
  component: "slider";
}

export interface SocialSharingStoryblok {
  url?: MultilinkStoryblok;
  title?: string;
  _uid: string;
  component: "socialSharing";
}

export interface SplitEvenStoryblok {
  contentMinWidth?: "" | "narrow" | "medium" | "wide";
  contentGutter?: "" | "small" | "default" | "large" | "none";
  mobileReverse?: boolean;
  verticalAlign?: "" | "top" | "center" | "bottom" | "sticky";
  verticalGutter?: "" | "large" | "default" | "small" | "none";
  horizontalGutter?: "" | "large" | "default" | "small" | "none";
  firstComponents?: (
    | BlogTeaserStoryblok
    | BusinessCardStoryblok
    | ContentNavStoryblok
    | DividerStoryblok
    | EventLatestTeaserStoryblok
    | EventListTeaserStoryblok
    | FaqStoryblok
    | HtmlStoryblok
    | ImageStoryStoryblok
    | MosaicStoryblok
    | SliderStoryblok
    | VideoCurtainStoryblok
  )[];
  secondComponents?: never[];
  _uid: string;
  component: "split-even";
}

export interface SplitWeightedStoryblok {
  verticalGutter?: "" | "large" | "default" | "small" | "none";
  horizontalGutter?: "" | "large" | "default" | "small" | "none";
  verticalAlign?: "" | "top" | "center" | "bottom" | "sticky";
  mainLayout_gutter?: "" | "large" | "default" | "small" | "none";
  mainLayout_minWidth?: "" | "narrow" | "default" | "wide";
  asideLayout_gutter?: "" | "large" | "default" | "small" | "none";
  asideLayout_minWidth?: "" | "narrow" | "default" | "wide";
  order_mobile?: "" | "mainFirst" | "asideFirst";
  order_desktop?: "" | "mainFirst" | "asideFirst";
  mainComponents?: never[];
  asideComponents?: never[];
  _uid: string;
  component: "split-weighted";
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
  centered?: boolean;
  url?: MultilinkStoryblok;
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
  align?: "" | "left" | "center";
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
  button_url?: MultilinkStoryblok;
  backgroundColor?: string;
  backgroundImage?: AssetStoryblok;
  textColor?: string;
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
  textPosition?: "" | "center" | "bottom" | "left" | "right" | "corner";
  _uid: string;
  component: "video-curtain";
}
