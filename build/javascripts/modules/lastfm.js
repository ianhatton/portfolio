require("../vendor/javascript-last.fm-api/lastfm.api");

var _       = require('lodash/core');

var lastfm = new LastFM({
  apiKey    : 'b5a390f794f482bed0d69370f0236277',
  apiSecret : '3f1a9ee3617408ca91d59d2599917b74'
});

lastfm.user.getRecentTracks({user: 'hawkeyehatton'}, {success: function(data){
  var tracks = data.recenttracks.track;

  _.forEach(tracks, (track) => {
    console.log(track)
  });

}, error: function(code, message){
  /* Show error message. */
}});