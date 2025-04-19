import Timer from "./Timer.js";
import piecesArray from "./data/pieces.js";
import Tapper from "../src/Tapper.js";

const metronomeApp = document.querySelector(".metronome-container");
const metronomeTempoDisplay = metronomeApp.querySelector(
  ".js-metronome_tempo-display"
);
const metronomeTempoSlider = document.getElementById("metronome_tempo-slider");
const metronomeTempoMinus = metronomeApp.querySelector(
  ".js-metronome_minus-tempo-stepper"
);
const metronomeTempoPlus = metronomeApp.querySelector(
  ".js-metronome_plus-tempo-stepper"
);
const tempoButtonContainer = metronomeApp.querySelector(
  ".tempo-button-container"
);
const saveUserList = document.getElementById("save-user-tempi");
const userTempo = document.getElementById("metronome_user-tempo");
const startStop = metronomeApp?.querySelector(".start-stop");
const subdivMinus = metronomeApp?.querySelector(".minus-beats");
const subdivPlus = metronomeApp?.querySelector(".plus-beats");
const subdivDisplay = metronomeApp?.querySelector(".subdiv-display");
const arraySelector = document.getElementById("repertoire-selector");
const click1 = new Audio("/assets/audio/clicks/click1.mp3");
const click2 = new Audio("/assets/audio/clicks/click2.mp3");
click2.volume = 0.4;

updateArraySelector();
let selectedPiece = piecesArray[arraySelector.selectedIndex];

renderTempoList();

const tempoButtons = Array.from(metronomeApp.querySelectorAll(".tempo-button"));

let bpm = tempoButtons[0].innerText;
metronomeTempoDisplay.innerText = tempoButtons[0].innerText;
metronomeTempoSlider.value = bpm;
let beats = 1;
let count = 0;
let isRunning = false;

// Listen for click to add tempo to user tempos
saveUserList.addEventListener("click", () => {
  addUserObject();
  updateArraySelector();
});

//add style to playing button.
tempoButtons[0].classList.add("is-playing");

arraySelector.addEventListener("change", () => {
  changePiece();
});
startStop.addEventListener("click", () => {
  count = 0;
  if (!isRunning) {
    metronome.start();
    startStop.classList.add("running");
    startStop.innerHTML = `<svg
      width="100%"
      height="100%"
      viewBox="0 0 67 67"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <rect
          id="path-1"
          x="-4"
          y="0"
          width="8"
          height="35"
          fill="white"></rect>
        <mask
          id="mask-2"
          maskContentUnits="userSpaceOnUse"
          maskUnits="objectBoundingBox"
          x="0"
          y="0"
          width="8"
          height="35"
          fill="white">
          <use xlink:href="#path-1"></use>
        </mask>
        <rect
          id="path-3"
          x="11"
          y="0"
          width="8"
          height="35"
          fill="white"></rect>
        <mask
          id="mask-4"
          maskContentUnits="userSpaceOnUse"
          maskUnits="objectBoundingBox"
          x="0"
          y="0"
          width="8"
          height="35"
          fill="white">
          <use xlink:href="#path-3"></use>
        </mask>
      </defs>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd">
        <g
          id="pause"
          transform="translate(1.000000, 1.000000)">
          <g id="play-copy">
            <g id="Group">
              <g
                id="Group-2"
                transform="translate(25.000000, 15.000000)"
                stroke="#4A4A4A"
                stroke-width="2">
                <use
                  id="Rectangle-1"
                  mask="url(#mask-2)"
                  xlink:href="#path-1"></use>
                <use
                  id="Rectangle-1-Copy"
                  mask="url(#mask-4)"
                  xlink:href="#path-3"></use>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>`;
    isRunning = true;
  } else {
    metronome.stop();
    startStop.classList.remove("running");
    startStop.innerHTML = `<svg
        width="100%"
        height="100%"
        viewBox="0 0 67 67"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd">
          <g
            id="play"
            transform="translate(1.000000, 1.000000)">
            <g id="Group">
              <polygon
                id="Triangle-1"
                stroke="#4A4A4A"
                fill="#FFFFFF"
                transform="translate(30.000000, 28.500000) rotate(-30.000000) translate(-30.000000, -28.500000) "
                points="30 14.0312405 46.5 42.9687595 13.5 42.9687595"></polygon>
            </g>
          </g>
        </g>
      </svg>`;
    isRunning = false;
  }
  startStop.blur();
});
metronomeTempoMinus.addEventListener("click", () => {
  if (bpm <= 20) {
    return;
  }
  bpm--;
  metronomeTempoMinus.blur();
  updateMetronome();
});
metronomeTempoPlus.addEventListener("click", () => {
  if (bpm >= 300) {
    return;
  }
  bpm++;
  metronomeTempoPlus.blur();
  updateMetronome();
});
metronomeTempoSlider.addEventListener("input", () => {
  bpm = metronomeTempoSlider.value;
  metronomeTempoSlider.blur();
  updateMetronome();
});
subdivMinus.addEventListener("click", () => {
  if (beats <= 1) {
    return;
  }
  beats--;
  subdivDisplay.innerText = beats;
  count = 0;
  subdivMinus.blur();
  updateMetronome();
});
subdivPlus.addEventListener("click", () => {
  if (beats >= 8) {
    return;
  }
  beats++;
  subdivDisplay.innerText = beats;
  count = 0;
  subdivPlus.blur();
  updateMetronome();
});
userTempo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    bpm = userTempo.value;

    userTempo.blur();
    updateMetronome();
    let userTempoData = [userTempo.value, beats];
    console.log(userTempoData);
    selectedPiece.value.push(userTempoData);
    userTempo.value = "";
    renderTempoList();
  }
});

