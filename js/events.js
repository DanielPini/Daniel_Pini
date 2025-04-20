import eventsDB from "./data/eventsDB.js";

const events = document.querySelector("#events");
let list = "";

eventsDB.forEach((item) => {
  list += `
  <div class="event">
    <img
      src="${item.eventImage ?? ``}"
      alt=""
      class="event-image" />
    <h2 class="event-title">${item.eventTitle}</h2>
    <p class="event-description">
      ${item.eventDescription}
    </p>
    <p><date>${item.eventDate}</date></p>
  </div>
`;
});

events.innerHTML = `
<section class="events">
  ${list}
</section>
`;
