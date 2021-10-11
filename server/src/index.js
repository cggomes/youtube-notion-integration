require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 80;

app.use(cors({
  origin: [ 'http://127.0.0.1:5500', 'https://youtube-notion.herokuapp.com/' ]
}))

const PlaylistRoutes = require('./routes/playlist.routes');

new PlaylistRoutes({ app });

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});