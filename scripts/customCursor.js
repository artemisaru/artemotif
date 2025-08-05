export default function initCustomCursor(opts = {}) {
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Don't init on touch or reduced motion
  if (!isFinePointer || reduceMotion) return;

  console.log("What is this?")

  const cursor = document.querySelector('.custom-cursor');

  // Track mouse
  function trackMouse(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    moveCursor(mouseX, mouseY);
  }

  // Move custom cursor
  function moveCursor(x, y) {
    const cursorX = x - cursor.offsetWidth / 2;
    const cursorY = y - cursor.offsetHeight / 2;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
  }

  document.addEventListener('mousemove', trackMouse)
}