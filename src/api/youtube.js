class YouTubeAPI {

  constructor({ google }) {
    this.google = google;
  }

  getChannels({ auth, channelId }) {
    return new Promise((resolve, reject) => {
      const service = this.google.youtube('v3');
  
      service.channels.list({
        auth: auth,
        part: 'snippet,contentDetails,statistics',
        id: channelId,
      }, (err, response) => 
        err ? reject('The API returned an error: ' + err) : resolve(response.data.items)
      );
    });
  }

  getPlaylists({ auth, channelId }) {
    return new Promise((resolve, reject) => {
      const service = this.google.youtube('v3');
  
      service.playlists.list({
        channelId,
        auth,
        part: 'snippet'
      }, (err, response) => 
        err ? reject('The API returned an error: ' + err) : resolve(response.data.items)
      );
    });
  }

  getVideosFromPlaylist({ auth, playlistId }) {
    return new Promise((resolve, reject) => {
      const service = this.google.youtube('v3');
  
      service.playlistItems.list({
        playlistId,
        auth,
        part: 'contentDetails,snippet'
      }, (err, response) => 
        err ? reject('The API returned an error: ' + err) : resolve(response.data.items)
      );
    });
  }

}

module.exports = YouTubeAPI;
