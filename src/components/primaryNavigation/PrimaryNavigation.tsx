// Core
import React, { FC, ReactElement } from "react";

// Vendor
import { useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import * as Scroll from "react-scroll";

const createLink = (name: string, pathname: string): ReactElement => {
  const displayName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

  if (pathname === "/") {
    return (
      <Scroll.Link to={name} smooth={true} duration={500}>
        {displayName}
      </Scroll.Link>
    );
  } else {
    return <Link to={`/#${name}`}>{displayName}</Link>;
  }
};

// eslint-disable-next-line @typescript-eslint/ban-types
const PrimaryNavigation: FC<{}> = (): ReactElement => {
  const { pathname } = useLocation();

  return (
    <nav
      className="primary-navigation"
      id="primary-navigation"
      role="navigation"
    >
      <ul>
        <li className="bold-weight">{createLink("skills", pathname)}</li>
        <li className="bold-weight">{createLink("work", pathname)}</li>
        <li className="bold-weight">{createLink("about", pathname)}</li>
      </ul>
    </nav>
  );
};

export default PrimaryNavigation;
