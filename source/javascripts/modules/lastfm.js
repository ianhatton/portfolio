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
  let h2, h3, img, li, span;

  _.forEach(recentTracks, (recentTrack) => {
    h2 = document.createElement('h2');
    img = document.createElement('img');
    li = document.createElement('li');
    span = document.createElement('span');

    h2.className = 'theta';
    span.className = 'bold-weight';

    span.innerHTML = recentTrack.artist;
    h2.appendChild(span);
    h2.innerHTML += ` - ${recentTrack.name}`;
    img.src = getImage(recentTrack.image)

    li.appendChild(img);
    li.appendChild(h2);
    ul.appendChild(li);
  });

  return ul;
}

function getImage(path) {
  let src;

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