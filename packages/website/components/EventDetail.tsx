import { ComponentProps } from "react";
import { SbBlokData, storyblokEditable } from "@storyblok/react";
import { Section } from "@kickstartds/design-system/components/section/index.js";
import { EventHeader } from "@kickstartds/design-system/components/event-header/index.js";
import { EventLocation } from "@kickstartds/design-system/components/event-location/index.js";
import { EventDetail as DsaEventDetail } from "@kickstartds/design-system/components/event-detail/index.js";
import { Headline } from "@kickstartds/design-system/components/headline/index.js";
import { Gallery } from "@kickstartds/design-system/components/gallery/index.js";
import { RichText } from "@kickstartds/base/lib/rich-text";
import { Downloads } from "@kickstartds/design-system/components/downloads/index.js";
import { pagefindAttributes } from "@/helpers/pagefind";

type PageProps = {
  blok: ComponentProps<typeof DsaEventDetail> & SbBlokData;
  pagefindUrl?: string;
};

const EventDetail: React.FC<PageProps> = ({ blok, pagefindUrl }) => {
  if (blok) {
    const {
      title,
      categories,
      locations,
      description,
      intro,
      images,
      download,
    } = blok;

    const hasLocations = locations !== undefined && locations.length > 0;
    const hasDescription = description !== undefined && description.length > 0;
    const hasImages = images !== undefined && images.length > 0;
    const hasDownloads = download !== undefined && download.length > 0;
    const hasFollowingSection =
      hasLocations || hasDescription || hasImages || hasDownloads;

    return (
      <main {...storyblokEditable(blok)} {...pagefindAttributes(pagefindUrl)}>
        <Section
          width="narrow"
          spaceAfter={hasFollowingSection ? "none" : "default"}
        >
          <EventHeader title={title} categories={categories} intro={intro} />
        </Section>
        {hasLocations && (
          <Section width="default" content={{ mode: "list", gutter: "none" }}>
            <Headline
              text="Locations"
              level="h3"
              style="h3"
              className="dsa-event__locations-headline"
            />
            {locations.map((appointment, index) => (
              <EventLocation key={index} {...appointment} />
            ))}
          </Section>
        )}
        {hasDescription && (
          <Section width="narrow" spaceBefore="none">
            <RichText className="dsa-event__description" text={description} />
          </Section>
        )}
        {hasImages && (
          <Section spaceBefore="none">
            <Gallery
              images={images}
              aspectRatio="wide"
              layout="smallTiles"
              lightbox
            />
          </Section>
        )}
        {hasDownloads && (
          <Section
            width="narrow"
            spaceBefore="none"
            content={{
              mode: "list",
              gutter: "none",
            }}
          >
            <Headline text="Downloads" level="h3" style="h3" />
            <Downloads download={download} />
          </Section>
        )}
      </main>
    );
  }
  return null;
};

export default EventDetail;
