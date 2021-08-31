const { google } = require('googleapis');

const retrieveDataFromUser = require('./utils/userInputUtil');
const YoutubeAuth = require('./auth/youtubeAuth');
const FileUtil = require('./utils/fileUtil');
const YouTubeAPI = require('./api/youtube');

const youtubeAuth = new YoutubeAuth({ google });
const youtubeAPI = new YouTubeAPI({ google });

(async () => {
  const clientSecret = await FileUtil.readFile('client_secret.json');

  const auth = await youtubeAuth.authorize({
    client_id: clientSecret.installed.client_id,
    client_secret: clientSecret.installed.client_secret,
    redirect_url: clientSecret.installed.redirect_uris[0],
  });

  
  const channelId = await retrieveDataFromUser('Enter the channel id: ');
  const channels = await youtubeAPI.getChannels({ auth, channelId });
  const playlists = await youtubeAPI.getPlaylists({ auth, channelId: channels[0].id });

  if (playlists) {
    const videos = await youtubeAPI.getVideosFromPlaylist({ auth, playlistId: playlists[0].id });
    console.log(videos);
  }

})();
