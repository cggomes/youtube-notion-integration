const playlistController = require('../controllers/playlist.controller');

class PlaylistRoutes {

  constructor({ app }) {
    this.registerRoutes(app);
  }

  registerRoutes(app) {
    app.get('/playlists/channel/:id', playlistController.getPlaylistsByChannelId);
    app.post('/create-page/playlist/:id', playlistController.createNotionPlaylist);
  }

}

module.exports = PlaylistRoutes;