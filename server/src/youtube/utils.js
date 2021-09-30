module.exports.retrievePlaylistData = (playlist) => {
  return {
    id: playlist.id,
    playlistTitle: playlist.snippet.title,
    channelTitle: playlist.snippet.channelTitle,
  };
};

module.exports.mappedVideos = (videos) => {
  return videos.map(video => {
    return {
      videoTitle: video.snippet.title,
      position: video.snippet.position,
    };
  })
};