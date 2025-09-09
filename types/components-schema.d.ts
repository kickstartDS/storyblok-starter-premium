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

export interface GlobalStoryblok {
  global?: (
    | BlogTeaserStoryblok
    | CtaStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeroStoryblok
    | ImageTextStoryblok
    | InfoTableStoryblok
    | LogosStoryblok
    | StatsStoryblok
    | Tab0419568E0Cef41Ee8F444Fa8Dcd07AbeStoryblok
    | Tab0Fabbfd5855D455CAf443Dae4D049E00Storyblok
    | Tab2Da934C7Dc80493798BdF6F027D1E754Storyblok
    | Tab34Ad22E9E5B540Fe9A1A8Bea6Af2Dd3BStoryblok
    | Tab52375E2270D14758A709D5217Deb1217Storyblok
    | Tab851554B8A5454Bc4BeedA9757Bd6Dfe6Storyblok
    | Tab881F480CCb594C01B5B0C519397A97B6Storyblok
    | Tab8E79Be0326A44Bee9Ca000270D1A3Ff5Storyblok
    | Tab9Bf4B63EB55843BbA569692009824748Storyblok
    | TabA743Dd757Dbb48CdBbc619F1Ffe919B4Storyblok
    | TabAa3C2D453D1E45C0Bff0Ccafc64Ac8F8Storyblok
    | TabBb3A8847F6794Ab497D6A4711B483710Storyblok
    | TabDad4608EF30246Ce97129Abe51133136Storyblok
    | TabE03Fa97BE4E24235Aba0D2545952C84EStoryblok
    | TabF9459612C9Cf4E5F860A8F88Cd8EdbdbStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
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
    | BlogTeaserStoryblok
    | CtaStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeroStoryblok
    | ImageTextStoryblok
    | InfoTableStoryblok
    | LogosStoryblok
    | StatsStoryblok
    | Tab0419568E0Cef41Ee8F444Fa8Dcd07AbeStoryblok
    | Tab0Fabbfd5855D455CAf443Dae4D049E00Storyblok
    | Tab2Da934C7Dc80493798BdF6F027D1E754Storyblok
    | Tab34Ad22E9E5B540Fe9A1A8Bea6Af2Dd3BStoryblok
    | Tab52375E2270D14758A709D5217Deb1217Storyblok
    | Tab851554B8A5454Bc4BeedA9757Bd6Dfe6Storyblok
    | Tab881F480CCb594C01B5B0C519397A97B6Storyblok
    | Tab8E79Be0326A44Bee9Ca000270D1A3Ff5Storyblok
    | Tab9Bf4B63EB55843BbA569692009824748Storyblok
    | TabA743Dd757Dbb48CdBbc619F1Ffe919B4Storyblok
    | TabAa3C2D453D1E45C0Bff0Ccafc64Ac8F8Storyblok
    | TabBb3A8847F6794Ab497D6A4711B483710Storyblok
    | TabDad4608EF30246Ce97129Abe51133136Storyblok
    | TabE03Fa97BE4E24235Aba0D2545952C84EStoryblok
    | TabF9459612C9Cf4E5F860A8F88Cd8EdbdbStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
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
    | BlogTeaserStoryblok
    | CtaStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeroStoryblok
    | ImageTextStoryblok
    | InfoTableStoryblok
    | LogosStoryblok
    | StatsStoryblok
    | Tab0419568E0Cef41Ee8F444Fa8Dcd07AbeStoryblok
    | Tab0Fabbfd5855D455CAf443Dae4D049E00Storyblok
    | Tab2Da934C7Dc80493798BdF6F027D1E754Storyblok
    | Tab34Ad22E9E5B540Fe9A1A8Bea6Af2Dd3BStoryblok
    | Tab52375E2270D14758A709D5217Deb1217Storyblok
    | Tab851554B8A5454Bc4BeedA9757Bd6Dfe6Storyblok
    | Tab881F480CCb594C01B5B0C519397A97B6Storyblok
    | Tab8E79Be0326A44Bee9Ca000270D1A3Ff5Storyblok
    | Tab9Bf4B63EB55843BbA569692009824748Storyblok
    | TabA743Dd757Dbb48CdBbc619F1Ffe919B4Storyblok
    | TabAa3C2D453D1E45C0Bff0Ccafc64Ac8F8Storyblok
    | TabBb3A8847F6794Ab497D6A4711B483710Storyblok
    | TabDad4608EF30246Ce97129Abe51133136Storyblok
    | TabE03Fa97BE4E24235Aba0D2545952C84EStoryblok
    | TabF9459612C9Cf4E5F860A8F88Cd8EdbdbStoryblok
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

export interface Tab0419568E0Cef41Ee8F444Fa8Dcd07AbeStoryblok {
  "split-weighted_verticalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_horizontalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_verticalAlign"?: "" | "top" | "center" | "bottom" | "sticky";
  "split-weighted_tab-50156ff2-e092-45b2-9e07-90cf02b6fab0"?: unknown;
  mainLayout_gutter?: "" | "large" | "default" | "small" | "none";
  mainLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-3852b674-6b3e-428a-a9a2-c4f3ae9c2e89"?: unknown;
  asideLayout_gutter?: "" | "large" | "default" | "small" | "none";
  asideLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-4b0c2626-1c1a-4abf-9219-9dfcd58972ab"?: unknown;
  order_mobile?: "" | "mainFirst" | "asideFirst";
  order_desktop?: "" | "mainFirst" | "asideFirst";
  "split-weighted_mainComponents"?: never[];
  "split-weighted_asideComponents"?: never[];
  _uid: string;
  component: "tab-0419568e-0cef-41ee-8f44-4fa8dcd07abe";
}

export interface Tab0Fabbfd5855D455CAf443Dae4D049E00Storyblok {
  "business-card_centered"?: boolean;
  "business-card_tab-ae50f90f-b023-4c1e-9f0e-d8ba6ce76f48"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "business-card_tab-39245ba6-651a-41e0-aa80-25bb8f45b29e"?: unknown;
  logo_src?: MultilinkStoryblok;
  logo_alt?: string;
  logo_url?: MultilinkStoryblok;
  "business-card_topic"?: string;
  "business-card_address"?: string;
  "business-card_tab-23a7917b-e598-42d0-8863-fde41f3d504f"?: unknown;
  avatar_src?: MultilinkStoryblok;
  avatar_alt?: string;
  "business-card_contact"?: ContactStoryblok[];
  "business-card_buttons"?: ButtonsStoryblok[];
  _uid: string;
  component: "tab-0fabbfd5-855d-455c-af44-3dae4d049e00";
}

export interface Tab2Da934C7Dc80493798BdF6F027D1E754Storyblok {
  "business-card_centered"?: boolean;
  "business-card_tab-b2704f42-1d1c-4f78-9a6f-3358d72ca655"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "business-card_tab-f0cf92be-9fa4-4b70-8825-c0ff38e1df8e"?: unknown;
  logo_src?: MultilinkStoryblok;
  logo_alt?: string;
  logo_url?: MultilinkStoryblok;
  "business-card_topic"?: string;
  "business-card_address"?: string;
  "business-card_tab-3f3d00bc-f5e8-4e22-a1a6-4bc54023a169"?: unknown;
  avatar_src?: MultilinkStoryblok;
  avatar_alt?: string;
  "business-card_contact"?: ContactStoryblok[];
  "business-card_buttons"?: ButtonsStoryblok[];
  _uid: string;
  component: "tab-2da934c7-dc80-4937-98bd-f6f027d1e754";
}

export interface Tab34Ad22E9E5B540Fe9A1A8Bea6Af2Dd3BStoryblok {
  downloads_downloads?: DownloadsStoryblok[];
  _uid: string;
  component: "tab-34ad22e9-e5b5-40fe-9a1a-8bea6af2dd3b";
}

export interface Tab52375E2270D14758A709D5217Deb1217Storyblok {
  "split-weighted_verticalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_horizontalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_verticalAlign"?: "" | "top" | "center" | "bottom" | "sticky";
  "split-weighted_tab-bb68e12b-79d4-4841-bde8-fcf9ee3d428b"?: unknown;
  mainLayout_gutter?: "" | "large" | "default" | "small" | "none";
  mainLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-4953bfab-c970-4554-914d-8d2c7acf62c6"?: unknown;
  asideLayout_gutter?: "" | "large" | "default" | "small" | "none";
  asideLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-1f6cf9ed-c104-43ab-a13f-1f0b477dbf51"?: unknown;
  order_mobile?: "" | "mainFirst" | "asideFirst";
  order_desktop?: "" | "mainFirst" | "asideFirst";
  "split-weighted_mainComponents"?: never[];
  "split-weighted_asideComponents"?: never[];
  _uid: string;
  component: "tab-52375e22-70d1-4758-a709-d5217deb1217";
}

export interface Tab851554B8A5454Bc4BeedA9757Bd6Dfe6Storyblok {
  "content-nav_tab-84a6335f-04af-42aa-a4e4-0b20866e5353"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "content-nav_topic"?: string;
  "content-nav_links"?: LinksStoryblok[];
  "content-nav_initiallyShown"?: string;
  _uid: string;
  component: "tab-851554b8-a545-4bc4-beed-a9757bd6dfe6";
}

export interface Tab881F480CCb594C01B5B0C519397A97B6Storyblok {
  downloads_downloads?: DownloadsStoryblok[];
  _uid: string;
  component: "tab-881f480c-cb59-4c01-b5b0-c519397a97b6";
}

export interface Tab8E79Be0326A44Bee9Ca000270D1A3Ff5Storyblok {
  "split-weighted_verticalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_horizontalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_verticalAlign"?: "" | "top" | "center" | "bottom" | "sticky";
  "split-weighted_tab-c4c62fd9-47e5-481e-a6f8-4d52a892d606"?: unknown;
  mainLayout_gutter?: "" | "large" | "default" | "small" | "none";
  mainLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-7f1b7070-66d7-4c8d-b926-9e6a65798501"?: unknown;
  asideLayout_gutter?: "" | "large" | "default" | "small" | "none";
  asideLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-29c05e0e-dd75-4c0f-b5c7-af5af56957fd"?: unknown;
  order_mobile?: "" | "mainFirst" | "asideFirst";
  order_desktop?: "" | "mainFirst" | "asideFirst";
  "split-weighted_mainComponents"?: never[];
  "split-weighted_asideComponents"?: never[];
  _uid: string;
  component: "tab-8e79be03-26a4-4bee-9ca0-00270d1a3ff5";
}

export interface Tab9Bf4B63EB55843BbA569692009824748Storyblok {
  downloads_downloads?: DownloadsStoryblok[];
  _uid: string;
  component: "tab-9bf4b63e-b558-43bb-a569-692009824748";
}

export interface TabA743Dd757Dbb48CdBbc619F1Ffe919B4Storyblok {
  "business-card_centered"?: boolean;
  "business-card_tab-c12a6e5f-e078-4ad2-8235-63b3b39cee62"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "business-card_tab-82478e83-0909-4f3f-b222-baa5da795f46"?: unknown;
  logo_src?: MultilinkStoryblok;
  logo_alt?: string;
  logo_url?: MultilinkStoryblok;
  "business-card_topic"?: string;
  "business-card_address"?: string;
  "business-card_tab-0b17be40-cd35-4208-82d5-5043ab612db2"?: unknown;
  avatar_src?: MultilinkStoryblok;
  avatar_alt?: string;
  "business-card_contact"?: ContactStoryblok[];
  "business-card_buttons"?: ButtonsStoryblok[];
  _uid: string;
  component: "tab-a743dd75-7dbb-48cd-bbc6-19f1ffe919b4";
}

export interface TabAa3C2D453D1E45C0Bff0Ccafc64Ac8F8Storyblok {
  "content-nav_tab-0e7fdadf-763a-4ce7-8ead-e4bc8cbc1ba1"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "content-nav_topic"?: string;
  "content-nav_links"?: LinksStoryblok[];
  "content-nav_initiallyShown"?: string;
  _uid: string;
  component: "tab-aa3c2d45-3d1e-45c0-bff0-ccafc64ac8f8";
}

export interface TabBb3A8847F6794Ab497D6A4711B483710Storyblok {
  "split-even_contentMinWidth"?: "" | "narrow" | "medium" | "wide";
  "split-even_contentGutter"?: "" | "small" | "default" | "large" | "none";
  "split-even_mobileReverse"?: boolean;
  "split-even_verticalAlign"?: "" | "top" | "center" | "bottom" | "sticky";
  "split-even_verticalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-even_horizontalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-even_firstComponents"?: (
    | DividerStoryblok
    | FaqStoryblok
    | HtmlStoryblok
    | ImageStoryStoryblok
    | MosaicStoryblok
    | SliderStoryblok
    | VideoCurtainStoryblok
  )[];
  "split-even_secondComponents"?: never[];
  _uid: string;
  component: "tab-bb3a8847-f679-4ab4-97d6-a4711b483710";
}

export interface TabDad4608EF30246Ce97129Abe51133136Storyblok {
  "content-nav_tab-e69bdf12-92c0-4616-a8e5-33a01f7f1e36"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "content-nav_topic"?: string;
  "content-nav_links"?: LinksStoryblok[];
  "content-nav_initiallyShown"?: string;
  _uid: string;
  component: "tab-dad4608e-f302-46ce-9712-9abe51133136";
}

export interface TabE03Fa97BE4E24235Aba0D2545952C84EStoryblok {
  "split-even_contentMinWidth"?: "" | "narrow" | "medium" | "wide";
  "split-even_contentGutter"?: "" | "small" | "default" | "large" | "none";
  "split-even_mobileReverse"?: boolean;
  "split-even_verticalAlign"?: "" | "top" | "center" | "bottom" | "sticky";
  "split-even_verticalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-even_horizontalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-even_firstComponents"?: (
    | DividerStoryblok
    | FaqStoryblok
    | HtmlStoryblok
    | ImageStoryStoryblok
    | MosaicStoryblok
    | SliderStoryblok
    | VideoCurtainStoryblok
  )[];
  "split-even_secondComponents"?: never[];
  _uid: string;
  component: "tab-e03fa97b-e4e2-4235-aba0-d2545952c84e";
}

export interface TabF9459612C9Cf4E5F860A8F88Cd8EdbdbStoryblok {
  "split-even_contentMinWidth"?: "" | "narrow" | "medium" | "wide";
  "split-even_contentGutter"?: "" | "small" | "default" | "large" | "none";
  "split-even_mobileReverse"?: boolean;
  "split-even_verticalAlign"?: "" | "top" | "center" | "bottom" | "sticky";
  "split-even_verticalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-even_horizontalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-even_firstComponents"?: (
    | DividerStoryblok
    | FaqStoryblok
    | HtmlStoryblok
    | ImageStoryStoryblok
    | MosaicStoryblok
    | SliderStoryblok
    | VideoCurtainStoryblok
  )[];
  "split-even_secondComponents"?: never[];
  _uid: string;
  component: "tab-f9459612-c9cf-4e5f-860a-8f88cd8edbdb";
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
