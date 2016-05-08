var CollapsibleContentClass = require("./modules/collapsible_content")
  , HeaderModule = require("./modules/header")
  , LastfmModule = require("./modules/lastfm");

var collapsibleContent
  , header;

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