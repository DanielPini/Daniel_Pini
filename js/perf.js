(function perfPanel() {
  const panel = document.createElement("div");
  panel.style.cssText =
    "position:fixed;bottom:8px;right:8px;background:#111a22;color:#9fb3c5;font:12px/1.2 monospace;padding:6px 8px;border:1px solid #223;z-index:999;border-radius:6px;opacity:.85;";
  panel.innerHTML = "FPS: …<br>Shifts: 0";
  document.body.appendChild(panel);

  let frames = 0,
    last = performance.now(),
    fps = 0,
    shifts = 0;
  const loop = (now) => {
    frames++;
    if (now - last >= 1000) {
      fps = frames;
      frames = 0;
      last = now;
      panel.innerHTML = `FPS: ${fps}<br>Shifts: ${shifts}`;
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  new PerformanceObserver((list) => {
    list.getEntries().forEach((e) => {
      if (e && e.value > 0) shifts++;
    });
  }).observe({ type: "layout-shift", buffered: true });
})();
