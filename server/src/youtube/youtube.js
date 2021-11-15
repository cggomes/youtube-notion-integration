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

  getPlaylists({ channelId, id, pageToken = null }) {
    return new Promise((resolve, reject) => {  
      youtube.playlists.list({
        channelId,
        id,
        part: 'snippet',
        maxResults: 20,
        pageToken,
      }, (err, { data: { nextPageToken, items, pageInfo } }) => 
        err ? reject('The API returned an error: ' + err) : resolve({ items, nextPageToken, pageInfo })
      );
    });
  }

  getVideosFromPlaylist({ playlistId }) {
    return new Promise((resolve, reject) => {
      youtube.playlistItems.list({
        playlistId,
        part: 'snippet',
        maxResults: 50,
      }, (err, { data: { items, pageInfo: { totalResults } } }) => 
        err ? reject('The API returned an error: ' + err) : resolve({ items, totalResults })
      );
    });
  }

}

module.exports = YouTubeAPI;
