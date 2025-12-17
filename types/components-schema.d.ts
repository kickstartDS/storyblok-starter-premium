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
    | Tab00645F2E2A124E83Afd6Fc4Eb78A0112Storyblok
    | Tab0F7122F858B445DcA63C369Ed5923500Storyblok
    | Tab366219498C64472BB2E379Beb03B8949Storyblok
    | Tab442B864E60C74961B3C4718A9A5Bb93BStoryblok
    | Tab484Cde3498C042Fb8Da6Cba742261419Storyblok
    | Tab5Fc22Ce7Fbd440E4Bd3F16492633181DStoryblok
    | Tab6E2307Cc8Ad04730836A66173770DfdcStoryblok
    | Tab71307823Edce48A59E8F65B5D71Ffe2BStoryblok
    | Tab8785480E8B684EeeB78DB4Fda0F51357Storyblok
    | TabAda97041Cf1544248C882066D9030322Storyblok
    | TabBaf4D4C7D0684Ea9Ae30285591A8E97BStoryblok
    | TabC0A3112C549047A9Aa5EC84Ca5A59065Storyblok
    | TabD20139BaF3Bf4E4295E652832Cd6Bbd1Storyblok
    | TabDb3Facac0Ed04AecBcc152Bc029F930AStoryblok
    | TabE1B4A2D957134647Be2D279175524Cc6Storyblok
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
  content_tileWidth?: "" | "smallest" | "default" | "medium" | "large" | "largest";
  components?: (
    | BlogTeaserStoryblok
    | InfoTableStoryblok
    | Tab00645F2E2A124E83Afd6Fc4Eb78A0112Storyblok
    | Tab0F7122F858B445DcA63C369Ed5923500Storyblok
    | Tab366219498C64472BB2E379Beb03B8949Storyblok
    | Tab442B864E60C74961B3C4718A9A5Bb93BStoryblok
    | Tab484Cde3498C042Fb8Da6Cba742261419Storyblok
    | Tab5Fc22Ce7Fbd440E4Bd3F16492633181DStoryblok
    | Tab6E2307Cc8Ad04730836A66173770DfdcStoryblok
    | Tab71307823Edce48A59E8F65B5D71Ffe2BStoryblok
    | Tab8785480E8B684EeeB78DB4Fda0F51357Storyblok
    | TabAda97041Cf1544248C882066D9030322Storyblok
    | TabBaf4D4C7D0684Ea9Ae30285591A8E97BStoryblok
    | TabC0A3112C549047A9Aa5EC84Ca5A59065Storyblok
    | TabD20139BaF3Bf4E4295E652832Cd6Bbd1Storyblok
    | TabDb3Facac0Ed04AecBcc152Bc029F930AStoryblok
    | TabE1B4A2D957134647Be2D279175524Cc6Storyblok
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

export interface Tab00645F2E2A124E83Afd6Fc4Eb78A0112Storyblok {
  "content-nav_tab-dccce175-dd79-4cb5-902f-b3ace22483b1"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "content-nav_topic"?: string;
  "content-nav_links"?: LinksStoryblok[];
  "content-nav_initiallyShown"?: string;
  _uid: string;
  component: "tab-00645f2e-2a12-4e83-afd6-fc4eb78a0112";
}

export interface Tab0F7122F858B445DcA63C369Ed5923500Storyblok {
  downloads_downloads?: DownloadsStoryblok[];
  _uid: string;
  component: "tab-0f7122f8-58b4-45dc-a63c-369ed5923500";
}

export interface Tab366219498C64472BB2E379Beb03B8949Storyblok {
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
  component: "tab-36621949-8c64-472b-b2e3-79beb03b8949";
}

export interface Tab442B864E60C74961B3C4718A9A5Bb93BStoryblok {
  "business-card_centered"?: boolean;
  "business-card_tab-23404b2f-9933-426c-9589-ec5517973fc8"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "business-card_tab-5d962919-aa78-4b6a-a6b5-b44361717ba6"?: unknown;
  logo_src?: MultilinkStoryblok;
  logo_alt?: string;
  logo_url?: MultilinkStoryblok;
  "business-card_topic"?: string;
  "business-card_address"?: string;
  "business-card_tab-23520523-3181-4930-af6e-fe4248088678"?: unknown;
  avatar_src?: MultilinkStoryblok;
  avatar_alt?: string;
  "business-card_contact"?: ContactStoryblok[];
  "business-card_buttons"?: ButtonsStoryblok[];
  _uid: string;
  component: "tab-442b864e-60c7-4961-b3c4-718a9a5bb93b";
}

export interface Tab484Cde3498C042Fb8Da6Cba742261419Storyblok {
  "business-card_centered"?: boolean;
  "business-card_tab-74512d16-64ed-41d4-b7ca-4fdebe6c8cb6"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "business-card_tab-56b245e2-5f3a-4131-84cf-3745bdb4c3eb"?: unknown;
  logo_src?: MultilinkStoryblok;
  logo_alt?: string;
  logo_url?: MultilinkStoryblok;
  "business-card_topic"?: string;
  "business-card_address"?: string;
  "business-card_tab-937e506c-a692-4ada-b9bd-9e2bbec681b7"?: unknown;
  avatar_src?: MultilinkStoryblok;
  avatar_alt?: string;
  "business-card_contact"?: ContactStoryblok[];
  "business-card_buttons"?: ButtonsStoryblok[];
  _uid: string;
  component: "tab-484cde34-98c0-42fb-8da6-cba742261419";
}

export interface Tab5Fc22Ce7Fbd440E4Bd3F16492633181DStoryblok {
  "split-weighted_verticalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_horizontalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_verticalAlign"?: "" | "top" | "center" | "bottom" | "sticky";
  "split-weighted_tab-de003a3f-5323-4588-b2e2-e5546b5d8996"?: unknown;
  mainLayout_gutter?: "" | "large" | "default" | "small" | "none";
  mainLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-e212304a-07e0-4f7c-847c-109fe9568cf5"?: unknown;
  asideLayout_gutter?: "" | "large" | "default" | "small" | "none";
  asideLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-01323914-d01e-4fe1-a044-6fa35a9050db"?: unknown;
  order_mobile?: "" | "mainFirst" | "asideFirst";
  order_desktop?: "" | "mainFirst" | "asideFirst";
  "split-weighted_mainComponents"?: never[];
  "split-weighted_asideComponents"?: never[];
  _uid: string;
  component: "tab-5fc22ce7-fbd4-40e4-bd3f-16492633181d";
}

export interface Tab6E2307Cc8Ad04730836A66173770DfdcStoryblok {
  "split-weighted_verticalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_horizontalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_verticalAlign"?: "" | "top" | "center" | "bottom" | "sticky";
  "split-weighted_tab-9d46d24a-7339-4e91-848c-36e9c29a4f58"?: unknown;
  mainLayout_gutter?: "" | "large" | "default" | "small" | "none";
  mainLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-948ce8ef-0eb0-4219-bccd-f8cf1053b6fc"?: unknown;
  asideLayout_gutter?: "" | "large" | "default" | "small" | "none";
  asideLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-9df37475-4ac6-4bfe-93d9-964dc4465adb"?: unknown;
  order_mobile?: "" | "mainFirst" | "asideFirst";
  order_desktop?: "" | "mainFirst" | "asideFirst";
  "split-weighted_mainComponents"?: never[];
  "split-weighted_asideComponents"?: never[];
  _uid: string;
  component: "tab-6e2307cc-8ad0-4730-836a-66173770dfdc";
}

export interface Tab71307823Edce48A59E8F65B5D71Ffe2BStoryblok {
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
  component: "tab-71307823-edce-48a5-9e8f-65b5d71ffe2b";
}

export interface Tab8785480E8B684EeeB78DB4Fda0F51357Storyblok {
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
  component: "tab-8785480e-8b68-4eee-b78d-b4fda0f51357";
}

export interface TabAda97041Cf1544248C882066D9030322Storyblok {
  "split-weighted_verticalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_horizontalGutter"?: "" | "large" | "default" | "small" | "none";
  "split-weighted_verticalAlign"?: "" | "top" | "center" | "bottom" | "sticky";
  "split-weighted_tab-fd62554d-00df-4bd9-ba8d-2a3d41044d72"?: unknown;
  mainLayout_gutter?: "" | "large" | "default" | "small" | "none";
  mainLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-478eeb6b-db33-44d5-8ec6-5675a631e540"?: unknown;
  asideLayout_gutter?: "" | "large" | "default" | "small" | "none";
  asideLayout_minWidth?: "" | "narrow" | "default" | "wide";
  "split-weighted_tab-57e54c25-beec-4ce8-813b-82e5bcc3c8dd"?: unknown;
  order_mobile?: "" | "mainFirst" | "asideFirst";
  order_desktop?: "" | "mainFirst" | "asideFirst";
  "split-weighted_mainComponents"?: never[];
  "split-weighted_asideComponents"?: never[];
  _uid: string;
  component: "tab-ada97041-cf15-4424-8c88-2066d9030322";
}

export interface TabBaf4D4C7D0684Ea9Ae30285591A8E97BStoryblok {
  "business-card_centered"?: boolean;
  "business-card_tab-7121e218-fa2a-43db-8dcc-a137504f855d"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "business-card_tab-2bb58724-e42e-48a4-8816-33d85bb3edab"?: unknown;
  logo_src?: MultilinkStoryblok;
  logo_alt?: string;
  logo_url?: MultilinkStoryblok;
  "business-card_topic"?: string;
  "business-card_address"?: string;
  "business-card_tab-f42f5a37-c878-4a1a-b3ce-86db1a220061"?: unknown;
  avatar_src?: MultilinkStoryblok;
  avatar_alt?: string;
  "business-card_contact"?: ContactStoryblok[];
  "business-card_buttons"?: ButtonsStoryblok[];
  _uid: string;
  component: "tab-baf4d4c7-d068-4ea9-ae30-285591a8e97b";
}

export interface TabC0A3112C549047A9Aa5EC84Ca5A59065Storyblok {
  downloads_downloads?: DownloadsStoryblok[];
  _uid: string;
  component: "tab-c0a3112c-5490-47a9-aa5e-c84ca5a59065";
}

export interface TabD20139BaF3Bf4E4295E652832Cd6Bbd1Storyblok {
  downloads_downloads?: DownloadsStoryblok[];
  _uid: string;
  component: "tab-d20139ba-f3bf-4e42-95e6-52832cd6bbd1";
}

export interface TabDb3Facac0Ed04AecBcc152Bc029F930AStoryblok {
  "content-nav_tab-8970f9ac-67e4-4990-8075-da032b4162e4"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "content-nav_topic"?: string;
  "content-nav_links"?: LinksStoryblok[];
  "content-nav_initiallyShown"?: string;
  _uid: string;
  component: "tab-db3facac-0ed0-4aec-bcc1-52bc029f930a";
}

export interface TabE1B4A2D957134647Be2D279175524Cc6Storyblok {
  "content-nav_tab-b901e199-d3fd-449d-99ea-54ccb714e48f"?: unknown;
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  "content-nav_topic"?: string;
  "content-nav_links"?: LinksStoryblok[];
  "content-nav_initiallyShown"?: string;
  _uid: string;
  component: "tab-e1b4a2d9-5713-4647-be2d-279175524cc6";
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
