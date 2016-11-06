var _       = require('lodash/core');
_.isElement = require('lodash/isElement');
require('../vendor/javascript-last.fm-api/lastfm.api');

var holder, lastFm;
var recentTracks = [];

function createLastFmObject() {
  return new LastFM({
    apiKey    : 'b5a390f794f482bed0d69370f0236277',
    apiSecret : '3f1a9ee3617408ca91d59d2599917b74'
  });
}

function createRecentTracksList() {
  let ul = document.createElement('ul');

  createRecentTracksListItems(ul);
  
  holder.appendChild(ul);
}

function createRecentTracksListItems(ul) {
  let h2, h3, img, li;

  _.forEach(recentTracks, (recentTrack) => {
    h2 = document.createElement('h2');
    h3 = document.createElement('h3');
    img = document.createElement('img');
    li = document.createElement('li');

    h2.className = 'theta bold-weight';
    h3.className = 'theta';

    h2.innerHTML = recentTrack.name;
    h3.innerHTML = recentTrack.artist;
    img.src = recentTrack.image;

    img.src = getImage(recentTrack.image)

    li.appendChild(img);
    li.appendChild(h2);
    li.appendChild(h3);
    ul.appendChild(li);
  });

  return ul;
}

function getImage(path) {
  let src;
  console.log(src);

  if (path) {
    src = path;
  } else {
    src = "/images/pages/home/last_fm_artwork.png";
  }

  return src;
}

function getRecentTracks(lastFm) {
  lastFm.user.getRecentTracks({user: 'hawkeyehatton', limit: 5}, {success: function(data) {
    populateRecentTracksArray(data)
  }, error: function(code, message){
    /* Show error message. */
  }});
}

function populateRecentTracksArray(data) {
  let tracks = data.recenttracks.track;

  _.forEach(tracks, (track) => {
    if(_.isUndefined(track['@attr'])) {
      recentTracks.push({
        name: track.name,
        artist: track.artist['#text'],
        image: track.image[2]['#text']
      });
    }
  });

  createRecentTracksList();
}

module.exports = function(id) {
  let object;

  holder = document.getElementById(id);

  if (!_.isElement(holder)) return;

  object = {
    init: () => {
      lastFm = createLastFmObject();
      getRecentTracks(lastFm);
    }
  }

  return object;
}