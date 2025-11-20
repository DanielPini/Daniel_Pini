const PROJECTS = [
  // Keep first (most relevant)
  {
    id: "parts-we-give",
    title: "The Parts We Give (Web Game Engine)",
    desc: "Custom JavaScript engine for an opera intro game; audio-reactive sequences via Howler, state & entity systems.",
    tags: ["JavaScript", "Howler", "Game Engine", "Audio"],
    role: "Solo",
    team: 1,
    highlights: ["Entity system", "Audio cues", "Input loop"],
    mediaType: "image",
    media: {
      src: "./media/the-parts-we-give-1280.webp",
      alt: "Intro scene from The Parts We Give web game",
      small: "./media/the-parts-we-give-640.webp",
    },
    links: { code: "#", demo: "#" },
    year: 2025,
  },
  // Remaining 2025 projects (order arbitrary; adjust if needed)
  {
    id: "coma-ecommerce",
    title: "CoMA Ecommerce Rebuild",
    desc: "WordPress & WooCommerce overhaul: PHP templating, MySQL cleanup, performance & UX improvements.",
    tags: ["WordPress", "PHP", "MySQL", "Performance"],
    role: "Lead Dev",
    team: 2,
    highlights: ["Template refactor", "DB optimizations", "Checkout UX"],
    mediaType: "image",
    media: {
      src: "./media/coma-1280.webp",
      alt: "CoMA",
      small: "./media/coma-640.webp",
    },
    links: { code: "#", demo: "#" },
    year: 2025,
  },
  {
    id: "recitorii",
    title: "Recitorii Consultancy Portfolio",
    desc: "Ecological urban design portfolio: semantic structure, mapping embeds, optimized typography strategy.",
    tags: ["HTML", "CSS", "SEO", "Accessibility"],
    role: "Front-End",
    team: 2,
    highlights: ["Semantic markup", "Map integration", "Core Web Vitals"],
    mediaType: "image",
    media: {
      src: "./media/recitorii-1280.webp",
      alt: "Recitorii consultancy site",
      small: "./media/recitorii-640.webp",
    },
    links: { code: "#", demo: "#" },
    year: 2025,
  },
  {
    id: "stephen-fleri-portfolio",
    title: "Stephen Fleri Portfolio",
    desc: "Artist portfolio site: responsive grid, lazy media, React enhancement layer for dynamic series filtering.",
    tags: ["React", "JavaScript", "Responsive", "Performance"],
    role: "Developer",
    team: 1,
    highlights: ["Adaptive image sets", "Filtering UI", "Accessibility audit"],
    mediaType: "video",
    media: {
      src: "./media/stephen-fleri.webm",
      alt: "Stephen Fleri portfolio gallery",
      poster: "./media/stephen-fleri-640.webp",
    },
    links: { code: "#", demo: "#" },
    year: 2025,
  },
  {
    id: "earthly-futures-calendar",
    title: "Earthly Futures Calendar Integration",
    desc: "Custom events & booking calendar: data layer, recurrence parsing, admin UI for scheduling.",
    tags: ["JavaScript", "Calendar", "UX"],
    role: "Solo",
    team: 1,
    highlights: ["Recurrence logic", "Admin tooling", "Lazy event loading"],
    mediaType: "image",
    media: {
      src: "./media/calendar-1280.webp",
      alt: "Earthly Futures event calendar",
      small: "./media/calendar-640.webp",
    },
    links: { code: "#", demo: "#" },
    year: 2025,
  },
  // 2024
  {
    id: "straddle",
    title: "Straddle Poker Blinds Timer",
    desc: "Tournament blinds timer: interval scheduler, audible stage alerts, responsive control panel.",
    tags: ["JavaScript", "Timing", "UI"],
    role: "Solo",
    team: 1,
    highlights: ["Accurate timing", "Audio alerts", "Customizable blinds"],
    mediaType: "video",
    media: {
      src: "./media/straddle.webm",
      alt: "Straddle blinds timer interface",
    },
    links: { code: "#", demo: "#" },
    year: 2024,
  },
  // 2023
  {
    id: "fable-arts-exhibitions",
    title: "FABLE ARTS Digital Exhibitions",
    desc: "Interactive exhibition framework (2020–2025) for artists: modular layout, media loaders, custom narrative sequencing.",
    tags: ["HTML", "CSS", "JavaScript", "Content System"],
    role: "Lead Front-End",
    team: 3,
    highlights: ["Modular templates", "Media preloading", "Artist onboarding"],
    mediaType: "image",
    media: {
      src: "./media/fable-arts-1280.webp",
      alt: "FABLE ARTS exhibition interface",
      small: "./media/fable-arts-640.webp",
    },
    links: { code: "#", demo: "#" },
    year: 2023,
  },
];

function renderMedia(p) {
  if (p.mediaType === "image") {
    const full = p.media.src;
    const small = p.media.small || full;
    const alt = p.media.alt || p.title;
    return `
      <picture>
        <source type="image/webp" data-srcset="${small} 640w, ${full} 1280w">
        <img data-src="${full}" alt="${alt}" loading="lazy" decoding="async" />
      </picture>`;
  }
  if (p.mediaType === "video") {
    return `<video class="project-video"
             preload="none"
             playsinline
             muted
             controls
             poster="${p.media.poster || ""}"
             data-src="${p.media.src}"></video>`;
  }
  return `<div><span>Media pending</span></div>`;
}

function renderProjects(list) {
  const grid = document.querySelector("[data-projects]");
  if (!grid) return;
  grid.innerHTML = list
    .map((p) => {
      const tags = p.tags.map((t) => `<span>${t}</span>`).join("");
      const highs = p.highlights.map((h) => `<li>${h}</li>`).join("");
      return `
      <article class="project-card" data-project="${p.id}">
        <div class="project-media">${renderMedia(p)}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tags">${tags}</div>
        <ul class="project-highlights">${highs}</ul>
        <p class="project-meta">Role: ${p.role} • Team: ${p.team}</p>
        <div class="project-links">
          ${p.links.demo ? `<a href="${p.links.demo}">Demo</a>` : ""}
          ${p.links.code ? `<a href="${p.links.code}">Code</a>` : ""}
          <a href="/case-studies/${p.id}.html">Case Study</a>
        </div>
      </article>`;
    })
    .join("");
}

renderProjects(PROJECTS);
