import { createContext, forwardRef, HTMLAttributes, useContext } from "react";
import classnames from "classnames";
import "@github/relative-time-element";
import { TeaserBoxContextDefault } from "@kickstartds/base/lib/teaser-box";
import { TeaserCardProps } from "./TeaserCardProps";
import { Container } from "@kickstartds/core/lib/container";

export const TeaserCardContextDefault = forwardRef<
  HTMLTableElement,
  TeaserCardProps & HTMLAttributes<HTMLTableElement>
>(
  (
    {
      headline,
      text,
      button,
      target,
      image,
      imageRatio = "wide",
      label,
      date,
      layout = "stack",
      newTag,
      ...props
    },
    ref
  ) => {
    return (
      <Container name="teaser-card">
        <div
          className={classnames(
            `dsa-teaser-card`,
            newTag && `dsa-teaser-card--new`,
            `dsa-teaser-card--${layout}`,
            `dsa-teaser-card--${imageRatio}`
          )}
        >
          {newTag && <span className="dsa-teaser-card__tag">Neu</span>}
          <TeaserBoxContextDefault
            {...props}
            topic={headline}
            text={text}
            renderTopic={() => (
              <>
                {label && (
                  <span className="dsa-teaser-card__label">{label}</span>
                )}
                <span className="dsa-teaser-card__title">{headline}</span>

                {date && (
                  <span className="dsa-teaser-card__date">
                    <relative-time
                      datetime={date}
                      format="relative"
                      threshold="P60D"
                      prefix=""
                    ></relative-time>
                  </span>
                )}
              </>
            )}
            link={{
              hidden: button?.hidden,
              label: button?.label,
              //@ts-expect-error
              variant: "primary",
              target: target,
              icon: button?.chevron ? "chevron-right" : undefined,
            }}
            image={image}
            ref={ref}
          />
        </div>
      </Container>
    );
  }
);
TeaserCardContextDefault.displayName = "Info Table Context Default";

export const TeaserCardContext = createContext(TeaserCardContextDefault);
export const TeaserCard = forwardRef<
  HTMLTableElement,
  TeaserCardProps & HTMLAttributes<HTMLTableElement>
>((props, ref) => {
  const Component = useContext(TeaserCardContext);
  return <Component {...props} ref={ref} />;
});
TeaserCard.displayName = "Info Table";
