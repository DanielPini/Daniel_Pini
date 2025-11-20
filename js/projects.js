const PROJECTS = [
  // Keep first (most relevant)
  {
    id: "parts-we-give",
    title: "The Parts We Give (Web Game Engine)",
    desc: "Custom JS mini‑engine for an opera intro. Audio cues drive pacing, entities stay lean, and everything aims for smooth feel over heavy tech.",
    tags: ["JavaScript", "Howler", "Game Engine", "Audio"],
    role: "Solo",
    team: 1,
    highlights: ["Light entity loop", "Audio timing", "Stable input feel"],
    mediaType: "image",
    media: {
      src: "./media/the-parts-we-give-1280.webp",
      alt: "Intro scene from The Parts We Give web game",
      small: "./media/the-parts-we-give-640.webp",
    },
    links: { demo: "https://fable-arts.com/the_parts_we_give_the_game/" },
    year: 2025,
  },
  // Remaining 2025 projects (order arbitrary; adjust if needed)
  {
    id: "coma-ecommerce",
    title: "CoMA Ecommerce Rebuild",
    desc: "Stripped bloat from WooCommerce install: custom PHP templates, tidier queries, faster browse + cleaner checkout flow.",
    tags: ["WordPress", "PHP", "MySQL", "Performance"],
    role: "Lead Dev",
    team: 2,
    highlights: ["Template cleanup", "Query trimming", "Checkout focus"],
    mediaType: "image",
    media: {
      src: "./media/coma-1280.webp",
      alt: "CoMA",
      small: "./media/coma-640.webp",
    },
    links: {},
    year: 2025,
  },
  {
    id: "recitorii",
    title: "Recitorii Consultancy Portfolio",
    desc: "Ecological design portfolio: semantic structure, map embeds tuned for load, typography and clarity over flash.",
    tags: ["HTML", "CSS", "SEO", "Accessibility"],
    role: "Front-End",
    team: 2,
    highlights: ["Semantic layout", "Lazy map mount", "Readable pacing"],
    mediaType: "image",
    media: {
      src: "./media/recitorii-1280.webp",
      alt: "Recitorii consultancy site",
      small: "./media/recitorii-640.webp",
    },
    links: {},
    year: 2025,
  },
  {
    id: "stephen-fleri-portfolio",
    title: "Stephen Fleri Portfolio",
    desc: "Artist portfolio with React layer only where it helps: fast grid, filtering that feels immediate, media kept light.",
    tags: ["React", "JavaScript", "Responsive", "Performance"],
    role: "Developer",
    team: 1,
    highlights: ["Adaptive images", "Smooth filtering", "A11y polish"],
    mediaType: "video",
    media: {
      src: "./media/stephen-fleri.webm",
      alt: "Stephen Fleri portfolio gallery",
      poster: "./media/stephen-fleri-640.webp",
    },
    links: { demo: "https://stephenfleri.com/" },
    year: 2025,
  },
  {
    id: "earthly-futures-calendar",
    title: "Earthly Futures Calendar Integration",
    desc: "Events & bookings calendar: recurrence logic kept readable, admin panel straightforward, load only what’s needed.",
    tags: ["JavaScript", "Calendar", "UX"],
    role: "Solo",
    team: 1,
    highlights: ["Recurrence parser", "Slim admin UI", "Lazy month fetch"],
    mediaType: "image",
    media: {
      src: "./media/calendar-1280.webp",
      alt: "Earthly Futures event calendar",
      small: "./media/calendar-640.webp",
    },
    links: { demo: "https://www.earthlyfutures.com/calendar/" },
    year: 2025,
  },
  // 2024
  {
    id: "straddle",
    title: "Straddle Poker Blinds Timer",
    desc: "Simple browser blinds timer: drift‑corrected schedule, clear level transitions, no fluff.",
    tags: ["JavaScript", "Timing", "UI"],
    role: "Solo",
    team: 1,
    highlights: ["Drift fix", "Audio level alerts", "Flexible schedule"],
    mediaType: "video",
    media: {
      src: "./media/straddle.webm",
      alt: "Straddle blinds timer interface",
    },
    links: {},
    year: 2024,
  },
  // 2023
  {
    id: "fable-arts-exhibitions",
    title: "FABLE ARTS Digital Exhibitions",
    desc: "Long‑running exhibition system: modular layout pieces, preloaded media, artists onboarded without tech hurdles.",
    tags: ["HTML", "CSS", "JavaScript", "Content System"],
    role: "Lead Front-End",
    team: 3,
    highlights: ["Plug‑in modules", "Media pipeline", "Artist onboarding"],
    mediaType: "image",
    media: {
      src: "./media/fable-arts-1280.webp",
      alt: "FABLE ARTS exhibition interface",
      small: "./media/fable-arts-640.webp",
    },
    links: {},
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
      // Remove forced Case Study link. Only show links that actually exist.
      const linkParts = [];
      if (p.links.demo) linkParts.push(`<a href="${p.links.demo}">Link</a>`);
      if (p.links.code) linkParts.push(`<a href="${p.links.code}">Code</a>`);
      // If you later want conditional case study links, add: if (p.caseStudy) { ... }
      return `
      <article class="project-card" data-project="${p.id}">
        <div class="project-media">${renderMedia(p)}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tags">${tags}</div>
        <ul class="project-highlights">${highs}</ul>
        <p class="project-meta">Role: ${p.role} • Team: ${p.team}</p>
        <div class="project-links">
          ${linkParts.join("") || ""}
        </div>
      </article>`;
    })
    .join("");
}

renderProjects(PROJECTS);
