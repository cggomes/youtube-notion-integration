const { describe, test, expect } = require('@jest/globals');
const playlistService = require('../src/services/playlist.service');

const PlaylistController = require('./../src/controllers/playlist.controller');

describe('#PlaylistController', () => {
  const request = {
    params: {
      id: '1'
    },
    query: {}
  };

  const jsonFn = jest.fn();
  const sendFn = jest.fn();
  const response = {
    status: jest.fn().mockImplementation(() => ({ json: jsonFn, send: sendFn })),
  };

  describe('#getPlaylistsByChannelId', () => {
    test('should return playlists with status 200', async () => {
      jest.spyOn(playlistService, playlistService.getPlaylistsByChannelId.name).mockResolvedValue([{ playlistTitle: 1 }])

      await PlaylistController.getPlaylistsByChannelId(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(jsonFn).toBeCalledWith([{ playlistTitle: 1 }]);
    });

    test('should return status 400 when service throw an error', async () => {
      jest.spyOn(playlistService, playlistService.getPlaylistsByChannelId.name).mockRejectedValue({ message: 'Channel not found' })

      await PlaylistController.getPlaylistsByChannelId(request, response);

      expect(response.status).toHaveBeenCalledWith(400);
      expect(jsonFn).toBeCalledWith({ message: 'Channel not found' });
    });
  });

  describe('#createNotionPlaylist', () => {
    test('should create a notion page with status 201', async () => {
      jest.spyOn(playlistService, playlistService.createNotionPlaylist.name).mockResolvedValue()

      await PlaylistController.createNotionPlaylist(request, response);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(sendFn).toBeCalled();
    });
  });

});