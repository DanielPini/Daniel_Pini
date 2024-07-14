import Timer from "./timer.js"
import piecesArray from "./data/pieces.js";

const metronomeApp = document.querySelector(".metronome-container");
const tempoDisplay = metronomeApp.querySelector(".tempo-display");
const tempoSlider = document.getElementById("tempo-slider");
const tempoMinus = metronomeApp.querySelector(".minus-tempo");
const tempoPlus = metronomeApp.querySelector(".plus-tempo");
const tempoButtonContainer = metronomeApp.querySelector(".tempo-button-container");
const saveUserList = document.getElementById("save-user-tempi");
const userTempo = document.getElementById("user-tempo");
const startStop = metronomeApp.querySelector(".start-stop");
const subdivMinus = metronomeApp.querySelector(".minus-beats");
const subdivPlus = metronomeApp.querySelector(".plus-beats");
const subdivDisplay = metronomeApp.querySelector(".subdiv-display");
const arraySelector = document.getElementById("array-selector")
const click1 = new Audio("../assets/audio/clicks/click1.mp3")
const click2 = new Audio("../assets/audio/clicks/click2.mp3")
click2.volume = 0.4;


updateArraySelector()

let selectedPiece = piecesArray[arraySelector.selectedIndex];

renderTempoList()

const tempoButtons = Array.from(metronomeApp.querySelectorAll(".tempo-button"));

let bpm = tempoButtons[0].innerText;
tempoDisplay.innerText = tempoButtons[0].innerText;
let beats = 1;
let count = 0;
let isRunning = false;


saveUserList.addEventListener("click", () => {
  addUserObject()
  updateArraySelector()
})

//add style to playing button.
tempoButtons[0].classList.add("is-playing")

arraySelector.addEventListener("change", () => {
  changePiece()
})
startStop.addEventListener("click", () => {
  count = 0;
  if (!isRunning) {
    metronome.start();
    startStop.classList.add("running")
    startStop.innerText = "Stop";
    isRunning = true;
  } else {
    metronome.stop()
    startStop.classList.remove("running")
    startStop.innerText = "Start";
    isRunning = false;
  }
  startStop.blur();
})
tempoMinus.addEventListener("click", () => {
  if (bpm <= 20) { return }
  bpm--;
  tempoMinus.blur()
  updateMetronome()
})
tempoPlus.addEventListener("click", () => {
  if (bpm >= 300) { return }
  bpm++;
  tempoPlus.blur()
  updateMetronome()
})
tempoSlider.addEventListener("input", () => {
  bpm = tempoSlider.value;
  tempoSlider.blur()
  updateMetronome()
})
subdivMinus.addEventListener("click", () => {
  if (beats <= 1) { return };
  beats--;
  subdivDisplay.innerText = beats;
  count = 0;
  subdivMinus.blur()
  updateMetronome()
})
subdivPlus.addEventListener("click", () => {
  if (beats >= 8) { return };
  beats++;
  subdivDisplay.innerText = beats;
  count = 0;
  subdivPlus.blur();
  updateMetronome()
})
userTempo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    bpm = userTempo.value;
    userTempo.blur();
    updateMetronome();
    selectedPiece.value.push(userTempo.value);
    userTempo.value = ""
    renderTempoList()
  }
})

