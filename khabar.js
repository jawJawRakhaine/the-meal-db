// enter button click
const searchBox = document.getElementById("search-field");
const searchBtn = document.getElementById("button-search");
searchBox.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    searchBtn.click();
  }
});
// global
const mealDetails = document.getElementById("meal-details");
const searchField = document.getElementById("search-field");
const searchResult = document.getElementById("search-result");
const searchFood = async () => {
  const searchText = searchField.value;
  searchField.value = "";
  mealDetails.innerHTML = "";
  message.innerHTML = "";
  searchResult.innerHTML = "";

  if (searchText == "") {
    const setMessage = document.getElementById("message");
    const message = document.createElement("h1");
    message.innerHTML = `
<h1 class="mt-5 border rounded mx-auto p-5 w-75 mb-5 text-center text-uppercase">Please input your favourite food name.</h1>    
    `;
    setMessage.appendChild(message);
  } else {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => displaySearchResult(data.meals));
    const response = await fetch(url);
    const data = await response.json();
    displaySearchResult(data.meals);
  }
};
const displaySearchResult = (meals) => {
  // const searchResult = document.getElementById("search-result");
  // searchResult.innerHTML = "";
  if (meals.length == 0) {
    //show result no found
  }
  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `<div class="card h-100 mt-5 mb-5">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h4 class="card-title">${meal.strMeal}</h4>
      <h6>Area: ${meal.strArea}</h6>
      <h6>Category: ${meal.strCategory}</h6>
      
    </div>
    <a href="#meal-details" onclick="loadMealDetails(${meal.idMeal})" class="btn btn-primary p-3">SEE DETAILS</a>
  </div>`;
    searchResult.appendChild(div);
  });
};
const loadMealDetails = async (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  // fetch(url)
  //   .then((response) => response.json())
  //   .then((data) => displayMealDetails(data.meals[0]));
  const response = await fetch(url);
  const data = await response.json();
  displayMealDetails(data.meals[0]);
};

const displayMealDetails = (meal) => {
  mealDetails.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = ` <img src="${meal.strMealThumb}" class="card-img-top mx-auto mt-2" style="width:300px" alt="..." />
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">
    ${meal.strInstructions}
    </p>
    <a href="${meal.strYoutube}" class="btn btn-primary">Go Youtube</a>
  </div>`;
  mealDetails.appendChild(div);
};
