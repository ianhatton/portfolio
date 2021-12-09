/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires */

// Core
import React, { FC, ReactElement, useEffect, useState } from "react";

// Assets
import aboutMe from "../../assets/images/pages/home/about_me.png";
import workBetter from "../../assets/images/pages/home/work_better.jpg";
import workLondonSport from "../../assets/images/pages/home/work_london_sport.jpg";
import workPortlandResourcing from "../../assets/images/pages/home/work_portland_resourcing.jpg";

// Components
import SiteFooter from "../../components/siteFooter/SiteFooter";
import SiteHeader from "../../components/siteHeader/SiteHeader";

// Interfaces
import { Client } from "../../interfaces/Client";
import { GalleryItem } from "../../interfaces/GalleryItem";
import { Skill } from "../../interfaces/Skill";

// Data
import clients from "../../data/clients.json";
import galleryItems from "../../data/galleryItems.json";
import skills from "../../data/skills.json";

// Vendor
import ReactHtmlParser from "react-html-parser";
import Modal from "react-modal";
import { Link, withRouter } from "react-router-dom";
import * as Scroll from "react-scroll";

Modal.setAppElement("#root");

// eslint-disable-next-line @typescript-eslint/ban-types
const Home: FC<{}> = (): ReactElement => {
  const [activeGalleryItem, setActiveGalleryItem] = React.useState("");
  const [activeSkill, setActiveSkill] = useState("CSS");
  const [lastFmData, setLastFmData] = useState({} as any);

  useEffect(() => {
    document.body.className = "home";

    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=hawkeyehatton&api_key=b5a390f794f482bed0d69370f0236277&limit=5&format=json`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("error");
      })
      .then((data) => setLastFmData(data))
      .catch(() => setLastFmData({}));

    return () => {
      document.body.className = "";
    };
  }, []);

  const clickGalleryItem = (name: string): void => {
    setActiveGalleryItem(name);
    setHTMLClass();
  };

  const clickCloseGalleryItem = (): void => {
    setActiveGalleryItem("");
    setHTMLClass();
  };

  const clickSkill = (name: string): void => {
    setActiveSkill(name);
  };

  const renderClients = (): ReactElement => {
    return (
      <ul className="clients">
        {clients.map((client: Client) => {
          const imageSrc = require(`../../assets/images/clients/${client.imageName}.png`);

          return (
            <li className="center" key={client.name}>
              <div className="padding">
                <img src={imageSrc} alt={client.name} />
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderGalleryItems = (
    galleryItems: GalleryItem[],
    className: string
  ): ReactElement => {
    return (
      <ul className={className}>
        {galleryItems.map((galleryItem: GalleryItem) => {
          const imageSrc = require(`../../assets/images/pages/home/gallery_${galleryItem.imageName}.png`);

          return (
            <li className="modal" key={galleryItem.name}>
              <div
                className="modal-toggle"
                onClick={() => {
                  clickGalleryItem(galleryItem.name);
                }}
              >
                <img src={imageSrc} alt={galleryItem.name} />
              </div>
              <Modal
                className="modal-content"
                isOpen={activeGalleryItem === galleryItem.name}
                onRequestClose={() => {
                  clickCloseGalleryItem();
                }}
                overlayClassName="modal-overlay"
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
              >
                <div className="padding">
                  <h2 className="epsilon bold-weight accent">
                    {galleryItem.name}
                  </h2>
                  <img src={imageSrc} alt={galleryItem.name} />
                </div>
                <div
                  className="modal-close"
                  onClick={() => {
                    clickCloseGalleryItem();
                  }}
                ></div>
              </Modal>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderRecentTracks = (): ReactElement | undefined => {
    if (!Object.keys(lastFmData).length) {
      return;
    }

    return (
      <ul>
        {lastFmData.recenttracks.track
          .filter((t: any) =>
            t["@attr"] ? t["@attr"].nowplaying === "false" : true
          )
          .map((t: any) => {
            return (
              <li key={t.url}>
                <img src={t.image[2]["#text"]} />
                <h2 className="theta">
                  <span className="bold-weight">{t.artist["#text"]}</span> -{" "}
                  {t.name}
                </h2>
              </li>
            );
          })}
      </ul>
    );
  };

  const renderSkillsBody = (): ReactElement => {
    return (
      <div className="skills-body">
        {skills.map((skill: Skill) => {
          return (
            <article
              aria-hidden={activeSkill !== skill.name}
              className={skill.className}
              key={skill.name}
            >
              <div className="wrap">
                <div className="padding">
                  <h1 className="gamma extra-bold-weight">{skill.name}</h1>
                  <div className="column-one">
                    {skill.name === "HTML" && (
                      <blockquote>
                        {ReactHtmlParser(skill.introduction)}
                      </blockquote>
                    )}
                    {skill.name !== "HTML" && (
                      <p className="zeta" data-mobile-font-size="epsilon">
                        {ReactHtmlParser(skill.introduction)}
                      </p>
                    )}
                    {skill.descriptions.map((description) => {
                      return (
                        <p
                          className={`${
                            description.className ? description.className : ""
                          }`}
                          data-mobile-font-size="zeta"
                          key={description.body}
                        >
                          {ReactHtmlParser(description.body)}
                        </p>
                      );
                    })}
                  </div>
                  <div className="column-two">
                    <h2
                      className="zeta bold-weight accent"
                      data-mobile-font-size="epsilon"
                    >
                      I have a knowledge of
                    </h2>
                    <ul>
                      {skill.knowledgeItemsOne.map((knowledgeItem) => {
                        return (
                          <li
                            data-mobile-font-size="zeta"
                            key={knowledgeItem.name}
                          >
                            {knowledgeItem.name}
                          </li>
                        );
                      })}
                    </ul>
                    <ul>
                      {skill.knowledgeItemsTwo.map((knowledgeItem) => {
                        return (
                          <li
                            data-mobile-font-size="zeta"
                            key={knowledgeItem.name}
                          >
                            {knowledgeItem.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    );
  };

  const renderSkillsNavigation = (): ReactElement => {
    return (
      <div className="wrap">
        <ul className="skills-navigation" role="tablist">
          {skills.map((skill) => {
            return (
              <li role="presentation" key={skill.name}>
                <a
                  aria-selected={activeSkill === skill.name}
                  href="#"
                  role="tab"
                  className={skill.className}
                  onClick={(e) => {
                    e.preventDefault();
                    clickSkill(skill.name);
                  }}
                >
                  {skill.name === "Bits and bobs" && (
                    <>
                      <span className="mobile">Bits</span>
                      <span className="desktop"> and bobs</span>
                    </>
                  )}

                  {skill.name === "JavaScript" && (
                    <>
                      <span className="mobile">JS</span>
                      <span className="desktop">{skill.name}</span>
                    </>
                  )}

                  {skill.name !== "Bits and bobs" &&
                    skill.name !== "JavaScript" && <>{skill.name}</>}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const setHTMLClass = (): void => {
    const html = document.getElementsByTagName("html")[0];
    const className = html.className;

    if (className.includes("modal-open")) {
      html.className = className.replace(/(?:^|\s)modal-open(?!\S)/g, "");
    } else {
      html.className += " modal-open";
    }
  };

  return (
    <>
      <SiteHeader />
      <main role="main">
        <div className="wrap">
          <section className="site-introduction" id="site-introduction">
            <h1 className="bold-weight center" data-mobile-font-size="delta">
              Ian Hatton <span>is a Front-end Developer.</span>
            </h1>
            <p className="delta" data-mobile-font-size="zeta">
              Take a look at his{" "}
              <Scroll.Link to="skills" smooth={true} duration={500}>
                skills
              </Scroll.Link>
              , view some of his{" "}
              <Scroll.Link to="work" smooth={true} duration={500}>
                latest work
              </Scroll.Link>
              , or read a little bit more{" "}
              <Scroll.Link to="about" smooth={true} duration={500}>
                about
              </Scroll.Link>{" "}
              the person behind this amazing introduction.
            </p>
            <p className="delta" data-mobile-font-size="zeta">
              I&rsquo;m going to stop talking in the third person now.
            </p>
            <p className="delta" data-mobile-font-size="zeta">
              <span className="bold-weight">tl;dr: </span>
              I&rsquo;ve done lots of really cool work for clients such as:
            </p>
            {renderClients()}
          </section>
        </div>
        <section className="skills panel" id="skills">
          <div className="wrap">
            <header className="section-header">
              <div className="padding">
                <h1 className="beta accent" data-mobile-font-size="gamma">
                  <span className="extra-bold-weight">Skills</span>
                </h1>
                <p className="zeta">
                  I&rsquo;m a creative, forward-thinking Front-end Developer
                  with over {new Date().getFullYear() - 2011} years&rsquo;
                  experience. I turn beautiful designs into functional,
                  intuitive builds.
                </p>
                <p className="zeta">
                  Click through the tabs below to read a little about my core
                  skill sets and approach to front-end development.
                </p>
              </div>
            </header>
          </div>
          {renderSkillsNavigation()}
          {renderSkillsBody()}
          <footer className="section-footer">
            <Link to="/cv" className="button button-primary delta">
              <span>View my CV</span>
            </Link>
          </footer>
        </section>
        <section className="work panel" id="work">
          <div className="wrap">
            <header className="section-header">
              <div className="padding">
                <h1 className="beta accent" data-mobile-font-size="gamma">
                  <span className="extra-bold-weight">Work</span>
                </h1>
                <p className="zeta">
                  My body of work includes consumer-facing websites, content
                  management systems, emails and rich media advertising.
                </p>
                <p className="zeta">
                  Below is a selection of completed projects.
                </p>
              </div>
            </header>
            <article className="featured">
              <div className="column-one">
                <img src={workBetter} alt="Better" />
              </div>
              <div className="column-two">
                <header>
                  <h1
                    className="gamma bold-weight accent"
                    data-mobile-font-size="epsilon"
                  >
                    Better
                  </h1>
                  <a
                    href="http://www.better.org.uk"
                    className="external-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>better.org.uk</span>
                  </a>
                </header>
                <p data-mobile-font-size="zeta">
                  I&rsquo;ve worked with GLL on various projects over the course
                  of my of my career. The previous iteration of their Better
                  Leisure Leisure was the first project I cut my teeth on as a
                  Junior at digital agency.
                </p>
                <p data-mobile-font-size="zeta">
                  This was a major re-design of the previous site, freshening it
                  up with responsive templates, adding new sections and keeping
                  the core functionality of the previous build.
                </p>
                <p data-mobile-font-size="zeta">
                  I completed the vast majority of the front-end development of
                  the site, including the styling, all of the vanilla JavaScript
                  functionality, some React work and i18n internationalisation.
                </p>
              </div>
            </article>
            <div className="group">
              <article className="regular">
                <div className="column-one">
                  <img
                    src={workLondonSport}
                    alt="London Sport Funding Search Tool"
                  />
                </div>
                <div className="column-two">
                  <header>
                    <h1
                      className="zeta bold-weight accent"
                      data-mobile-font-size="epsilon"
                    >
                      London Sport Funding Search Tool
                    </h1>
                    <a
                      href="http://funding.londonsport.org"
                      className="eta external-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      funding.londonsport.org
                    </a>
                  </header>
                  <p className="eta" data-mobile-font-size="zeta">
                    London Sport approached us with the brief of turning their
                    internally circulated list of grant-funded projects into a
                    fully-responsive, interactive search tool. As the sole
                    front-end developer on the project, I worked closely with
                    the back-end team and the client to deliver their
                    requirements.
                  </p>
                </div>
              </article>
              <article className="regular">
                <div className="column-one">
                  <img src={workPortlandResourcing} alt="Portland Resourcing" />
                </div>
                <div className="column-two">
                  <header>
                    <h1
                      className="zeta bold-weight accent"
                      data-mobile-font-size="epsilon"
                    >
                      Portland Resourcing
                    </h1>
                    <a
                      href="http://www.portlandresourcing.com"
                      className="eta external-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      portlandresourcing.com
                    </a>
                  </header>
                  <p className="eta" data-mobile-font-size="zeta">
                    Portland Resourcing approached the development team to take
                    over the maintenance of their existing site. They wanted to
                    keep the look and feel, whilst improving performance. We did
                    this by stripping away layers of bloat from things like
                    unnecessary jQuery, poorly written views and mismanaged
                    stylesheets.
                  </p>
                </div>
              </article>
            </div>
            <section className="gallery">
              <header>
                <h1 className="delta bold-weight accent">
                  Past projects gallery
                </h1>
                <p>
                  Here is a small selection of past projects as displayed on
                  various devices. Click for an expanded view.
                </p>
              </header>
              {renderGalleryItems(galleryItems.slice(0, 3), "primary")}
              {renderGalleryItems(galleryItems.slice(3), "secondary")}
            </section>
          </div>
        </section>
        <div className="wrap">
          <section className="about panel" id="about">
            <header className="section-header">
              <div className="padding">
                <h1 className="beta accent" data-mobile-font-size="gamma">
                  <span className="extra-bold-weight">About me</span>
                </h1>
                <p className="zeta">
                  Wikipedia have rejected my submission 9 times now, so
                  I&rsquo;ve decided to house it here instead.
                </p>
                <p className="zeta">Your loss, Jimmy Wales.</p>
              </div>
            </header>
            <section className="bio">
              <div className="column-one">
                <img src={aboutMe} alt="Ian Hatton" className="curve" />
                <p>
                  I live in beautiful Letchworth&mdash;the world&rsquo;s first
                  Garden City&reg;&mdash;with my loving family and two{" "}
                  <del>annoying </del>
                  adorable cats.
                </p>
                <p>
                  When I&rsquo;m not coding or thinking about the web, I&rsquo;m
                  likely to be found in the garden doing my best to channel my
                  inner Monty Don, in the kitchen making large vats of roasted
                  curry powder or tinkering with open tunings and blues & folk
                  fingerpicking on my parlour guitar.
                </p>
                <p>
                  I&rsquo;m also a big fan of sitting down. And sleeping.
                  Sleeping is the best.
                </p>
              </div>
            </section>
            <section className="last-fm" id="last-fm">
              <h1 className="zeta bold-weight accent">
                I&rsquo;ve been listening to these beauties:
              </h1>
              {renderRecentTracks()}
            </section>
            <section className="goodreads">
              <h1 className="zeta bold-weight accent">And reading these:</h1>
              <ul>
                <li>
                  <img
                    src="https://images.gr-assets.com/books/1390426249l/23807.jpg"
                    alt="The Silence of the Lambs"
                  />
                </li>
                <li>
                  <img
                    src="https://images.gr-assets.com/books/1309510797l/437149.jpg"
                    alt="American Psycho"
                  />
                </li>
              </ul>
            </section>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default withRouter(Home);
