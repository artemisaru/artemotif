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
  let target = null;
  let targetRect = null;
  let rafId = null;
  let hoverStack = [];
  let snapToTarget = false;

  // Track mouse
  function trackMouse(e) {
    if (!snapToTarget) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      updateCursorStyle();
    }
  }

  // Move custom cursor
  function updateCursorStyle() {
    cursor.style.setProperty('--cursor-x', `${mouseX - width / 2}px`);
    cursor.style.setProperty('--cursor-y', `${mouseY - height / 2}px`);
    cursor.style.width = `${width}px`;
    cursor.style.height = `${height}px`;
  }

  // Target bounds tracking
  function trackTargetBounds() {
    if (target) {
      const rect = target.getBoundingClientRect();
      // If matchTargetSize is enabled
      if (hoverStack.length > 0 && hoverStack[hoverStack.length - 1].opts.matchTargetSize) {
        width = rect.width;
        height = rect.height;
      }
      // If snapToCenter is enabled
      if (hoverStack.length > 0 && hoverStack[hoverStack.length - 1].opts.snapToCenter) {
        mouseX = rect.left + rect.width / 2;
        mouseY = rect.top + rect.height / 2;
      }

      updateCursorStyle();
      targetRect = rect;
    }
    rafId = requestAnimationFrame(trackTargetBounds);
  }

  // Push hover targets into stack
  function pushHover(e, opts = {}) {
    hoverStack.push({ e, opts });
    applyHoverState(opts);
  }

  // Remove hover targets from stack
  function popHover(e) {
    hoverStack = hoverStack.filter(item => item.e !== e);
    if (hoverStack.length > 0) {
      applyHoverState(hoverStack[hoverStack.length - 1].opts);
    } else {
      resetCursor();
    }
  }

  // Apply hover state
  function applyHoverState(opts) {
    target = opts.target || null;

    if (opts.matchTargetSize && target) {
      const rect = target.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
    } else {
      width = opts.size?.w || CURSOR_SIZES.link_hover.w;
      height = opts.size?.h || CURSOR_SIZES.link_hover.h;
    }

    snapToTarget = !!opts.snapToCenter;

    cursor.classList.add(CURSOR_CLASSES.active);
    updateCursorStyle();
    trackTargetBounds();
  }

  // Reset cursor to default
  function resetCursor() {
    targetRect = null;
    cancelAnimationFrame(rafId);

    snapToTarget = false;
    width = CURSOR_SIZES.default.w;
    height = CURSOR_SIZES.default.h;

    cursor.classList.remove(
      CURSOR_CLASSES.active
    );
    cursor.classList.add(CURSOR_CLASSES.leaving);
    setTimeout(() => cursor.classList.remove(CURSOR_CLASSES.leaving), 500);

    updateCursorStyle();
  }

  // Event listeners
  document.addEventListener('mousemove', trackMouse);

  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      pushHover(btn, {
        target: btn,
        matchTargetSize: true,
        snapToCenter: true
      })
    });

    btn.addEventListener('mouseleave', () => {
      popHover(btn);
    });
  });
}