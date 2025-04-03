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
  }

  /**
   * Dynamically update the tempo and recalculate dependent values.
   * @param {number} newTempo - The new tempo in BPM.
   */
  setTempo(newTempo) {
    if (newTempo < 20 || newTempo > 300) {
      return;
    }
    this.tempo = newTempo;
    this.timeBetweenTaps = 60000 / this.tempo;
    this.timeoutDuration = this.timeBetweenTaps * 2;
  }

  /**
   * Display results on the page
   * @param {number} actualAverageTime - The actual average time between taps
   * @param {number} delta - The difference from the expected time
   */
  displayResults(actualAverageTime, delta) {
    const resultsDiv = document.createElement("div");
    resultsDiv.classList.add("tap-results");

    const resultsTitle = document.createElement("h1");
    resultsTitle.textContent = "Results:";

    const resultsText = document.createElement("p");
    resultsText.innerHTML = `
  Intended tempo: ${this.tempo} BPM <br />
  You were tapping at ${Math.round(60000 / actualAverageTime)} BPM <br />
  ${
    delta > 0
      ? `${delta.toFixed(2)} ms too slow.`
      : `${Math.abs(delta).toFixed(2)} ms too quick per tap.`
  }`;

    resultsDiv.append(resultsTitle, resultsText);

    // Clear old results and add new results
    const tapSection = document.querySelector(".tap-section");
    document.querySelector(".tap-results")?.remove(); // Remove previous results if they exist
    tapSection.appendChild(resultsDiv);
  }

  /**
   * Register taps and handle the tap logic.
   * @param {HTMLElement} tapButton - The button element to attach the tap listener.
   */
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
          // Corrected calculation
          const actualAverageTime =
            (this.lastTapTime - this.firstTapTime) / (this.tapCount - 1);

          const delta = actualAverageTime - this.expectedTimeBetweenTaps;

          this.displayResults(actualAverageTime, delta);
        } else {
          console.log("Not enough taps to calculate tempo.");
        }

        this.callback(this.tapCount);
        this.resetTaps();
      }, this.timeoutDuration);
    };

    tapButton.addEventListener("click", handleTap);
  }

  /**
   * Reset the tap count and timers.
   */
  resetTaps() {
    this.tapCount = 0;
    this.firstTapTime = null;
    this.lastTapTime = null;
    this.timeoutId = null;
    console.log("Taps reset.");
  }
}
