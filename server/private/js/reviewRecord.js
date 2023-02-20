window.onload = () => {
  loadUserProfilePicAndUsername();
  loadReviewRecord();
  loadHeader();
  showUserName();
  showCanvasContent();
  logout();
};
let selectedReviewRecord;

async function loadUserProfilePicAndUsername() {
  
  const resp = await fetch("/users/profile");
  const { data } = await resp.json();
  const userName = document.querySelector(".detailName");
  userName.textContent = data.username;
  const likedRestImg = document.querySelector(".detailProfilePic");
  if (!data.profile_pic) {
    likedRestImg.src = "../userPic/default-profile-pic.png";
  } else {
    likedRestImg.src = data.profile_pic;
  }
  const profileImg = document.querySelector(".profilePic");
  if (!data.profile_pic) {
    profileImg.src = "../userPic/default-profile-pic.png";
  } else {
    profileImg.src = data.profile_pic;
  }
}

async function loadReviewRecord() {
  const resp = await fetch("/users/reviewRecords");
  const { data } = await resp.json();

  const reviewRestContainer = document.querySelector(".centerContent");
  reviewRestContainer.innerHTML = ``;
  for (const restReview of data) {
    const commentBoxDiv = document.createElement("div");
    commentBoxDiv.className = "commentBox";
    const commentTopDiv = document.createElement("div");
    commentTopDiv.className = "commentTop";
    const restNameAndTagDiv = document.createElement("div");
    restNameAndTagDiv.className = "restNameAndTag";
    const restaurantNameDiv = document.createElement("div");
    restaurantNameDiv.className = "restaurantName";
    restaurantNameDiv.textContent = restReview.name;
    restNameAndTagDiv.appendChild(restaurantNameDiv);
    const restaurantTagDiv = document.createElement("div");
    restaurantTagDiv.className = "restaurantTag";
    restaurantTagDiv.textContent = "still testing";
    commentTopDiv.appendChild(restNameAndTagDiv);
    const commentDateDiv = document.createElement("div");
    commentDateDiv.className = "commentDate";
    const commentDateBTag = document.createElement("b");
    commentDateBTag.textContent = "Create at: ";
    commentDateDiv.appendChild(commentDateBTag);
    commentDateDiv.textContent = moment(restReview.created_at).format(
      "MMMM Do YYYY, h:mm:ss a"
    );
    commentTopDiv.appendChild(commentDateDiv);
    commentBoxDiv.appendChild(commentTopDiv);
    commentBoxDiv.appendChild(document.createElement("hr"));
    const commentAndAIImageDiv = document.createElement("div");
    commentAndAIImageDiv.className = "commentAndAIImage";
    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";
    commentDiv.textContent = restReview.content;
    commentAndAIImageDiv.appendChild(commentDiv);
    const aiImageDiv = document.createElement("div");
    aiImageDiv.className = "aiImage";
    const commentAIImage = document.createElement("img");
    commentAIImage.className = "commentAIImage";
    if (!restReview.review_image) {
      commentAIImage.src = "../restaurant/default-restaurant-image.jpg";
    } else {
      commentAIImage.src = restReview.review_image;
    }
    commentAIImage.alt = "AI Image";
    aiImageDiv.appendChild(commentAIImage);
    commentAndAIImageDiv.appendChild(aiImageDiv);
    commentBoxDiv.appendChild(commentAndAIImageDiv);

    const vcAndRatingDiv = document.createElement("div");
    vcAndRatingDiv.className = "vcAndRating";
    const foodAndEnvRatingDiv = document.createElement("div");
    foodAndEnvRatingDiv.className = "foodAndEnvRating";

    const foodRatingDiv = document.createElement("div");
    foodRatingDiv.className = "foodRating";
    const foodRatingBTag = document.createElement("b");
    foodRatingBTag.textContent = "食物: ";
    foodRatingDiv.appendChild(foodRatingBTag);
    const foodRatingValue = document.createElement("div");
    foodRatingValue.className = "foodRatingValue";
    foodRatingValue.textContent = restReview.food_rating;
    foodRatingDiv.appendChild(foodRatingValue);
    foodAndEnvRatingDiv.appendChild(foodRatingDiv);

    const envRatingDiv = document.createElement("div");
    envRatingDiv.className = "envRating";
    const envRatingBTag = document.createElement("b");
    envRatingBTag.textContent = "環境: ";
    envRatingDiv.appendChild(envRatingBTag);
    const envRatingValue = document.createElement("div");
    envRatingValue.className = "envRatingValue";
    envRatingValue.textContent = restReview.environment_rating;
    envRatingDiv.appendChild(envRatingValue);
    foodAndEnvRatingDiv.appendChild(envRatingDiv);
    vcAndRatingDiv.appendChild(foodAndEnvRatingDiv);

    const vcAndDeleteDiv = document.createElement("div");
    vcAndDeleteDiv.className = "vcAndDeleteDiv";
    const viewCountDiv = document.createElement("div");
    viewCountDiv.className = "viewCount";
    viewCountDiv.style = "font-size: small; margin: 10px";
    const viewCountIcon = document.createElement("i");
    viewCountIcon.className = "bi bi-eye";
    viewCountIcon.textContent = restReview.view_number;
    viewCountDiv.appendChild(viewCountIcon);
    vcAndDeleteDiv.appendChild(viewCountDiv);

    const deleteReviewDiv = document.createElement("div");
    deleteReviewDiv.className = "deleteReview";
    const deleteReviewBtn = document.createElement("button");
    deleteReviewBtn.className = "deleteReviewBtn";
    deleteReviewBtn.dataset.rid = restReview.id;
    console.log("check restReview", restReview);
    const deleteReviewBtnIcon = document.createElement("i");
    deleteReviewBtnIcon.className = "bi bi-trash3";
    deleteReviewBtn.appendChild(deleteReviewBtnIcon);

    vcAndDeleteDiv.appendChild(deleteReviewBtn);
    vcAndRatingDiv.appendChild(vcAndDeleteDiv);

    commentBoxDiv.appendChild(vcAndRatingDiv);
    reviewRestContainer.appendChild(commentBoxDiv);
  }
  deleteReviewRecord();
}
function deleteReviewRecord() {
  const deleteBtns = document.querySelectorAll(".deleteReviewBtn");
  for (const deleteBtn of deleteBtns) {
    const btnId = deleteBtn.dataset.rid;
    deleteBtn.addEventListener("click", async (e) => {
      console.log("clicked");
      const resp = await fetch(`/users/deleteReviewRecords/${btnId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json;charset=utf-8",
        },
      });
      const { message } = await resp.json();
      alert(message);
      window.location = "./reviewRecord.html";
    });
  }
}
