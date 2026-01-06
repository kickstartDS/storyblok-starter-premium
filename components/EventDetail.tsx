import { ComponentProps } from "react";
import {
  SbBlokData,
  StoryblokComponent,
  storyblokEditable,
} from "@storyblok/react";
import { Section } from "@kickstartds/ds-agency-premium/components/section/index.js";
import { EventHeader } from "@kickstartds/ds-agency-premium/components/event-header/index.js";
import { EventLocation } from "@kickstartds/ds-agency-premium/components/event-location/index.js";
import { EventDetail as DsaEventDetail } from "@kickstartds/ds-agency-premium/components/event-detail/index.js";
import { unflatten } from "@/helpers/unflatten";
import { Headline } from "@kickstartds/ds-agency-premium/components/headline/index.js";
import { Gallery } from "@kickstartds/ds-agency-premium/components/gallery/index.js";
import { RichText } from "@kickstartds/base/lib/rich-text";
import { Downloads } from "@kickstartds/ds-agency-premium/components/downloads/index.js";

type PageProps = {
  blok: Omit<ComponentProps<typeof DsaEventDetail>, "section"> & SbBlokData;
};

const EventDetail: React.FC<PageProps> = ({ blok }) => {
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

    return (
      <main {...storyblokEditable(blok)}>
        <Section width="narrow" spaceAfter="none">
          <EventHeader title={title} categories={categories} intro={intro} />
        </Section>
        {locations && locations.length > 0 && (
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
        {description && (
          <Section width="narrow" spaceBefore="none">
            <RichText className="dsa-event__description" text={description} />
          </Section>
        )}
        {images && images.length > 0 && (
          <Section spaceBefore="none">
            <Gallery
              images={images}
              aspectRatio="wide"
              layout="smallTiles"
              lightbox
            />
          </Section>
        )}
        {download && download.length > 0 && (
          <Section
            width="narrow"
            spaceBefore="none"
            content={{
              mode: "list",
              gutter: "none",
            }}
            spaceAfter="none"
          >
            <Headline text="Downloads" level="h3" style="h3" />
            <Downloads download={download} />
          </Section>
        )}
        {
          <Section
            width="narrow"
            buttons={[
              {
                label: "See all Events",
                url: "/#",
              },
            ]}
          ></Section>
        }
      </main>
    );
  }
  return null;
};

export default EventDetail;
