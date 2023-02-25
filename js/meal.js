const mealDb = async (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  // fetch(url)
  // .then(res => res.json())
  // .then(data => meals(data.meals))
  // .catch(error => console.log(error))

  try {
    const res = await fetch(url);
    const data = await res.json();
    meals(data.meals);
  } catch (error) {
    console.log(error);
  }
};

const meals = (meals) => {
  const card = document.getElementById("card");
  card.innerText = "";
  meals.forEach((food) => {
    //console.log(food);
    const div = document.createElement("div");
    div.classList.add("w-full");
    div.innerHTML = `
            <div class="card w-full bg-base-100 shadow-2xl font-sans">
                <img src="${food.strMealThumb}" alt="No image found" />
                <div class="card-body">
                  <h2 class="card-title text-lg font-bold">${food.strMeal}</h2>
                  <p class="text-sm font-semibold">They have high levels of iron to help restore energy and improve red blood cells function.</p>
                  <div class="card-actions justify-between mt-4">
                    <label onclick="modal()" for="my-modal" id="details" class="btn btn-info rounded">Details</label>
                    <button class="btn btn-outline btn-info rounded">Order Now</button>
                  </div>
                </div>
              </div>
            `;
    card.appendChild(div);
  });
};

const modal = () => {
    const link = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772';
    fetch(link)
    .then(res => res.json())
    .then(data => forModal(data.meals))
}

const forModal = (foods) => {
    console.log(foods);
     // modal
    const modal = document.getElementById('modal')
    foods.forEach(details => {
    //console.log(details);
    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = `
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <div class="modal">
    <div class="modal-box">
    <h3 id="modal-heading" class="font-semibold text-lg text-center">${details.strMeal}</h3>
    <img class="w-44 mt-4 mx-auto" src="${details.strMealThumb}" alt="No image found" />
    <div class="modal-action">
    <label for="my-modal" class="btn">Close</label>
    </div>
   </div>
   </div>
 `;
    modal.appendChild(modalDiv)
   })
}

document.getElementById("search-btn").addEventListener("click", () => {
  const getInputValue = document.getElementById("search-input").value;
  mealDb(getInputValue);
});

mealDb("rice");
