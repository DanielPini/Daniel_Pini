document.addEventListener("mouseover", (e) => {
  const link = e.target.closest('a[href*="/case-studies/"]');
  if (!link) return;
  const url = link.href;
  if (document.querySelector(`link[data-prefetch="${url}"]`)) return;
  const l = document.createElement("link");
  l.rel = "prefetch";
  l.href = url;
  l.as = "document";
  l.setAttribute("data-prefetch", url);
  document.head.appendChild(l);
});
