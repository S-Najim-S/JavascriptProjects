const addBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filterTerm = '') => {
	const movieList = document.getElementById('movie-list');

	if (movies.length === 0) {
		movieList.classList.remove('visible');
		return;
	} else {
		movieList.classList.add('visible');
	}
	movieList.innerHTML = '';

	const filteredMovies = !filterTerm
		? movies
		: movies.filter((movie) => movie.info.title.includes(filterTerm));
	filteredMovies.forEach((movie) => {
		const { info } = movie;

		const movieElement = document.createElement('li');
		let text = info.title + '-';

		for (const key in movie.info) {
			if (key !== 'title' && key !== '_title') {
				text = text + `${key} : ${info[key]}`;
			}
		}
		movieElement.textContent = text;
		movieList.append(movieElement);
	});
};
const addMovieHandler = () => {
	const title = document.getElementById('title').value;
	const extraName = document.getElementById('extra-name').value;
	const extraValue = document.getElementById('extra-value').value;

	if (extraValue.trim() === '' || extraName.trim() === '') {
		alert('please fill the required input!!!');
		return;
	}

	const newMovie = {
		info: {
			set title(val) {
				if (val.trim() === '') {
					this._title = 'DEFAULT';
					return;
				}
				this._title = val;
			},
			get title() {
				return this._title.toUpperCase();
			},
			[extraName]: extraValue,
		},
		id: Math.random(),

		getFormattedTitle() {
			console.log(this);
			return this.info.title.toUpperCase();
		},
	};

	newMovie.info.title = title;
	console.log(newMovie.info.title);

	movies.push(newMovie);
	renderMovies();
};
const searchMovieHandler = () => {
	const filterKey = document.getElementById('filter-title').value;
	renderMovies(filterKey);
};

addBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
