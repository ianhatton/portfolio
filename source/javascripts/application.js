require('babel-polyfill');

const ModalClass = require('@ianhatton/vanilla-modal');

const HeaderModule = require('./modules/header')
  , LastFmModule = require('./modules/lastfm')
  , SmoothScrollModule = require('./modules/smooth_scroll')
  , TopLinkModule = require('./modules/top_link');

import Aparecium from './modules/aparecium';

// Header
const header = HeaderModule('header');

if (header){
  header.init();
}
// End Header

// LastFm
const lastFm = LastFmModule('last-fm');

if (lastFm){
  lastFm.init();
}
// End LastFm

// Modals
const modalElements = document.querySelectorAll('.modal');

if (modalElements.length > 0){
  Array.from(modalElements).map((element)=>{
    return new ModalClass({
      element: element
    });
  });
}
// End Modals

// End Skills
const skills = Aparecium('skills');

if (skills){
  skills.init({
    hideOthersOnClick: true
    , hideSelfOnClick: false
  });
}
// End Skills

// Smooth Scroll
const primaryNavSmoothScroll = SmoothScrollModule('primary-navigation');
const siteIntroSmoothScroll = SmoothScrollModule('site-introduction');
const topLinkSmoothScroll = SmoothScrollModule('top-link');

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

// Top link
const topLink = TopLinkModule('top-link');

if (topLink){
  topLink.init();
}
// End Top link
