const burgerIcon = document.querySelector(".js-nav__button")
const lines = document.querySelectorAll(".line")
const nav = document.querySelector(".nav")
const navList = document.querySelector(".nav-list")
const navListItem = document.querySelectorAll(".nav-list-item")

burgerIcon.addEventListener("click", () => {
  // Div opens
  lines.forEach(line => {
    line.classList.toggle("open")
  });
  nav.classList.toggle("open")
  navList.classList.toggle("open")
  navListItem.forEach(item => {
    item.classList.toggle("open")
  })
  // .nav__logo {
  //   opacity: 1;
  //   position: relative;
  //   transition: all 100ms ease;
  //   .line {
  //     position: absolute;
  //     background-color: black;
  //     width: 22px;
  //     height: 2px;
  //     margin: auto;
  //     border-radius: 10px;
  //     left: -2px;
  //     transition: var(--transition);
  //   }
  //   .line-1 {
  //     top: -8px;
  //   }
  //   .line-2 {
  //     top: 0px;
  //   }
  //   .line-3 {
  //     top: 8px;
  //   }
  // }
  // .line-2 {
  //   opacity: 0
  // }
  // .line-1 {
  //   top: 0;
  //   transform: rotate(45deg);
  // }
  // .line-3 {
  //   top: 0;
  //   transform: rotate(-45deg);
  // }
  // .nav {
  //   .nav-list {
  //     .nav-list-item {
  //       padding: 12px 0;
  //       opacity: 1;
  //     }
  //   }
  // }
  // Then drop-down ripples down after 300ms
})