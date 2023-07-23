console.log("hi");

// const API_URL =
//   "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
// // const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
//  const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=eca02ea69a797930b00d079e6eedb221&page=1";
const IMG = "https://image.tmdb.org/t/p/w500";
const SEARCH =
  'https://api.themoviedb.org/3/search/movie?api_key=eca02ea69a797930b00d079e6eedb221&query="';

const content = document.getElementById("content");
const search = document.getElementById("search");
const form = document.getElementById("form");

Movies(URL);
async function Movies(url) {
  const response = await fetch(url);
  const data = await response.json();
  showMovies(data.results);
}

function showMovies(movies) {
  content.innerHTML = "";
  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
    <img src="${IMG + movie.poster_path} " alt="${movie.title}" />
    <div class="movie-info" > 
     <h3>${movie.title}</h3>
     <span class="${rattingClass(movie.vote_average)} " >${
      movie.vote_average
    }</span>
    </div>
    <div class="overview">
     <h3>Overview</h3>
     ${movie.overview}
    </div>
    `;

    content.appendChild(movieEl);
  });
}
function rattingClass(rate) {
  if (rate >= 8) {
    return "green";
  } else if (rate >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchMovie = search.value;

  if (searchMovie && searchMovie !== "") {
    Movies(SEARCH + searchMovie);

    search.value = "";
  } else {
    window.location.reload();
  }
});
