const API_KEY = "";
const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=176e961c0738c415e7441e7d3bda26f3";
const IMGPATH = "https://image.tmdb.org/t/p/w1280/";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=176e961c0738c415e7441e7d3bda26f3&query=";

const main = document.querySelector(".movies-container");
const form = document.getElementById("form");
const search = document.getElementById("search");

const topRated = document.getElementById("top-rated");
const upcoming = document.getElementById("upcoming");
const popular = document.getElementById("popular");
const airingToday = document.getElementById("airing-today");

// Homepage load fav Movies
getMovies(APIURL);

async function getMovies(api) {
  const resp = await fetch(api);
  const respData = await resp.json();

  console.log(respData);

  searchMovie(respData.results);
}

function searchMovie(movies) {
  // clean the body
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { overview, poster_path, title, vote_average } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img
        src="${IMGPATH + poster_path}"
        alt="${title}"
      />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
            <h4>Overview:</h4>
            ${overview}
      </div>
      `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});
