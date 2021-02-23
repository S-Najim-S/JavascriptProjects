const API_KEY = "176e961c0738c415e7441e7d3bda26f3";
const APIURL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
const IMGPATH = "https://image.tmdb.org/t/p/w1280/";
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`;

const TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
const UPCOMING_API = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
const POPULAR_API = `
https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const POPULAR_PEOPLE_API = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`;

const main = document.querySelector(".movies-container");
const form = document.getElementById("form");
const search = document.getElementById("search");

const topRated = document.getElementById("top-rated");
const upcoming = document.getElementById("upcoming");
const popular = document.getElementById("popular");
const popular_people = document.getElementById("airing-today");

// Homepage load fav Movies
getMovies(APIURL);

async function getMovies(api) {
  const resp = await fetch(api);
  const respData = await resp.json();

  searchMovie(respData.results);
}

async function popPeople(api) {
  const resp = await fetch(api);
  const respData = await resp.json();

  getPopularPeople(respData.results);
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
function getPopularPeople(people) {
  // clean the body
  main.innerHTML = "";
  console.log(people);

  people.forEach((person) => {
    const { name, profile_path } = person;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
       <img
         src="${IMGPATH + profile_path}"
         alt="${name}"
       />
       <div class="movie-info">
         <h3>${name}</h3>
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

topRated.addEventListener("click", () => {
  console.log("Hell");
  getMovies(TOP_RATED);
});

upcoming.addEventListener("click", () => {
  console.log("Hell");
  getMovies(UPCOMING_API);
});

popular.addEventListener("click", () => {
  console.log("Hell");
  getMovies(POPULAR_API);
});
popular_people.addEventListener("click", () => {
  popPeople(POPULAR_PEOPLE_API);
});
