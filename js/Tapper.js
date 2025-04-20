var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import commonTempos from "../js/tempos.js";
import Timer from "../js/Timer.js";
export default class Tapper {
  constructor(config = {}) {
    this.tempo = config.tempo || 80; // Default tempo is 80 BPM
    this.expectedTimeBetweenTaps = 60000 / this.tempo; // Time in ms between taps
    this.tapCount = 0; // Number of taps
    this.firstTapTime = null; // Timestamp of the first tap
    this.lastTapTime = null; // Timestamp of the last tap
    this.timeoutId = null; // Timeout ID for resetting taps
    this.callback =
      config.callback || ((count) => console.log(`Total taps: ${count}`)); // Default callback
    this.timeoutDuration =
      config.timeoutDuration || this.expectedTimeBetweenTaps * 2; // Default timeout duration
    this.tempoDisplay = null;
    this.tempoTapper = null;
    this.tempoInput = null;
    this.tempoIncrementButton = null;
    this.tempoDecrementButton = null;
    this.commonTemposContainer = null;
    this.tempoSlider = null;
    this.resultsDiv = null;
    this.playButton = null;
    this.click1 = new Audio("/assets/audio/clicks/click1.mp3");
    this.click2 = new Audio("/assets/audio/clicks/click2.mp3");
    this.count = 0;
    this.beats = 1;
    this.isRunning = false;
    this.metronome = new Timer(
      this.playClick.bind(this),
      60000 / (this.tempo * this.beats),
      {
        immediate: true,
      }
    );
    this.intervalId = null;
  }
  createElements() {
    const tapperWrapper = document.createElement("div");
    tapperWrapper.classList.add("tap-section");
    const tempoSection = document.createElement("div");
    tempoSection.classList.add("tempo-section");
    const tempoDisplay = document.createElement("div");
    tempoDisplay.classList.add("tempo-display");
    const playButton = document.createElement("button");
    playButton.classList.add("tapper_play-button");
    this.setButtonIcon(playButton, "/assets/icons/play.svg");
    tempoSection.append(tempoDisplay, playButton);
    // Create a container for the tempo change controls
    const tempoChangeContainer = document.createElement("div");
    tempoChangeContainer.classList.add(
      "tempo-change-container",
      "tempo-slider-container"
    );
    const tempoSlider = document.createElement("input");
    tempoSlider.classList.add("tempo-slider");
    tempoSlider.type = "range";
    tempoSlider.min = "10";
    tempoSlider.max = "300";
    tempoSlider.value = this.tempo.toString();
    const tempoIncrementButton = document.createElement("button");
    tempoIncrementButton.classList.add("tempo-button");
    tempoIncrementButton.textContent = "+";
    const tempoDecrementButton = document.createElement("button");
    tempoDecrementButton.classList.add("tempo-button");
    tempoDecrementButton.textContent = "-";
    tempoChangeContainer.append(
      tempoDecrementButton,
      tempoSlider,
      tempoIncrementButton
    );
    const commonTemposContainer = document.createElement("div");
    commonTemposContainer.classList.add("common-tempos-container");
    const tempoTapper = document.createElement("button");
    tempoTapper.classList.add("tap-button");
    // Text input button for tempo
    const tempoInput = document.createElement("input");
    tempoInput.id = "user-tempo";
    tempoInput.type = "number";
    tempoInput.step = "1";
    tempoInput.max = "300";
    tempoInput.min = "10";
    tempoInput.placeholder = "Type tempo here";
    const resultsDiv = document.createElement("div");
    resultsDiv.classList.add("tap-results");
    tapperWrapper.append(
      tempoSection,
      tempoChangeContainer,
      tempoInput,
      commonTemposContainer,
      tempoTapper,
      resultsDiv
    );
    this.tempoDisplay = tempoDisplay;
    this.playButton = playButton;
    this.tempoInput = tempoInput;
    this.tempoIncrementButton = tempoIncrementButton;
    this.tempoDecrementButton = tempoDecrementButton;
    this.tempoTapper = tempoTapper;
    this.commonTemposContainer = commonTemposContainer;
    this.tempoSlider = tempoSlider;
    this.resultsDiv = resultsDiv;
    this.updateTempoDisplay();
    this.renderCommonTempos();
    return tapperWrapper;
  }
  // Add event listeners
  attachEventListeners() {
    var _a, _b, _c, _d;
    (_a = this.tempoSlider) === null || _a === void 0
      ? void 0
      : _a.addEventListener("input", () => {
          this.tempo = parseInt(this.tempoSlider.value, 10);
          this.updateTempoDisplay();
        });
    // Add click listeners to tempo minus and plus buttons
    (_b = this.tempoDecrementButton) === null || _b === void 0
      ? void 0
      : _b.addEventListener("click", () => {
          this.changeTempo(-1);
        });
    (_c = this.tempoIncrementButton) === null || _c === void 0
      ? void 0
      : _c.addEventListener("click", () => {
          this.changeTempo(1);
        });
    // Add tempo input "enter" listener
    (_d = this.tempoInput) === null || _d === void 0
      ? void 0
      : _d.addEventListener("keydown", (e) => {
          var _a;
          if (!this.tempoInput) return;
          if (this.tempo !== null) {
            if (e.key !== "Enter") {
              return;
            } else {
              // Add safety for if number is too high or low!
              this.tempo =
                parseInt(this.tempoInput.value) < 10
                  ? 10
                  : parseInt(this.tempoInput.value) > 300
                  ? 300
                  : parseInt(this.tempoInput.value);
              this.updateTempoDisplay();
              this.tempoInput.value = "";
              (_a = this.tempoInput) === null || _a === void 0
                ? void 0
                : _a.blur();
            }
          }
        });
    if (this.commonTemposContainer) {
      let isDragging = false; // Tracks whether the user is currently dragging
      let startX = 0; // Initial horizontal position of the mouse on mousedown
      let scrollStart = 0; // The container's scrollLeft value at the start of the drag
      let moved = false; // Tracks whether the mouse moved significantly (to differentiate drag from click)
      this.commonTemposContainer.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX; // Record the initial mouse x position
        scrollStart = this.commonTemposContainer.scrollLeft; // Record initial scroll position
        moved = false; // Reset moved status
        // Handle mouse movement while dragging
        const onMouseMove = (e) => {
          const distance = e.pageX - startX; // Calculate how far the mouse has moved
          if (Math.abs(distance) > 5) {
            moved = true; // It's a drag if moved enough
          }
          if (isDragging) {
            this.commonTemposContainer.scrollLeft = scrollStart - distance;
          }
        };
        // Handle mouse button release
        const onMouseUp = (e) => {
          stopDragging(e);
        };
        // Handle mouse leaving the container — stop dragging
        const onMouseLeave = (e) => {
          stopDragging(e);
        };
        // Shared cleanup and logic for end of drag
        const stopDragging = (e) => {
          isDragging = false;
          this.commonTemposContainer.removeEventListener(
            "mousemove",
            onMouseMove
          );
          this.commonTemposContainer.removeEventListener("mouseup", onMouseUp);
          this.commonTemposContainer.removeEventListener(
            "mouseleave",
            onMouseLeave
          );
          if (!moved) {
            const target = e.target;
            if (target.classList.contains("common-tempo")) {
              const tempo = target.dataset.tempo;
              this.tempo = Number(tempo);
              this.updateTempoDisplay();
            }
          }
        };
        this.commonTemposContainer.addEventListener("mousemove", onMouseMove);
        this.commonTemposContainer.addEventListener("mouseup", onMouseUp);
        this.commonTemposContainer.addEventListener("mouseleave", onMouseLeave);
      });
    }
    // Add click listeners to start-stop button
    if (this.playButton) {
      this.playButton.addEventListener("click", () => {
        this.togglePlay(this.playButton);
      });
    }
  }
  // Toggle button state and metronome start/stop state
  togglePlay(playButton) {
    return __awaiter(this, void 0, void 0, function* () {
      this.count = 0;
      if (!this.isRunning) {
        this.metronome.start();
        playButton.classList.add("running");
        yield this.setButtonIcon(playButton, "/assets/icons/pause.svg");
        this.isRunning = true;
      } else {
        this.metronome.stop();
        if (this.intervalId !== null) clearInterval(this.intervalId);
        this.intervalId = null;
        playButton.classList.remove("running");
        yield this.setButtonIcon(playButton, "/assets/icons/play.svg");
        this.isRunning = false;
      }
      playButton.blur();
    });
  }
  playClick() {
    if (this.count == this.beats) this.count = 0; // Check if this.count and this.beats are the same and assign 0
    if (this.count == 0) {
      this.click1.play();
      this.click1.currentTime = 0;
    } else {
      this.click2.play();
      this.click2.currentTime = 0;
    }
    this.count++;
  }
  renderCommonTempos() {
    if (this.commonTemposContainer != null && commonTempos != null) {
      commonTempos.forEach((tempo) => {
        var _a;
        const html = `
        <div class="common-tempo" data-tempo="${tempo}">${tempo}</div>
        `;
        (_a = this.commonTemposContainer) === null || _a === void 0
          ? void 0
          : _a.insertAdjacentHTML("beforeend", html);
      });
    }
  }
  // Take step param and update metronome tempo accordingly
  changeTempo(step) {
    const newTempo = this.tempo + step;
    this.tempo = Math.min(300, Math.max(10, newTempo));
    if (this.tempoSlider) {
      this.tempoSlider.value = this.tempo.toString();
    }
    this.updateTempoDisplay();
  }
  // Set button icon to SVG text
  setButtonIcon(button, path) {
    return __awaiter(this, void 0, void 0, function* () {
      const response = yield fetch(path);
      const svgText = yield response.text();
      button.innerHTML = svgText;
    });
  }
  // Dynamically update the tempo and recalculate dependent values.
  setTempo(newTempo) {
    if (newTempo < 20 || newTempo > 300) {
      return;
    }
    this.tempo = newTempo;
    this.expectedTimeBetweenTaps = 60000 / this.tempo;
    this.timeoutDuration = this.expectedTimeBetweenTaps * 1.7;
    this.updateTempoDisplay();
  }
  // Update tempo display element
  updateTempoDisplay() {
    if (this.tempoDisplay) {
      this.tempoDisplay.textContent = `${this.tempo.toString()} bpm`;
    }
    if (this.tempoSlider) {
      this.tempoSlider.value = this.tempo.toString();
    }
    this.metronome.updateTempo(this.tempo, this.beats);
    this.expectedTimeBetweenTaps = 60000 / this.tempo;
    this.timeoutDuration = this.expectedTimeBetweenTaps * 2;
  }
  // Display results on the page
  displayResults(actualAverageTime, delta) {
    var _a;
    const resultsTitle = document.createElement("h1");
    resultsTitle.textContent = "Results:";
    const resultsText = document.createElement("p");
    resultsText.classList.add("tap-results--text");
    resultsText.innerHTML = `
   Intended tempo: ${this.tempo} BPM <br />
   You were tapping at ${Math.round(60000 / actualAverageTime)} BPM <br />
   ${
     delta > 0
       ? `${delta.toFixed(2)} ms too slow.`
       : `${Math.abs(delta).toFixed(2)} ms too quick per tap.`
   }`;
    (_a = this.resultsDiv) === null || _a === void 0
      ? void 0
      : _a.append(resultsTitle, resultsText);
  }
  displayFailure() {
    var _a;
    const resultsTitle = document.createElement("h1");
    resultsTitle.textContent = "Error:";
    const resultsText = document.createElement("p");
    resultsText.classList.add("tap-results--text");
    resultsText.innerHTML = `
   Intended tempo: ${this.tempo} BPM <br />
   Not enough taps to calculate. <br />Please try tapping more quickly.`;
    (_a = this.resultsDiv) === null || _a === void 0
      ? void 0
      : _a.append(resultsTitle, resultsText);
  }
  // Register taps and handle the tap logic.
  registerTaps(tapButton) {
    if (!tapButton) {
      console.error(
        "Tap button not found. Ensure the element is passed correctly."
      );
      return;
    }
    const handleTap = () => {
      if (this.tapCount === 0) {
        this.firstTapTime = Date.now(); // First tap timestamp
      }
      this.lastTapTime = Date.now(); // Last tap timestamp
      this.tapCount++;
      // Reset the timeout every time a tap occurs
      if (this.timeoutId) clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        if (this.tapCount > 1) {
          if (this.lastTapTime === null || this.firstTapTime === null) {
            console.error("Tap times are not initialised");
            return;
          }
          // Corrected calculation
          const actualAverageTime =
            (this.lastTapTime - this.firstTapTime) / (this.tapCount - 1);
          const delta = actualAverageTime - this.expectedTimeBetweenTaps;
          this.resultsDiv.innerHTML = "";
          this.displayResults(actualAverageTime, delta);
        } else {
          this.resultsDiv.innerHTML = "";
          this.displayFailure();
          console.log("Not enough taps to calculate tempo.");
        }
        this.callback(this.tapCount);
        this.resetTaps();
      }, this.timeoutDuration);
    };
    tapButton.addEventListener("click", handleTap);
  }
  //  Reset the tap count and timers.
  resetTaps() {
    this.tapCount = 0;
    this.firstTapTime = null;
    this.lastTapTime = null;
    this.timeoutId = null;
    console.log("Taps reset.");
  }
  // Initialise the tapper
  init(container) {
    return __awaiter(this, void 0, void 0, function* () {
      container.append(this.createElements());
      yield this.setButtonIcon(this.tempoTapper, "/assets/icons/tap.svg");
      this.attachEventListeners();
      this.registerTaps(this.tempoTapper);
    });
  }
}
//# sourceMappingURL=Tapper.js.map
