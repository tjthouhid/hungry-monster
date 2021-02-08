document.getElementById('search-btn').addEventListener('click', () => {
  const search = document.getElementById('search-input').value;
  document.getElementById("food-container").innerHTML = "";
  document.getElementById("show-error").innerHTML = "";
  document.getElementById("food-detail-container").innerHTML = "";

  if (search.length === 1) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`)
      .then(res => res.json())
      .catch(err => handleError())
      .then(data => searchFoods(data.meals));
  }
  else if (search.length === 0) {
    handleError();
  }
  else {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then(res => res.json())
      .then(data => searchFoods(data.meals));
  }
})

const foodDetail = foodId => {
  document.getElementById("food-detail-container").innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
    .then(res => res.json())
    .then(data => showFoodDeatil(data.meals[0]));
}

const searchFoods = meals => {
  const foodDiv = document.getElementById("food-container");
  if (meals === null) {
    handleError();
    return;
  }
  meals.forEach(meal => {
    const foodCard = document.createElement("div");
    foodCard.className = "food-card";
    const foodContent = `
      <img src="${meal.strMealThumb}">
      <p>${meal.strMeal}</p>
    `
    foodCard.addEventListener('click', () => {
      foodDetail(meal.idMeal);
    });

    foodCard.innerHTML = foodContent;
    foodDiv.appendChild(foodCard);
    document.getElementById("food-detail-container").innerHTML = "";
    document.getElementById('search-input').value = "";
  });
}

const showFoodDeatil = food => {
  const foodDiv = document.getElementById("food-detail-container");
  const foodDetail = document.createElement("div");
  foodDetail.className = "food-detail";
  const foodContent = `
    <img src="${food.strMealThumb}">
    <h3 class="my-4">${food.strMeal}</h3>
    <h5 class="my-3">Ingredients</h5>
    <ul>
      ${food.strIngredient1 ? `<li>${food.strIngredient1}</li>` : ""}
      ${food.strIngredient2 ? `<li>${food.strIngredient2}</li>` : ""}
      ${food.strIngredient3 ? `<li>${food.strIngredient3}</li>` : ""}
      ${food.strIngredient4 ? `<li>${food.strIngredient4}</li>` : ""}
      ${food.strIngredient5 ? `<li>${food.strIngredient5}</li>` : ""}
      ${food.strIngredient6 ? `<li>${food.strIngredient6}</li>` : ""}
      ${food.strIngredient7 ? `<li>${food.strIngredient7}</li>` : ""}
      ${food.strIngredient8 ? `<li>${food.strIngredient8}</li>` : ""}
      ${food.strIngredient9 ? `<li>${food.strIngredient9}</li>` : ""}
      ${food.strIngredient10 ? `<li>${food.strIngredient10}</li>` : ""}
      ${food.strIngredient11 ? `<li>${food.strIngredient11}</li>` : ""}
      ${food.strIngredient12 ? `<li>${food.strIngredient12}</li>` : ""}
      ${food.strIngredient13 ? `<li>${food.strIngredient13}</li>` : ""}
      ${food.strIngredient14 ? `<li>${food.strIngredient14}</li>` : ""}
      ${food.strIngredient15 ? `<li>${food.strIngredient15}</li>` : ""}
      ${food.strIngredient16 ? `<li>${food.strIngredient16}</li>` : ""}
      ${food.strIngredient17 ? `<li>${food.strIngredient17}</li>` : ""}
      ${food.strIngredient18 ? `<li>${food.strIngredient18}</li>` : ""}
      ${food.strIngredient19 ? `<li>${food.strIngredient19}</li>` : ""}
      ${food.strIngredient20 ? `<li>${food.strIngredient20}</li>` : ""}
    </ul>
  `
  foodDetail.innerHTML = foodContent;
  foodDiv.appendChild(foodDetail);
}

const handleError = () => {
  const foodDiv = document.getElementById("show-error");
  const foodError = `
    <h2 class="food-error">No food found! Please search again</h2>
  `
  foodDiv.innerHTML = foodError;
  document.getElementById('search-input').value = "";
}