var ModalClass = require('@ianhatton/vanilla-modal')
  , TabbedContentClass = require('@ianhatton/vanilla-tabbed-content');

var HeaderModule = require('./modules/header')
  , LastFmModule = require('./modules/lastfm')
  , SmoothScrollModule = require('./modules/smooth_scroll')
  , TopLinkModule = require('./modules/top_link');

var header
  , lastFm
  , modalElements
  , primaryNavSmoothScroll
  , siteIntroSmoothScroll
  , topLink
  , topLinkSmoothScroll;

// Header
header = HeaderModule('header');

if (header){
  header.init();
}
// End Header

// LastFm
lastFm = LastFmModule('last-fm');

if (lastFm){
  lastFm.init();
}
// End LastFm

// Modals
modalElements = document.querySelectorAll('.modal');

if (modalElements.length > 0){
  Array.from(modalElements).map((element)=>{
    return new ModalClass({
      element: element
    });
  });
}
// End Modals

// Smooth Scroll
primaryNavSmoothScroll = SmoothScrollModule('primary-navigation');
siteIntroSmoothScroll = SmoothScrollModule('site-introduction');
topLinkSmoothScroll = SmoothScrollModule('top-link');

if (primaryNavSmoothScroll){
  primaryNavSmoothScroll.init();
}

if (siteIntroSmoothScroll){
  siteIntroSmoothScroll.init();
}

if (topLinkSmoothScroll){
  topLinkSmoothScroll.init();
}
// End Smooth Scroll

// Tabbed Content
var tabbedContentElements = document.querySelectorAll('.tabbed-content');

if (tabbedContentElements.length > 0){
  Array.from(tabbedContentElements).map((element)=>{
    return new TabbedContentClass({
      element: element
      , bodyContainerClass: 'tabbed-content-body'
      , navContainerClass: 'tabbed-content-nav'
    });
  });
}
// End Tabbed Content

// Top link
topLink = TopLinkModule('top-link');

if (topLink){
  topLink.init();
}
// End Top link
