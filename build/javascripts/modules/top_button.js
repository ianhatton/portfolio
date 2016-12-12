var _       = require('lodash/core');
_.includes  = require('lodash/includes');
_.isElement = require('lodash/isElement');

var button;

function addScrollListener(){
  window.addEventListener('scroll', toggleButtonClass);
}

function toggleButtonClass(){
  let className = button.className;

  if (window.scrollY > 1364){
    if (!_.includes(className, 'visible')){
      button.className += ' visible';
    }
  } else {
    if (_.includes(className, 'visible')){
      button.className = className.replace(/(?:^|\s)visible(?!\S)/g, '');
    }
  }
}

module.exports = function(elementId){
  let object;

  button = document.getElementById(elementId);

  if (!_.isElement(button)) return;

  object = {
    init: ()=>{
      addScrollListener();
    }
  }

  return object;
}
