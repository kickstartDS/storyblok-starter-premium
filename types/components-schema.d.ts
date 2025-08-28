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
  buttons?: ButtonsStoryblok[];
  image_src?: AssetStoryblok;
  image_padding?: boolean;
  image_alt?: string;
  image_align?: "" | "center" | "top" | "bottom";
  order_mobileImageLast?: boolean;
  order_desktopImageLast?: boolean;
  align?: "" | "center" | "top" | "bottom";
  padding?: boolean;
  _uid: string;
  component: "cta";
}

export interface DividerStoryblok {
  variant?: "" | "default" | "accent";
  _uid: string;
  component: "divider";
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
    | InfoTableStoryblok
    | Tab0Ac6Ad3D02654735976C3Df1Fe7C89CeStoryblok
    | Tab38Fed2E15Ac44B47B57A820Fd0085D63Storyblok
    | Tab3D63188E66D74B0B869D5Fd761C79998Storyblok
    | Tab44814292B74049869C8A7246C85D3E77Storyblok
    | Tab54315Fd97Dc941A0B0Be1B6D01A0F2D8Storyblok
    | Tab6Ce8Cf6E30D447E185DbC24A006845D1Storyblok
    | Tab6Fe93Ea5Fa1D49Fd821CC46427892Fe7Storyblok
    | Tab73A14B85F61C4253Baf71Eea24974AeeStoryblok
    | Tab8Cb1C2334B2C4Fc4987752E9Fc127697Storyblok
    | Tab932F38AbE78C422A85Ec9010C8F041CeStoryblok
    | TabC1Be84Ad19104Ed3B8A10544084D3F8AStoryblok
    | TabDc20B0CcAb3B47DaB5110B2E4F3042EaStoryblok
    | TabE9D1C0732C9B4F8F928A18001A3Ce898Storyblok
    | TabEbf8893F4C2D426DB5E8041616284A12Storyblok
    | TabFbe6A3D010Bf4Bd8Ab9C0720630704EbStoryblok
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
  invertText?: boolean;
  buttons?: ButtonsStoryblok[];
  skipButton?: boolean;
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
  url?: MultilinkStoryblok;
  label?: string;
  active?: boolean;
  _uid: string;
  component: "items";
}