function changePiece() {
  selectedPiece = piecesArray[arraySelector.selectedIndex];
  renderTempoList();
  tempoButtonContainer.firstElementChild.firstElementChild.classList.add(
    "is-playing"
  );
  beats = 1;
  bpm = tempoButtonContainer.firstElementChild.firstElementChild.innerText;
  arraySelector.blur();
  updateMetronome();
}
function updateArraySelector() {
  arraySelector.innerHTML = generateArraySelectorHtml(piecesArray);
}
function renderTempoList() {
  let tempoList = "";
  selectedPiece.value.forEach((element) => {
    const html = `
      <div class="tempo-button-item">
        <div
          class="tempo-button"
          data-beats="${testBeats(element)}">
          ${testBPM(element)}
          <button class="delete modify-tempo-button">
            <svg
              viewBox="0 0 30 30"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="close-button">
              <g
                id="Homepage"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd">
                <g
                  id="Mobile-Portrait-Copy"
                  transform="translate(-279.000000, -78.000000)"
                  fill="#D8D8D8">
                  <g
                    id="Close"
                    transform="translate(279.000000, 78.000000)">
                    <g id="Group-2">
                      <rect
                        id="Rectangle-113-Copy-3"
                        transform="translate(14.849242, 14.849242) rotate(-45.000000) translate(-14.849242, -14.849242) "
                        x="-4.1507576"
                        y="12.8492424"
                        width="38"
                        height="4"
                        rx="1"></rect>
                      <rect
                        id="Rectangle-113-Copy-4"
                        transform="translate(14.849242, 14.849242) rotate(45.000000) translate(-14.849242, -14.849242) "
                        x="-4.1507576"
                        y="12.8492424"
                        width="38"
                        height="4"
                        rx="1"></rect>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </div>
      </div>
    `;
    tempoList += html;
  });
  tempoButtonContainer.innerHTML = tempoList;

  tempoButtonContainer.querySelectorAll(".tempo-button").forEach((button) => {
    button.addEventListener("click", () => {
      count = 0;
      metronomeApp.querySelector(".is-playing").classList.remove("is-playing");
      button.classList.add("is-playing");
      bpm = button.innerText;
      beats = button.dataset.beats;
      updateMetronome();
      metronome.stop();
      metronome.start();
      startStop.classList.add("running");
      startStop.innerHTML = `<svg
        width="100%"
        height="100%"
        viewBox="0 0 67 67"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <rect
            id="path-1"
            x="0"
            y="0"
            width="4"
            height="35"
            fill="white"></rect>
          <mask
            id="mask-2"
            maskContentUnits="userSpaceOnUse"
            maskUnits="objectBoundingBox"
            x="0"
            y="0"
            width="4"
            height="35"
            fill="white">
            <use xlink:href="#path-1"></use>
          </mask>
          <rect
            id="path-3"
            x="11"
            y="0"
            width="4"
            height="35"
            fill="white"></rect>
          <mask
            id="mask-4"
            maskContentUnits="userSpaceOnUse"
            maskUnits="objectBoundingBox"
            x="0"
            y="0"
            width="4"
            height="35"
            fill="white">
            <use xlink:href="#path-3"></use>
          </mask>
        </defs>
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd">
          <g
            id="pause"
            transform="translate(1.000000, 1.000000)">
            <g id="play-copy">
              <g id="Group">
                <circle
                  id="Oval-33"
                  stroke="#424242"
                  cx="32.5"
                  cy="32.5"
                  r="32.5"></circle>
                <g
                  id="Group-2"
                  transform="translate(25.000000, 15.000000)"
                  stroke="#4A4A4A"
                  stroke-width="2">
                  <use
                    id="Rectangle-1"
                    mask="url(#mask-2)"
                    xlink:href="#path-1"></use>
                  <use
                    id="Rectangle-1-Copy"
                    mask="url(#mask-4)"
                    xlink:href="#path-3"></use>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>`;
      isRunning = true;
      button.blur();
    });
  });

  // Add delete functionality
  tempoButtonContainer.querySelectorAll(".delete").forEach((button, index) => {
    button.addEventListener("click", () => {
      selectedPiece.value.splice(index, 1);
      renderTempoList();
    });
  });
}
// Update Metronome
function updateMetronome() {
  count = 0;
  metronomeTempoDisplay.innerText = bpm;
  metronomeTempoSlider.value = bpm;
  subdivDisplay.innerText = beats;
  metronome.timeInterval = 60000 / (bpm * beats);
}
//Add User Tempo List
function addUserObject() {
  let array = [];
  tempoButtonContainer.querySelectorAll(".tempo-button").forEach((button) => {
    array.push(button.innerText);
  });
  const objectName = prompt("Please enter a name for your tempi list.");
  let userObject = {
    name: objectName,
    value: array,
  };
  piecesArray.push(userObject);
}
// Populate <select> tag HTML
function generateArraySelectorHtml(array) {
  let list = "";
  for (let i = 0; i < array.length; i++) {
    list += `
    <option
    value="${array[i]}"
    class="array-selector__option"
    selected>${array[i].name}</option>
    `;
  }
  return list;
}
//Play the click sound
function playClick() {
  if (count == beats) {
    count = 0;
  }
  if (count == 0) {
    click1.play();
    click1.currentTime = 0;
  } else {
    click2.play();
    click2.currentTime = 0;
  }
  count++;
}

