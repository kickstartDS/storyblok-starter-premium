/*  eslint react/display-name: 0 */
import {
  ComponentProps,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  forwardRef,
} from "react";
import classnames from "classnames";
import {
  NavFlyoutContextDefault as DsaNavFlyout,
  NavFlyoutContext,
} from "@kickstartds/ds-agency-premium/nav-flyout";

import { Logo } from "@kickstartds/ds-agency-premium/components/logo/index.js";
import { Link } from "@kickstartds/base/lib/link";
import { useLanguage } from "../LanguageContext";

export const NavFlyoutContextDefault = forwardRef<
  HTMLElement,
  ComponentProps<typeof DsaNavFlyout> & HTMLAttributes<HTMLElement>
>(({ items, inverted, logo }, ref) => {
  const language = useLanguage();

  return items && items.length > 0 ? (
    <nav
      className="dsa-nav-flyout"
      ks-inverted={inverted}
      id="dsa-nav-flyout"
      aria-label="Hauptnavigation"
      ref={ref}
    >
      <Logo {...logo} className="dsa-nav-flyout__logo" />

      <ul className="dsa-nav-flyout__lang">
        <li className="dsa-nav-flyout__lang__item">
          <Link
            href="/"
            className={classnames(
              "dsa-nav-flyout__lang__link",
              language &&
                language === "de" &&
                "dsa-nav-flyout__lang__link--active"
            )}
          >
            DE
          </Link>
        </li>
        <li className="dsa-nav-flyout__lang__item">
          <Link
            href="/en"
            className={classnames(
              "dsa-nav-flyout__lang__link",
              language &&
                language === "en" &&
                "dsa-nav-flyout__lang__link--active"
            )}
          >
            EN
          </Link>
        </li>
      </ul>

      <ul className="dsa-nav-flyout__list">
        {items.map(({ label, href, active, items: subItems }) => {
          return (
            <li
              className={classnames(
                "dsa-nav-flyout__item",
                active && "dsa-nav-flyout__item--active"
              )}
              key={href}
            >
              {subItems?.length ? (
                <span tabIndex={0} className="dsa-nav-flyout__label">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className={`dsa-nav-flyout__label dsa-nav-flyout__link`}
                >
                  {label}
                </Link>
              )}
              {subItems?.length ? (
                <ul className="dsa-nav-flyout__sublist">
                  {subItems.map(({ label, href, active }) => {
                    return (
                      <li
                        className={classnames(
                          "dsa-nav-flyout__item",
                          active && "dsa-nav-flyout__item--active"
                        )}
                        key={href}
                      >
                        <Link
                          href={href}
                          className={`dsa-nav-flyout__label dsa-nav-flyout__link`}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  ) : null;
});

export const NavFlyoutProvider: FC<PropsWithChildren> = (props) => (
  <NavFlyoutContext.Provider {...props} value={NavFlyoutContextDefault} />
);
