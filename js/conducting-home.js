const splash = document.querySelector(".conducting");
const bodyHeight = document.querySelector("body").scrollHeight;
splash.style.minHeight = bodyHeight + "px";

function removeSplash() {
  splash.style.opacity = 0;
  splash.style.pointerEvents = "none";
  console.log(splash.style.height);
}
setTimeout(() => {
  if ((splash.style.opacity = 1)) {
    removeSplash();
  }
}, 2000);

window.addEventListener("click", () => {
  removeSplash();
  window.removeEventListener("click", removeSplash);
});

const video = document.querySelector("video");
const videoContainer = document.querySelector("#video-container");

console.log(video.videoHeight);
