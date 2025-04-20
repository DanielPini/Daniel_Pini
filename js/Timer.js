export default class Timer {
    constructor(callback, timeInterval, options) {
        this.start = () => {
            // Set the expected time. The moment in time we start the timer plus whatever the time interval is.
            this.expected = Date.now() + this.timeInterval;
            // Start the timeout and save the id in a property, so we can cancel it later
            this.theTimeout = null;
            if (this.options.immediate) {
                this.callback();
            }
            this.timeout = setTimeout(this.round, this.timeInterval);
        };
        // Add method to stop timer
        this.stop = () => {
            clearTimeout(this.timeout);
            this.timeout = null;
        };
        // Round method that takes care of running the callback and adjusting the time
        this.round = () => {
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
            // Run timeout again and set the timeInterval of the next iteration to the original time interval minus the drift.
            this.timeout = setTimeout(this.round, this.timeInterval - drift);
        };
        this.callback = callback !== null && callback !== void 0 ? callback : null;
        this.timeInterval = timeInterval !== null && timeInterval !== void 0 ? timeInterval : null;
        this.options = options !== null && options !== void 0 ? options : null;
    }
    // Change tempo
    updateTempo(tempo, beats = 1) {
        this.timeInterval = 60000 / (tempo * beats);
        if (this.timeout) {
            this.stop();
            this.start();
        }
    }
}
//# sourceMappingURL=Timer.js.map
