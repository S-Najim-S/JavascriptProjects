const addMovieModalEl = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backDropEl = document.getElementById('backdrop');

const cancelBtn = addMovieModalEl.querySelector('.btn--passive');
const addMovieBtn = addMovieModalEl.querySelector('.btn--success');
const userInputs = addMovieModalEl.querySelectorAll('input');
const movieList = document.getElementById('movie-list');
const enteryText = document.getElementById('entry-text');

const movies = [];

const toggleVisibleClass = () => {
  addMovieModalEl.classList.toggle("visible");
  backDropToggle();
};

const updateUI = () => {

  if (movies.length === 0) {
    // Show the entery-text
    enteryText.style.display = 'block';

  } else {
    // Hide entery-text and show the movie unordered list
    enteryText.style.display = 'none';
  }

};
const backDropToggle = () => {
  backDropEl.classList.toggle('visible');
};

const cancelAddMovie = () => {
  toggleVisibleClass();
  clearInputs();
};

const backDropClickHandler = () => {
  toggleVisibleClass();
};

const clearInputs = () => {

  // Clearing fields using array index

  // userInputs[0].value = '';
  // userInputs[1].value = '';
  // userInputs[2].value = '';

  // OR looping through array and set input fields to empty String

  for (const userInput of userInputs) {
    userInput.value = ''
  }

};


const addMovieHandler = () => {
  const movieTitle = userInputs[0].value;
  const imageUrl = userInputs[1].value;
  const movieRating = userInputs[2].value;

  if (movieTitle.trim() != '' &&
    imageUrl.trim() != '' &&
    movieRating.trim() != '' &&
    movieRating > 0 &&
    movieRating < 6) {

    const newMovie = {
      id: '_' + Math.random().toString(36).substr(2, 9),
      title: movieTitle,
      image: imageUrl,
      rating: movieRating
    };


    movies.push(newMovie);
    toggleVisibleClass();
    clearInputs();
    renderNewMovie(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();


  } else {
    alert("Please enter valid input!");
  }

};

// Deleting list element when double clicked
const deleteMovie = (movieId) => {
  let movieIndex = 0;

  for (const movie of movies) {

    if(movie.id === movieId){
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  movieList.children[movieIndex].remove();
  updateUI();

};

const deleteConfirm = (movieId) => {
  const acceptBtn = document.querySelector('.btn--danger');
  const declineBtn = document.getElementById('cancel');
  const deleteModal = document.getElementById('delete-modal');


  

  acceptBtn.addEventListener('click', () =>{
    deleteMovie(movieId);
    deleteModal.style.display = 'none';
  });  

  declineBtn.addEventListener('click', ()=>{
    deleteModal.style.display = 'none';
  })
}


const renderNewMovie = (id, title, imageUrl, rating) => {

  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML =
   `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}" >
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5</p>
    </div>
  `;

  newMovieElement.addEventListener('dblclick', deleteConfirm.bind(null, id));
  movieList.append(newMovieElement);
}



startAddMovieButton.addEventListener("click", toggleVisibleClass);
cancelBtn.addEventListener('click', cancelAddMovie);
backDropEl.addEventListener('click', backDropClickHandler);
addMovieBtn.addEventListener('click', addMovieHandler);