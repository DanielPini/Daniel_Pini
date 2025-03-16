const burgerIcon = document.querySelector(".js-nav__button");
const lines = document.querySelectorAll(".line");
const nav = document.querySelector(".nav");
const navList = document.querySelector(".nav-list");
const navListItem = document.querySelectorAll(".nav-list-item");

let burgerOpenFlag = false;

burgerIcon.addEventListener("click", () => {
  burgerOpenFlag = !burgerOpenFlag;
  // Div opens
  lines.forEach((line) => {
    line.classList.toggle("open");
  });
  nav.classList.toggle("open");
  navList.classList.toggle("open");
  navListItem.forEach((item) => {
    item.classList.toggle("open");
  });
});
document.addEventListener("click", (event) => {
  if (!burgerIcon.contains(event.target) && !nav.contains(event.target)) {
    burgerOpenFlag = false;
    lines.forEach((line) => {
      line.classList.remove("open");
    });
    nav.classList.remove("open");
    navList.classList.remove("open");
    navListItem.forEach((item) => {
      item.classList.remove("open");
    });
  }
});
