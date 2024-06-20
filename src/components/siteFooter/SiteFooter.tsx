// Core
import React, { FC, ReactElement } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
const SiteFooter: FC<{}> = (): ReactElement => {
  return (
    <footer role="contentinfo">
      <div className="wrap">
        <div className="padding">
          <section className="social">
            <h1 className="zeta bold-weight accent">Elsewhere</h1>
            <ul>
              <li>
                <a
                  href="https://github.com/ianhatton"
                  className="github external-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="hidden">GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://uk.linkedin.com/in/ian-hatton"
                  className="linkedin external-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="hidden">LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/~ianhatton"
                  className="npm external-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="hidden">npm</span>
                </a>
              </li>
            </ul>
          </section>
          <small>
            Copyright &copy; 2016 Ian Hatton
            <br />
            <br />
            Built with{" "}
            <a
              href="https://reactjs.org"
              className="external-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
            <br />
            <br />
            Thank you to{" "}
            <a
              href="http://magicmockups.com"
              className="external-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Magic Mockups
            </a>{" "}
            and{" "}
            <a
              href="https://michaljakobsze.webflow.io"
              className="external-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Michal Jakobsze
            </a>{" "}
            for the mockup images and{" "}
            <a
              href="https://icons8.com"
              className="external-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Icons8
            </a>{" "}
            for the hat icon
          </small>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
