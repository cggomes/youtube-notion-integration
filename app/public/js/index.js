const searchBtn = document.querySelector('.search__btn');
const input = document.querySelector('#search');
const playlists = document.querySelector('.playlists');


searchBtn.addEventListener('click', () => {
  if (input.value) {
    fetch(`http://localhost:3000/playlists/channel/${input.value}`)
      .then(res => res.json())
      .then(res => this.renderListItems(res));
  }
});

function renderListItems(playlists) {
  const playlistsTemplate = createListItems(res);

  playlists.innerHTML = `
      <h1>${res[0].channelTitle}<h1/>
      <ul>
        ${playlistsTemplate}
      </ul>
  `;
}

function createListItems(playlists) {
  return playlists.map((playlist) => `
      <li>
        Playlist: ${playlist.playlistTitle}
      </li>
    `
  ).join('')
}