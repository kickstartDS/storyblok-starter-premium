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
import { Link } from "@kickstartds/base/lib/link";
import { Logo } from "@kickstartds/ds-agency-premium/components/logo/index.js";
import { Button } from "@kickstartds/ds-agency-premium/components/button/index.js";

export const NavFlyoutContextDefault = forwardRef<
  HTMLElement,
  ComponentProps<typeof DsaNavFlyout> & HTMLAttributes<HTMLElement>
>(({ items, inverted, logo }, ref) =>
  items && items.length > 0 ? (
    <nav
      className="dsa-nav-flyout"
      ks-inverted={inverted?.toString()}
      id="dsa-nav-flyout"
      aria-label="Hauptnavigation"
      ref={ref}
    >
      <Logo {...logo} className="dsa-nav-flyout__logo" />

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
        <li className="dsa-nav-flyout__item">
          <Button
            className="dsa-nav-flyout__cta"
            label="Projektanfrage"
            icon="chevron-right"
            target="ueber-uns/kontakt"
            size="small"
          />
        </li>
      </ul>
    </nav>
  ) : null
);

export const NavFlyoutProvider: FC<PropsWithChildren> = (props) => (
  <NavFlyoutContext.Provider {...props} value={NavFlyoutContextDefault} />
);
