// Initial Values
const INITIAL_SEARCH_VALUE = "";
const log = console.log;

// Selecting elements from the DOM
const searchButton = document.querySelector("#search");
const searchInput = document.querySelector("#exampleInputEmail1");
const tvContainer = document.querySelector("#tv-container");
const tvSearchable = document.querySelector("#tv-searchable");

function createImageContainer(imageUrl, id) {
  const tempDiv = document.createElement("div");
  tempDiv.setAttribute("class", "imageContainer");
  tempDiv.setAttribute("data-id", id);

  const tvElement = `
        <img src="${imageUrl}" alt="" data-tv-id="${id}">
    `;
  tempDiv.innerHTML = tvElement;

  return tempDiv;
}

function resetInput() {
  searchInput.value = "";
}

function handleGeneralError(error) {
  log("Error:", error.message);
  console.log("Error:", error.message);
  error.message || "Internal Server";
}

function createIframe(video) {
  const videoKey = (video && video.key) || "No key found!!!";
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${videoKey}`;
  iframe.width = 360;
  iframe.height = 315;
  iframe.allowFullscreen = true;
  return iframe;
}

function insertIframeIntoContent(video, content) {
  const videoContent = document.createElement("div");
  const iframe = createIframe(video);

  videoContent.appendChild(iframe);
  content.appendChild(videoContent);
}

function createVideoTemplate(data) {
  const content = this.content;
  content.innerHTML = '<p id="content-close">X</p>';

  const videos = data.results || [];

  if (videos.length === 0) {
    content.innerHTML = `
            <p id="content-close">X</p>
            <p>Sorry we could not find any trailer for this video id of ${data.id}</p>
        `;
    return;
  }

  for (let i = 0; i < 4; i++) {
    const video = videos[i];
    insertIframeIntoContent(video, content);
  }
}

function createSectionHeader(title) {
  const header = document.createElement("h2");
  header.innerHTML = title;

  return header;
}

function renderTv(data) {
  const tvBlock = generateTvBlock(data);
  const header = createSectionHeader(this.title);
  tvBlock.insertBefore(header, tvBlock.firstChild);
  tvContainer.appendChild(tvBlock);
}

function renderSearchTv(data) {
  tvSearchable.innerHTML = "";
  const tvBlock = generateTvBlock(data);
  tvSearchable.appendChild(tvBlock);
}

function generateTvBlock(data) {
  const tv = data.results;
  const section = document.createElement("section");
  section.setAttribute("class", "section");

  for (let i = 0; i < tv.length; i++) {
    const { poster_path, id } = tv[i];

    if (poster_path) {
      const imageUrl = MOVIE_DB_IMAGE_ENDPOINT + poster_path;

      const imageContainer = createImageContainer(imageUrl, id);
      section.appendChild(imageContainer);
    }
  }

  const tvSectionAndContent = createTvContainer(section);
  return tvSectionAndContent;
}

// Inserting section before content element
function createTvContainer(section) {
  const tvElement = document.createElement("div");
  tvElement.setAttribute("class", "tv");

  const template = `
        <div class="content">
            <p id="content-close">X</p>
        </div>
    `;

  tvElement.innerHTML = template;
  tvElement.insertBefore(section, tvElement.firstChild);
  return tvElement;
}

searchButton.onclick = function (event) {
  event.preventDefault();
  const value = searchInput.value;

  if (value) {
    searchTv(value);
  }
  resetInput();
};

// Click on any tv
// Event Delegation
document.onclick = function (event) {
  log("Event: ", event);
  const { tagName, id } = event.target;
  if (tagName.toLowerCase() === "img") {
    const tvId = event.target.dataset.tvId;

    const section = event.target.parentElement.parentElement;
    const content = section.nextElementSibling;
    content.classList.add("content-display");
    getVideosByTvId(tvId, content);
  }

  if (id === "content-close") {
    const content = event.target.parentElement;
    content.classList.remove("content-display");
  }
};

// Initialize the search
//searchTv(INITIAL_SEARCH_VALUE);
searchUpcomingTv();

getTvAiringToday();
getOnTheAirTv();
getTvTopRated();
getTvLatest();
searchPopularTv();
getTrendingTv();
