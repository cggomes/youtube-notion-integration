require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;

const YouTubeAPI = require('./api/youtube');
const NotionAPI = require('./api/notion');
const { retrievePlaylistData, mappedVideos } = require('./youtube/utils');

const youtubeAPI = new YouTubeAPI();
const notionAPI = new NotionAPI();

app.get('/playlists/channel/:id', async (req, res) => {
  const channelId = req.params.id;
  const channel = await youtubeAPI.getChannel({ channelId });
  
  if (channel) {
    const playlists = await youtubeAPI.getPlaylists({ channelId: channel.id });

    if (playlists) {
      const mappedPlaylists = playlists.map(playlist => retrievePlaylistData(playlist));
      res.status(200).json(mappedPlaylists);
    } else {
      res.status(400).json({ message: 'This channel doesn\'t have playlists.' });
    }
  } else {
    res.status(400).json({ message: 'Channel not found.' });
  }
});

app.post('/create-page/playlist/:id', async (req, res) => {
  const playlistId = req.params.id;
  const videos = await youtubeAPI.getVideosFromPlaylist({ playlistId });
  const playlist = await youtubeAPI.getPlaylists({ id: playlistId });
  const playlistData = retrievePlaylistData(playlist[0])

  await notionAPI.createNewToDoPlaylist({
    playlistData,
    videos: mappedVideos(videos),
  });

  res.status(201).send();
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});