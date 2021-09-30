const { describe, test, expect } = require('@jest/globals');

const PlaylistService = require('../src/services/playlist.service');

describe('#PlaylistService', () => {
  const playlistDetails = {
    id: '123',
    snippet: {
      title: 'Test',
      channelTitle: 'Test Title Channel'
    },
  };

  describe('#getPlaylistsByChannelId', () => {
    test('should return a playlist by channel id', async () => {
      const channelId = '123';
  
      jest.spyOn(PlaylistService.youtubeAPI, PlaylistService.youtubeAPI.getChannel.name)
        .mockResolvedValue({ id: 123 });
      jest.spyOn(PlaylistService.youtubeAPI, PlaylistService.youtubeAPI.getPlaylists.name)
        .mockResolvedValue([ { ...playlistDetails } ]);
  
      const playlists = await PlaylistService.getPlaylistsByChannelId(channelId);
  
      expect(playlists.length).toBe(1);
  
      const playlist = playlists[0];
  
      expect(playlist.id).toBe('123');
      expect(playlist.channelTitle).toBe('Test Title Channel');
      expect(playlist.playlistTitle).toBe('Test');
    });

    test('should throw an error when no one channel is returned', async () => {
      const channelId = '123';
  
      jest.spyOn(PlaylistService.youtubeAPI, PlaylistService.youtubeAPI.getChannel.name)
        .mockResolvedValue(null);
  
      await expect(PlaylistService.getPlaylistsByChannelId(channelId)).rejects.toThrowError('Channel not found.');
    });

    test('should throw an error when no one playlist is returned', async () => {
      const channelId = '123';
  
      jest.spyOn(PlaylistService.youtubeAPI, PlaylistService.youtubeAPI.getChannel.name)
        .mockResolvedValue({ id: 123 });
      jest.spyOn(PlaylistService.youtubeAPI, PlaylistService.youtubeAPI.getPlaylists.name)
        .mockResolvedValue(null);
  
      await expect(PlaylistService.getPlaylistsByChannelId(channelId)).rejects.toThrowError('This channel doesn\'t have playlists.');
    });
  });

  describe('#createNotionPlaylist', () => {
    test('it should create a page in notion', async () => {
      jest.spyOn(PlaylistService.youtubeAPI, PlaylistService.youtubeAPI.getVideosFromPlaylist.name)
        .mockResolvedValue([{ snippet: { title: 'Title', position: 'Pos' } }]);

      jest.spyOn(PlaylistService.youtubeAPI, PlaylistService.youtubeAPI.getPlaylists.name)
        .mockResolvedValue([ { ...playlistDetails } ]);

      jest.spyOn(PlaylistService.notionAPI, PlaylistService.notionAPI.createNewToDoPlaylist.name).mockResolvedValue();

      await PlaylistService.createNotionPlaylist();

      expect(PlaylistService.notionAPI.createNewToDoPlaylist)
        .toHaveBeenCalledWith({
          playlistData: {
            id: '123',
            playlistTitle: 'Test',
            channelTitle: 'Test Title Channel'
          },
          videos: [
            { videoTitle: 'Title', position: 'Pos' }
          ]
        });
    });
  });
});