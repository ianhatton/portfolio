// Core
import React, { FC, ReactElement, useEffect, useState } from "react";

// Components
import PrimaryNavigation from "../primaryNavigation/PrimaryNavigation";

// Vendor
import * as Scroll from "react-scroll";

// eslint-disable-next-line @typescript-eslint/ban-types
const SiteHeader: FC<{}> = (): ReactElement => {
  const [isHeaderSubtle, setIsHeaderSubtle] = useState(false);
  const [isTopLinkVisible, setIsTopLinkVisible] = useState(false);

  useEffect(() => {
    const onScroll = (e: Event) => {
      const target = e.currentTarget as Window;

      setIsHeaderSubtle(target.scrollY > 200 ? true : false);

      setIsTopLinkVisible(target.scrollY > 1364 ? true : false);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="header"
      role="banner"
      className={`${isHeaderSubtle ? "subtle" : ""}`}
    >
      <div
        className={`top-link ${isTopLinkVisible ? "visible" : ""}`}
        id="top-link"
      >
        <Scroll.Link
          className="material-icons bold-weight"
          to="top"
          offset={-100}
          smooth={true}
          duration={500}
        >
          <span>Top</span>keyboard_arrow_up
        </Scroll.Link>
      </div>
      <div className="wrap">
        <h1 className="eta">
          <a href="/">
            <span className="bold-weight">Ian Hatton</span>
            <span className="job-title">Front-end Developer</span>
          </a>
        </h1>
        <PrimaryNavigation />
      </div>
    </header>
  );
};

export default SiteHeader;