function changePiece() {
  selectedPiece = piecesArray[arraySelector.selectedIndex];
  renderTempoList();
  tempoButtonContainer.firstElementChild.firstElementChild.classList.add("is-playing")
  beats = 1;
  bpm = tempoButtonContainer.firstElementChild.firstElementChild.innerText;
  arraySelector.blur();
  updateMetronome();  
}
function updateArraySelector() {
  arraySelector.innerHTML = generateArraySelectorHtml(piecesArray);
}
function renderTempoList() {
  let tempoList = '';
  selectedPiece.value.forEach(element => {
    const html = `
    <div class="tempo-button-item">
    <button class="tempo-button" data-beats="${testBeats(element)}">
    ${testBPM(element)}
    </button>
    <button class="delete modify-tempo-button">
    X
    </button>
    </div>
    `;
    tempoList += html;
  });
  tempoButtonContainer.innerHTML = tempoList;
  
  tempoButtonContainer.querySelectorAll(".tempo-button").forEach(button => {
    button.addEventListener("click", () => {
      count = 0;
      metronomeApp.querySelector(".is-playing").classList.remove("is-playing")
      button.classList.add("is-playing")
      bpm = button.innerText;
      beats = button.dataset.beats;
      updateMetronome();
      metronome.stop();
      metronome.start();
      startStop.classList.add("running")
      startStop.innerText = "Stop";
      isRunning = true;
      button.blur();
    })
  });
  
  // Add delete functionality
  tempoButtonContainer.querySelectorAll(".delete").forEach((button, index) => {
    button.addEventListener("click", () => {
      selectedPiece.value.splice(index, 1);
      renderTempoList();
    })
  })
}
// Update Metronome
function updateMetronome() {
  count = 0;
  tempoDisplay.innerText = bpm;
  tempoSlider.value = bpm; 
  subdivDisplay.innerText = beats;
  metronome.timeInterval = 60000 / (bpm * beats);
}
//Add User Tempo List
function addUserObject() {
  let array = [];
  tempoButtonContainer.querySelectorAll(".tempo-button").forEach(button => {
  array.push(button.innerText)
  })
  const objectName = prompt("Please enter a name for your tempi list.")
  let userObject = {
    name: objectName,
    value: array
    }
  piecesArray.push(userObject)
}
// Populate <select> tag HTML
function generateArraySelectorHtml(array) {
  let list = ""
  for (let i = 0; i < array.length; i++) {
    list += `
    <option
    value="${array[i]}"
    class="array-selector__option"
    selected>${array[i].name}</option>
    `
  }
  return list
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
    click2.play()
    click2.currentTime = 0;
  }
  count++;
}

function testBeats(element) {
  if (element.length == undefined) {
    return 1 } else {
    return element[1];
    }
};
function testBPM(element) {
  if (element.length == undefined) {
    return element;
     
  } else {
    return element[0];
  }
}

const metronome = new Timer(playClick, 60000 / (bpm * beats), { immediate: true });
//Play on Space Bar keydown
window.addEventListener("keydown", (e) => {
  if (!(e.key == " ")) { return } 
  else {
    count = 0;
    if (!isRunning) {
      metronome.start();
      startStop.classList.add("running")
      startStop.innerText = "Stop";
      isRunning = true;
    } else {
      metronome.stop()
      startStop.classList.remove("running")
      startStop.innerText = "Start";
      isRunning = false;
    }
  } 
})
//Play on number entry.
window.addEventListener("keydown", (e) => {
  tempoButtonContainer.querySelectorAll(".tempo-button").forEach((button, i) => {
    if (!(e.key == i + 1)) { return }
    else {
      metronomeApp.querySelector(".is-playing").classList.remove("is-playing")
      button.classList.add("is-playing")
      console.log(button)
      bpm = button.innerText;
      beats = button.dataset.beats;
      updateMetronome();
      metronome.stop();
      metronome.start();
      startStop.classList.add("running")
      startStop.innerText = "Stop";
      isRunning = true;
    }
  })
});
window.addEventListener("keydown", (e) => {
  let currentButton = metronomeApp.querySelector(".is-playing")
  let prev = currentButton.parentElement.previousElementSibling.firstElementChild;
  if (!(e.key == "ArrowLeft")) { return }
  else if (prev == null) { return}
  else {
    currentButton.classList.remove("is-playing")
    prev.classList.add("is-playing")
    bpm = prev.innerText;
    beats = prev.dataset.beats;
    updateMetronome();
    metronome.stop();
    metronome.start();
    startStop.classList.add("running")
    startStop.innerText = "Stop";
    isRunning = true;
  }
})
window.addEventListener("keydown", (e) => {
  let currentButton = metronomeApp.querySelector(".is-playing")
  let next = currentButton.parentElement.nextElementSibling.firstElementChild;
  if (!(e.key == "ArrowRight")) { return }
  else if (next == null) { return}
  else {
    currentButton.classList.remove("is-playing")
    next.classList.add("is-playing")
    bpm = next.innerText;
    beats = next.dataset.beats;
    updateMetronome();
    metronome.stop();
    metronome.start();
    startStop.classList.add("running")
    startStop.innerText = "Stop";
    isRunning = true;
  }
})
