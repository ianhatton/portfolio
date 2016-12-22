var _       = require('lodash/core');
_.isElement = require('lodash/isElement');

function _addNavItemClickListeners(navItem, element){
  /* eslint-disable max-len */
  navItem.addEventListener('click', _navItemClick.bind(this, navItem, element), false);
  /* eslint-enable */
}

function _checkNavItemHrefs(navItems){
  let element, href;

  _.forEach(navItems, (navItem)=>{
    href = navItem.getAttribute('href');

    if (href.charAt(0 === '#')){
      element = _getNavItemPair(href);

      if (element){
        _addNavItemClickListeners(navItem, element);
      }
    }
  });
}

function _getNavItemPair(href){
  let id = href.substring(1);
  let element = document.getElementById(id);

  if (!_.isElement(element)) return;

  return element;
}

function _getNavItems(navigation){
  let navItems = navigation.getElementsByTagName('a');

  return navItems;
}

function _navItemClick(navItem, element, e){
  e.preventDefault();

  let windowTop = window.scrollY;
  let elementTop = element.offsetTop;
  let distance = Math.abs(windowTop - elementTop);

  _scroll(windowTop, elementTop, distance / 6);
}

function _scroll(from, to, duration){
  let start = new Date().getTime();

  let timer = setInterval(()=>{
    let step = Math.min(1, (new Date().getTime() - start) / duration);
    let endPoint = (from + step * (to - from));

    window.scroll(0, endPoint);

    if (step === 1){
      clearInterval(timer);
    }
  }, 10);
}

module.exports = function(id){
  let navigation, navItems, object;

  navigation = document.getElementById(id);

  if (!_.isElement(navigation)) return;

  object = {
    init: ()=>{
      navItems = _getNavItems(navigation);
      _checkNavItemHrefs(navItems);
    }
  };

  return object;
};
