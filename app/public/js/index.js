const searchBtn = document.getElementById('search');
const input = document.getElementById('searchInput');
const playlistsElement = document.querySelector('.playlists');
const searchIcon = document.querySelector('#search_icon');

function verifyLayout() {
  if (window.location.search) {
    changeLayout();
    fillSearchInput();
    loadPlaylists();
  }
}

function fillSearchInput() {
  const [ , channelId ] = window.location.search.split('=');
  input.value = channelId;
}

searchIcon.addEventListener('click', () => handleClick());
searchBtn.addEventListener('click', () => handleClick());

function handleClick() {
  if (input.value) {
    changeUrlHistory();
    loadPlaylists();
    changeLayout();
  }
};

function changeUrlHistory() {
  const url = new URL(window.location);
  url.searchParams.set('channelId', input.value);
  history.pushState({}, '', url);
}

function loadEventListenersPlaylistItem() {
  const playlistItems = document.querySelectorAll('li[class="item"]');

  playlistItems.forEach(item => {
    item.addEventListener('click', e => console.log(e));
  });
}

function loadPlaylists() {
  fetch(`http://localhost/playlists/channel/${input.value}`)
    .then(res => res.json())
    .then(res => this.renderListItems(res))
    .then(() => loadEventListenersPlaylistItem());
}

function changeLayout() {
  document.querySelector('.github-description').classList.add('result-list');
  document.querySelector('.search').classList.add('result-list');
  document.querySelector('footer').classList.add('result-list');
  document.querySelector('.search-result').classList.add('result-list');
}

// TODO: missing uploadTime and imageSrc
const cardTemplate = ({ id, playlistTitle, channelTitle, uploadTime, imageSrc }) => (
  `
    <li class="item">
      <a class="card" data-id="${id}">
        <img class="card__img" src="${imageSrc}" alt="Playlist thumbnail">

        <h1 class="card__title">${playlistTitle}</h1>

        <div class="card__details">
          <p>
            Youtube * 
            <span>${channelTitle}</span> <br />
          </p>
          <span>${uploadTime}</span>
        </div>
      </a>
    </li>
  `
);

function createListItems(playlists) {
  return playlists.map(playlist => cardTemplate(playlist)).join('');
}

function renderListItems(playlists) {
  const playlistsTemplate = createListItems(playlists);
  playlistsElement.innerHTML = playlistsTemplate;
}

verifyLayout();