function testBeats(element) {
  if (element.length == undefined) {
    return 1;
  } else {
    return element[1];
  }
}
function testBPM(element) {
  if (element.length == undefined) {
    return element;
  } else {
    return element[0];
  }
}

const metronome = new Timer(playClick, 60000 / (bpm * beats), {
  immediate: true,
});

//Play on Space Bar keydown
window.addEventListener("keydown", (e) => {
  if (!(e.key == " ")) {
    return;
  } else {
    count = 0;
    if (!isRunning) {
      metronome.start();
      startStop.classList.add("running");
      startStop.innerHTML = `<svg
        width="100%"
        height="100%"
        viewBox="0 0 67 67"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <rect
            id="path-1"
            x="0"
            y="0"
            width="4"
            height="35"
            fill="white"></rect>
          <mask
            id="mask-2"
            maskContentUnits="userSpaceOnUse"
            maskUnits="objectBoundingBox"
            x="0"
            y="0"
            width="4"
            height="35"
            fill="white">
            <use xlink:href="#path-1"></use>
          </mask>
          <rect
            id="path-3"
            x="11"
            y="0"
            width="4"
            height="35"
            fill="white"></rect>
          <mask
            id="mask-4"
            maskContentUnits="userSpaceOnUse"
            maskUnits="objectBoundingBox"
            x="0"
            y="0"
            width="4"
            height="35"
            fill="white">
            <use xlink:href="#path-3"></use>
          </mask>
        </defs>
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd">
          <g
            id="pause"
            transform="translate(1.000000, 1.000000)">
            <g id="play-copy">
              <g id="Group">
                <circle
                  id="Oval-33"
                  stroke="#424242"
                  cx="32.5"
                  cy="32.5"
                  r="32.5"></circle>
                <g
                  id="Group-2"
                  transform="translate(25.000000, 15.000000)"
                  stroke="#4A4A4A"
                  stroke-width="2">
                  <use
                    id="Rectangle-1"
                    mask="url(#mask-2)"
                    xlink:href="#path-1"></use>
                  <use
                    id="Rectangle-1-Copy"
                    mask="url(#mask-4)"
                    xlink:href="#path-3"></use>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>`;
      isRunning = true;
    } else {
      metronome.stop();
      startStop.classList.remove("running");
      startStop.innerHTML = `<svg
        width="100%"
        height="100%"
        viewBox="0 0 67 67"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd">
          <g
            id="play"
            transform="translate(1.000000, 1.000000)">
            <g id="Group">
              <polygon
                id="Triangle-1"
                stroke="#4A4A4A"
                fill="#FFFFFF"
                transform="translate(30.000000, 28.500000) rotate(-30.000000) translate(-30.000000, -28.500000) "
                points="30 14.0312405 46.5 42.9687595 13.5 42.9687595"></polygon>
            </g>
          </g>
        </g>
      </svg>`;
      isRunning = false;
    }
  }
});

