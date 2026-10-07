import { ComponentProps } from "react";
import { SbBlokData, storyblokEditable } from "@storyblok/react";
import { Section } from "@kickstartds/design-system/components/section/index.js";
import { Search as DsaSearch } from "@kickstartds/design-system/components/search/index.js";
import { Headline } from "@kickstartds/design-system/components/headline/index.js";
import { SearchForm } from "@kickstartds/design-system/components/search-form/index.js";
import { unflatten } from "@/helpers/unflatten";

type PageProps = {
  blok: ComponentProps<typeof DsaSearch> & SbBlokData;
};

const Search: React.FC<PageProps> = ({ blok }) => {
  if (blok) {
    // UPSTREAM BUG - deviates from monorepo/main, contribute back and drop.
    // The schema's single `headline` becomes a Storyblok `bloks` field, so it
    // arrives as an array. Spreading that array into `Headline` handed it
    // numeric keys and rendered an empty heading.
    const [headline] = Array.isArray(blok.headline)
      ? blok.headline
      : [blok.headline];

    return (
      <main {...storyblokEditable(blok)}>
        {/* Only the headline and the search form sit on the bold (brand blue)
            background with inverted colours, the same treatment the imprint
            page gives its headline section. */}
        <Section
          backgroundColor="bold"
          inverted
          content={{
            mode: "list",
            gutter: "none",
          }}
          spaceAfter="small"
        >
          {/* @ts-expect-error */}
          {headline && <Headline {...unflatten(headline)} />}
          {/* The hits and their pagination leave the form through
              `data-results-container`, so they render on the default
              background instead of the inverted one. */}
          <SearchForm
            component="dsa.search-form.pagefind"
            data-results-container="#dsa-search-results"
          />
        </Section>
        {/* Same width and gutter as the band, so the hits stay in the
            headline's content column. */}
        <Section
          content={{
            mode: "list",
            gutter: "none",
          }}
          spaceBefore="small"
        >
          <div id="dsa-search-results" />
        </Section>
      </main>
    );
  }
  return null;
};

export default Search;
