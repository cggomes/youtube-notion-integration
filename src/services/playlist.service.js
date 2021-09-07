const { retrievePlaylistData, mappedVideos } = require('../youtube/utils');

const NotionAPI = require('../notion/notion');
const YouTubeAPI = require('../youtube/youtube');

const youtubeAPI = new YouTubeAPI();
const notionAPI = new NotionAPI();

class PlaylistService {

  async getPlaylistsByChannelId(channelId) {
    const channel = await youtubeAPI.getChannel({ channelId });
    
    if (channel) {
      const playlists = await youtubeAPI.getPlaylists({ channelId: channel.id });
  
      if (playlists) {
        const mappedPlaylists = playlists.map(playlist => retrievePlaylistData(playlist));
        return mappedPlaylists;
      } else {
        throw new Error('This channel doesn\'t have playlists.');
      }
    } else {
      throw new Error('Channel not found.');
    }
  }

  async createNotionPlaylist(playlistId) {
    const videos = await youtubeAPI.getVideosFromPlaylist({ playlistId });
    const playlist = await youtubeAPI.getPlaylists({ id: playlistId });
    const playlistData = retrievePlaylistData(playlist[0]);
  
    await notionAPI.createNewToDoPlaylist({
      playlistData,
      videos: mappedVideos(videos),
    });
  }

}

module.exports = new PlaylistService();