//Play on number entry.
window.addEventListener("keydown", (e) => {
  tempoButtonContainer
    .querySelectorAll(".tempo-button")
    .forEach((button, i) => {
      if (!(e.key == i + 1)) {
        return;
      } else {
        metronomeApp
          .querySelector(".is-playing")
          .classList.remove("is-playing");
        button.classList.add("is-playing");
        console.log(button);
        bpm = button.innerText;
        beats = button.dataset.beats;
        updateMetronome();
        metronome.stop();
        metronome.start();
        startStop.classList.add("running");
        startStop.innerHTML = `<svg
        width="100%"
        height="100%"
        viewBox="0 0 67 67"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd">
          <g
            id="play"
            transform="translate(1.000000, 1.000000)">
            <g id="Group">
              <polygon
                id="Triangle-1"
                stroke="#4A4A4A"
                fill="#FFFFFF"
                transform="translate(30.000000, 28.500000) rotate(-30.000000) translate(-30.000000, -28.500000) "
                points="30 14.0312405 46.5 42.9687595 13.5 42.9687595"></polygon>
            </g>
          </g>
        </g>
      </svg>`;
        isRunning = true;
      }
    });
});
window.addEventListener("keydown", (e) => {
  const currentButton = metronomeApp.querySelector(".is-playing");
  const prevParent = currentButton.parentElement.previousElementSibling;
  if (!(e.key == "ArrowLeft")) {
    return;
  } else if (prevParent == null) {
    return;
  } else {
    const prev =
      currentButton.parentElement.previousElementSibling.firstElementChild;
    currentButton.classList.remove("is-playing");
    prev.classList.add("is-playing");
    bpm = prev.innerText;
    beats = prev.dataset.beats;
    updateMetronome();
    metronome.stop();
    metronome.start();
    startStop.classList.add("running");
    startStop.innerHTML = `<svg
        width="100%"
        height="100%"
        viewBox="0 0 67 67"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd">
          <g
            id="play"
            transform="translate(1.000000, 1.000000)">
            <g id="Group">
              <polygon
                id="Triangle-1"
                stroke="#4A4A4A"
                fill="#FFFFFF"
                transform="translate(30.000000, 28.500000) rotate(-30.000000) translate(-30.000000, -28.500000) "
                points="30 14.0312405 46.5 42.9687595 13.5 42.9687595"></polygon>
            </g>
          </g>
        </g>
      </svg>`;
    isRunning = true;
  }
});
window.addEventListener("keydown", (e) => {
  let currentButton = metronomeApp.querySelector(".is-playing");
  let nextParent = currentButton.parentElement.nextElementSibling;
  if (!(e.key == "ArrowRight")) {
    return;
  } else if (nextParent == null) {
    return;
  } else {
    const next =
      currentButton.parentElement.nextElementSibling.firstElementChild;
    currentButton.classList.remove("is-playing");
    next.classList.add("is-playing");
    bpm = next.innerText;
    beats = next.dataset.beats;
    updateMetronome();
    metronome.stop();
    metronome.start();
    startStop.classList.add("running");
    startStop.innerHTML = `<svg
        width="100%"
        height="100%"
        viewBox="0 0 67 67"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd">
          <g
            id="play"
            transform="translate(1.000000, 1.000000)">
            <g id="Group">
              <polygon
                id="Triangle-1"
                stroke="#4A4A4A"
                fill="#FFFFFF"
                transform="translate(30.000000, 28.500000) rotate(-30.000000) translate(-30.000000, -28.500000) "
                points="30 14.0312405 46.5 42.9687595 13.5 42.9687595"></polygon>
            </g>
          </g>
        </g>
      </svg>`;
    isRunning = true;
  }
});

const tapperTempoDisplay = document.querySelector(".js-tapper_tempo-display");
const tapperTempoSlider = document.getElementById("tapper_tempo-slider");
const tapperTempoPlus = document.querySelector(".js-tapper_plus-tempo-stepper");
const tapperTempoMinus = document.querySelector(
  ".js-tapper_minus-tempo-stepper"
);
const tapButton = document.querySelector(".js-tapper");
let tapperBpm = 123; // Initial BPM

tapperTempoSlider.value = tapperBpm;
tapperTempoDisplay.innerText = tapperBpm;

const tapper = new Tapper({ tempo: tapperBpm });

// Update the Tapper display and tempo
const updateTapperDisplay = () => {
  tapperTempoDisplay.innerText = tapperBpm;
  tapperTempoSlider.value = tapperBpm;
  console.log(tapperBpm);
  tapper.setTempo(tapperBpm); // Update the Tapper instance
};

// Attach event listeners for tempo controls
tapperTempoPlus.addEventListener("click", () => {
  if (tapperBpm < 300) {
    tapperBpm++;
    updateTapperDisplay();
  }
});

tapperTempoMinus.addEventListener("click", () => {
  if (tapperBpm > 20) {
    tapperBpm--;
    updateTapperDisplay();
  }
});

tapperTempoSlider.addEventListener("input", () => {
  tapperBpm = parseInt(tapperTempoSlider.value, 10);
  updateTapperDisplay();
});

// Register taps
tapper.registerTaps(tapButton);
