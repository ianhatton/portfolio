var TabbedContentClass = require('@ianhatton/vanilla-tabbed-content');

var HeaderModule = require('./modules/header')
  , LastFmModule = require('./modules/lastfm')
  , ModalClass = require('./modules/modal')
  , SmoothScrollModule = require('./modules/smooth_scroll');

var header
  , lastFm
  , modalElements
  , primaryNavsmoothScroll
  , siteIntrosmoothScroll;

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
primaryNavsmoothScroll = SmoothScrollModule('primary-navigation');
siteIntrosmoothScroll = SmoothScrollModule('site-introduction');

if(primaryNavsmoothScroll) {
  primaryNavsmoothScroll.init();
}

if(siteIntrosmoothScroll) {
  siteIntrosmoothScroll.init();
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