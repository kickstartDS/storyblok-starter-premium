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
  id: number | null;
  alt: string | null;
  name: string;
  focus: string | null;
  source: string | null;
  title: string | null;
  filename: string;
  copyright: string | null;
  fieldtype?: string;
  meta_data?: null | {};
  is_external_url?: boolean;
}

export interface BlogAuthorStoryblok {
  name?: string;
  byline?: string;
  image_src?: AssetStoryblok;
  image_alt?: string;
  image_fullWidth: boolean;
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
  centered: boolean;
  image_src?: AssetStoryblok;
  image_alt?: string;
  logo_src?: AssetStoryblok;
  logo_alt?: string;
  logo_url?: MultilinkStoryblok;
  topic?: string;
  address?: string;
  avatar_src?: AssetStoryblok;
  avatar_alt?: string;
  contactLinks?: ContactLinksStoryblok[];
  buttons?: ButtonsStoryblok[];
  _uid: string;
  component: "business-card";
}

export interface ButtonStoryblok {
  label?: string;
  url?: MultilinkStoryblok;
  variant?: "" | "primary" | "secondary" | "tertiary";
  size?: "" | "small" | "medium" | "large";
  disabled: boolean;
  type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "button";
}

export interface ButtonsStoryblok {
  label?: string;
  url?: MultilinkStoryblok;
  _uid: string;
  component: "buttons";
}

export interface CategoriesStoryblok {
  label?: string;
  _uid: string;
  component: "categories";
}

export interface CategoryCheckboxesStoryblok {
  entry?: string;
  _uid: string;
  component: "categoryCheckboxes";
}

export interface ComponentTypesStoryblok {
  entry?: string;
  _uid: string;
  component: "componentTypes";
}

export interface ContactStoryblok {
  image_src?: AssetStoryblok;
  image_alt?: string;
  image_fullWidth: boolean;
  image_aspectRatio?: "" | "wide" | "square" | "vertical";
  title?: string;
  subtitle?: string;
  links?: LinksStoryblok[];
  copy?: string;
  className?: string;
  component: "contact";
  _uid: string;
}

export interface ContactLinksStoryblok {
  label?: string;
  url?: MultilinkStoryblok;
  _uid: string;
  component: "contactLinks";
}

export interface ContentNavStoryblok {
  image_src?: AssetStoryblok;
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
  highlightText: boolean;
  colorNeutral: boolean;
  inverted: boolean;
  buttons?: ButtonStoryblok[];
  backgroundColor?: string;
  backgroundImage?: AssetStoryblok;
  image_src?: AssetStoryblok;
  image_padding: boolean;
  image_alt?: string;
  image_align?: "" | "center" | "top" | "bottom";
  order_mobileImageLast: boolean;
  order_desktopImageLast: boolean;
  textAlign?: "" | "left" | "center";
  align?: "" | "center" | "top" | "bottom";
  padding: boolean;
  _uid: string;
  component: "cta";
}

export interface DatesStoryblok {
  date?: string;
  time?: string;
  label?: string;
  url?: MultilinkStoryblok;
  newTab: boolean;
  ariaLabel?: string;
  _uid: string;
  component: "dates";
}

export interface DividerStoryblok {
  variant?: "" | "default" | "accent";
  className?: string;
  component: "divider";
  _uid: string;
}

export interface DownloadStoryblok {
  name?: string;
  description?: string;
  previewImage?: AssetStoryblok;
  url?: MultilinkStoryblok;
  size?: string;
  format?: string;
  _uid: string;
  component: "download";
}

export interface DownloadsStoryblok {
  download?: DownloadStoryblok[];
  _uid: string;
  component: "downloads";
}

export interface EventDetailStoryblok {
  title?: string;
  categories?: CategoriesStoryblok[];
  intro?: string;
  locations?: LocationsStoryblok[];
  download?: DownloadStoryblok[];
  description?: string;
  images?: ImagesStoryblok[];
  button_label?: string;
  button_url?: MultilinkStoryblok;
  _uid: string;
  component: "event-detail";
}

