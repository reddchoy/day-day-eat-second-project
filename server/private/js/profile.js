window.onload = () => {
  loadUserProfilePic();
  loadUserProfile();
  uploadUserProfile();
  loadHeader();
  showUserName();
  showCanvasContent();
  logout();
};

async function loadUserProfilePic() {
  const resp = await fetch("/users/profile");
  const { data } = await resp.json();

  const profileImg = document.querySelector(".profilePic");
  if (!data.profile_pic) {
    profileImg.src = "../userPic/default-profile-pic.png";
  } else {
    profileImg.src = data.profile_pic;
  }
}

async function loadUserProfile() {
  const resp = await fetch("/users/profile");
  const { data } = await resp.json();
  console.log(data);
  const profileImage = document.querySelector("#profilePicEdit");
  profileImage.src = data.profile_pic;
  const profileUsername = document.querySelector("#username");
  profileUsername.value = data.username;
  const profileEmail = document.querySelector("#email2");
  profileEmail.value = data.email;
  const profileMobile = document.querySelector("#mobileNumber");
  profileMobile.value = data.mobile_number;
}

async function uploadUserProfile() {
  document
    .querySelector("#profile-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const password = form.password.value;
      console.log(password, "qqq");
      const email = form.email.value;
      console.log(email);
      const profile_pic = form.fileInput.files[0];
      console.log(profile_pic);
      const mobile_number = form.mobileNumber.value;
      console.log(mobile_number);
      const formData = new FormData();
      formData.append("password", password);
      formData.append("email", email);
      formData.append("profile_pic", profile_pic);
      formData.append("mobile_number", mobile_number);
      const resp = await fetch("users/editProfile", {
        method: "put",
        body: formData,
      });
      const data = await resp.json();
      console.log(data);
      if (resp.status == 400) {
        alert(data.message);
        return;
      }
      alert(data.message);
    });
}
