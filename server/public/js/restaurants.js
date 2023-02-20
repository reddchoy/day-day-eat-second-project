window.onload = async () => {
  loadHeader();
  await loadRestaurants();
  await likeRestaurant();
  await getUserLike();
  await toCategoryPage();
  showUserName();
  showCanvasContent();
  loadLoginModel();
  loadRegisterModel();
  register();
  login();
  logout();
  //   updateRestaurantViewCount();
};


async function loadRestaurants() {
  const searchParams = new URLSearchParams(window.location.search);
  let url = "/restaurants";
  if (searchParams.has("category")) {
    url += `/getRestaurantsByQueryFood?category=${searchParams.get(
      "category"
    )}`;
  }
  else if (searchParams.has("place")) {
    url += `/getRestaurantsByQueryPlace?place=${searchParams.get("place")}`;
  } else if (searchParams.has("price")) {
    url += `/getRestaurantsByQueryPrice?price=${searchParams.get("price")}`;
  } else if (searchParams.has("keyword")) {
    url += `/search?keyword=${searchParams.get("keyword")}`;
  }
  try {
    const resp = await fetch(url);
    const restaurants = await resp.json();

    const restArea = document.querySelector("#restaurant-area");
    restArea.innerHTML = "";

    for (let restaurant of restaurants) {
      let foodRating = `${restaurant.food_rating}`;
      let foodRating2 = foodRating === "null" ? "0.0" : foodRating.slice(0, 3);
      let envRating = `${restaurant.env_rating}`;
      let envRating2 = envRating === "null" ? "0.0" : envRating.slice(0, 3);

      const restContainer = document.createElement("div");
      restContainer.className = "restaurant-container";

      const restBox = document.createElement("div");
      restBox.className = "rest-box";
      restBox.value = "";
      restBox.dataset.rid = `${restaurant.id}`;

      const imageContainer = document.createElement("div");
      imageContainer.className = "image-container";

      const restImage = document.createElement("img");
      restImage.src = `${restaurant.rest_image}`;
      restImage.alt = `alt="${restaurant.name}`;
      restImage.className = "rest-image";

      const infoContainer = document.createElement("div");
      infoContainer.className = "info-container";

      const restName = document.createElement("div");
      restName.className = "rest-name";
      restName.innerText = `${restaurant.name}`;

      const restAddress = document.createElement("div");
      restAddress.className = "rest-address";

      const addressIcon = document.createElement("div");
      addressIcon.className = "address-icon";
      addressIcon.innerHTML = `<i class="fa-solid fa-map-location-dot"></i>`;

      const addressText = document.createElement("div");
      addressText.className = "address-text";
      addressText.innerText = `${restaurant.address}`;

      const priceCatContainer = document.createElement("div");
      priceCatContainer.className = "price-cat-container";

      const restPrice = document.createElement("div");
      restPrice.className = "rest-price";

      const priceIcon = document.createElement("div");
      priceIcon.className = "price-icon";
      priceIcon.innerHTML = `<i class="fa-solid fa-hand-holding-dollar"></i>`;

      const priceText = document.createElement("div");
      priceText.className = "price-text";
      priceText.innerText = `${restaurant.price}`;

      const restFoodCat = document.createElement("div");
      restFoodCat.className = "rest-food-cat";

      const foodIcon = document.createElement("div");
      foodIcon.className = "food-icon";
      foodIcon.innerHTML = `<i class="fa-solid fa-utensils"></i>`;

      const foodCatText = document.createElement("div");
      foodCatText.className = "food-cat-text";
      foodCatText.innerText = `${restaurant.tag}`;

      const ratingLikeContainer = document.createElement("div");
      ratingLikeContainer.className = "rating-like-container";

      const restRating = document.createElement("div");
      restRating.className = "rest-rating";

      const foodRatingIcon = document.createElement("div");
      foodRatingIcon.className = "food-rating-icon";
      foodRatingIcon.innerHTML = `<i class="fa-solid fa-bowl-food"></i>`;

      const foodRatingText = document.createElement("div");
      foodRatingText.className = "rating-text";
      foodRatingText.innerText = foodRating2;

      const envRatingIcon = document.createElement("div");
      envRatingIcon.className = "env-rating-icon";
      envRatingIcon.innerHTML = `<i class="fa-solid fa-shop"></i>`;

      const envRatingText = document.createElement("div");
      envRatingText.className = "rating-text";
      envRatingText.innerText = envRating2;

      const likeButtonContainer = document.createElement("div");
      likeButtonContainer.className = "like-btn-container";
      const likeButton = document.createElement("div");
      likeButton.className = "like-btn";
      likeButton.dataset.bid = restaurant.id;
      likeButton.innerHTML = `<i class="bi bi-bookmark-star-fill"></i>`;

      restArea.appendChild(restContainer);
      restContainer.appendChild(restBox);
      restBox.appendChild(imageContainer);
      imageContainer.appendChild(restImage);
      restBox.appendChild(infoContainer);
      infoContainer.appendChild(restName);
      infoContainer.appendChild(restAddress);
      restAddress.appendChild(addressIcon);
      restAddress.appendChild(addressText);

      infoContainer.appendChild(priceCatContainer);
      priceCatContainer.appendChild(restPrice);
      restPrice.appendChild(priceIcon);
      restPrice.appendChild(priceText);

      priceCatContainer.appendChild(restFoodCat);
      restFoodCat.appendChild(foodIcon);
      restFoodCat.appendChild(foodCatText);

      infoContainer.appendChild(ratingLikeContainer);
      ratingLikeContainer.appendChild(restRating);
      restRating.appendChild(foodRatingIcon);
      restRating.appendChild(foodRatingText);
      restRating.appendChild(envRatingIcon);
      restRating.appendChild(envRatingText);
      ratingLikeContainer.appendChild(likeButtonContainer);
      likeButtonContainer.appendChild(likeButton);

      document
        .querySelector("#restaurant-area")
        .addEventListener("click", (e) => {
          e.preventDefault();
          const restDiv = e.target;
          const rest = restDiv.closest(".rest-box");
          const restId = rest.dataset.rid;
          window.location.href = `/restaurant-details.html?rest_id=${restId}`;
        });
    }
  } catch (error) {
    console.log(error.message)
  }
}

