const searchBtn = document.getElementById('search');
const input = document.getElementById('searchInput');
const playlistsElement = document.querySelector('.playlists');
const searchIcon = document.querySelector('#search_icon');
const channelTitleElement = document.querySelector('#channelTitle');
const addBtn = document.querySelector('#add');
const cancelBtn = document.querySelector('#cancel');
const modal = document.querySelector('.modal');
const snackbar = document.querySelector('#snackbar');
const snackbarBackBtn = document.querySelector('#btn-snackbar-back');
const loader = document.querySelector('.loader');

// const API_URL = `http://localhost/playlists`;
const API_URL = 'https://youtube-notion.herokuapp.com/playlists';

let token = null;
let pageInformation = null;
let selectedPlaylistId = null;
let isAlreadyFetchingData = false;

let options = {
  rootMargin: '0px',
  threshold: 1.0
};

let observer = new IntersectionObserver(([ entry ]) => {
  if (entry.isIntersecting && hasNextPage() && !isAlreadyFetchingData) {
    isAlreadyFetchingData = true;
    retrievePlaylists();
  }
}, options);

observer.observe(document.getElementById('the-end'));


function verifyLayout() {
  if (window.location.search) {
    changeLayout();
    fillSearchInput();
    retrievePlaylists();
  }
}

function fillSearchInput() {
  const [ , channelId ] = window.location.search.split('=');
  input.value = channelId;
}

searchIcon.addEventListener('click', () => handleClick());
searchBtn.addEventListener('click', () => handleClick());
addBtn.addEventListener('click', () => handleAddPlaylist());
snackbarBackBtn.addEventListener('click', () => snackbar.classList.remove('snackbar--active'));

cancelBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  selectedPlaylistId = null;
});

function handleClick() {
  if (input.value) {
    changeUrlHistory();
    retrievePlaylists();
    changeLayout();
  }
};

function handleAddPlaylist() {
  if (selectedPlaylistId) {
    const loader = createLoader();
    const modalContent = document.querySelector('#modal-content');
    modalContent.appendChild(loader);
    hideModalContent();

    const headers = new Headers({ 'Content-Type': 'application/json' });

    fetch(`${API_URL}`, {
      method: 'POST',
      body: JSON.stringify({
        id: selectedPlaylistId,
      }),
      headers
    })
    .then(() => {
      modal.style.display = 'none';
      modalContent.removeChild(loader);
      showModalContent();
      snackbar.classList.add('snackbar--active');

      setTimeout(() => {
        snackbar.classList.remove('snackbar--active');
      }, 2000);
    });
  }
}

function hideModalContent() {
  document.querySelector('#modal-footer').style.display = 'none';
  document.querySelector('#modal-header').style.display = 'none';
}

function showModalContent() {
  document.querySelector('#modal-footer').style.display = 'flex';
  document.querySelector('#modal-header').style.display = 'block';
}

function createLoader() {
  const loader = document.createElement('div');
  loader.classList.add('loader');

  return loader;
}

function changeUrlHistory() {
  const url = new URL(window.location);
  url.searchParams.set('channelId', input.value);
  history.pushState({}, '', url);
}

function retrieveAllItemsFromHtml() {
  return document.querySelectorAll('li[class="item"]');
}

function loadEventListenersPlaylistItem() {
  const playlistItems = retrieveAllItemsFromHtml();

  playlistItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      selectedPlaylistId = e.target.getAttribute('data-id');
      modal.style.display = 'block';
    });
  });
}

function storeTokenAndPage({ nextPageToken, pageInfo }) {
  token = nextPageToken;
  pageInformation = pageInfo;
}

function hasNextPage() {
  return pageInformation && token && retrieveAllItemsFromHtml().length < pageInformation.totalResults;
}

function retrievePlaylists() {
  showLoader();
  let url = `${API_URL}/channel/${input.value}`;

  if (hasNextPage()) {
    url += `?nextPageToken=${token}`;
  }

  fetch(url)
    .then(res => res.json())
    .then(res => {
      storeTokenAndPage(res);
      return res;
    })
    .then(res => renderListItems(res))
    .then(() => hideLoader())
    .then(() => loadEventListenersPlaylistItem())
    .then(() => this.isAlreadyFetchingData = false)
    ;
}

function changeLayout() {
  document.querySelector('.github-description').classList.add('result-list');
  document.querySelector('.search').classList.add('result-list');
  document.querySelector('footer').classList.add('result-list');
  document.querySelector('.search-result').classList.add('result-list');
  document.querySelector('.header').classList.add('result-list');
}

const cardTemplate = ({ id, playlistTitle, channelTitle, publishedAt, thumbnailSrc }) => (
  `
    <li data-id="${id}" class="item">
      <a href="#" class="card" data-id="${id}">
        <img data-id="${id}" class="card__img" src="${thumbnailSrc}" alt="Playlist thumbnail">

        <h1 data-id="${id}" class="card__title">${playlistTitle}</h1>

        <div data-id="${id}" class="card__details">
          <p data-id="${id}">
            Youtube • 
            <span data-id="${id}">${channelTitle}</span> <br />
          </p>
          <span data-id="${id}">${publishedAt}</span>
        </div>
      </a>
    </li>
  `
);

function createListItems(playlists) {
  return playlists.map(playlist => cardTemplate(playlist)).join('');
}

function renderListItems({ items }) {
  const playlistsTemplate = createListItems(items);
  playlistsElement.innerHTML += playlistsTemplate;
  channelTitleElement.textContent = items[0].channelTitle;
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

verifyLayout();