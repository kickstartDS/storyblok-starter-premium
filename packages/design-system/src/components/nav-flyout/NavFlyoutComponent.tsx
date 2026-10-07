import classnames from "classnames";
import { NavFlyoutProps } from "./NavFlyoutProps";
import { Link } from "@kickstartds/base/lib/link";
import "./nav-flyout.scss";
import { createContext, forwardRef, HTMLAttributes, useContext } from "react";
import { deepMergeDefaults } from "../helpers";
import defaults from "./NavFlyoutDefaults";

export type { NavFlyoutProps };

type NavFlyoutSubItem = NonNullable<
  NonNullable<NavFlyoutProps["items"]>[number]["items"]
>[number] & {
  // `newTab` is resolved at story-processing time from Storyblok's multilink
  // target-blank toggle and isn't part of the generated schema type.
  newTab?: boolean;
};

type NavFlyoutItem = Omit<
  NonNullable<NavFlyoutProps["items"]>[number],
  "items"
> & {
  // `newTab` is resolved at story-processing time from Storyblok's multilink
  // target-blank toggle and isn't part of the generated schema type.
  newTab?: boolean;
  items?: NavFlyoutSubItem[];
};

export const NavFlyoutContextDefault = forwardRef<
  HTMLElement,
  NavFlyoutProps & HTMLAttributes<HTMLElement>
>(({ items, inverted, children }, ref) => {
  const itemsWithNewTab = items as NavFlyoutItem[];

  return itemsWithNewTab && itemsWithNewTab.length > 0 ? (
    <nav
      className="dsa-nav-flyout"
      ks-inverted={inverted.toString()}
      id="dsa-nav-flyout"
      aria-label="Hauptnavigation"
      ref={ref}
    >
      <ul className="dsa-nav-flyout__list">
        {itemsWithNewTab.map(
          ({ label, url, active, items: subItems, newTab }) => {
            return (
              <li
                className={classnames(
                  "dsa-nav-flyout__item",
                  active && "dsa-nav-flyout__item--active"
                )}
                key={url}
              >
                {subItems?.length ? (
                  <span className="dsa-nav-flyout__label">{label}</span>
                ) : (
                  <Link
                    href={url}
                    className={`dsa-nav-flyout__label dsa-nav-flyout__link`}
                    {...(newTab && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    {label}
                  </Link>
                )}
                {subItems && subItems.length > 0 && (
                  <ul className="dsa-nav-flyout__sublist">
                    {subItems.map(({ label, url, active, newTab }) => {
                      return (
                        <li
                          className={classnames(
                            "dsa-nav-flyout__item",
                            active && "dsa-nav-flyout__item--active"
                          )}
                          key={url}
                        >
                          <Link
                            href={url}
                            className={`dsa-nav-flyout__label dsa-nav-flyout__link`}
                            {...(newTab && {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            })}
                          >
                            {label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          }
        )}
      </ul>
      {/* Content the consuming app places in the panel itself, next to the
          navigation - e.g. a language switcher. Rendered after the list so a
          child that wants to sit above it can use flex `order` on the panel. */}
      {children}
    </nav>
  ) : null;
});

export const NavFlyoutContext = createContext(NavFlyoutContextDefault);
export const NavFlyout = forwardRef<
  HTMLElement,
  NavFlyoutProps & HTMLAttributes<HTMLElement>
>((props, ref) => {
  const Component = useContext(NavFlyoutContext);
  return <Component {...deepMergeDefaults(defaults, props)} ref={ref} />;
});
NavFlyout.displayName = "NavFlyout";
