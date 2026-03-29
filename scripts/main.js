import { gsap } from "gsap";

import initCustomCursor from './customCursor.js';
initCustomCursor();
import initHeaders from './header.js';
initHeaders();

// Svg sprite
import.meta.glob('../assets/icons/*.svg', { eager: true });

// Kit helpers
const toggleButton = document.getElementById('themeToggle');

const swatches = document.querySelectorAll('.kit-swatch--color');

toggleButton.addEventListener('click', () => {
  const currentTheme = document.body.dataset.theme;
  if (currentTheme === 'light') {
    document.body.dataset.theme = 'dark';
  } else {
    document.body.dataset.theme = 'light';
  }
  swatches.forEach(swatch => {
    swatch.classList.toggle('swatch-dark');
    swatch.classList.toggle('swatch-light');
  })
});