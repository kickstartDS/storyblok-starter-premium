import { ComponentProps } from "react";
import { SbBlokData, storyblokEditable } from "@storyblok/react";
import { Section } from "@kickstartds/ds-agency-premium/components/section/index.js";
import { Search as DsaSearch } from "@kickstartds/ds-agency-premium/components/search/index.js";
import { SplitWeightedContextDefault as SplitWeighted } from "@kickstartds/ds-agency-premium/components/split-weighted/index.js";
import { RichText } from "@kickstartds/base/lib/rich-text";
import { Pagination } from "@kickstartds/ds-agency-premium/components/pagination/index.js";
import { Headline } from "@kickstartds/ds-agency-premium/components/headline/index.js";
import { SearchBar } from "@kickstartds/ds-agency-premium/components/search-bar/index.js";
import { SearchFilter } from "@kickstartds/ds-agency-premium/components/search-filter/index.js";
import { SearchResult } from "@kickstartds/ds-agency-premium/components/search-result/index.js";
import { unflatten } from "@/helpers/unflatten";

type PageProps = {
  blok: ComponentProps<typeof DsaSearch> & SbBlokData;
};

const Search: React.FC<PageProps> = ({ blok }) => {
  if (blok) {
    const { headline, searchBar, searchFilter, searchResults } = blok;

    return (
      <main {...storyblokEditable(blok)}>
        <Section
          content={{
            mode: "list",
            gutter: "none",
          }}
          spaceAfter="small"
        >
          {/* @ts-expect-error */}
          {headline && <Headline {...unflatten(headline)} />}
          <SearchBar {...searchBar} />
        </Section>
        <Section
          width="wide"
          spaceBefore="small"
          content={{
            mode: "list",
          }}
        >
          <SplitWeighted
            verticalAlign="sticky"
            mainLayout={{
              minWidth: "narrow",
              gutter: "large",
            }}
            asideLayout={{
              gutter: "small",
            }}
            order={{
              desktop: "asideFirst",
              mobile: "asideFirst",
            }}
            aside={
              <>
                <SearchFilter {...searchFilter} />
                <RichText text={`Showing 6 out of 18 results`} />
              </>
            }
            main={
              <>
                {searchResults &&
                  searchResults.length > 0 &&
                  searchResults.map((searchResult, index) => (
                    <SearchResult key={index} {...searchResult} />
                  ))}
                <Pagination
                  pages={[
                    {
                      url: "https://example.com/page1",
                      active: true,
                    },
                    {
                      url: "https://example.com/page2",
                    },
                    {
                      url: "https://example.com/page3",
                    },
                  ]}
                />
              </>
            }
          />
        </Section>
      </main>
    );
  }
  return null;
};

export default Search;
