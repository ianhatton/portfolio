var CollapsibleContentClass = require('@ianhatton/vanilla-collapsible-content')
  , TabbedContentClass = require('@ianhatton/vanilla-tabbed-content');

var HeaderModule = require('./modules/header')
  , LastFmModule = require('./modules/lastfm')
  , SmoothScrollModule = require('./modules/smooth_scroll');

var collapsibleContent
  , header
  , lastFm
  , primaryNavsmoothScroll
  , siteIntrosmoothScroll;

// Collapsible Content
collapsibleContent = document.querySelectorAll('.collapsible-content');

if(collapsibleContent.length > 0) {
  _.forEach(collapsibleContent, function(cc) {
    new CollapsibleContentClass({
      element: cc,
      bodyContainerClass: 'collapsible-content-body',
      itemContainerClass: 'collapsible-content-item',
      toggleContainerClass: 'collapsible-content-toggle',
      expanded: true
    });
  });
}
// End Collapsible Content

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