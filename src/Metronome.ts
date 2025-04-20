import Timer from "./Timer.js";
import piecesArray from "./pieces.js";
import commonTempos from "./tempos.js";

type Tempo = number | [number, number];

export default class Metronome {
  tempo: number;
  metronomeWrapper: HTMLDivElement | null;
  repertoireSelector: HTMLSelectElement | null;
  repertoireSelectorTemposContainer: HTMLDivElement | null;
  repertoireTempoArray: Element[] | null;
  tempoDisplay: HTMLElement | null;
  tempoSlider: HTMLInputElement | null;
  tempoDecrementButton: HTMLButtonElement | null;
  tempoIncrementButton: HTMLButtonElement | null;
  commonTemposContainer: HTMLDivElement | null;
  zoomContent: HTMLDivElement | null;
  tempoInput: HTMLInputElement | null;
  playButton: HTMLButtonElement | null;
  click1: HTMLAudioElement;
  click2: HTMLAudioElement;
  beats: number;
  count: number;
  isRunning: boolean;
  metronome: Timer;
  intervalId: number | null;
  selectedPiece: number;

  constructor(config: { tempo?: number } = {}) {
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
    this.metronome = new Timer(
      this.playClick.bind(this),
      60000 / (this.tempo * this.beats),
      {
        immediate: true,
      }
    );
    this.intervalId = null;
    this.selectedPiece = 0;
  }

  // Make all the elements of the metronome for loading on the page
  createElements(container: HTMLDivElement) {
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
    repertoireSelectorTemposContainer.classList.add(
      "repertoire-tempos-container"
    );

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

    tempoChangeContainer.append(
      tempoDecrementButton,
      tempoSlider,
      tempoIncrementButton
    );

    metronomeWrapper.append(
      tempoSection,
      tempoChangeContainer,
      commonTemposContainer,
      tempoInput,
      tempoTap,
      repertoireSelector,
      repertoireSelectorTemposContainer
    );

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
  }

  // Attach event listeners
  attachEventListeners() {
    // Link tempo slider input to tempo
    this.tempoSlider?.addEventListener("input", () => {
      this.tempo = parseInt(this.tempoSlider!.value, 10);
      this.updateTempoDisplay();
      this.metronome.updateTempo(this.tempo, this.beats);
      this.resetFlash();
    });

    // Add click listeners to tempo minus and plus buttons
    this.tempoDecrementButton?.addEventListener("click", () => {
      this.changeTempo(-1);
      this.resetFlash();
    });
    this.tempoIncrementButton?.addEventListener("click", () => {
      this.changeTempo(1);
      this.resetFlash();
    });

    // Add tempo input "enter" listener
    this.tempoInput?.addEventListener("keydown", (e) => {
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
          this.tempoInput!.value = "";
          this.tempoInput?.blur();
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
        scrollStart = this.commonTemposContainer!.scrollLeft; // Record initial scroll position
        moved = false; // Reset moved status

        // Handle mouse movement while dragging
        const onMouseMove = (e: MouseEvent) => {
          const distance = e.pageX - startX; // Calculate how far the mouse has moved

          if (Math.abs(distance) > 5) {
            moved = true; // It's a drag if moved enough
          }

          if (isDragging) {
            this.commonTemposContainer!.scrollLeft = scrollStart - distance;
          }
        };

        // Handle mouse button release
        const onMouseUp = (e: MouseEvent) => {
          stopDragging(e);
        };

        // Handle mouse leaving the container — stop dragging
        const onMouseLeave = (e: MouseEvent) => {
          stopDragging(e);
        };

        // Shared cleanup and logic for end of drag
        const stopDragging = (e: MouseEvent) => {
          isDragging = false;

          this.commonTemposContainer!.removeEventListener(
            "mousemove",
            onMouseMove
          );
          this.commonTemposContainer!.removeEventListener("mouseup", onMouseUp);
          this.commonTemposContainer!.removeEventListener(
            "mouseleave",
            onMouseLeave
          );

          if (!moved) {
            const target = e.target as HTMLElement;
            if (target.classList.contains("common-tempo")) {
              const tempo = target.dataset.tempo;
              this.tempo = Number(tempo);
              this.updateTempoDisplay();
              this.updateTempo();
            }
          }
        };

        this.commonTemposContainer!.addEventListener("mousemove", onMouseMove);
        this.commonTemposContainer!.addEventListener("mouseup", onMouseUp);
        this.commonTemposContainer!.addEventListener(
          "mouseleave",
          onMouseLeave
        );
      });
    }

