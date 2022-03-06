require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 80;

const allowedUrls = JSON.parse(process.env.ALLOWED_URLS);

if (!Array.isArray(allowedUrls)) {
  throw Error('Allowed urls must be set as an array!');
}

app.use(cors({ origin: allowedUrls }));
app.use(express.json());

const PlaylistRoutes = require('./routes/playlist.routes');

new PlaylistRoutes({ app });

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});