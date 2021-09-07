const { google } = require('googleapis');

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

class YouTubeAPI {

  getChannel({ channelId }) {
    return new Promise((resolve, reject) => {  
      youtube.channels.list({
        part: 'snippet',
        id: channelId,
      }, (err, response) => 
        err ? reject('The API returned an error: ' + err) : resolve(response.data.items ? response.data.items[0] : null)
      );
    });
  }

  getPlaylists({ channelId }) {
    return new Promise((resolve, reject) => {  
      youtube.playlists.list({
        channelId,
        part: 'snippet'
      }, (err, response) => 
        err ? reject('The API returned an error: ' + err) : resolve(response.data.items)
      );
    });
  }

  getVideosFromPlaylist({ playlistId }) {
    return new Promise((resolve, reject) => {
      youtube.playlistItems.list({
        playlistId,
        part: 'snippet'
      }, (err, response) => 
        err ? reject('The API returned an error: ' + err) : resolve(response.data.items)
      );
    });
  }

}

module.exports = YouTubeAPI;
