const { google } = require('googleapis');

const YoutubeAuth = require('./auth/youtubeAuth');
const FileUtil = require('./utils/fileUtil');
const YouTubeAPI = require('./api/youtube');

const youtubeAuth = new YoutubeAuth({ google });
const youtubeAPI = new YouTubeAPI({ google });

(async () => {
  const clientSecret = await FileUtil.readFile('client_secret.json');

  youtubeAuth.authorize({
    client_id: clientSecret.installed.client_id,
    client_secret: clientSecret.installed.client_secret,
    redirect_url: clientSecret.installed.redirect_uris[0],
    callback: youtubeAPI.getChannel.bind(youtubeAPI),
  });
})();
