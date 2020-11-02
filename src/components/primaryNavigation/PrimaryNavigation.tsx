// Core
import React, { FC, ReactElement } from "react";

// Vendor
import * as Scroll from "react-scroll";

// eslint-disable-next-line @typescript-eslint/ban-types
const PrimaryNavigation: FC<{}> = (): ReactElement => {
  return (
    <nav
      className="primary-navigation"
      id="primary-navigation"
      role="navigation"
    >
      <ul>
        <li className="bold-weight">
          <Scroll.Link to="skills" smooth={true} duration={500}>
            Skills
          </Scroll.Link>
        </li>
        <li className="bold-weight">
          <Scroll.Link to="work" smooth={true} duration={500}>
            Work
          </Scroll.Link>
        </li>
        <li className="bold-weight">
          <Scroll.Link to="about" smooth={true} duration={500}>
            About
          </Scroll.Link>
        </li>
      </ul>
    </nav>
  );
};

export default PrimaryNavigation;
