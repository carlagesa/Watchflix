// Initial Values
const MOVIE_DB_API = "354399156ae839327cb9ce5ca28b7196";
const MOVIE_DB_ENDPOINT = "https://api.themoviedb.org";
const MOVIE_DB_IMAGE_ENDPOINT = "https://image.tmdb.org/t/p/w500";
const DEFAULT_POST_IMAGE = "https://via.placeholder.com/150";

function requestTv(url, onComplete, onError) {
  fetch(url)
    .then((res) => res.json())
    .then(onComplete)
    .catch(onError);
}

function generateMovieDBUrl(path) {
  const url = `${MOVIE_DB_ENDPOINT}/3${path}?api_key=${MOVIE_DB_API}`;
  return url;
}

function getTvLatest() {
  const url = generateMovieDBUrl(`/tv/latest`);
  const render = renderTv.bind({ title: "Latest TV Shows" });
  requestTv(url, render, handleGeneralError);
}

/*function getTopRatedTv() {
    const url = generateMovieDBUrl(`/tv/top_rated`);
    const render = renderTv.bind({ title: 'Top Rated Tv' })
    requestTv(url, render, handleGeneralError);
}*/

function getNowPlaying() {
  const url = generateMovieDBUrl(`/tv/now_playing`);
  const render = renderTv.bind({ title: "Now  Playing On Tv" });
  requestTv(url, render, handleGeneralError);
}

function getTvLatest() {
  const url = generateMovieDBUrl(`/tv/latest`);
  const render = renderTv.bind({ title: "Latest Shows" });
  requestTv(url, render, handleGeneralError);
}

function getRecommendations() {
  const url = generateMovieDBUrl(`/tv/recommendations`);
  const render = renderTv.bind({ title: "Recommendations" });
  requestTv(url, render, handleGeneralError);
}

function getOnTheAirTv() {
  const url = generateMovieDBUrl("/tv/on_the_air");
  const render = renderTv.bind({ title: "On Air" });
  requestTv(url, render, handleGeneralError);
}

function getTvAiringToday() {
  const url = generateMovieDBUrl("/tv/on_the_air");
  const render = renderTv.bind({ title: "Airing Today" });
  requestTv(url, render, handleGeneralError);
}

function getTrendingTv() {
  const url = generateMovieDBUrl("/trending/tv/day");
  const render = renderTv.bind({ title: "Trending Shows" });
  requestTv(url, render, handleGeneralError);
}

function getTvTopRated() {
  const url = generateMovieDBUrl("/tv/top_rated");
  const render = renderTv.bind({ title: "Top Rated Shows" });
  requestTv(url, render, handleGeneralError);
}

function searchUpcomingTv() {
  const url = generateMovieDBUrl("/tv/upcoming");
  const render = renderTv.bind({ title: "Upcoming Shows" });
  requestTv(url, render, handleGeneralError);
}

function searchPopularTv() {
  const url = generateMovieDBUrl("/tv/popular");
  const render = renderTv.bind({ title: "Popular Shows" });
  requestTv(url, render, handleGeneralError);
}

// Invoke a different function for search tv
function searchTv(value) {
  const url = generateMovieDBUrl("/search/tv") + "&query=" + value;
  requestTv(url, renderSearchTv, handleGeneralError);
}

function getVideosByTvId(tvId, content) {
  const url = generateMovieDBUrl(`/tv/${tvId}/videos`);
  const render = createVideoTemplate.bind({ content });
  requestTv(url, render, handleGeneralError);
}
