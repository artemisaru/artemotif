// Svg sprite
import.meta.glob('./assets/icons/*.svg', { eager: true });

const toggleButton = document.getElementById('themeToggle');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('theme-dark');
  document.body.classList.toggle('theme-light');
});