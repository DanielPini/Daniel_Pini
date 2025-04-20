const header = document.querySelector("header");
const footer = document.querySelector("footer");

// Add desktop option for code with hover-friendly dropdown
const desktopCode = ` 
  <li class="nav-list-item nav__about">
    <a href="/about">About</a>
    <ul class="dropdown">
      <li class="nav-list-item nav__bio"><a href="/about">BIOGRAPHY</a></li>
      <li class="nav-list-item nav__disc">
        <a href="/being">DISCOGRAPHY</a>
      </li>
    </ul>
  </li>
  <li class="nav-list-item">
    <a href="/web_dev">WEB DEV</a>
  </li>`;

// Add option without dropdown for mobile devices
const mobileCode = ` 
  <li class="nav-list-item nav__about">
    <a href="/about">About</a>
  </li>
  <li class="nav-list-item">
    <a href="/being">BEING</a>
  </li>`;
let mobile = true;

// Set flag for screen width
isMobile();

// Listen for changes in screen size
window.addEventListener("resize", isMobile);

function generateHeaderHTML() {
  return `
    <div class="header">
      <button class="nav__button js-nav__button">
        <div class="nav__logo">
          <div class="line line-1"></div>
          <div class="line line-2"></div>
          <div class="line line-3"></div>
        </div>
      </button>
      <nav class="nav">
        <ul class="nav-list">
          <li class="nav-list-item"><a href="/">Home</a></li>
          ${mobile ? mobileCode : desktopCode}
          <li class="nav-list-item"><a href="/events">Events</a></li>
        </ul>
      </nav>
    </div>`;
}

footer.innerHTML = `<div class="footer">
  <div id="subscribe" class="footer-left">
    <p>SUBSCRIBE</p>
    <form action="">
      <input
        type="email"
        name="email"
        id="email"
        placeholder="email"
        autocomplete="true" />
      <input
        id="submit"
        type="submit"
        value="SUBMIT" />
    </form>
  </div>
  <div id="social-links-copyright-and-contact" class="footer-right">
    <div class="contact"><a href="/contact">CONTACT</a></div>
      <div class="footer-socials">
        <ul class="socials-list">
          <li class="socials-list-item">
            <a href="https://www.instagram.com/daniel_pini/"
              ><img
                src="/assets/icons/instagram_icon.svg"
                alt="Circle with colours outlining a camera in white."
            /></a>
          </li>
          <li class="socials-list-item">
            <a href="https://www.facebook.com/PiniConducts/"
              ><img
                src="/assets/icons/facebook_icon.svg"
                alt="Circle with colours outlining a camera in white."
            /></a>
          </li>
          <li class="socials-list-item">
            <a href="https://www.youtube.com/@DanielEugenePini"
              ><img
                src="/assets/icons/youtube_icon.svg"
                alt="Circle with colours outlining a camera in white."
            /></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="copyright">&copy 2025 Daniel Pini</div>
</div>`;

function initialiseBurgerMenu() {
  const burgerButton = document.querySelector(".js-nav__button");
  const lines = document.querySelectorAll(".line");
  const nav = document.querySelector(".nav");
  const navListItems = document.querySelectorAll(".nav-list-item");

  let burgerOpenFlag = false;

  burgerButton?.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent button default action
    burgerOpenFlag = !burgerOpenFlag;
    lines.forEach((line) => line.classList.toggle("open"));
    nav.classList.toggle("open");
    navListItems.forEach((item) => item.classList.toggle("open"));
  });

  document.addEventListener("click", (event) => {
    if (!burgerOpenFlag) return;
    if (!burgerButton.contains(event.target) && !nav.contains(event.target)) {
      burgerOpenFlag = false;
      lines.forEach((line) => line.classList.remove("open"));
      nav.classList.remove("open");
      navListItems.forEach((item) => item.classList.remove("open"));
    }
  });
}

// Determine window size and set mobile flag and return the correct code for the flag set.
function isMobile() {
  mobile = window.innerWidth > 600 ? false : true;
  header.innerHTML = generateHeaderHTML();
  initialiseBurgerMenu();
}
