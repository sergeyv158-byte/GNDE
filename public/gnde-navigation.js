(() => {
  const button = document.querySelector('.gnde-menu-button');
  const nav = document.getElementById('gnde-main-nav');
  if (!button || !nav) return;

  button.hidden = false;
  const close = () => button.setAttribute('aria-expanded', 'false');
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      close();
      button.focus();
    }
  });
})();