    // Add click listeners to start-stop button
    if (this.playButton) {
      this.playButton.addEventListener("click", () => {
        this.togglePlay(this.playButton!);
      });
    }

    this.repertoireSelector?.addEventListener("input", () => {
      this.updateRepertoireSelector();
      this.generateRepertoireTempoButtonsArray();
    });

    this.repertoireSelectorTemposContainer?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      // Handle delete button
      if (target.classList.contains("delete")) {
        const index = Array.from(
          this.repertoireSelectorTemposContainer!.children
        ).indexOf(target.closest(".tempo-button-item")!);
        piecesArray[this.selectedPiece].value.splice(index, 1);
        this.renderTempoList();
        return;
      }

      // Handle tempo button
      const tempoButton = target.closest(".tempo-button-item");
      if (tempoButton) {
        const bpm = tempoButton.querySelector("p")?.textContent;
        this.tempo = bpm ? Number(bpm) : this.tempo;
        this.updateTempo();
        this.renderTempoList();
      }
    });
  }

  generateRepertoireTempoButtonsArray() {
    this.repertoireTempoArray = this.repertoireSelectorTemposContainer?.children
      ? Array.from(this.repertoireSelectorTemposContainer!.children).map(
          (child) => child
        )
      : [];
  }

  // Add functionality for flash to change with new tempo
  resetFlash() {
    if (this.isRunning) {
      if (this.intervalId !== null) clearInterval(this.intervalId);
      this.flash(); // restart flash at new tempo
    }
  }

  // Generate the piece options for the dropdown select menu
  makeRepertoireSelectorHTML(
    array: {
      name: string;
      value: (number | number[])[];
    }[]
  ) {
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
    this.selectedPiece = Number(this.repertoireSelector?.selectedIndex);
    this.renderTempoList();
  }

  testBeats(tempo: Tempo): number {
    if (Array.isArray(tempo)) {
      return tempo[1]; // beats
    } else {
      return 1; // default beat value for a simple number
    }
  }

  testBPM(tempo: Tempo): number {
    if (Array.isArray(tempo)) {
      return tempo[0]; // bpm
    } else {
      return tempo; // it's already a number
    }
  }

  renderTempoList() {
    if (
      this.repertoireSelectorTemposContainer != null &&
      this.selectedPiece != null
    ) {
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
        this.repertoireSelectorTemposContainer!.insertAdjacentHTML(
          "beforeend",
          html
        );
      });
    }
  }

  renderCommonTempos() {
    if (this.commonTemposContainer != null && commonTempos != null) {
      commonTempos.forEach((tempo) => {
        const html = `
        <div class="common-tempo" data-tempo="${tempo}">${tempo}</div>
        `;
        this.commonTemposContainer?.insertAdjacentHTML("beforeend", html);
      });
    }
  }

  // Set button icon to SVG text
  async setButtonIcon(button: HTMLButtonElement, path: string) {
    const response = await fetch(path);
    const svgText = await response.text();
    button.innerHTML = svgText;
  }

  // Toggle button state and metronome start/stop state
  async togglePlay(playButton: HTMLButtonElement) {
    this.count = 0;
    if (!this.isRunning) {
      this.metronome.start();
      this.flash();
      playButton.classList.add("running");
      await this.setButtonIcon(playButton, "/assets/icons/pause.svg");
      this.isRunning = true;
    } else {
      this.metronome.stop();
      if (this.intervalId !== null) clearInterval(this.intervalId);
      this.intervalId = null;
      playButton.classList.remove("running");
      await this.setButtonIcon(playButton, "/assets/icons/play.svg");
      this.isRunning = false;
    }
    playButton.blur();
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

  // Set up flash for metronome
  flash(pulseColor: string = "yellow") {
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
  changeTempo(step: number) {
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

  setTempo(tempo: number) {
    this.tempo = tempo;
    this.updateTempo();
  }

  // Initialize the metronome by attaching event listeners and setting up the UI
  init(container: HTMLDivElement) {
    this.createElements(container); // Elements are created here
    this.updateTempoDisplay(); // Set initial tempo display
    this.renderTempoList();
    this.renderCommonTempos();
    this.generateRepertoireTempoButtonsArray();
    this.attachEventListeners(); // Attach listeners to elements
  }
}