export interface EventFilterStoryblok {
  datePicker_title?: string;
  "datePicker_tab-50087a9b-6f30-4629-87da-47e23b84c095"?: unknown;
  "datePicker_tab-29f0b886-746f-440e-8de7-607c7bd9b89c"?: unknown;
  "datePicker_tab-ee3c01e0-0f51-40de-8183-cf0874db91fc"?: unknown;
  "datePicker_tab-321060e6-529c-4634-ae06-ce8739f0fcbd"?: unknown;
  "datePicker_tab-364a7dc2-4cf2-4383-8885-c0d75e483d40"?: unknown;
  "datePicker_tab-38bd8b45-1316-4b40-a70e-3291e915d4df"?: unknown;
  "datePicker_tab-88d918e9-a7c7-414d-82e5-6b00d4c4b1fd"?: unknown;
  "datePicker_tab-dd4133f1-3e7b-4825-8f36-d9a363e2901a"?: unknown;
  "datePicker_tab-0c1c1bd2-1359-48e5-873e-010dba14cfa7"?: unknown;
  "datePicker_tab-34d8e4f1-fd69-4c71-b06d-3eacaf43721b"?: unknown;
  "datePicker_tab-515c7a2f-86fd-43dc-bc5d-914c9cedeae8"?: unknown;
  "datePicker_tab-35ee8cd4-67cb-4d7c-a4ef-67062d4991fd"?: unknown;
  "datePicker_tab-50f712c3-1c71-4527-bd93-14f9723a44a6"?: unknown;
  "datePicker_tab-6ff9d1ca-40ec-4996-8354-5ab1adf84df0"?: unknown;
  "datePicker_tab-0b24e9b5-7cfd-4a11-9754-ad167753b70d"?: unknown;
  "datePicker_tab-457cf842-f1d9-4ab0-9680-d1bdf3c41402"?: unknown;
  "datePicker_tab-f8f7aff7-14bf-4e84-b30f-21872646d1b4"?: unknown;
  "datePicker_tab-5648e397-e963-4137-a963-b4ad1bfe81a1"?: unknown;
  "datePicker_tab-6f08c3f9-ca3a-4823-9b0e-baa23f4618ee"?: unknown;
  "datePicker_tab-64549e29-53e7-41db-b7f5-163043e09e7c"?: unknown;
  "datePicker_tab-c8e41d9a-332a-4252-b9c2-1b92a8de548d"?: unknown;
  "datePicker_tab-e28d6adf-c7dd-424a-b2d6-130ee7f06427"?: unknown;
  "datePicker_tab-91ab33c8-a983-4bf8-b364-9fe8d4acebaa"?: unknown;
  "datePicker_tab-18053c58-3fc7-4261-b636-711f7766decb"?: unknown;
  datePicker_toggle: boolean;
  categories_title?: string;
  categories_categoryCheckboxes?: CategoryCheckboxesStoryblok[];
  categories_toggle: boolean;
  applyButton_label?: string;
  applyButton_onClick?: string;
  resetButton_label?: string;
  resetButton_onClick?: string;
  _uid: string;
  component: "event-filter";
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

export interface EventListStoryblok {
  filter?: EventFilterStoryblok[];
  events?: EventListTeaserStoryblok[];
  _uid: string;
  component: "event-list";
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
  cta_toggle: boolean;
  _uid: string;
  component: "feature";
}

export interface FeaturesStoryblok {
  layout?: "" | "largeTiles" | "smallTiles" | "list";
  style?: "" | "intext" | "stack" | "centered" | "besideLarge" | "besideSmall";
  ctas_toggle: boolean;
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
  badge_src?: AssetStoryblok;
  badge_alt?: string;
  inverted: boolean;
  navGroups?: NavGroupsStoryblok[];
  copyright?: string;
  legalLink_label?: string;
  legalLink_url?: MultilinkStoryblok;
  socialLinks?: SocialLinksStoryblok[];
  _uid: string;
  component: "footer";
}

export interface GalleryStoryblok {
  images?: ImagesStoryblok[];
  layout?: "" | "stack" | "smallTiles" | "largeTiles" | "slider";
  aspectRatio?: "" | "unset" | "square" | "wide" | "landscape";
  lightbox: boolean;
  _uid: string;
  component: "gallery";
}

export interface GlobalStoryblok {
  global?: (
    | BlogTeaserStoryblok
    | BusinessCardStoryblok
    | ContactStoryblok
    | ContentNavStoryblok
    | CtaStoryblok
    | DividerStoryblok
    | DownloadsStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeadlineStoryblok
    | HeroStoryblok
    | HtmlStoryblok
    | ImageStoryStoryblok
    | ImageTextStoryblok
    | InfoTableStoryblok
    | LogosStoryblok
    | MosaicStoryblok
    | SliderStoryblok
    | SplitEvenStoryblok
    | SplitWeightedStoryblok
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
  flyoutInverted: boolean;
  dropdownInverted: boolean;
  floating: boolean;
  inverted: boolean;
  navItems?: NavItemsStoryblok[];
  _uid: string;
  component: "header";
}

export interface HeadlineStoryblok {
  text?: string;
  sub?: string;
  switchOrder: boolean;
  align?: "" | "left" | "center" | "right";
  level?: "" | "h1" | "h2" | "h3" | "h4" | "p";
  style?: "" | "h1" | "h2" | "h3" | "h4" | "p";
  spaceAfter?: "" | "minimum" | "small" | "large";
  className?: string;
  id?: string;
  _uid: string;
  component: "headline";
}

export interface HeroStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  highlightText: boolean;
  colorNeutral: boolean;
  height?: "" | "small" | "default" | "fullImage" | "fullScreen";
  textbox: boolean;
  mobileTextBelow: boolean;
  invertText: boolean;
  buttons?: ButtonStoryblok[];
  skipButton: boolean;
  overlay: boolean;
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
  consent: boolean;
  consentText?: string;
  consentButtonLabel?: string;
  consentBackgroundImage?: AssetStoryblok;
  consentAspectRatio?: "" | "VALUE_16_9" | "VALUE_16_10" | "VALUE_4_3" | "VALUE_1_1";
  inverted: boolean;
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
  largeHeadline: boolean;
  sub?: string;
  text?: string;
  layout?: "" | "textLeft" | "imageLeft";
  padding: boolean;
  buttons?: ButtonStoryblok[];
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
  highlightText: boolean;
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
  active: boolean;
  _uid: string;
  component: "items";
}

export interface LinksStoryblok {
  label?: string;
  url?: MultilinkStoryblok;
  newTab: boolean;
  ariaLabel?: string;
  _uid: string;
  component: "links";
}

export interface LocationsStoryblok {
  dates?: DatesStoryblok[];
  locationName?: string;
  displayMode?: "" | "spacious" | "compact";
  address?: string;
  links?: LinksStoryblok[];
  _uid: string;
  component: "locations";
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
  cta_toggle: boolean;
  cta_text?: string;
  cta_link?: MultilinkStoryblok;
  cta_label?: string;
  cta_style?: "" | "button" | "text";
  _uid: string;
  component: "logos";
}

export interface MatchesStoryblok {
  title?: string;
  snippet?: string;
  url?: string;
  _uid: string;
  component: "matches";
}

export interface MosaicStoryblok {
  layout?: "" | "alternate" | "textLeft" | "textRight";
  largeHeadlines: boolean;
  tile?: TileStoryblok[];
  _uid: string;
  component: "mosaic";
}

export interface NavGroupsStoryblok {
  heading?: string;
  headingUrl?: MultilinkStoryblok;
  items?: ItemsStoryblok[];
  _uid: string;
  component: "navGroups";
}

export interface NavItemsStoryblok {
  url?: MultilinkStoryblok;
  label?: string;
  active: boolean;
  items?: ItemsStoryblok[];
  _uid: string;
  component: "navItems";
}

export interface PageStoryblok {
  section?: SectionStoryblok[];
  header_floating: boolean;
  header_inverted: boolean;
  header_logo?: AssetStoryblok;
  footer_inverted: boolean;
  footer_logo?: AssetStoryblok;
  token?: string;
  hidePageBreadcrumbs: boolean;
  seo?: SeoStoryblok[];
  theme?: string;
  hideBookDemoButton: boolean;
  _uid: string;
  component: "page";
  uuid?: string;
}

export interface PrompterStoryblok {
  mode?: "" | "section" | "page";
  componentTypes?: ComponentTypesStoryblok[];
  sections?: string;
  includeStory: boolean;
  useIdea: boolean;
  relatedStories?: RelatedStoriesStoryblok[];
  userPrompt?: string;
  systemPrompt?: string;
  contentType?: "" | "page" | "blog_post" | "blog_overview";
  startsWith?: string;
  uploadAssets: boolean;
  _uid: string;
  component: "prompter";
}

export interface QuestionsStoryblok {
  question?: string;
  answer?: string;
  _uid: string;
  component: "questions";
}

export interface RelatedStoriesStoryblok {
  entry?: string;
  _uid: string;
  component: "relatedStories";
}

export interface SearchStoryblok {
  headline?: HeadlineStoryblok[];
  searchBar?: SearchBarStoryblok[];
  searchFilter?: SearchFilterStoryblok[];
  searchResults?: SearchResultsStoryblok[];
  _uid: string;
  component: "search";
}

export interface SearchBarStoryblok {
  placeholder?: string;
  buttonText?: string;
  hint?: string;
  alternativeText?: string;
  alternativeResult?: string;
  _uid: string;
  component: "search-bar";
}

export interface SearchFilterStoryblok {
  title?: string;
  categories?: CategoriesStoryblok[];
  _uid: string;
  component: "search-filter";
}

export interface SearchResultsStoryblok {
  url?: string;
  title?: string;
  imageColSize?: "" | "none" | "small" | "large";
  previewImage?: string;
  initialMatch?: string;
  matches?: MatchesStoryblok[];
  showLink: boolean;
  _uid: string;
  component: "searchResults";
}

export interface SectionStoryblok {
  width?: "" | "full" | "max" | "wide" | "default" | "narrow";
  style?:
    | ""
    | "default"
    | "framed"
    | "deko"
    | "colorful"
    | "stagelights"
    | "anchorGlow"
    | "symmetricGlow"
    | "horizontalGradient"
    | "verticalGradient";
  backgroundColor?: "" | "default" | "accent" | "bold";
  transition?: "" | "none" | "to_default" | "to_accent" | "to_bold" | "to_inverted";
  backgroundImage?: AssetStoryblok;
  spotlight: boolean;
  spaceBefore?: "" | "default" | "small" | "none";
  spaceAfter?: "" | "default" | "small" | "none";
  inverted: boolean;
  headerSpacing: boolean;
  headline_text?: string;
  headline_large: boolean;
  headline_width?: "" | "unset" | "narrow" | "default" | "wide";
  headline_textAlign?: "" | "left" | "center" | "right";
  headline_align?: "" | "left" | "center" | "right";
  headline_sub?: string;
  headline_switchOrder: boolean;
  content_width?: "" | "unset" | "narrow" | "default" | "wide";
  content_align?: "" | "left" | "center" | "right";
  content_gutter?: "" | "large" | "default" | "small" | "none";
  content_mode?: "" | "default" | "tile" | "list" | "slider";
  content_tileWidth?: "" | "smallest" | "default" | "medium" | "large" | "largest" | "full";
  components?: (
    | BlogTeaserStoryblok
    | BusinessCardStoryblok
    | ContactStoryblok
    | ContentNavStoryblok
    | CtaStoryblok
    | DividerStoryblok
    | DownloadsStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeadlineStoryblok
    | HeroStoryblok
    | HtmlStoryblok
    | ImageStoryStoryblok
    | ImageTextStoryblok
    | LogosStoryblok
    | MosaicStoryblok
    | SliderStoryblok
    | SplitEvenStoryblok
    | SplitWeightedStoryblok
    | StatsStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
    | VideoCurtainStoryblok
    | InfoTableStoryblok
    | GlobalReferenceStoryblok
    | EventLatestTeaserStoryblok
    | EventListTeaserStoryblok
    | PrompterStoryblok
    | ButtonStoryblok
  )[];
  buttons?: ButtonStoryblok[];
  aiDraft: boolean;
  anchorId?: string;
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
  token?: string;
  hideBreadcrumbs: boolean;
  theme?: string;
  headerButton_enabled: boolean;
  headerButton_label?: string;
  headerButton_url?: MultilinkStoryblok;
  bookDemoButton_enabled: boolean;
  bookDemoButton_label?: string;
  bookDemoButton_url?: MultilinkStoryblok;
  bookDemoButton_variant?: "" | "primary" | "secondary" | "tertiary";
  _uid: string;
  component: "settings";
}

export interface SliderStoryblok {
  autoplay: boolean;
  nav: boolean;
  teaseNeighbours: boolean;
  equalHeight: boolean;
  gap?: string;
  arrows: boolean;
  variant?: "" | "slider" | "carousel";
  className?: string;
  components?: (
    | CtaStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeroStoryblok
    | ImageTextStoryblok
    | LogosStoryblok
    | StatsStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
    | GlobalReferenceStoryblok
  )[];
  _uid: string;
  component: "slider";
}

export interface SocialLinksStoryblok {
  icon?: string;
  url?: MultilinkStoryblok;
  ariaLabel?: string;
  _uid: string;
  component: "socialLinks";
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
  mobileReverse: boolean;
  verticalAlign?: "" | "top" | "center" | "bottom" | "sticky";
  verticalGutter?: "" | "large" | "default" | "small" | "none";
  horizontalGutter?: "" | "large" | "default" | "small" | "none";
  firstLayout_layout?: "" | "smallTiles" | "largeTiles" | "list";
  firstLayout_gutter?: "" | "none" | "small" | "default" | "large";
  firstLayout_stretchVertically: boolean;
  secondLayout_layout?: "" | "smallTiles" | "largeTiles" | "list";
  secondLayout_stretchVertically: boolean;
  secondLayout_gutter?: "" | "none" | "small" | "default" | "large";
  firstComponents?: (
    | BlogTeaserStoryblok
    | BusinessCardStoryblok
    | ContactStoryblok
    | ContentNavStoryblok
    | CtaStoryblok
    | DividerStoryblok
    | DownloadsStoryblok
    | EventLatestTeaserStoryblok
    | EventListTeaserStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeadlineStoryblok
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
    | GlobalReferenceStoryblok
    | ButtonStoryblok
  )[];
  secondComponents?: (
    | BlogTeaserStoryblok
    | BusinessCardStoryblok
    | ContactStoryblok
    | ContentNavStoryblok
    | CtaStoryblok
    | DividerStoryblok
    | DownloadsStoryblok
    | EventLatestTeaserStoryblok
    | EventListTeaserStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeadlineStoryblok
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
    | GlobalReferenceStoryblok
    | ButtonStoryblok
  )[];
  _uid: string;
  component: "split-even";
}

export interface SplitWeightedStoryblok {
  verticalGutter?: "" | "large" | "default" | "small" | "none";
  horizontalGutter?: "" | "large" | "default" | "small" | "none";
  verticalAlign?: "" | "top" | "center" | "bottom" | "sticky";
  mainLayout_gutter?: "" | "large" | "default" | "small" | "none";
  mainLayout_minWidth?: "" | "narrow" | "default" | "wide";
  mainLayout_stretchVertically: boolean;
  mainLayout_layout?: "" | "smallTiles" | "largeTiles" | "list";
  asideLayout_gutter?: "" | "large" | "default" | "small" | "none";
  asideLayout_minWidth?: "" | "narrow" | "default" | "wide";
  asideLayout_stretchVertically: boolean;
  asideLayout_layout?: "" | "smallTiles" | "largeTiles" | "list";
  order_mobile?: "" | "mainFirst" | "asideFirst";
  order_desktop?: "" | "mainFirst" | "asideFirst";
  mainComponents?: (
    | BlogTeaserStoryblok
    | BusinessCardStoryblok
    | ContactStoryblok
    | ContentNavStoryblok
    | CtaStoryblok
    | DividerStoryblok
    | DownloadsStoryblok
    | EventLatestTeaserStoryblok
    | EventListTeaserStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeadlineStoryblok
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
    | GlobalReferenceStoryblok
    | ButtonStoryblok
  )[];
  asideComponents?: (
    | BlogTeaserStoryblok
    | BusinessCardStoryblok
    | ContactStoryblok
    | ContentNavStoryblok
    | CtaStoryblok
    | DividerStoryblok
    | DownloadsStoryblok
    | EventLatestTeaserStoryblok
    | EventListTeaserStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeadlineStoryblok
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
    | GlobalReferenceStoryblok
    | ButtonStoryblok
  )[];
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
  align?: "" | "left" | "center";
  stat?: StatStoryblok[];
  _uid: string;
  component: "stats";
}

export interface Tab66B2A4548Ed542EdA77AC4Cef1876725Storyblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-66b2a454-8ed5-42ed-a77a-c4cef1876725";
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
  layout?: "" | "stack" | "row" | "compact";
  centered: boolean;
  url?: MultilinkStoryblok;
  button_label?: string;
  button_chevron: boolean;
  button_hidden: boolean;
  image?: AssetStoryblok;
  imageAlt?: string;
  imageRatio?: "" | "wide" | "landscape" | "square" | "unset";
  imageHoverEffect: boolean;
  date?: string;
  newTag: boolean;
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
  highlightText: boolean;
  _uid: string;
  component: "text";
}

export interface TileStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  image_src?: AssetStoryblok;
  image_alt?: string;
  button_toggle: boolean;
  button_label?: string;
  button_url?: MultilinkStoryblok;
  backgroundColor?: string;
  backgroundImage?: AssetStoryblok;
  textColor?: string;
  _uid: string;
  component: "tile";
}

export interface TokenThemeStoryblok {
  name: string;
  tokens?: string;
  css?: string;
  system: boolean;
  _uid: string;
  component: "token-theme";
}

export interface VideoCurtainStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  highlightText: boolean;
  colorNeutral: boolean;
  buttons?: ButtonStoryblok[];
  overlay: boolean;
  video_srcMobile?: AssetStoryblok;
  video_srcTablet?: AssetStoryblok;
  video_srcDesktop?: AssetStoryblok;
  textPosition?: "" | "center" | "bottom" | "left" | "right" | "corner";
  _uid: string;
  component: "video-curtain";
}
