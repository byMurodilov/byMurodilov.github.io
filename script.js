const themeButton = document.querySelector('.theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
let savedTheme = null;
try { savedTheme = localStorage.getItem('homepage-theme'); } catch { /* Theme switching also works without storage. */ }
function setTheme(theme) {
  const dark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
  themeButton.querySelector('.theme-icon').textContent = dark ? '☀' : '☾';
  themeButton.querySelector('.theme-label').textContent = dark ? 'Light mode' : 'Dark mode';
}
setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : systemTheme.matches ? 'dark' : 'light');
themeButton.addEventListener('click', () => {
  savedTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(savedTheme);
  try { localStorage.setItem('homepage-theme', savedTheme); } catch { /* Keep the in-memory preference. */ }
});
systemTheme.addEventListener('change', event => {
  if (!savedTheme) setTheme(event.matches ? 'dark' : 'light');
});
document.getElementById('year').textContent = new Date().getFullYear();
