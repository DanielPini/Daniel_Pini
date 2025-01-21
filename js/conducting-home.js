const splash = document.querySelector(".conducting");

function removeSplash() {
  setTimeout(() => {
    splash.style.opacity = 0;
    splash.style.pointerEvents = "none";
  }, 2000);
}

removeSplash();
