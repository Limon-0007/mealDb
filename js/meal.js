const mealDb = async(searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    // fetch(url)
    // .then(res => res.json())
    // .then(data => meals(data.meals))
    // .catch(error => console.log(error))
    
   try {
    const res = await fetch(url);
    const data = await res.json();
    meals(data.meals)
   }
   catch(error) {
    console.log(error)
   }
}

const meals = (meals) => {
    //console.log(meals);
        const card = document.getElementById('card');
        card.innerText = '';
         meals.forEach((food) => {
            const div = document.createElement('div');
            div.classList.add('w-full')
            div.innerHTML = `
            <div class="card w-full bg-base-100 shadow-2xl font-sans">
                <img src="${food.strMealThumb}" alt="No image found" />
                <div class="card-body">
                  <h2 class="card-title text-lg">${food.strMeal}</h2>
                  <p class="text-sm">They have high levels of iron to help restore energy and improve red blood cells function.</p>
                  <div class="card-actions justify-between mt-4">
                    <button class="btn btn-info rounded">Detailes</button>
                    <button class="btn btn-outline btn-info rounded">Order Now</button>
                  </div>
                </div>
              </div>
            `;
            card.appendChild(div)
         })
}

document.getElementById('search-btn').addEventListener('click', () => {
   const getInputValue = document.getElementById('search-input').value;
   mealDb(getInputValue)
})

mealDb('rice')
