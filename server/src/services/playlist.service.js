const { retrievePlaylistData, mappedVideos } = require('../youtube/utils');

const NotionAPI = require('../notion/notion');
const YouTubeAPI = require('../youtube/youtube');

class PlaylistService {

  constructor() {
    this.youtubeAPI = new YouTubeAPI();
    this.notionAPI = new NotionAPI();
  }

  async getPlaylistsByChannelId(channelId, pageToken) {
    const channel = await this.youtubeAPI.getChannel({ channelId });
    
    if (channel) {
      const { items, nextPageToken, pageInfo } = await this.youtubeAPI.getPlaylists({ channelId: channel.id, pageToken });
  
      if (items) {
        const mappedItems = items.map(data => retrievePlaylistData(data));
        return {
          items: mappedItems,
          nextPageToken,
          pageInfo,
        };
      } else {
        throw new Error('This channel doesn\'t have playlists.');
      }
    } else {
      throw new Error('Channel not found.');
    }
  }

  async createNotionPlaylist(playlistId) {
    const videos = await this.youtubeAPI.getVideosFromPlaylist({ playlistId });
    const { items: [ playlist ] } = await this.youtubeAPI.getPlaylists({ id: playlistId });
    const playlistData = retrievePlaylistData(playlist);
  
    await this.notionAPI.createNewToDoPlaylist({
      playlistData,
      videos: mappedVideos(videos),
    });
  }

}

module.exports = new PlaylistService();