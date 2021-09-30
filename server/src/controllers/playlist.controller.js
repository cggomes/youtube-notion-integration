const PlaylistService = require('./../services/playlist.service');

class PlaylistController {

  async getPlaylistsByChannelId(req, res) {
    try {
      const channelId = req.params.id;
      const playlists = await PlaylistService.getPlaylistsByChannelId(channelId);

      res.status(200).json(playlists);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async createNotionPlaylist(req, res) {
    const playlistId = req.params.id;
    await PlaylistService.createNotionPlaylist(playlistId);

    res.status(201).send();
  }

}

module.exports = new PlaylistController();