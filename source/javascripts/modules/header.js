var _       = require('lodash/core');
_.includes  = require('lodash/includes');
_.isElement = require('lodash/isElement');

function addScrollListener() {
  window.addEventListener('scroll', toggleHeaderClass);
}

function toggleHeaderClass() {
  let className = header.className;

  if(window.scrollY <= 200) {
    if(_.includes(className, 'subtle')) {
      header.className = className.replace(/(?:^|\s)subtle(?!\S)/g, '');
    }
  } else {
    if(!_.includes(className, 'subtle')) {
      header.className += ' subtle';
    }
  }
}

module.exports = function(id) {
  let header, object;

  header = document.getElementById(id);

  if(!_.isElement(header)) return;

  object = {
    init: () => {
      console.log("init");
      addScrollListener();
    }
  }

  return object;
}