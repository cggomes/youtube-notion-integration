const { retrievePlaylistData, mappedVideos } = require('../youtube/utils');

const NotionAPI = require('../notion/notion');
const YouTubeAPI = require('../youtube/youtube');

class PlaylistService {

  constructor() {
    this.youtubeAPI = new YouTubeAPI();
    this.notionAPI = new NotionAPI();
  }

  async getPlaylistsByChannelId(channelId) {
    const channel = await this.youtubeAPI.getChannel({ channelId });
    
    if (channel) {
      const playlists = await this.youtubeAPI.getPlaylists({ channelId: channel.id });
  
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
    const videos = await this.youtubeAPI.getVideosFromPlaylist({ playlistId });
    const playlist = await this.youtubeAPI.getPlaylists({ id: playlistId });
    const playlistData = retrievePlaylistData(playlist[0]);
  
    await this.notionAPI.createNewToDoPlaylist({
      playlistData,
      videos: mappedVideos(videos),
    });
  }

}

module.exports = new PlaylistService();