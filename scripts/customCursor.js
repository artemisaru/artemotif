export default function initCustomCursor() {
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Don't init on touch or reduced motion
  if (!isFinePointer || reduceMotion) return;

  // CONFIG
  const CURSOR_CLASSES = {
    active: 'active',
    isPressed: 'is-pressed',
    leaving: 'leaving',
  }

  const CURSOR_SIZES = {
    default: { w: 24, h: 24 },
    link_hover: { w: 38, h: 38 },
  }

  // DOM refs
  const cursor = document.querySelector('.custom-cursor');
  const cursorTargets = document.querySelectorAll('.cursor-target');
  const buttons = document.querySelectorAll('.btn--cursor');

  // State variables
  let mouseX = 0;
  let mouseY = -100; // start off-screen
  let width = CURSOR_SIZES.default.w;
  let height = CURSOR_SIZES.default.h;
  let target = null;
  let targetRect = null; //
  let rafId = null;
  //let hoverStack = [];
  let snapToTarget = false;

  // Move custom cursor
  function updateCursorStyle() {
    cursor.style.setProperty('--cursor-x', `${mouseX - width / 2}px`);
    cursor.style.setProperty('--cursor-y', `${mouseY - height / 2}px`);
    cursor.style.width = `${width}px`;
    cursor.style.height = `${height}px`;
  }

  // Track mouse when not snapping
  function trackMouse(e) {
    if (!snapToTarget) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      updateCursorStyle();
    }
  }

  // Keep cursor aligned to target if snapping/matching size
  function trackTargetBounds() {
    if (target) {
      const rect = target.getBoundingClientRect();
      
      if (target.dataset.matchSize === 'true') {
        width = rect.width;
        height = rect.height;
      }
      
      if (snapToTarget) {
        mouseX = rect.left + rect.width / 2;
        mouseY = rect.top + rect.height / 2;
      }

      targetRect = rect;
      updateCursorStyle();
    }
    rafId = requestAnimationFrame(trackTargetBounds);
  }

  // Apply hover state
  function applyHoverState(e, { matchSize = false, snap = false } = {}) {
    target = e;
    target.dataset.matchSize = matchSize;
    snapToTarget = snap;
    target.classList.add('is-hovered');

    if (!matchSize) {
      width = CURSOR_SIZES.link_hover.w;
      height = CURSOR_SIZES.link_hover.h;
    }

    cursor.classList.add(CURSOR_CLASSES.active);
    trackTargetBounds();
  }

  // Reset cursor to default
  function resetCursor() {
    target.classList.remove('is-hovered');
    target = null;
    cancelAnimationFrame(rafId);

    snapToTarget = false;
    width = CURSOR_SIZES.default.w;
    height = CURSOR_SIZES.default.h;

    cursor.classList.remove(
      CURSOR_CLASSES.active
    );
    cursor.classList.add(CURSOR_CLASSES.leaving);
    setTimeout(() => cursor.classList.remove(CURSOR_CLASSES.leaving), 200);

    updateCursorStyle();
  }

  // Event listeners
  document.addEventListener('mousemove', trackMouse);

  cursorTargets.forEach(cursorTarget => {
    cursorTarget.addEventListener('mouseenter', () => applyHoverState(cursorTarget));
    cursorTarget.addEventListener('mouseleave', resetCursor);
  });

  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => applyHoverState(btn, { matchSize: true, snap: true }));
    btn.addEventListener('mousedown', () => cursor.classList.add(CURSOR_CLASSES.isPressed));
    btn.addEventListener('mouseup', () => cursor.classList.remove(CURSOR_CLASSES.isPressed));
    btn.addEventListener('mouseleave', resetCursor);
  });
}