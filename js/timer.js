export default class Timer {
  constructor(callback, timeInterval, options) {
    this.callback = callback ?? null;
    this.timeInterval = timeInterval ?? null;
    this.options = options ?? null;
  }

  start = () => {
    // Set the expected time. The moment in time we start the timer plus whatever the time interval is.
    this.expected = Date.now() + this.timeInterval;
    // Start the timeout and save the id in a property, so we can cancel it later
    this.theTimeout = null;

    if (this.options.immediate) {
      this.callback();
    }

    this.timeout = setTimeout(this.round, this.timeInterval);
    console.log("Timer Started");
  };
  // Add method to stop timer
  stop = () => {
    clearTimeout(this.timeout);
    console.log("Timer Stopped");
  };

  // Round method that takes care of running the callback and adjusting the time
  round = () => {
    console.log("timeout", this.timeout);
    // The drift will be the current moment in time for this round minus the expected time..
    let drift = Date.now() - this.expected;
    // Run error callback if drift is greater than time interval, and if the callback is provided
    if (drift > this.timeInterval) {
      // If error callback is provided
      if (options.errorCallback) {
        options.errorCallback();
      }
    }
    this.callback();
    // Increment expected time by time interval for every round after running the callback function.
    this.expected += this.timeInterval;
    console.log("Drift:", drift);
    console.log("Next round time interval:", this.timeInterval - drift);
    // Run timeout again and set the timeInterval of the next iteration to the original time interval minus the drift.
    this.timeout = setTimeout(this.round, this.timeInterval - drift);
  };
}
