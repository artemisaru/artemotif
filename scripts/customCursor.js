export default function initCustomCursor() {
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Don't init on touch or reduced motion
  if (!isFinePointer || reduceMotion) return;

  // CONFIG
  const CURSOR_CLASSES = {
    active: 'active',
    leaving: 'leaving',
  }

  const CURSOR_SIZES = {
    default: { w: 24, h: 24 },
    link_hover: { w: 24, h: 24 },
  }

  // DOM refs
  const cursor = document.querySelector('.custom-cursor');
  const buttons = document.querySelectorAll('.btn--cursor');

  // State variables
  let mouseX = 0;
  let mouseY = -100; // start off-screen
  let width = CURSOR_SIZES.default.w;
  let height = CURSOR_SIZES.default.h;

  // Track mouse
  function trackMouse(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    updateCursorStyle();
  }

  // Move custom cursor
  function updateCursorStyle() {
    cursor.style.setProperty('--cursor-x', `${mouseX - width / 2}px`);
    cursor.style.setProperty('--cursor-y', `${mouseY - height / 2}px`);
    cursor.style.width = `${width}px`;
    cursor.style.height = `${height}px`;
  }

  // Event listeners
  document.addEventListener('mousemove', trackMouse);
}