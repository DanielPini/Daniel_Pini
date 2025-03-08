import { CacheManager } from "./utils/cacheManager.js";
import { EventManager } from "./EventManager.js";

window.CacheManager = CacheManager;

class Calendar {
  // Private class fields
  #container;
  #eventManager;
  #currentMonth;
  #currentYear;
  // #events;

  // Initialise calendar with configuration
  // @param {Object} config - Calendar configuration
  constructor(config) {
    this.config = config;
    this.#eventManager = new EventManager();
    this.#currentMonth = new Date().getMonth();
    this.#currentYear = new Date().getFullYear();
    // this.#events = null;
    this.#init();
  }

  // Initialise calendar
  // @private
  async #init() {
    this.#container = document.getElementById(this.config.container);
    this.#render();
    this.#attachEventListeners();
    await this.#loadEvents();
    this.#startAutoRefresh();
  }

  // // Render calendar template
  // @private
  #render() {
    this.#container.innerHTML = this.#createTemplate();
    this.#updateCalendarDisplay();
  }

  #createTemplate() {
    return `
      <div
        class="calendar-container"
        aria-label="Calendar">
        <header class="calendar-header">
          <p
            class="calendar-current-date"
            aria-live="polite"></p>
          <div
            class="calendar-navigation"
            role="navigation">
            <button
              id="calendar-prev"
              class="nav-button"
              aria-label="Previous month">
              ◀
            </button>
            <button
              id="calendar-next"
              class="nav-button"
              aria-label="Next month">
              ▶
            </button>
          </div>
        </header>
        <div class="calendar-body">
          <ul class="calendar-weekdays">
            <li>S</li>
            <li>M</li>
            <li>T</li>
            <li>W</li>
            <li>T</li>
            <li>F</li>
            <li>S</li>
          </ul>
          <ul class="calendar-dates"></ul>
        </div>
      </div>
    `;
  }

  // Load and process events
  // @private
  async #loadEvents(forceRefresh = false) {
    try {
      const events = await this.#fetchEvents(forceRefresh);

      if (!events?.length) {
        console.warn("No events returned from fetch.");
        return;
      }

      this.#eventManager.events = events;
      this.#updateCalendarDisplay();
    } catch (error) {
      console.error("Failed to load events:", error);
    }
  }

  // Fetch events from cache or API
  // @private
  async #fetchEvents(forceRefresh = false) {
    if (!forceRefresh) {
      const cachedEvents = CacheManager.load();
      if (cachedEvents?.length) {
        console.log("Using cached events: ", cachedEvents);
        return cachedEvents;
      }
    }

    try {
      const response = await fetch(this.#buildApiUrl());
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const processedEvents = this.#eventManager.processEvents(data.items);

      if (processedEvents?.length) {
        CacheManager.save(processedEvents);
      }

      return processedEvents;
    } catch (error) {
      console.error("Fetch error: ", error);
      return CacheManager.load() || [];
    }
  }

  // Start auto-refresh of events
  // @private
  #startAutoRefresh() {
    // Clear any existing interval
    if (this._refreshInterval) {
      clearInterval(this._refreshInterval);
    }

    this._refreshInterval = setInterval(() => {
      console.log("Auto-refresh triggered");
      this.#loadEvents(true); // Force refresh
    }, 30 * 60 * 1000); // 30 minutes

    // Add cleanup
    window.addEventListener("beforeunload", () => {
      if (this._refreshInterval) {
        clearInterval(this._refreshInterval);
      }
    });
  }

  // Build Google Calendar API URL
  // @private
  #buildApiUrl() {
    const baseUrl = "https://www.googleapis.com/calendar/v3/calendars/";
    const encodedCalendarId = encodeURIComponent(this.config.calendarId);
    return `${baseUrl}${encodedCalendarId}/events?key=${this.config.apiKey}`;
  }

  // Attach event listeners
  // @private
  #attachEventListeners() {
    const prevButton = document
      .getElementById("calendar-prev")
      .addEventListener("click", () => this.#changeMonth(-1));
    const nextButton = document
      .getElementById("calendar-next")
      .addEventListener("click", () => this.#changeMonth(1));
  }

  // Update calendar display
  // @private
  #updateCalendarDisplay() {
    const currentDate = document.querySelector(".calendar-current-date");
    const datesContainer = document.querySelector(".calendar-dates");

    // Update month/year display
    currentDate.textContent = this.#getMonthYearString();
    datesContainer.innerHTML = this.#generateCalendarDates();
  }

  // Get formatted month and year string
  // @private
  #getMonthYearString() {
    return new Date(this.#currentYear, this.#currentMonth).toLocaleDateString(
      this.config.locale,
      { month: "long", year: "numeric" }
    );
  }

  // Generate calendar dates HTML
  // @private
  #generateCalendarDates() {
    const firstDay = new Date(
      this.#currentYear,
      this.#currentMonth,
      1
    ).getDay();
    const lastDate = new Date(
      this.#currentYear,
      this.#currentMonth + 1,
      0
    ).getDate();
    const lastMonthLastDate = new Date(
      this.#currentYear,
      this.#currentMonth,
      0
    ).getDate();

    // Calculate total days needed for complete weeks
    const totalDays = firstDay + lastDate;
    const weeksNeeded = Math.ceil(totalDays / 7);
    const remainingDays = weeksNeeded * 7 - totalDays;

    return [
      ...this.#getPreviousMonthDates(firstDay, lastMonthLastDate),
      ...this.#getCurrentMonthDates(lastDate),
      ...this.#getNextMonthDates(remainingDays),
    ].join("");
  }

  // Change current month
  // @private
  #changeMonth(delta) {
    const newDate = new Date(this.#currentYear, this.#currentMonth + delta);
    this.#currentMonth = newDate.getMonth();
    this.#currentYear = newDate.getFullYear();
    this.#updateCalendarDisplay();
  }

  // Helper methods for generating dates
  #getPreviousMonthDates(firstDay, lastMonthLastDate) {
    return Array.from({ length: firstDay }, (_, i) => {
      const date = lastMonthLastDate - firstDay + i + 1;
      return `<li class="calendar-date inactive"><div class="date-number">${date}</div></li>`;
    });
  }

  #getCurrentMonthDates(lastDate) {
    return Array.from({ length: lastDate }, (_, i) => {
      const date = i + 1;
      const events = this.#eventManager.getEventsForDate(
        date,
        this.#currentYear,
        this.#currentMonth
      );
      const isToday = this.#isToday(date);

      return `
            <li class="calendar-date${isToday ? " active" : ""}">
                <div class="date-number">${date}</div>
                <div class="date-events">${this.#createEventList(
                  events,
                  date
                )}</div>
            </li>`;
    });
  }

  #getNextMonthDates(remainingDays) {
    return Array.from(
      { length: remainingDays },
      (_, i) =>
        `<li class="calendar-date inactive"><div class="date-number">${
          i + 1
        }</div></li>`
    );
  }

  #isToday(date) {
    const today = new Date();
    return (
      date === today.getDate() &&
      this.#currentMonth === today.getMonth() &&
      this.#currentYear === today.getFullYear()
    );
  }

  #createEventList(events, currentDate) {
    if (!events?.length) return "";

    const multiDayEvents = [];
    const regularEvents = [];

    // Separate multi-day and regular events
    events.forEach((event) => {
      if (event["all-day"] && event.durationDays > 1) {
        multiDayEvents.push(event);
      } else {
        regularEvents.push(event);
      }
    });

    return `
    <div class="date-events">
      <div class="multi-day-container">
        ${this.#createMultiDayEvents(multiDayEvents, currentDate)}
      </div>
      <div class="regular-events">
        ${this.#createRegularEvents(regularEvents)}
      </div>
    </div>
    `;
  }

  #createMultiDayEvents(events, currentDate) {
    return events
      .map((event) => {
        const eventStart = new Date(event.startDateObj);
        const isFirstDay = eventStart.getDate() === currentDate;
        if (!isFirstDay) return ""; // Only render on first day

        // Calculate span length (remaining days in week)
        const dayOfWeek = new Date(
          this.#currentYear,
          this.#currentMonth,
          currentDate
        ).getDay();
        const daysUntilEndOfWeek = 7 - dayOfWeek;
        const spanDays = Math.min(event.durationDays, daysUntilEndOfWeek);

        return `
      <div
        class="event-item multi-day all-day"
        style="grid-column: span ${spanDays}"
        title="${event.name} (${event.durationDays} days)">
        ${event.name}
      </div>
    `;
      })
      .join("");
  }

  #createRegularEvents(events) {
    return events
      .sort((a, b) => {
        if (a["all-day"] && !b["all-day"]) return -1;
        if (!a["all-day"] && b["all-day"]) return 1;
        if (!a["all-day"] && !b["all-day"]) {
          const timeA = a.startTime ? a.startTime.replace(":", "") : "0000";
          const timeB = b.startTime ? b.startTime.replace(":", "") : "0000";
          return parseInt(timeA) - parseInt(timeB);
        }
        return 0;
      })
      .map(
        (event) => `
      <div class="event-item ${event["all-day"] ? "all-day" : "timed"}"
           title="${event.name}${
          event["all-day"] ? " (All day)" : ` (${event.startTime})`
        }">
          ${event.startTime ? event.startTime : ""} ${event.name}
      </div>
  `
      )
      .join("");
  }

  //   return events
  //     .sort((a, b) => {
  //       // First, handle all-day vs timed events
  //       if (a["all-day"] && !b["all-day"]) return -1;
  //       if (!a["all-day"] && b["all-day"]) return 1;

  //       // If both are timed events, sort by start time
  //       if (!a["all-day"] && !b["all-day"]) {
  //         // Convert time strings to comparable values (assuming HH:mm format)
  //         const timeA = a.startTime ? a.startTime.replace(":", "") : "0000";
  //         const timeB = b.startTime ? b.startTime.replace(":", "") : "0000";
  //         return parseInt(timeA) - parseInt(timeB);
  //       }

  //       // If both are all-day events, maintain original order
  //       return 0;
  //     })
  //     .map(
  //       (event) =>
  //         `
  //         <div class="event-item ${event["all-day"] ? "all-day" : "timed"}"
  //           title="${event.name}${
  //           event["all-day"] ? " (All day)" : ` (${event.startTime})`
  //         }">
  //           ${event.startTime ? event.startTime : ""} ${event.name}
  //         </div>
  //       `
  //     )
  //     .join("");
}

// Initialize the calendar
const calendar = new Calendar({
  apiKey: "AIzaSyA8X5z472la9T2AxpfcHEyEykm2UeyqoMc",
  calendarId:
    "c_21145c452d313eb536e448603c41126fa393c892bad0f89a64fea83205ca2a91@group.calendar.google.com",
  container: "calendar-root",
  locale: "fr-FR",
});
