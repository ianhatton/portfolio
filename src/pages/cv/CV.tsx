// Core
import React, { FC, ReactElement, useEffect } from "react";

// Components
import SiteFooter from "../../components/siteFooter/SiteFooter";
import SiteHeader from "../../components/siteHeader/SiteHeader";

// Vendor
import { withRouter } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

// eslint-disable-next-line @typescript-eslint/ban-types
const CV: FC<{}> = (): ReactElement => {
  useEffect(() => {
    document.body.className = "cv";

    return () => {
      document.body.className = "";
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <main role="main">
        <div className="wrap">
          <Link to="/#skills" className="button button-primary">
            <span>&lsaquo; Back to Skills</span>
          </Link>
          <article className="cv">
            <header>
              <h1 className="bold-weight" data-mobile-font-size="delta">
                Ian Hatton
              </h1>
              <h2 className="bold-weight" data-mobile-font-size="delta">
                Front-end Developer
              </h2>
            </header>
            <div className="body">
              <section className="introduction">
                <p className="epsilon" data-mobile-font-size="zeta">
                  A conscientious, forward-thinking Front-end Developer with
                  over {new Date().getFullYear() - 2011} years&rsquo;
                  experience.
                </p>
                <p className="epsilon" data-mobile-font-size="zeta">
                  My strengths range from a thorough understanding of
                  JavaScript, TypeScript, React, Angular, CSS and HTML to a firm
                  grasp of web standards, typography and graphic design
                  principles.
                </p>
                <p className="epsilon" data-mobile-font-size="zeta">
                  I&rsquo;m in my element whether I&rsquo;m creating solutions
                  to complex technical issues, building bespoke designs, writing
                  tests or working with UX teams to ensure that their visions
                  are realised to their full potential.
                </p>
              </section>
              <section className="objective">
                <h1 className="delta bold-weight accent">Objective</h1>
                <p className="zeta">
                  To apply my skills and knowledge as a Senior Front-end
                  Developer for a driven company and to add value across a range
                  of projects, instilling good practices and improving the
                  knowledge and understanding of junior team members along the
                  way.
                </p>
              </section>
              <section className="experience">
                <div className="padding">
                  <h1 className="delta bold-weight accent">Experience</h1>
                  <ul>
                    <li>
                      <h2 className="zeta">
                        <span className="bold-weight">
                          Cambridge Assessment /{" "}
                        </span>
                        Web UI Developer
                      </h2>
                      <p data-mobile-font-size="zeta">
                        March 2018 &ndash; present
                      </p>
                      <p data-mobile-font-size="zeta">
                        Having spent many years working for marketing and
                        digital agencies, I felt that I needed a new stimulus,
                        and joined Cambridge Assessment as a member of their
                        Agile development team.
                      </p>
                      <div className="accomplishments">
                        <h3
                          className="eta bold-weight"
                          data-mobile-font-size="zeta"
                        >
                          Key accomplishments:
                        </h3>
                        <p data-mobile-font-size="zeta">
                          Led the development of the Content Banking UI
                          application, from making technical decisions, working
                          closely with UX and developing the UI through to
                          writing and maintaining the test suite using React
                          Testing Library and Jest
                        </p>
                        <p data-mobile-font-size="zeta">
                          Selected to join the newly-formed Customer &amp;
                          Technology team and developed the UI for CPSQ
                          application, including the creation of an Auth0 single
                          sign-on service, React front-ends for multiple
                          connected services and a test suite involving Cypress,
                          Jest and Enzyme
                        </p>
                        <p data-mobile-font-size="zeta">
                          Developed and maintained the UI for the Transcription
                          Processing application, using barcode scanning and
                          video streaming via a Raspberry Pi for image capturing
                        </p>
                        <p data-mobile-font-size="zeta">
                          Ported the Xopus-based XML editor for CCMS&rsquo;
                          Authoring component over to Froala
                        </p>
                        <p data-mobile-font-size="zeta">
                          Joined the BTS team and developed the UI for the new
                          CCMS application, converting the legacy
                          product&rsquo;s existing functionality into a fresh,
                          reimagined Angular-based implementation
                        </p>
                      </div>
                    </li>
                    <li>
                      <h2 className="zeta">
                        <span className="bold-weight">
                          BBD Perfect Storm /{" "}
                        </span>
                        Front-end Web Developer
                      </h2>
                      <p data-mobile-font-size="zeta">
                        March 2017 &ndash; March 2018
                      </p>
                      <p data-mobile-font-size="zeta">
                        I joined BBD Perfect Storm&rsquo;s highly skilled and
                        super-creative digital team in a more senior role, and
                        enjoyed working on a number of exciting projects using
                        Angular, Redux and Laravel.
                      </p>
                      <div className="accomplishments">
                        <h3
                          className="eta bold-weight"
                          data-mobile-font-size="zeta"
                        >
                          Key accomplishments:
                        </h3>
                        <p data-mobile-font-size="zeta">
                          Built Investec&rsquo;s Culture Roadshow internal
                          website using GSAP&rsquo;s TweenMax library
                        </p>
                        <p data-mobile-font-size="zeta">
                          Built the London Fire Brigade&rsquo;s{" "}
                          <a
                            href="https://firefightingcareers.london"
                            className="external-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Fire Fighting Careers
                          </a>{" "}
                          website with custom WordPress Advanced Custom Fields
                          integration
                        </p>
                        <p data-mobile-font-size="zeta">
                          Built and maintained the admin application for
                          LIZH&rsquo;s Genie Facebook Messenger chatbot
                        </p>
                        <p data-mobile-font-size="zeta">
                          Maintained various assessment tools for Vitality
                        </p>
                        <p data-mobile-font-size="zeta">
                          Maintained Bridgestone&rsquo;s{" "}
                          <a
                            href="https://www.nomatterwhat.uk.com/dream-submission"
                            className="external-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Dream Submission
                          </a>{" "}
                          competition form and associated emails for their No
                          Matter What microsite
                        </p>
                        <p data-mobile-font-size="zeta">
                          Built Vitality&rsquo;s{" "}
                          <a
                            href="https://vitalitylifemembers.co.uk/go-green"
                            className="external-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            green incentive
                          </a>{" "}
                          email campaign and accompanying microsite
                        </p>
                      </div>
                    </li>
                    <li>
                      <h2 className="zeta">
                        <span className="bold-weight">Morse Digital / </span>
                        Front-end Web Developer
                      </h2>
                      <p data-mobile-font-size="zeta">
                        April 2014 &ndash; March 2017
                      </p>
                      <p data-mobile-font-size="zeta">
                        As part of the core Front-end team, my responsibilities
                        included building, testing and maintaining the front-end
                        code base, developing prototypes, advising designers on
                        development considerations, meeting with clients and
                        deploying production-ready code.
                      </p>
                      <div className="accomplishments">
                        <h3
                          className="eta bold-weight"
                          data-mobile-font-size="zeta"
                        >
                          Key accomplishments:
                        </h3>
                        <p data-mobile-font-size="zeta">
                          Provided design consultancy, build, maintenance and
                          i18n internationalisation for the re-launch of
                          GLL&rsquo;s{" "}
                          <a
                            href="http://www.better.org.uk"
                            className="external-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Better
                          </a>{" "}
                          website
                        </p>
                        <p data-mobile-font-size="zeta">
                          Designed, built and maintained the
                          <a
                            href="http://funding.londonsport.org"
                            className="external-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            London Sport Funding Search Tool
                          </a>{" "}
                          website
                        </p>
                        <p data-mobile-font-size="zeta">
                          Built and maintained GLL&rsquo;s{" "}
                          <a
                            href="http://www.londonaquaticscentre.org"
                            className="external-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            London Aquatics Centre
                          </a>{" "}
                          and
                          <a
                            href="http://www.copperboxarena.org.uk"
                            className="external-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Copper Box Arena
                          </a>{" "}
                          websites, and later converted them into responsive
                          builds
                        </p>
                        <p data-mobile-font-size="zeta">
                          Provided design consultancy and build for the{" "}
                          <a
                            href="http://sonypicturesuk.tumblr.com"
                            className="external-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Sony Pictures UK
                          </a>{" "}
                          and{" "}
                          <a
                            href="http://tabascobrunch.tumblr.com"
                            className="external-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Tabasco Best of the Brunch
                          </a>{" "}
                          Tumblr blogs
                        </p>
                        <p data-mobile-font-size="zeta">
                          Wrote a number of{" "}
                          <a
                            href="https://www.npmjs.com/~ianhatton"
                            className="external-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            vanilla JavaScript modules
                          </a>{" "}
                          which are in use across many of Morse&rsquo;s websites
                        </p>
                      </div>
                    </li>
                    <li>
                      <h2 className="zeta">
                        <span className="bold-weight">Spinnaker London / </span>
                        Front-end Web Developer
                      </h2>
                      <p data-mobile-font-size="zeta">
                        August 2013 &ndash; April 2014
                      </p>
                      <div className="accomplishments">
                        <h3
                          className="eta bold-weight"
                          data-mobile-font-size="zeta"
                        >
                          Key accomplishments:
                        </h3>
                        <p data-mobile-font-size="zeta">
                          Provided design consultancy and build for the
                          re-launch of the{" "}
                          <a
                            href="http://www.walkaboutbars.co.uk"
                            className="external-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Walkabout
                          </a>{" "}
                          website
                        </p>
                        <p data-mobile-font-size="zeta">
                          Refactored Baking Mad&rsquo;s recipe section to
                          include microdata for SEO
                        </p>
                        <p data-mobile-font-size="zeta">
                          Provided design consultancy and build for the
                          re-launch of IMEX&rsquo;s email campaigns
                        </p>
                      </div>
                    </li>
                    <li>
                      <h2 className="zeta">
                        <span className="bold-weight">Spinnaker London / </span>
                        Junior Front-end Web Developer
                      </h2>
                      <p data-mobile-font-size="zeta">
                        January 2012 &ndash; July 2013
                      </p>
                      <p data-mobile-font-size="zeta">
                        I worked alongside Spinnaker&rsquo;s inspirational
                        Creative and Technical team to deliver some fantastic
                        results across a number of platforms, from HTML emails
                        to websites, microsites, Facebook campaigns and Rich
                        Media advertising.
                      </p>
                      <div className="accomplishments">
                        <h3
                          className="eta bold-weight"
                          data-mobile-font-size="zeta"
                        >
                          Key accomplishments:
                        </h3>
                        <p data-mobile-font-size="zeta">
                          Built and maintained HTML email campaigns for Baking
                          Mad, Bord Bia, IMEX, Patak&rsquo;s and Tabasco
                        </p>
                        <p data-mobile-font-size="zeta">
                          Provided regular maintenance on the{" "}
                          <a
                            href="http://www.bakingmad.com"
                            className="external-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Baking Mad
                          </a>{" "}
                          website
                        </p>
                        <p data-mobile-font-size="zeta">
                          Refactored the Less stylesheets on the{" "}
                          <a
                            href="https://bluedragon.co.uk"
                            className="external-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Blue Dragon
                          </a>{" "}
                          website
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>
              <section className="skills">
                <h1 className="delta bold-weight accent">Skills</h1>
                <ul data-mobile-font-size="zeta">
                  <li>
                    Broad knowledge of JavaScript, TypeScript, React, Angular,
                    CSS and semantic HTML
                  </li>
                  <li>
                    Experience with Enzyme, React Testing Library, Jest,
                    Jasmine, Cucumber, SonarQube and Azure pipelines
                  </li>
                  <li>
                    A firm understanding of typography and graphic design
                    principles in application to front-end development
                  </li>
                </ul>
                <ul data-mobile-font-size="zeta">
                  <li>
                    Awareness of usability, accessibility, cross-browser testing
                    and responsive design issues
                  </li>
                  <li>Experience with Ruby on Rails</li>
                  <li>Experience with Laravel</li>
                  <li>Experience with MySQL and other relational databases</li>
                  <li>Knowledge of Adobe Photoshop</li>
                </ul>
              </section>
              <section className="education">
                <h1 className="delta bold-weight accent">Education</h1>
                <ul>
                  <li>
                    <h2 className="zeta bold-weight">Open University</h2>
                    <span data-mobile-font-size="zeta">2008 &ndash; 2010</span>
                    <br />
                    <span data-mobile-font-size="zeta">
                      Certificate in Web Applications Development
                    </span>
                  </li>
                </ul>
              </section>
              <footer>
                <h1 className="delta bold-weight accent">Download</h1>
                <p data-mobile-font-size="zeta">
                  My CV is also available for download as a{" "}
                  <a href="CV.pdf" download>
                    PDF
                  </a>
                  .
                </p>
              </footer>
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default withRouter(CV);
