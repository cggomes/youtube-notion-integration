require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

const PlaylistRoutes = require('./routes/playlist.routes');

new PlaylistRoutes({ app });

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});