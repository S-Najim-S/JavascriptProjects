const meals = document.getElementById("meals");
const favContainer = document.getElementById("fav-meals");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  const response = await fetch(
    " https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const respData = await response.json();
  const randomMeal = respData.meals[0];

  loadRandomMeal(randomMeal, true);
}

async function getMealById(id) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const respData = await response.json();
  const meal = respData.meals[0];

  console.log(meal);
  return meal;
}

async function getMealsByName() {
  const meals = await fetch(
    ` https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
}

function loadRandomMeal(mealData, random = true) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
    <div class="meal-header">
        ${random ? `<span class="random">Random Recipe</span>` : ""}
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn"><i class="fa fa-heart" aria-hidden="true"></i>
        </button>
    </div>`;

  const myBtn = meal.querySelector(".meal-body .fav-btn");
  myBtn.addEventListener("click", () => {
    if (myBtn.classList.contains("active")) {
      removeMealLs(mealData.idMeal);
      myBtn.classList.remove("active");
    } else {
      addMealLs(mealData.idMeal);
      myBtn.classList.add("active");
    }

    fetchFavMeals();
  });
  meals.appendChild(meal);
}

function addMealLs(mealId) {
  const mealIds = getMealLs();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLs(mealId) {
  const mealIds = getMealLs();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealLs() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
  //clean the container to avaoid rewriting the same elements
  favContainer.innerHTML = "";

  const mealIds = getMealLs();

  const meals = [];

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    meal = await getMealById(mealId);
    addMealToFav(meal);
  }
  console.log(meals);
}

function addMealToFav(mealData) {
  const favMeal = document.createElement("li");

  favMeal.innerHTML = `
  <image src="${mealData.strMealThumb}" alt="${mealData.strMela}" >
  <span>${mealData.strMeal}</span>
  <button class="delete"><i class="fa fa-window-close"></i></button>
`;

  const deleteBtn = favMeal.querySelector(".delete");

  deleteBtn.addEventListener("click", () => {
    removeMealLs(mealData.idMeal);

    fetchFavMeals();
  });

  favContainer.appendChild(favMeal);
}