export interface LinksStoryblok {
  label?: string;
  url?: MultilinkStoryblok;
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
  style?: "" | "default" | "framed" | "shine_left" | "shine_right" | "carbon" | "stripe";
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
    | InfoTableStoryblok
    | Tab0Ac6Ad3D02654735976C3Df1Fe7C89CeStoryblok
    | Tab38Fed2E15Ac44B47B57A820Fd0085D63Storyblok
    | Tab3D63188E66D74B0B869D5Fd761C79998Storyblok
    | Tab44814292B74049869C8A7246C85D3E77Storyblok
    | Tab54315Fd97Dc941A0B0Be1B6D01A0F2D8Storyblok
    | Tab6Ce8Cf6E30D447E185DbC24A006845D1Storyblok
    | Tab6Fe93Ea5Fa1D49Fd821CC46427892Fe7Storyblok
    | Tab73A14B85F61C4253Baf71Eea24974AeeStoryblok
    | Tab8Cb1C2334B2C4Fc4987752E9Fc127697Storyblok
    | Tab932F38AbE78C422A85Ec9010C8F041CeStoryblok
    | TabC1Be84Ad19104Ed3B8A10544084D3F8AStoryblok
    | TabDc20B0CcAb3B47DaB5110B2E4F3042EaStoryblok
    | TabE9D1C0732C9B4F8F928A18001A3Ce898Storyblok
    | TabEbf8893F4C2D426DB5E8041616284A12Storyblok
    | TabFbe6A3D010Bf4Bd8Ab9C0720630704EbStoryblok
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

export interface Tab0Ac6Ad3D02654735976C3Df1Fe7C89CeStoryblok {
  "content-nav_tab-0c139084-ec6c-4c25-b2fc-5003d7f660ff"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "content-nav_topic"?: string;
  "content-nav_links"?: LinksStoryblok[];
  "content-nav_initiallyShown"?: string;
  _uid: string;
  component: "tab-0ac6ad3d-0265-4735-976c-3df1fe7c89ce";
}

export interface Tab38Fed2E15Ac44B47B57A820Fd0085D63Storyblok {
  downloads_downloads?: DownloadsStoryblok[];
  _uid: string;
  component: "tab-38fed2e1-5ac4-4b47-b57a-820fd0085d63";
}

export interface Tab3D63188E66D74B0B869D5Fd761C79998Storyblok {
  "split-weighted_verticalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_horizontalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_verticalAlign"?: "" | "top" | "center" | "bottom" | "sticky";
  "split-weighted_tab-879042b0-0b57-4858-936a-9546bf3f0014"?: unknown;
  mainLayout_gutter?: "" | "large" | "default" | "small" | "none";
  mainLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-4b31c2b1-0e6e-4181-8edc-a0544c7c5170"?: unknown;
  asideLayout_gutter?: "" | "large" | "default" | "small" | "none";
  asideLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-69bbef11-8ff9-4069-86af-63edddcb6046"?: unknown;
  order_mobile?: "" | "mainFirst" | "asideFirst";
  order_desktop?: "" | "mainFirst" | "asideFirst";
  "split-weighted_mainComponents"?: never[];
  "split-weighted_asideComponents"?: never[];
  _uid: string;
  component: "tab-3d63188e-66d7-4b0b-869d-5fd761c79998";
}

export interface Tab44814292B74049869C8A7246C85D3E77Storyblok {
  downloads_downloads?: DownloadsStoryblok[];
  _uid: string;
  component: "tab-44814292-b740-4986-9c8a-7246c85d3e77";
}

export interface Tab54315Fd97Dc941A0B0Be1B6D01A0F2D8Storyblok {
  "business-card_centered"?: boolean;
  "business-card_tab-b3ff2f1a-1f2c-4a32-a52f-842782c4de8c"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "business-card_tab-a612560a-e000-48d7-9102-5b9aebd90cae"?: unknown;
  logo_src?: MultilinkStoryblok;
  logo_alt?: string;
  logo_url?: MultilinkStoryblok;
  "business-card_topic"?: string;
  "business-card_address"?: string;
  "business-card_tab-f81a60fc-7ab1-463c-a27e-998dca1aea05"?: unknown;
  avatar_src?: MultilinkStoryblok;
  avatar_alt?: string;
  "business-card_contact"?: ContactStoryblok[];
  "business-card_buttons"?: ButtonsStoryblok[];
  _uid: string;
  component: "tab-54315fd9-7dc9-41a0-b0be-1b6d01a0f2d8";
}

export interface Tab6Ce8Cf6E30D447E185DbC24A006845D1Storyblok {
  "business-card_centered"?: boolean;
  "business-card_tab-382af25f-8c2d-4c16-9d86-a4b667825cff"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "business-card_tab-029b0779-f5cf-4088-9a16-238a1af9042b"?: unknown;
  logo_src?: MultilinkStoryblok;
  logo_alt?: string;
  logo_url?: MultilinkStoryblok;
  "business-card_topic"?: string;
  "business-card_address"?: string;
  "business-card_tab-38397e4e-0a9c-4fd0-a55d-6e04bd75d8cc"?: unknown;
  avatar_src?: MultilinkStoryblok;
  avatar_alt?: string;
  "business-card_contact"?: ContactStoryblok[];
  "business-card_buttons"?: ButtonsStoryblok[];
  _uid: string;
  component: "tab-6ce8cf6e-30d4-47e1-85db-c24a006845d1";
}

export interface Tab6Fe93Ea5Fa1D49Fd821CC46427892Fe7Storyblok {
  "content-nav_tab-27fda899-8781-4794-8984-675c644d949f"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "content-nav_topic"?: string;
  "content-nav_links"?: LinksStoryblok[];
  "content-nav_initiallyShown"?: string;
  _uid: string;
  component: "tab-6fe93ea5-fa1d-49fd-821c-c46427892fe7";
}

export interface Tab73A14B85F61C4253Baf71Eea24974AeeStoryblok {
  "split-even_contentMinWidth"?: "" | "narrow" | "medium" | "wide";
  "split-even_contentGutter"?: "" | "small" | "default" | "large" | "none";
  "split-even_mobileReverse"?: boolean;
  "split-even_verticalAlign"?: "" | "top" | "center" | "bottom" | "sticky";
  "split-even_verticalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-even_horizontalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-even_firstComponents"?: (
    | CtaStoryblok
    | DividerStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeroStoryblok
    | HtmlStoryblok
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
  "split-even_secondComponents"?: never[];
  _uid: string;
  component: "tab-73a14b85-f61c-4253-baf7-1eea24974aee";
}

export interface Tab8Cb1C2334B2C4Fc4987752E9Fc127697Storyblok {
  "business-card_centered"?: boolean;
  "business-card_tab-37515ea8-92d2-4a13-a01f-e35054eee3a2"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "business-card_tab-7fe35810-0739-4609-8f4e-e3458c5d7a15"?: unknown;
  logo_src?: MultilinkStoryblok;
  logo_alt?: string;
  logo_url?: MultilinkStoryblok;
  "business-card_topic"?: string;
  "business-card_address"?: string;
  "business-card_tab-ff1e74ff-977e-477d-b87e-d9202a6bfdec"?: unknown;
  avatar_src?: MultilinkStoryblok;
  avatar_alt?: string;
  "business-card_contact"?: ContactStoryblok[];
  "business-card_buttons"?: ButtonsStoryblok[];
  _uid: string;
  component: "tab-8cb1c233-4b2c-4fc4-9877-52e9fc127697";
}

export interface Tab932F38AbE78C422A85Ec9010C8F041CeStoryblok {
  "split-weighted_verticalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_horizontalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_verticalAlign"?: "" | "top" | "center" | "bottom" | "sticky";
  "split-weighted_tab-f9f2d68c-423d-4421-840a-3ad690e813b0"?: unknown;
  mainLayout_gutter?: "" | "large" | "default" | "small" | "none";
  mainLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-eb472409-be0a-452a-8c22-f5368895eba7"?: unknown;
  asideLayout_gutter?: "" | "large" | "default" | "small" | "none";
  asideLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-67b3ac39-4e1a-4f77-a6eb-f2f43bafc68d"?: unknown;
  order_mobile?: "" | "mainFirst" | "asideFirst";
  order_desktop?: "" | "mainFirst" | "asideFirst";
  "split-weighted_mainComponents"?: never[];
  "split-weighted_asideComponents"?: never[];
  _uid: string;
  component: "tab-932f38ab-e78c-422a-85ec-9010c8f041ce";
}

export interface TabC1Be84Ad19104Ed3B8A10544084D3F8AStoryblok {
  "split-even_contentMinWidth"?: "" | "narrow" | "medium" | "wide";
  "split-even_contentGutter"?: "" | "small" | "default" | "large" | "none";
  "split-even_mobileReverse"?: boolean;
  "split-even_verticalAlign"?: "" | "top" | "center" | "bottom" | "sticky";
  "split-even_verticalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-even_horizontalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-even_firstComponents"?: (
    | CtaStoryblok
    | DividerStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeroStoryblok
    | HtmlStoryblok
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
  "split-even_secondComponents"?: never[];
  _uid: string;
  component: "tab-c1be84ad-1910-4ed3-b8a1-0544084d3f8a";
}

export interface TabDc20B0CcAb3B47DaB5110B2E4F3042EaStoryblok {
  "split-weighted_verticalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_horizontalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_verticalAlign"?: "" | "top" | "center" | "bottom" | "sticky";
  "split-weighted_tab-527c9362-bfe7-4177-9df4-05a0fa136638"?: unknown;
  mainLayout_gutter?: "" | "large" | "default" | "small" | "none";
  mainLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-e118a6ac-fb37-4a6f-8097-e2a4559e5286"?: unknown;
  asideLayout_gutter?: "" | "large" | "default" | "small" | "none";
  asideLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-1ec63341-fa27-4876-89e5-a44a800ece53"?: unknown;
  order_mobile?: "" | "mainFirst" | "asideFirst";
  order_desktop?: "" | "mainFirst" | "asideFirst";
  "split-weighted_mainComponents"?: never[];
  "split-weighted_asideComponents"?: never[];
  _uid: string;
  component: "tab-dc20b0cc-ab3b-47da-b511-0b2e4f3042ea";
}

export interface TabE9D1C0732C9B4F8F928A18001A3Ce898Storyblok {
  "content-nav_tab-b4b769e8-946d-4e4b-8bd6-17868f3bcdf7"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "content-nav_topic"?: string;
  "content-nav_links"?: LinksStoryblok[];
  "content-nav_initiallyShown"?: string;
  _uid: string;
  component: "tab-e9d1c073-2c9b-4f8f-928a-18001a3ce898";
}

export interface TabEbf8893F4C2D426DB5E8041616284A12Storyblok {
  downloads_downloads?: DownloadsStoryblok[];
  _uid: string;
  component: "tab-ebf8893f-4c2d-426d-b5e8-041616284a12";
}

export interface TabFbe6A3D010Bf4Bd8Ab9C0720630704EbStoryblok {
  "split-even_contentMinWidth"?: "" | "narrow" | "medium" | "wide";
  "split-even_contentGutter"?: "" | "small" | "default" | "large" | "none";
  "split-even_mobileReverse"?: boolean;
  "split-even_verticalAlign"?: "" | "top" | "center" | "bottom" | "sticky";
  "split-even_verticalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-even_horizontalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-even_firstComponents"?: (
    | CtaStoryblok
    | DividerStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeroStoryblok
    | HtmlStoryblok
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
  "split-even_secondComponents"?: never[];
  _uid: string;
  component: "tab-fbe6a3d0-10bf-4bd8-ab9c-0720630704eb";
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
