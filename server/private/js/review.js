window.onload = () => {
  loadHeader();
  showUserName();
  logout();
  uploadReview();
}

const loadFile = function (event) {
  try {
    const reader = new FileReader();
  reader.onload = function () {
    const output = document.querySelector(".review-image-box > img");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
  } catch (error) {
    console.log(error.message)
  }
  
};

async function uploadReview() {
  searchParams = new URLSearchParams(window.location.search)
  queryValue = searchParams.get("rest_id")
  document.querySelector("#form-user-review").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const review_pic = form.review_pic.files[0];
    const review_content = form.review_content.value;
    const food_rating = form.food_rating.value;
    const restaurant_rating = form.restaurant_rating.value;

    const formData = new FormData();
    formData.append("review_pic", review_pic);
    formData.append("review_content", review_content);
    formData.append("food_rating", food_rating);
    formData.append("restaurant_rating", restaurant_rating);
    const res = await fetch(`/restaurants/uploadReview/${queryValue}`, {
      method: "POST",
      body: formData
    })

    const data = await res.json()

    const predictResult = data.predict_result;
    console.log(predictResult)

    const aiRestArea = document.querySelector("#ai-rest-area")
    let aiResultText;

    if (predictResult === "food") {
      aiResultText = "食物"
    } else if (predictResult === "environment") {
      aiResultText = "環境"
    } else {
      aiResultText = "綜合"
    }

    if (res.status === 400) {
      const thankStatement = document.querySelector(".thank-statement")
      thankStatement.innerText = "錯誤！"
      const aiStatement = document.querySelector(".ai-statement")
      aiStatement.innerText = "請輸入所有頂目才可提交"
      aiRestArea.innerHTML = ""
      return

    } else {
      const thankStatement = document.querySelector(".thank-statement")
      thankStatement.innerText = "多謝您寶貴的食評！"

      const aiStatement = document.querySelector(".ai-statement")
      aiStatement.innerText = `還想再吃？ 我們的AI推薦了一些 ${aiResultText}評分 優異的餐廳給你 😋`
    }


    const highRatingRestArray = await fetch(`/restaurants/getHighRatingRest/${predictResult}`)
    const highRatingRests = await highRatingRestArray.json()
    const firstThreeRests = highRatingRests.slice(0, 3)

    aiRestArea.innerHTML = "";

    for (let firstThreeRest of firstThreeRests) {

      let foodRating = `${firstThreeRest.food_rating}`
      let foodRating2 = foodRating === "null" ? "0.0" : foodRating.slice(0, 3);
      let envRating = `${firstThreeRest.env_rating}`
      let envRating2 = envRating === "null" ? "0.0" : envRating.slice(0, 3);

      aiRestArea.innerHTML +=
        /*html*/
        `
        <div class="ai-rest-container" data-rid="${firstThreeRest.id}">
        <div class="image-container">
          <img src="${firstThreeRest.rest_image}" alt="${firstThreeRest.name}" class="rest-image">
        </div>

        <div class="name-mtr-container">
            <div class="rest-name">
            ${firstThreeRest.name}
        </div>
        <div class="rest-address ai-title">
          <i class="fa-solid fa-map-location-dot"></i> 
          ${firstThreeRest.mtr_station}
        </div>
         </div>
      
        <div class="ai-price-cat-container">
          <div class="rest-price ai-title">
            <i class="fa-solid fa-hand-holding-dollar"></i>
            ${firstThreeRest.price}
          </div>
          <div class="rest-food-cat ai-title">
            <i class="fa-solid fa-utensils"></i>
            ${firstThreeRest.tag}
          </div>
        </div>
        <div class="ai-rating-container">
          <div class="food-rating ai-title">
            <i class="fa-solid fa-bowl-food"></i>
            ${foodRating2}
          </div>
          <div class="env-rating ai-title">
            <i class="fa-solid fa-shop"></i>
            ${envRating2}
          </div>
        </div>
      </div>
       `;


      document.querySelector("#ai-rest-area").addEventListener("click", (e) => {
        e.preventDefault();
        const restDiv = e.target;
        const rest = restDiv.closest("#ai-rest-area");
        const restId = `${firstThreeRest.id}`
        window.location.href = `/restaurant-details.html?rest_id=${restId}`;
      });
    }
    form.reset();
    const previewImage = document.querySelector(".review-image-box > img");
    previewImage.src = "";

  })
}