async function toCategoryPage() {
  const allCategory = document.querySelector(".all");
  allCategory.addEventListener("click", (e) => {
    window.location = "./restaurants.html";
  });

  const foodCategoryArray = document.querySelectorAll(".food-cat-layer > div");
  for (let i = 0; i < foodCategoryArray.length; i++) {
    foodCategoryArray[i].addEventListener("click", (e) => {
      window.location = `./restaurants.html?category=${foodCategoryArray[i].innerText}`;
    });
  }

  const klArray1 = document.querySelectorAll(".kl.layer-1 > div");
  const klArray2 = document.querySelectorAll(".kl.layer-2 > div");
  const klArray3 = document.querySelectorAll(".kl.layer-3 > div");

  const ntArray1 = document.querySelectorAll(".nt.layer-1 > div");
  const ntArray2 = document.querySelectorAll(".nt.layer-2 > div");
  const ntArray3 = document.querySelectorAll(".nt.layer-3 > div");

  const hkArray1 = document.querySelectorAll(".hk.layer-1 > div");
  const hkArray2 = document.querySelectorAll(".hk.layer-2 > div");
  const hkArray3 = document.querySelectorAll(".hk.layer-3 > div");
  for (let i = 0; i < ntArray1.length; i++) {
    klArray1[i].addEventListener("click", (e) => {
      window.location = `./restaurants.html?place=${klArray1[i].innerText}`;
    });

    klArray2[i].addEventListener("click", (e) => {
      window.location = `./restaurants.html?place=${klArray2[i].innerText}`;
    });

    klArray3[i].addEventListener("click", (e) => {
      window.location = `./restaurants.html?place=${klArray3[i].innerText}`;
    });

    ntArray1[i].addEventListener("click", (e) => {
      window.location = `./restaurants.html?place=${ntArray1[i].innerText}`;
    });

    ntArray2[i].addEventListener("click", (e) => {
      window.location = `./restaurants.html?place=${ntArray2[i].innerText}`;
    });

    ntArray3[i].addEventListener("click", (e) => {
      window.location = `./restaurants.html?place=${ntArray3[i].innerText}`;
    });
    hkArray1[i].addEventListener("click", (e) => {
      window.location = `./restaurants.html?place=${hkArray1[i].innerText}`;
    });

    hkArray2[i].addEventListener("click", (e) => {
      window.location = `./restaurants.html?place=${hkArray2[i].innerText}`;
    });

    hkArray3[i].addEventListener("click", (e) => {
      window.location = `./restaurants.html?place=${hkArray3[i].innerText}`;
    });
  }

  const priceCategories = [
    "$50或以下",
    "$51-100",
    "$101-200",
    "$201-400",
    "$401或以上",
  ];
  const priceCategoriesArray = document.querySelectorAll(".price-layer > div");
  for (let i = 0; i < priceCategories.length; i++) {
    priceCategoriesArray[i].addEventListener("click", (e) => {
      window.location = `./restaurants.html?price=${priceCategories[i]}`;
    });
  }
}

async function likeRestaurant() {
  let likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.stopImmediatePropagation();
      try {
        const resp = await fetch(`/restaurants/like/${button.dataset.bid}`);
        const { message } = await resp.json();
        if (resp.status == 401) {
          alert(message);
          return;
        }
        if (message == null) {
          button.style.backgroundColor = "#fffc5cd0";
          alert("liked");
          return;
        }
        if (message == true) {
          button.style.backgroundColor = "#fffc5cd0";
          alert("liked");
          return;
        }
        button.style.backgroundColor = "#581206bb";
        alert("like canceled");
      } catch (error) {
        console.log(error.message)
      }

    });
  });
}

async function getUserLike() {
  let likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach(async (button) => {
    try {
      const resp = await fetch(`/restaurants/userLikedRest`);
      const { message } = await resp.json();
      message.forEach((e) => {
        if (button.dataset.bid == e.restaurant_id) {
          button.style.backgroundColor = "#fffc5cd0";
        }
      });
    } catch (error) {
      console.log(error.message)
    }
  });
}
