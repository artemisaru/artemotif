import initCustomCursor from './customCursor.js';
initCustomCursor();

// Svg sprite
import.meta.glob('../assets/icons/*.svg', { eager: true });

// Kit helpers
const toggleButton = document.getElementById('themeToggle');
const swatches = document.querySelectorAll('.kit-swatch--color');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('theme-dark');
  document.body.classList.toggle('theme-light');
  swatches.forEach(swatch => {
    swatch.classList.toggle('swatch-dark');
    swatch.classList.toggle('swatch-light');
  })
});