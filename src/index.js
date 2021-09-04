require('dotenv').config();

const { google } = require('googleapis');

const retrieveDataFromUser = require('./utils/userInputUtil');
const YoutubeAuth = require('./auth/youtubeAuth');
const FileUtil = require('./utils/fileUtil');
const YouTubeAPI = require('./api/youtube');
const NotionAPI = require('./api/notion');
const { retrievePlaylistData, mappedVideos } = require('./youtube/utils');

const youtubeAuth = new YoutubeAuth({ google });
const youtubeAPI = new YouTubeAPI({ google });
const notionAPI = new NotionAPI();

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
    const playlistData = retrievePlaylistData(playlists[0]);
    const videos = await youtubeAPI.getVideosFromPlaylist({ auth, playlistId: playlistData.id });

    notionAPI.createNewToDoPlaylist({
      playlistData,
      videos: mappedVideos(videos),
    });
  }

})();
