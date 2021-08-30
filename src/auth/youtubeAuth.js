const readline = require('readline');
const fs = require('fs');

class YoutubeAuth {

  constructor({ google }) {
    this.google = google;
    this.scopes = ['https://www.googleapis.com/auth/youtube.readonly'];
    this.TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
    this.TOKEN_PATH = this.TOKEN_DIR + 'youtube-nodejs-quickstart.json';
  }

  authorize({ client_secret, client_id, redirect_url, callback }) {
    const oauth2Client = new this.google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_url
    );

    fs.readFile(this.TOKEN_PATH, (err, token) => {
      if (err) {
        this.getNewToken(oauth2Client, callback);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        callback(oauth2Client);
      }
    });
  }

  getNewToken(oauth2Client, callback) {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.scopes,
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oauth2Client.getToken(code, (err, token) => {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token;
        this.storeToken(token);
        callback(oauth2Client);
      });
    });
  }

  storeToken(token) {
    try {
      fs.mkdirSync(this.TOKEN_DIR);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(this.TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) throw err;
      console.log('Token stored to ' + this.TOKEN_PATH);
    });
  }

}

module.exports = YoutubeAuth;