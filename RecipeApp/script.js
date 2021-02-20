const mealsEl = document.getElementById("meals");
const favContainer = document.getElementById("fav-meals");
const recipeInfo = document.getElementById("recipe-info");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");
const maelPopup = document.getElementById("meal-popup");
const closePopupBtn = document.getElementById("close-popup");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  const response = await fetch(
    " https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const respData = await response.json();
  const randomMeal = respData.meals[0];

  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const respData = await response.json();
  const meal = respData.meals[0];

  return meal;
}

async function getMealsByName(name) {
  const response = await fetch(
    ` https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );

  const respData = await response.json();
  const meals = respData.meals;

  return meals;
}

function addMeal(mealData, random = true) {
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

function showMealInfo(mealData) {
  //update the popup

  const mealEl = document.createElement("div");

  mealEl.innerHTML = `
      <h1>${mealData.strMeal}</h1>
      <img
        src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}"
      />
      <div>
        <p>
        ${mealData.strInstructions}
        </p>
        <ul>
          <li>Ing 1 / Measure</li>
          <li>Ing 1 / Measure</li>
          <li>Ing 1 / Measure</li>
        </ul>`;

  recipeInfo.appendChild(mealEl);

  // show the recipe

  recipeInfo.classList.remove("hidden");
}

searchBtn.addEventListener("click", async () => {
  mealsEl.innerHTML = "";
  const search = searchTerm.value;

  const meals = await getMealsByName(search);

  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
});

closePopupBtn.addEventListener("click", () => {
  console.log("Hello");
  maelPopup.classList.add("hidden");
});
