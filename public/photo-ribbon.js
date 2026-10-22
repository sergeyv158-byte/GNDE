(() => {
  const root = document.getElementById('inspection-photos');
  if (!root || root.dataset.initialized) return;
  const viewport = root.querySelector('.gnde-photo-window');
  const first = root.querySelector('.gnde-photo-strip');
  const images = [...first.querySelectorAll('img')];
  const controls = root.querySelector('.gnde-photo-controls');
  const toggle = controls.querySelector('[data-ribbon-action="toggle"]');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = motion.matches, hovering = false, focused = false;
  let groupWidth = 0, lastTime = 0, position = 0;
  const speed = 60; // Twice the saved speed; decreasing scrollLeft moves photos right.
  function updateButton() {
    toggle.textContent = paused ? 'Play' : 'Pause';
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Start photo scrolling' : 'Pause photo scrolling');
    root.dataset.paused = String(paused);
  }
  function measure() {
    const previous = groupWidth;
    const phase = previous ? (viewport.scrollLeft % previous) / previous : 0;
    groupWidth = first.getBoundingClientRect().width;
    if (groupWidth > 0) { position = groupWidth * (1 + phase); viewport.scrollLeft = position; }
  }
  function wrap() {
    if (!groupWidth) return;
    if (viewport.scrollLeft < groupWidth * 0.5) viewport.scrollLeft += groupWidth;
    else if (viewport.scrollLeft >= groupWidth * 1.5) viewport.scrollLeft -= groupWidth;
    position = viewport.scrollLeft;
  }
  function frame(now) {
    const elapsed = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
    lastTime = now;
    if (groupWidth && !paused && !hovering && !focused && !document.hidden) {
      position -= speed * elapsed;
      if (position < groupWidth * 0.5) position += groupWidth;
      viewport.scrollLeft = position;
    }
    requestAnimationFrame(frame);
  }
  controls.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    const action = button.dataset.ribbonAction;
    if (action === 'toggle') paused = !paused;
    else {
      paused = true;
      viewport.scrollLeft += (action === 'next' ? 1 : -1) * viewport.clientWidth * 0.65;
      wrap();
    }
    updateButton();
  });
  viewport.addEventListener('pointerenter', (event) => { if (event.pointerType === 'mouse') hovering = true; });
  viewport.addEventListener('pointerleave', () => { hovering = false; });
  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse') { paused = true; updateButton(); }
  });
  viewport.addEventListener('focus', () => { focused = true; });
  viewport.addEventListener('blur', () => { focused = false; });
  viewport.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', ' '].includes(event.key)) return;
    event.preventDefault();
    if (event.key === ' ') paused = !paused;
    else {
      paused = true;
      viewport.scrollLeft += event.key === 'ArrowRight' ? 240 : -240;
      wrap();
    }
    updateButton();
  });
  viewport.addEventListener('scroll', () => { if (paused) wrap(); }, { passive: true });
  motion.addEventListener('change', (event) => {
    paused = event.matches;
    lastTime = 0;
    updateButton();
  });
  document.addEventListener('visibilitychange', () => { lastTime = 0; });
  async function start() {
    try { await Promise.all(images.map((image) => image.decode())); }
    catch { root.dataset.imageError = 'true'; return; }
    root.dataset.initialized = 'true';
    controls.hidden = false;
    updateButton();
    measure();
    new ResizeObserver(measure).observe(viewport);
    requestAnimationFrame(frame);
  }
  start();
})();
