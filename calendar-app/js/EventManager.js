import { formatTime } from "./utils/dateHelpers.js";

export class EventManager {
  #events;

  constructor() {
    this.#events = null;
  }

  set events(value) {
    this.#events = value;
  }

  get events() {
    return this.#events;
  }

  /**
   * Process raw events from Google Calendar API
   * @param {Array} events - Raw events from API
   * @returns {Array} Processed events
   */
  processEvents(events) {
    return events.map(this.#processEvent).filter(Boolean);
  }

  /**
   * Process single event
   * @private
   */
  #processEvent(event) {
    try {
      const isAllDay = Boolean(event.start.date);
      const startDate = new Date(
        isAllDay ? event.start.date : event.start.dateTime
      );
      let endDate = new Date(isAllDay ? event.end.date : event.end.dateTime);

      if (isAllDay) {
        endDate.setDate(endDate.getDate() - 1);
      }

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.warn("Invalid date for event:", event);
        return null;
      }

      return {
        id: event.id,
        name: event.summary,
        description: event.description || "",
        location: event.location || "",
        "all-day": isAllDay,
        startDateObj: startDate,
        endDateObj: endDate,
        startTime: isAllDay ? null : formatTime(event.start),
        endTime: isAllDay ? null : formatTime(event.end),
        durationDays:
          Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1,
      };
    } catch (error) {
      console.warn("Failed to process event:", event, error);
      return null;
    }
  }

  /**
   * Get events for specific date
   */
  getEventsForDate(date, currentYear, currentMonth) {
    if (!this.events) return [];

    const targetDate = new Date(currentYear, currentMonth, date);
    targetDate.setHours(0, 0, 0, 0);

    return this.events.filter((event) => {
      const startDate = new Date(event.startDateObj);
      const endDate = new Date(event.endDateObj);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      return targetDate >= startDate && targetDate <= endDate;
    });
  }
}
