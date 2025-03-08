export const CacheManager = {
  CACHE_KEY: "calendar_events_cache",
  disabled: false,

  disable() {
    this.diabled = true;
    this.clear();
  },

  enable() {
    this.disabled = false;
  },

  save(data) {
    if (this.disabled) return;

    const cacheData = {
      timestamp: Date.now(),
      events: data,
    };

    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
      console.log("Cache saved: ", cacheData);
    } catch (error) {
      console.error("Failed to save cache: ", error);
    }
  },

  load() {
    if (this.disabled) return null;

    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return null;

      const data = JSON.parse(cached);
      const now = Date.now();
      const thirtyMinutes = 30 * 60 * 1000;

      console.log("Cache age: ", (now - data.timestamp) / 1000, "seconds");

      // Check if cache is older than 30 minutes
      if (now - data.timestamp > thirtyMinutes) {
        console.log("Cache expired, clearing");
        this.clear();
        return null;
      }

      return data.events;
    } catch (error) {
      console.error("Failed to load cache: ", error);
      return null;
    }
  },

  clear() {
    localStorage.removeItem(this.CACHE_KEY);
  },
};
