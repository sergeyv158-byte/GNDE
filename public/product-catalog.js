(() => {
  const catalog = document.getElementById('products');
  if (!catalog) return;
  const filters = catalog.querySelector('.catalog-filters');
  const buttons = [...catalog.querySelectorAll('[data-product-filter]')];
  const rows = [...catalog.querySelectorAll('[data-product-category]')];
  const count = catalog.querySelector('.catalog-count');
  if (!filters || !count || !rows.length) return;
  const select = category => {
    let visible = 0;
    rows.forEach(row => {
      row.hidden = category !== 'all' && row.dataset.productCategory !== category;
      if (!row.hidden) visible++;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.productFilter === category)));
    count.textContent = visible + (visible === 1 ? ' product group' : ' product groups');
  };
  filters.hidden = false;
  buttons.forEach(button => button.addEventListener('click', () => select(button.dataset.productFilter)));
  const revealHashTarget = () => {
    const id = window.location.hash.slice(1);
    const row = rows.find(item => item.id === id);
    if (row && row.hidden) {
      select('all');
      row.scrollIntoView({block: 'start'});
    }
  };
  window.addEventListener('hashchange', revealHashTarget);
  revealHashTarget();
})();
