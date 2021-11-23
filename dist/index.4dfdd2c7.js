const meals = document.querySelector(".meal");
const search = document.querySelector(".btn1");
const fevFoodList = document.querySelector(".fev-food-list");
async function getRandomMeal() {
    const mealApi = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const mealData = await mealApi.json();
    const mealURL = mealData.meals[0];
    addMeal(mealURL);
}
getRandomMeal();
fetchFevFood();
function addMeal(mealData) {
    const meal = document.createElement("div");
    meal.classList.add("meals");
    meal.innerHTML = `<div class="meals">
    <div class="random-meal">
        <span class="random">Recipe of the Day</span>
        <img src="${mealData.strMealThumb}">
    </div>
    <div class="meal-body">
        <H4>${mealData.strMeal}</H4>
        <button class="heart far fa-heart"></button>
    </div>
</div>`;
    meals.appendChild(meal);
    const heart = document.querySelector(".meal-body .heart");
    heart.addEventListener("click", function() {
        fevFoodList.innerHTML = "";
        if (heart.classList.contains("active")) {
            removeMealFromLS(mealData.idMeal);
            heart.classList.remove("active");
        } else {
            addMealFromLS(mealData.idMeal);
            heart.classList.add("active");
            fetchFevFood();
        }
    });
}
async function searchMealbyID(mealId) {
    const mealApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const mealData = await mealApi.json();
    return mealData;
}
async function searchMealbyName(mealName) {
    const apiURL = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    const apiData = await apiURL.json();
    console.log(apiData);
}
search.addEventListener("click", function() {
    const inputData = document.querySelector(".input").value;
    searchMealbyName(inputData);
});
function addMealFromLS(mealID) {
    const mealIDs = getMealFromLS();
    localStorage.setItem("mealIDs", JSON.stringify([
        ...mealIDs,
        mealID
    ]));
}
function getMealFromLS() {
    const mealIDs = JSON.parse(localStorage.getItem("mealIDs"));
    return mealIDs == null ? [] : mealIDs;
}
function removeMealFromLS(mealID) {
    const mealIDs = getMealFromLS();
    localStorage.setItem("mealIDs", JSON.stringify(mealIDs.filter(function(id) {
        if (mealID != id) return id;
    })));
}
async function fetchFevFood() {
    const fetchMealLS = getMealFromLS();
    let fetchArray = [];
    for(let i = 0; i < fetchMealLS.length; i++){
        const fetchID = fetchMealLS[i];
        let fetchOBJ = await searchMealbyID(fetchID);
        addFevMeal(fetchOBJ);
    }
}
function addFevMeal(mealData) {
    const meal = document.createElement("li");
    meal.classList.add("meal");
    meal.innerHTML = `<img src="${mealData.meals[0].strMealThumb}">
    <span>${mealData.meals[0].strMeal}</span>`;
    fevFoodList.appendChild(meal);
}

//# sourceMappingURL=index.4dfdd2c7.js.map
