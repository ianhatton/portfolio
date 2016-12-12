var TabbedContentClass = require('@ianhatton/vanilla-tabbed-content');

var HeaderModule = require('./modules/header')
  , LastFmModule = require('./modules/lastfm')
  , ModalClass = require('./modules/modal')
  , SmoothScrollModule = require('./modules/smooth_scroll')
  , TopButtonModule = require('./modules/top_button');

var header
  , lastFm
  , modalElements
  , primaryNavSmoothScroll
  , siteIntroSmoothScroll
  , topButton
  , topButtonSmoothScroll;

// Header
header = HeaderModule('header');

if(header) {
  header.init();
}
// End Header

// LastFm
lastFm = LastFmModule('last-fm');

if(lastFm) {
  lastFm.init();
}
// End LastFm

// Modals
modalElements = document.querySelectorAll('.modal');

if (modalElements.length > 0){
  let modal = _.map(modalElements, (m)=>{
    return new ModalClass({
      element: m
    });
  });
}
// End Modals

// Smooth Scroll
primaryNavSmoothScroll = SmoothScrollModule('primary-navigation');
siteIntroSmoothScroll = SmoothScrollModule('site-introduction');
topButtonSmoothScroll = SmoothScrollModule('button-top');

if(primaryNavSmoothScroll) {
  primaryNavSmoothScroll.init();
}

if(siteIntroSmoothScroll) {
  siteIntroSmoothScroll.init();
}

if(topButtonSmoothScroll) {
  topButtonSmoothScroll.init();
}
// End Smooth Scroll

// Tabbed Content
var tabbedContentElements = document.querySelectorAll('.tabbed-content');

if (tabbedContentElements.length > 0){
  let tabbedContent = _.map(tabbedContentElements, function(tc){
    return new TabbedContentClass({
      element: tc
      , bodyContainerClass: 'tabbed-content-body'
      , navContainerClass: 'tabbed-content-nav'
    });
  });
}
// End Tabbed Content

// Top button
topButton = TopButtonModule('button-top');

if(topButton) {
  topButton.init();
}
// End Top button