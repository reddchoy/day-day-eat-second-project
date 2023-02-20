window.onload = () => {
  loadHeader();
  toRestaurantPage();
  showUserName();
  showCanvasContent()
  loadLoginModel();
  loadRegisterModel();
  register();
  login();
  logout();
  toSearchResult()
}

function toRestaurantPage() {
  const categories = [
    "壽司/刺身",
    "拉麵/烏冬",
    "天婦羅/炸物",
    "咖哩",
    "涮涮鍋/壽喜燒",
    "烤肉/日式串燒",
    "丼飯",
    "其他",
  ];
  categories_buttons = document.querySelectorAll(".foodCate");
  for (let i = 0; i < categories_buttons.length; i++) {
    categories_buttons[i].addEventListener("click", (e) => {
      window.location = `./restaurants.html?category=${categories[i]}`;
    });
  }
}

document.querySelector(".enter-btn").addEventListener("click", (e) => {
  window.location.href = `./restaurants.html`;
});

function toSearchResult() {
  let search = document.querySelector("#search-form");
  search.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    window.location = `./restaurants.html?keyword=${form.keyword.value}`;
  });
}