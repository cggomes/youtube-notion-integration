class YouTubeAPI {

  constructor({ google }) {
    this.google = google;
  }

  getChannel({ auth, channelId }) {
    const service = this.google.youtube('v3');

    service.channels.list({
      auth: auth,
      part: 'snippet,contentDetails,statistics',
      id: channelId,
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      const channels = response.data.items;
      if (channels.length == 0) {
        console.log('No channel found.');
      } else {
        console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
                    'it has %s views.',
                    channels[0].id,
                    channels[0].snippet.title,
                    channels[0].statistics.viewCount);
      }
    });
  }

}

module.exports = YouTubeAPI;
