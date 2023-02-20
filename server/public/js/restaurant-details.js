window.onload = async () => {
  await loadRestaurantDetails();
  await loadFoodImages();
  await loadReviews();
  await getUserLike();
  loadHeader();
  showUserName();
  showCanvasContent();
  loadLoginModel();
  loadRegisterModel();
  register();
  login();
  logout();
};

async function loadRestaurantDetails() {
  const search = new URLSearchParams(location.search);
  const restId = search.get("rest_id");
  try {
    const resp = await fetch(`/restaurants/details/${restId}`);
    const restaurant = await resp.json();

    let foodRating = `${restaurant.food_rating}`;
    let foodRating2 = foodRating === "null" ? "N/A" : foodRating.slice(0, 3);
    let envRating = `${restaurant.env_rating}`;
    let envRating2 = envRating === "null" ? "N/A" : envRating.slice(0, 3);

    const restArea = document.querySelector("#restaurant-area");

    restArea.innerHTML = "";

    restArea.innerHTML +=
      /*html*/
      `
        <div class="restaurant-box">
            <div class="restaurant-info">
                <div class="rest-name">
                  ${restaurant.name}
                </div>
                <div class="rest-img-container">
                    <img src="${restaurant.rest_image}" alt="${restaurant.name}" class="rest-image">
                </div>
                <div class="rest-info-layer">
                    <div class="info-title">
                        地址 </div>
                    <div class="rest-address info-value">
                       ${restaurant.address}
                    </div>
  
                    <div class="info-title">
                        電話號碼
                    </div>
                    <div class="rest-phone info-value">
                    ${restaurant.phone_number}
                    </div>
  
                    <div class="info-title">
                        價錢 </div>
                    <div class="rest-price info-value">
                      ${restaurant.price}
                    </div>
  
                    <div class="info-title">
                        營業時間 </div>
                    <div class="rest-bh info-value">
                        星期一至日 ${restaurant.business_hour}
                    </div>
  
                </div>
            </div>
            <div class="rating-button-container">
                <div class="rest-rating-container">
                    <div class="rest-rating">
                        餐廳平均得分
                    </div>
                    <div class="avg-rating-box">
                        <div class="avg-rating">
                        <i class="fa-solid fa-bowl-food"></i>
                            食物: ${foodRating2}
                        </div>
                        <div class="avg-rating">
                        <i class="fa-solid fa-shop"></i>
                            環境: ${envRating2}
                        </div>
                    </div>
                </div>
  
                <div class="btn-container">
                    <div class="like-btn">
                        <div class="like-icon">
                            <i class="bi bi-bookmark-star-fill"></i>
                        </div>
                        <div class="btn-text">
                            收藏
                        </div>
                    </div>
                    <div class="write-review-btn">
                        <div class="review-icon">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </div>
                        <div class="btn-text">
                            食評
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
         `;
  } catch (error) {
    console.log(error.message)
  }

try {
  document
    .querySelector(".write-review-btn")
    .addEventListener("click", async (e) => {
      e.preventDefault();

      const resp = await fetch("/users/getReqSessionAndUserName");
      const { message } = await resp.json();
      if (message) {
        window.location.href = `/review.html?rest_id=${restId}`;
      } else {
        alert("請先登入");
      }
    });
} catch (error) {
  console.log(error.message)
}
  

  //////like restaurant///////

  try {
    const likeButton = document.querySelector(".like-btn");
  const likeIcon = document.querySelector(".like-icon");

  likeButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const resp = await fetch(`/restaurants/like/${restId}`);
    const { message } = await resp.json();
    if (resp.status == 401) {
      alert(message);
      return;
    }
    if (message == null) {
      likeIcon.style.backgroundColor = "#fffc5cd0";
      alert("liked");
      return;
    }
    if (message == true) {
      likeIcon.style.backgroundColor = "#fffc5cd0";
      alert("Liked");
      return;
    }
    likeIcon.style.backgroundColor = "#581206bb";
    alert("Like canceled");
  });
  } catch (error) {
    console.log(error.message)
  }
}

async function getUserLike() {
  const search = new URLSearchParams(location.search);
  const restId = search.get("rest_id");
  let likeIcon = document.querySelector(".like-icon");
  try {
    const resp = await fetch(`/restaurants/userLikedRest`);
    const likeResults = await resp.json();
    for (let likeResult of likeResults.message) {
      if (likeResult.restaurant_id === parseInt(restId)) {
        likeIcon.style.backgroundColor = "#fffc5cd0";
      } else {
        likeIcon.style.backgroundColor = "#581206bb";
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}

async function loadFoodImages() {
  const search = new URLSearchParams(location.search);
  const restId = search.get("rest_id");
  try {
    const resp = await fetch(`/restaurants/details/${restId}`);
    const restaurant = await resp.json();
    const resp2 = await fetch(`/restaurants/food_images/${restId}`);
    const foodImages = await resp2.json();
    const detailsContainer = document.querySelector(".details-container");
    detailsContainer.innerHTML = "";
    detailsContainer.innerHTML +=
      /*html*/
      `
  
        <div class="details-box">
            <div class="intro-container">
                餐廳介紹
            </div>
            <div class="food-img-container">
  
            </div>
  
            <div class="description-container">
                <div class="rest-description">
                  ${restaurant.description}
                </div>
            </div>
        </div>
         `;
  
    for (let foodImage of foodImages) {
      const imageContainer = document.querySelector(".food-img-container");
      const foodImgBox = document.createElement("div");
      foodImgBox.className = "food-img-box";
      const foodImg = document.createElement("img");
      foodImg.src = `${foodImage.food_image}`;
      foodImg.alt = `alt="${restaurant.name}`;
      foodImg.className = "food-image";
      imageContainer.appendChild(foodImgBox);
      foodImgBox.appendChild(foodImg);
    }
  } catch (error) {
    console.log(error.message)
  }
 
}

async function loadReviews() {
  const search = new URLSearchParams(location.search);
  const restId = search.get("rest_id");
  try {
    const resp = await fetch(`restaurants/reviews/${restId}`);
    const reviews = await resp.json();
    const reviewContainer = document.querySelector(".review-container");
    reviewContainer.innerHTML = "";
    for (let review of reviews) {
      const reviewDate = moment(`${review.created_at}`).format("L");
      reviewContainer.innerHTML +=
        /*html*/
        `
  
          <div class="review-box">
              <div class="user-layer">
                  <div class="user-pic-container">
                      <img src="../${review.profile_pic}" alt="${review.username}" class="user-pic">
                      <div class="username-container">
                          <div class="username-text">
                              ${review.username}
                          </div>
                      </div>
                  </div>
  
                  <div class="rating-container">
                      <div class="food-rating-box rating-text">
                          食物評分: ${review.food_rating}
                      </div>
                      <div class="env-rating-box rating-text">
                          環境評分: ${review.environment_rating}
                      </div>
                  </div>
                  <div class="review-date-container">
                      <div class="date-text">
                        ${reviewDate}
                      </div>
                  </div>
              </div>
              <div class="content-layer">
                  <div class="content-text">
                      ${review.content}
              </div>
              </div>
              <div class="img-layer">
                  <div class="review-img-container">
                      <div class="review-img-box">
                          <img src="../${review.review_image}" alt="${review.review_image}" class="review-image">
                      </div>
                      </div>
                  </div>
              </div>
          </div>
           `;
    }
  } catch (error) {
    console.log(error.message)
  }

}
