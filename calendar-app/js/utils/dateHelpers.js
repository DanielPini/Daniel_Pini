export const formatDate = (dateObj) => {
  const date = dateObj.date
    ? new Date(dateObj.date)
    : new Date(dateObj.dateTime);

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatTime = (dateObj) => {
  // Return empty string for all-day events
  if (dateObj.date) {
    return "";
  }

  const date = new Date(dateObj.dateTime);
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Keep this as a convenience function if needed
export const formatDateTime = (dateObj) => {
  const date = formatDate(dateObj);
  const time = formatTime(dateObj);

  return time ? `${time} ${date}` : date;
};

export const calculateDuration = (startObj, endObj) => {
  const start = startObj.date
    ? new Date(startObj.date)
    : new Date(startObj.dateTime);
  const end = endObj.date ? new Date(endObj.date) : new Date(endObj.dateTime);

  const diff = end - start;

  // For all-day events
  if (startObj.date) {
    const days = diff / (1000 * 60 * 60 * 24);
    return days === 1 ? "1 day" : `${days} days`;
  }

  // For timed events
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours === 0) return `${minutes} mins`;
  if (minutes === 0) return hours === 1 ? "1 hour" : `${hours} hours`;
  return `${hours}h ${minutes}m`;
};
