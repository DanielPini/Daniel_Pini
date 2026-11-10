// danielpini.com
//
// The site works without this file. It adds:
// 1. Work and Music pages: choosing an item shows it beside the list on wide screens,
//    or opens it under its row on phones. Each item has its own address
//    (/work/#coma). Nothing ever scrolls or animates.
// 2. Homepage: the name cycles through typefaces while the pointer is over
//    it, a nod to the old homepage. Not for visitors who prefer reduced motion.

document.documentElement.classList.add("js");

const STILL = window.matchMedia("(prefers-reduced-motion: reduce)");

// 1. Work and Music pages

const WIDE = window.matchMedia("(min-width: 52rem)");
const detail = document.querySelector<HTMLElement>(".index-detail");
const rows = Array.from(document.querySelectorAll<HTMLAnchorElement>(".index-row > a"));

function entryFor(link: HTMLAnchorElement): HTMLElement | null {
  const id = link.getAttribute("aria-controls");
  return id ? document.getElementById(id) : null;
}

function select(link: HTMLAnchorElement | undefined): void {
  if (!detail) return;

  for (const row of rows) {
    const entry = entryFor(row);
    const open = row === link;
    row.setAttribute("aria-expanded", String(open));
    if (!entry) continue;
    entry.classList.toggle("is-open", open);
    // Wide screens show the entry beside the list; phones show it under its row.
    const home: HTMLElement | null = WIDE.matches ? detail : row.parentElement;
    if (open && home && entry.parentElement !== home) home.append(entry);
    if (!open && entry.parentElement !== detail) detail.append(entry);
  }

  const id = link?.getAttribute("aria-controls");
  history.replaceState(null, "", id ? `#${id}` : window.location.pathname);
}

function rowForHash(): HTMLAnchorElement | undefined {
  const id = decodeURIComponent(window.location.hash.slice(1));
  return rows.find((row) => row.getAttribute("aria-controls") === id);
}

function selected(): HTMLAnchorElement | undefined {
  return rows.find((row) => row.getAttribute("aria-expanded") === "true");
}

if (detail && rows.length > 0) {
  for (const row of rows) {
    row.addEventListener("click", (event) => {
      event.preventDefault();
      // On phones a second tap closes the project; wide screens always show one.
      const closing = !WIDE.matches && row === selected();
      select(closing ? undefined : row);
    });
  }

  // Wide screens open on the first project so the right column is never empty.
  // Phones start with everything closed, unless the address names a project.
  select(rowForHash() ?? (WIDE.matches ? rows[0] : undefined));

  WIDE.addEventListener("change", () => {
    select(selected() ?? (WIDE.matches ? rows[0] : undefined));
  });

  // The browser jumps to #coma on its own after loading. On wide screens the
  // project is already beside the list, so go back to the top. On phones, land
  // on the project's row. Always jump, never glide.
  window.addEventListener(
    "load",
    () => {
      const target = rowForHash();
      if (WIDE.matches || !target) {
        window.scrollTo({ top: 0, behavior: "instant" });
      } else {
        target.scrollIntoView({ block: "start", behavior: "instant" });
      }
    },
    { once: true },
  );
}

// 2. Homepage name

const FONTS = ["Futura", "Georgia", "Helvetica", "Verdana", "Times", "Courier"] as const;
const nameEl = document.querySelector<HTMLElement>(".profile h1");

if (nameEl) {
  let timer: number | undefined;
  let index = 0;

  const stop = (): void => {
    window.clearInterval(timer);
    timer = undefined;
    nameEl.style.fontFamily = "";
    nameEl.style.fontStyle = "";
  };

  nameEl.addEventListener("pointerenter", () => {
    if (STILL.matches || timer !== undefined) return;
    timer = window.setInterval(() => {
      index = (index + 1) % FONTS.length;
      nameEl.style.fontFamily = `"${FONTS[index] ?? FONTS[0]}", sans-serif`;
      nameEl.style.fontStyle = Math.random() < 0.5 ? "normal" : "italic";
    }, 300);
  });

  nameEl.addEventListener("pointerleave", stop);
}

// A module, so its names stay out of the global scope (window.name and friends).
export {};
