var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Timer from "./Timer.js";
import piecesArray from "./pieces.js";
import commonTempos from "./tempos.js";
export default class Metronome {
    constructor(config = {}) {
        this.tempo = config.tempo || 120; // Default tempo is 120 BPM
        this.metronomeWrapper = null;
        this.repertoireSelector = null;
        this.repertoireSelectorTemposContainer = null;
        this.repertoireTempoArray = null;
        this.tempoDisplay = null;
        this.tempoSlider = null;
        this.tempoDecrementButton = null;
        this.tempoIncrementButton = null;
        this.commonTemposContainer = null;
        this.zoomContent = null;
        this.tempoInput = null;
        this.playButton = null;
        this.click1 = new Audio("/assets/audio/clicks/click1.mp3");
        this.click2 = new Audio("/assets/audio/clicks/click2.mp3");
        this.count = 0;
        this.beats = 1;
        this.isRunning = false;
        this.metronome = new Timer(this.playClick.bind(this), 60000 / (this.tempo * this.beats), {
            immediate: true,
        });
        this.intervalId = null;
        this.selectedPiece = 0;
        this.tempoTap = null;
        this.tapDelta = 0;
    }
    // Make all the elements of the metronome for loading on the page
    createElements(container) {
        // Create a wrapper for all the metronome elements
        const metronomeWrapper = document.createElement("div");
        metronomeWrapper.classList.add("tap-section");
        const tempoSection = document.createElement("div");
        tempoSection.classList.add("tempo-section");
        // Make the display for the tempo
        const tempoDisplay = document.createElement("h2");
        tempoDisplay.classList.add("tempo-display");
        const playButton = document.createElement("button");
        playButton.classList.add("tapper_play-button");
        this.setButtonIcon(playButton, "/assets/icons/play.svg");
        tempoSection.append(tempoDisplay, playButton);
        // Create a dropdown for the saved pieces
        const repertoireSelector = document.createElement("select");
        repertoireSelector.id = "repertoire-selector";
        // Include the pieces from piecesArray in the dropdown
        repertoireSelector.innerHTML = this.makeRepertoireSelectorHTML(piecesArray);
        // Create a container for the tempo buttons from teh pieces
        const repertoireSelectorTemposContainer = document.createElement("div");
        repertoireSelectorTemposContainer.classList.add("repertoire-tempos-container");
        // Create a container for the tempo change controls
        const tempoChangeContainer = document.createElement("div");
        tempoChangeContainer.classList.add("tempo-change-container", "tempo-slider-container");
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
        const commonTemposContainer = document.createElement("div");
        commonTemposContainer.classList.add("common-tempos-container");
        // Tap input button for tempo
        const tempoTap = document.createElement("button");
        tempoTap.classList.add("tempo-tap");
        tempoTap.textContent = "Tap";
        // Text input button for tempo
        const tempoInput = document.createElement("input");
        tempoInput.id = "user-tempo";
        tempoInput.type = "number";
        tempoInput.step = "1";
        tempoInput.max = "300";
        tempoInput.min = "10";
        tempoInput.placeholder = "Type tempo here";
        tempoChangeContainer.append(tempoDecrementButton, tempoSlider, tempoIncrementButton);
        metronomeWrapper.append(tempoSection, tempoChangeContainer, commonTemposContainer, tempoInput, tempoTap, repertoireSelector, repertoireSelectorTemposContainer);
        container.append(metronomeWrapper);
        // Assign DOM elements to class properties
        this.metronomeWrapper = metronomeWrapper;
        this.repertoireSelector = repertoireSelector;
        this.repertoireSelectorTemposContainer = repertoireSelectorTemposContainer;
        this.tempoDisplay = tempoDisplay;
        this.tempoSlider = tempoSlider;
        this.tempoDecrementButton = tempoDecrementButton;
        this.tempoIncrementButton = tempoIncrementButton;
        this.commonTemposContainer = commonTemposContainer;
        this.tempoInput = tempoInput;
        this.playButton = playButton;
        this.tempoTap = tempoTap;
    }
    // Attach event listeners
    attachEventListeners() {
        var _a, _b, _c, _d, _e, _f;
        // Link tempo slider input to tempo
        (_a = this.tempoSlider) === null || _a === void 0 ? void 0 : _a.addEventListener("input", () => {
            this.tempo = parseInt(this.tempoSlider.value, 10);
            this.updateTempoDisplay();
            this.metronome.updateTempo(this.tempo, this.beats);
            this.resetFlash();
        });
        // Add click listeners to tempo minus and plus buttons
        (_b = this.tempoDecrementButton) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            this.changeTempo(-1);
            this.resetFlash();
        });
        (_c = this.tempoIncrementButton) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
            this.changeTempo(1);
            this.resetFlash();
        });
        // Add tempo input "enter" listener
        (_d = this.tempoInput) === null || _d === void 0 ? void 0 : _d.addEventListener("keydown", (e) => {
            var _a;
            if (!this.tempoInput)
                return;
            if (this.tempo !== null) {
                if (e.key !== "Enter") {
                    return;
                }
                else {
                    // Add safety for if number is too high or low!
                    this.tempo =
                        parseInt(this.tempoInput.value) < 10
                            ? 10
                            : parseInt(this.tempoInput.value) > 300
                                ? 300
                                : parseInt(this.tempoInput.value);
                    this.updateTempoDisplay();
                    this.tempoInput.value = "";
                    (_a = this.tempoInput) === null || _a === void 0 ? void 0 : _a.blur();
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
                    this.commonTemposContainer.removeEventListener("mousemove", onMouseMove);
                    this.commonTemposContainer.removeEventListener("mouseup", onMouseUp);
                    this.commonTemposContainer.removeEventListener("mouseleave", onMouseLeave);
                    if (!moved) {
                        const target = e.target;
                        if (target.classList.contains("common-tempo")) {
                            const tempo = target.dataset.tempo;
                            this.tempo = Number(tempo);
                            this.updateTempoDisplay();
                            this.updateTempo();
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
        (_e = this.repertoireSelector) === null || _e === void 0 ? void 0 : _e.addEventListener("input", () => {
            this.updateRepertoireSelector();
            this.generateRepertoireTempoButtonsArray();
        });
        (_f = this.repertoireSelectorTemposContainer) === null || _f === void 0 ? void 0 : _f.addEventListener("click", (e) => {
            var _a;
            const target = e.target;
            // Handle delete button
            if (target.classList.contains("delete")) {
                const index = Array.from(this.repertoireSelectorTemposContainer.children).indexOf(target.closest(".tempo-button-item"));
                piecesArray[this.selectedPiece].value.splice(index, 1);
                this.renderTempoList();
                return;
            }
            // Handle tempo button
            const tempoButton = target.closest(".tempo-button-item");
            if (tempoButton) {
                const bpm = (_a = tempoButton.querySelector("p")) === null || _a === void 0 ? void 0 : _a.textContent;
                this.tempo = bpm ? Number(bpm) : this.tempo;
                this.updateTempo();
                this.renderTempoList();
            }
        });
    }
    generateRepertoireTempoButtonsArray() {
        var _a;
        this.repertoireTempoArray = ((_a = this.repertoireSelectorTemposContainer) === null || _a === void 0 ? void 0 : _a.children)
            ? Array.from(this.repertoireSelectorTemposContainer.children).map((child) => child)
            : [];
    }
    // Add functionality for flash to change with new tempo
    resetFlash() {
        if (this.isRunning) {
            if (this.intervalId !== null)
                clearInterval(this.intervalId);
            this.flash(); // restart flash at new tempo
        }
    }
    // Generate the piece options for the dropdown select menu
    makeRepertoireSelectorHTML(array) {
        let list = "";
        for (let piece of array) {
            list += `
      <option
      value="${piece}"
      class="array-selector__option"> ${piece.name}</option>
      `;
        }
        return list;
    }
    updateRepertoireSelector() {
        var _a;
        this.selectedPiece = Number((_a = this.repertoireSelector) === null || _a === void 0 ? void 0 : _a.selectedIndex);
        this.renderTempoList();
    }
    testBeats(tempo) {
        if (Array.isArray(tempo)) {
            return tempo[1]; // beats
        }
        else {
            return 1; // default beat value for a simple number
        }
    }
    testBPM(tempo) {
        if (Array.isArray(tempo)) {
            return tempo[0]; // bpm
        }
        else {
            return tempo; // it's already a number
        }
    }
    renderTempoList() {
        if (this.repertoireSelectorTemposContainer != null &&
            this.selectedPiece != null) {
            // Clear the container
            this.repertoireSelectorTemposContainer.innerHTML = "";
            // Render buttons
            piecesArray[this.selectedPiece].value.forEach((tempo) => {
                const html = `
          <div class="tempo-button-item" data-beats="${this.testBeats(tempo)}">
            <p>${this.testBPM(tempo)}</p>
            <button class="delete modify-tempo-button">x</button>
          </div>
        `;
                this.repertoireSelectorTemposContainer.insertAdjacentHTML("beforeend", html);
            });
        }
    }
    renderCommonTempos() {
        if (this.commonTemposContainer != null && commonTempos != null) {
            commonTempos.forEach((tempo) => {
                var _a;
                const html = `
        <div class="common-tempo" data-tempo="${tempo}">${tempo}</div>
        `;
                (_a = this.commonTemposContainer) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", html);
            });
        }
    }
    // Set button icon to SVG text
    setButtonIcon(button, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(path);
            const svgText = yield response.text();
            button.innerHTML = svgText;
        });
    }
    // Toggle button state and metronome start/stop state
    togglePlay(playButton) {
        return __awaiter(this, void 0, void 0, function* () {
            this.count = 0;
            if (!this.isRunning) {
                this.metronome.start();
                this.flash();
                playButton.classList.add("running");
                yield this.setButtonIcon(playButton, "/assets/icons/pause.svg");
                this.isRunning = true;
            }
            else {
                this.metronome.stop();
                if (this.intervalId !== null)
                    clearInterval(this.intervalId);
                this.intervalId = null;
                playButton.classList.remove("running");
                yield this.setButtonIcon(playButton, "/assets/icons/play.svg");
                this.isRunning = false;
            }
            playButton.blur();
        });
    }
    playClick() {
        if (this.count == this.beats)
            this.count = 0; // Check if this.count and this.beats are the same and assign 0
        if (this.count == 0) {
            this.click1.play();
            this.click1.currentTime = 0;
        }
        else {
            this.click2.play();
            this.click2.currentTime = 0;
        }
        this.count++;
    }
    // Set up flash for metronome
    flash(pulseColor = "yellow") {
        const flashOnce = () => {
            if (this.metronomeWrapper)
                this.metronomeWrapper.style.background = pulseColor;
            setTimeout(() => {
                if (this.metronomeWrapper)
                    this.metronomeWrapper.style.background = "white";
            }, 80);
        };
        // Flash immediately
        flashOnce();
        // Set up repeating interval
        this.intervalId = setInterval(flashOnce, 60000 / this.tempo);
    }
    // Take step param and update metronome tempo accordingly
    changeTempo(step) {
        const newTempo = this.tempo + step;
        this.tempo = Math.min(300, Math.max(10, newTempo));
        if (this.tempoSlider) {
            this.tempoSlider.value = this.tempo.toString();
        }
        this.updateTempo();
    }
    // Update tempo display element
    updateTempoDisplay() {
        if (this.tempoDisplay) {
            this.tempoDisplay.textContent = `${this.tempo.toString()} bpm`;
        }
        if (this.tempoSlider) {
            this.tempoSlider.value = this.tempo.toString();
        }
    }
    updateTempo() {
        this.metronome.updateTempo(this.tempo, (this.beats = 1));
        this.resetFlash();
        this.updateTempoDisplay();
    }
    setTempo(tempo) {
        this.tempo = tempo;
        this.updateTempo();
    }
    handleTap() {
        if (this.tempoTap === null)
            return;
        this.tempoTap.addEventListener("click", () => {
            const tapTime = new Date().getTime();
            this.tapDelta = tapTime - this.tapDelta;
            if (this.tapDelta > 3000) {
                this.tapDelta = new Date().getTime();
                return;
            }
            const tempo = Math.round(60000 / this.tapDelta);
            this.setTempo(tempo);
            this.tapDelta = new Date().getTime();
        });
    }
    // Initialize the metronome by attaching event listeners and setting up the UI
    init(container) {
        this.createElements(container); // Elements are created here
        this.updateTempoDisplay(); // Set initial tempo display
        this.renderTempoList();
        this.renderCommonTempos();
        this.generateRepertoireTempoButtonsArray();
        this.attachEventListeners(); // Attach listeners to elements
        this.handleTap();
    }
}
//# sourceMappingURL=Metronome.js.map