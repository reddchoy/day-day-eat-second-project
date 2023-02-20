window.onload = () => {
  loadUserLikeRecord();
  loadUserProfilePicAndUsername();
  loadHeader();
  showUserName();
  showCanvasContent();
  logout();
};

async function loadUserProfilePicAndUsername() {
  try {
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
  } catch (error) {
    console.log(error.message)
  }

}

async function loadUserLikeRecord() {
  try {
    const resp = await fetch("/users/likedRecords");
    const { data } = await resp.json();
  
    console.log("check data", data);
    const likedRestContainer = document.querySelector(".centerContent");
    likedRestContainer.innerHTML = ``;
  
    for (const restInfo of data) {
      console.log("check restInfo", restInfo);
      const likedRestDiv = document.createElement("div");
      likedRestDiv.className = "restaurant";
      likedRestDiv.dataset.rid = restInfo.restaurant_id;
      const restImgComment = document.createComment("restaurant Image");
      likedRestDiv.appendChild(restImgComment);
      const restImg = document.createElement("img");
      restImg.className = "likedRestImg";
      restImg.src = restInfo.rest_image;
      console.log("check src", restInfo.rest_image);
      restImg.alt = "Restaurant Image";
      likedRestDiv.appendChild(restImg);
      const restInfoDiv = document.createElement("div");
      restInfoDiv.className = "restaurantInfo";
  
      const restNameComment = document.createComment("Restaurant Name");
      restInfoDiv.appendChild(restNameComment);
      const restName = document.createElement("div");
      restName.className = "restaurantName";
      restName.textContent = restInfo.name;
      restInfoDiv.appendChild(restName);
  
      const scoreAndCounterComment = document.createComment("score and counter");
      restInfoDiv.appendChild(scoreAndCounterComment);
      const scoreAndCounterDiv = document.createElement("div");
      scoreAndCounterDiv.className = "scoreAndCounter";
  
      const scoreDiv = document.createElement("div");
      scoreDiv.className = "score";
      const scoreIcon = document.createElement("i");
      scoreIcon.className = "bi bi-hand-thumbs-up";
      scoreIcon.style = "font-size: medium";
      scoreDiv.textContent = "4";
      scoreDiv.appendChild(scoreIcon);
  
      const commentCountDiv = document.createElement("div");
      commentCountDiv.className = "commentCount";
      const commentCountIcon = document.createElement("i");
      commentCountIcon.className = "bi bi-chat-left-text";
      commentCountIcon.style = "font-size: medium";
      commentCountDiv.textContent = restInfo.view_number;
  
      scoreAndCounterDiv.appendChild(scoreDiv);
      commentCountDiv.appendChild(commentCountIcon);
      scoreAndCounterDiv.appendChild(commentCountDiv);
      restInfoDiv.appendChild(scoreAndCounterDiv);
  
      restInfoDiv.appendChild(document.createElement("hr"));
  
      const addressComment = document.createComment("address");
      restInfoDiv.appendChild(addressComment);
      const addressDiv = document.createElement("div");
      addressDiv.className = "address";
      const addressBTag = document.createElement("b");
      addressBTag.textContent = "地址: ";
      addressDiv.appendChild(addressBTag);
      const addressValue = document.createElement("div");
      addressValue.className = "addressValue";
      addressValue.textContent = restInfo.address;
      addressDiv.appendChild(addressValue);
      restInfoDiv.appendChild(addressDiv);
  
      restInfoDiv.appendChild(document.createElement("hr"));
  
      const priceComment = document.createComment("price");
      restInfoDiv.appendChild(priceComment);
      const priceDiv = document.createElement("div");
      priceDiv.className = "price";
      const priceBTag = document.createElement("b");
      priceBTag.textContent = "價錢: ";
      priceDiv.appendChild(priceBTag);
      const priceValue = document.createElement("div");
      priceValue.className = "priceValue";
      priceValue.textContent = `${restInfo.price}`;
      priceDiv.appendChild(priceValue);
      restInfoDiv.appendChild(priceDiv);
  
      restInfoDiv.appendChild(document.createElement("hr"));
  
      const phoneNumberComment = document.createComment("phone number");
      restInfoDiv.appendChild(phoneNumberComment);
      const phoneNumberDiv = document.createElement("div");
      phoneNumberDiv.className = "phoneNumber";
      const phoneNumberBTag = document.createElement("b");
      phoneNumberBTag.textContent = "Tel: ";
      phoneNumberDiv.appendChild(phoneNumberBTag);
      const phoneNumberValue = document.createElement("div");
      phoneNumberValue.className = "phoneNumberValue";
      phoneNumberValue.textContent = restInfo.phone_number;
      phoneNumberDiv.appendChild(phoneNumberValue);
      restInfoDiv.appendChild(phoneNumberDiv);
  
      restInfoDiv.appendChild(document.createElement("hr"));
  
      const restStyleComment = document.createComment("restaurant style");
      restInfoDiv.appendChild(restStyleComment);
      const restStyleDiv = document.createElement("div");
      restStyleDiv.className = "restStyle";
      restStyleDiv.textContent = restInfo.tag;
      restInfoDiv.appendChild(restStyleDiv);
  
      likedRestDiv.appendChild(restInfoDiv);
      likedRestContainer.appendChild(likedRestDiv);
  
      document.querySelector(".centerContent").addEventListener("click", (e) => {
        e.preventDefault();
        const restDiv = e.target;
        const rest = restDiv.closest(".restaurant");
        const restId = rest.dataset.rid;
        console.log(restId);
  
        window.location.href = `/restaurant-details.html?rest_id=${restId}`;
      });
    }
  } catch (error) {
    console.log(error.message)
  }

}
