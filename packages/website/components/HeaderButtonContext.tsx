import { createContext, useContext } from "react";

export interface HeaderButtonConfig {
  enabled?: boolean;
  label?: string;
  url?: string;
  /**
   * Open the header CTA in a new tab. Resolved at story-processing time from
   * Storyblok's multilink target-blank toggle on `headerButton_url`.
   */
  newTab?: boolean;
}

const HeaderButtonContext = createContext<HeaderButtonConfig>({});

export const useHeaderButton = () => useContext(HeaderButtonContext);

export default HeaderButtonContext;
