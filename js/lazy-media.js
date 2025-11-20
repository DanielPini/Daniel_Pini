(function initLazy() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.parentElement?.setAttribute("data-loading", "false");
        if (el.tagName === "IMG") {
          el.src = el.dataset.src;
        } else if (el.tagName === "VIDEO") {
          const source = document.createElement("source");
          source.src = el.dataset.src;
          source.type = "video/webm";
          el.appendChild(source);
        } else if (el.tagName === "PICTURE") {
          el.querySelectorAll("source").forEach((s) => {
            if (s.dataset.srcset) s.srcset = s.dataset.srcset;
          });
          const img = el.querySelector("img");
          if (img && img.dataset.src) img.src = img.dataset.src;
          el.parentElement?.setAttribute("data-loading", "false");
        }
        observer.unobserve(el);
      });
    },
    { rootMargin: "200px 0px" },
  );

  document
    .querySelectorAll(".project-media picture, .project-media video")
    .forEach((el) => {
      el.parentElement?.setAttribute("data-loading", "true");
      observer.observe(el);
    });

  observer.observe(document.querySelector(".project-media"));
})();
