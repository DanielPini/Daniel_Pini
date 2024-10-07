const header = document.querySelector('header');
const footer = document.querySelector('footer');

header.innerHTML = `
<div class="header">
  <button class="nav__button js-nav__button">
    <div class="nav__logo">
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
    </div>
    <nav class="nav">
      <ul class="nav-list">
        <li class="nav-list-item"><a href="./index.html">Home</a></li>
        <li class="nav-list-item"><a href="./about-conducting.html">About</a></li>
        <li class="nav-list-item"><a href="./events.html">Events</a></li>
        <li class="nav-list-item"><a href="./contact-conducting.html">Contact</a></li>
      </ul>
    </nav>
    <!-- <div class="socials">
      <ul class="socials-list">
        <li class="socials-list-item"><a href="https://www.instagram.com/daniel_pini/"><img src="./assets/icons/instagram_icon.svg" alt="Circle with colours outlining a camera in white."></a></li>
        <li class="socials-list-item"><a href="https://www.facebook.com/PiniConducts/"><img src="./assets/icons/facebook_icon.svg" alt="Circle with colours outlining a camera in white."></a></li>
        <li class="socials-list-item"><a href="https://www.youtube.com/@DanielEugenePini"><img src="./assets/icons/youtube_icon.svg" alt="Circle with colours outlining a camera in white."></a></li>
      </ul>
    </div> -->
  </button>
</nav>`;


footer.innerHTML = `
  <div class="footer">
    <div id="subscribe">
      <p>Enter your email to stay up to date on performances and news.</p>
      <form action="">
        <input
          type="email"
          name="email"
          id="email" autocomplete="true" />
        <input
          type="submit"
          value="Submit" />
      </form>
    </div>
    <div id="social-links-copyright-and-contact">
      <div class="footer-left footer-div">
        <div class="footer-socials">
          <ul class="socials-list">
            <li class="socials-list-item"><a href="https://www.instagram.com/daniel_pini/"><img src="./assets/icons/instagram_icon.svg" alt="Circle with colours outlining a camera in white."></a></li>
            <li class="socials-list-item"><a href="https://www.facebook.com/PiniConducts/"><img src="./assets/icons/facebook_icon.svg" alt="Circle with colours outlining a camera in white."></a></li>
            <li class="socials-list-item"><a href="https://www.youtube.com/@DanielEugenePini"><img src="./assets/icons/youtube_icon.svg" alt="Circle with colours outlining a camera in white."></a></li>
          </ul>
        </div>
      </div>
      <div class="footer-center footer-div">&copy 2024 Daniel Pini</div>
      <div class="footer-right footer-div"><a href="#">Contact Daniel</a></div>
    </div>
  </div>`;

