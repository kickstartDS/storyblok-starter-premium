import classnames from "classnames";
import { Link } from "@kickstartds/base/lib/link";
import { FC } from "react";
import { NavDropdownProps } from "./NavDropdownProps";
import "./nav-dropdown.scss";

export type { NavDropdownProps };

export const NavDropdown: FC<NavDropdownProps> = ({
  items,
  inverted,
  style,
}) => {
  // `newTab` is resolved at story-processing time from Storyblok's multilink
  // target-blank toggle and isn't part of the generated schema type.
  const itemsWithNewTab = items as (NonNullable<
    NavDropdownProps["items"]
  >[number] & { newTab?: boolean })[];

  return (
    <ul
      className={classnames(`dsa-nav-dropdown`)}
      ks-inverted={inverted?.toString()}
      style={style}
    >
      {itemsWithNewTab.map(({ label, active, url, newTab }) => {
        return (
          <li
            className={classnames(
              "dsa-nav-dropdown__item",
              active && "dsa-nav-dropdown__item--active"
            )}
            key={url}
          >
            <Link
              href={url}
              className={`dsa-nav-dropdown__label`}
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
  );
};
