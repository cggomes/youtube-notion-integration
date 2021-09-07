require('dotenv').config();

const retrieveDataFromUser = require('./utils/userInputUtil');
const YouTubeAPI = require('./api/youtube');
const NotionAPI = require('./api/notion');
const { retrievePlaylistData, mappedVideos } = require('./youtube/utils');

const youtubeAPI = new YouTubeAPI();
const notionAPI = new NotionAPI();

(async () => {
  const channelId = await retrieveDataFromUser('Enter the channel id: ');
  const channel = await youtubeAPI.getChannel({ channelId });

  if (channel) {
    const playlists = await youtubeAPI.getPlaylists({ channelId: channel.id });
  
    if (playlists) {
      const playlistData = retrievePlaylistData(playlists[0]);
      const videos = await youtubeAPI.getVideosFromPlaylist({ playlistId: playlistData.id });
  
      await notionAPI.createNewToDoPlaylist({
        playlistData,
        videos: mappedVideos(videos),
      });
  
      console.log('Playlist sucessfully added!');
    }
  }
})();
