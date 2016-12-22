var _       = require('lodash/core');
_.includes  = require('lodash/includes');
_.isElement = require('lodash/isElement');

var link;

function addScrollListener(){
  window.addEventListener('scroll', toggleLinkClass);
}

function toggleLinkClass(){
  let className = link.className;

  if (window.scrollY > 1364){
    if (!_.includes(className, 'visible')){
      link.className += ' visible';
    }
  } else if (_.includes(className, 'visible')){
    link.className = className.replace(/(?:^|\s)visible(?!\S)/g, '');
  }
}

module.exports = function(elementId){
  let object;

  link = document.getElementById(elementId);

  if (!_.isElement(link)) return;

  object = {
    init: ()=>{
      addScrollListener();
    }
  };

  return object;
};
