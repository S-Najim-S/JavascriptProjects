const addBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];

const renderMovies = (filterTerm = "") => {
	const movieList = document.getElementById("movie-list");

	if (movies.length === 0) {
		movieList.classList.remove("visible");
		return;
	} else {
		movieList.classList.add("visible");
	}
	movieList.innerHTML = "";

	const { info } = movie;

	const filteredMovies = !filterTerm
		? movies
		: movies.filter((movie) => info.title.includes(filterTerm));
	filteredMovies.forEach((movie) => {
		const movieElement = document.createElement("li");
		let text = info.title + "-";

		for (const key in movie.info) {
			if (key !== "title") {
				text = text + `${key} : ${info[key]}`;
			}
		}
		movieElement.textContent = text;
		movieList.append(movieElement);
	});
};
const addMovieHandler = () => {
	const title = document.getElementById("title").value;
	const extraName = document.getElementById("extra-name").value;
	const extraValue = document.getElementById("extra-value").value;

	if (
		title.value.trim() === "" ||
		extraValue.value.trim() === "" ||
		extraName.value.trim() === ""
	) {
		alert("please fill the required input!!!");
		return;
	}

	const newMovie = {
		info: {
			title,
			[extraName]: extraValue,
		},
		id: Math.random(),
	};

	movies.push(newMovie);
	renderMovies();
};
const searchMovieHandler = () => {
	const filterKey = document.getElementById("filter-title").value;
	renderMovies(filterKey);
};

addBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);
