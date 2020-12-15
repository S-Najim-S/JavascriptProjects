const addMovieModalEl = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backDropEl= document.getElementById('backdrop');

const cancelBtn = addMovieModalEl.querySelector('.btn--passive');
const addBtn = addMovieModalEl.querySelector('.btn--success');
// Toggling the visible class to button if add button is clicked.
const toggleVisibleClass = ()=>{

  addMovieModalEl.classList.toggle("visible");
  backDropToggle();
};

const backDropToggle = () =>{
  backDropEl.classList.toggle('visible');
};

const cancelAddMovie = ()=>{
  toggleVisibleClass();
};
const backDropClickHandler = () => {
  toggleVisibleClass();
}

startAddMovieButton.addEventListener("click",toggleVisibleClass);
cancelBtn.addEventListener('click',cancelAddMovie);
backDropEl.addEventListener('click', backDropClickHandler);

