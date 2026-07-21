(() => {
  'use strict';

  const fallbackData = {
    updated: '2026-07-21',
    categories: [
      { id: 'research', label: '研究调研' },
      { id: 'presentation', label: '演示分享' },
      { id: 'tool', label: '工具项目' },
      { id: 'note', label: '实验笔记' }
    ],
    items: [{
      id: 'auto-research-landscape-2026',
      title: 'Auto Research 调研整理',
      description: '从可靠性、混合优化、种群搜索、失败记忆、外部监督与长程探索六个维度，梳理代表性论文、开源项目及真实用户痛点。',
      url: '/presentations/Auto-Research/',
      category: 'research',
      date: '2026-07-21',
      readingTime: '约 12 分钟',
      status: '持续更新',
      featured: true,
      tags: ['AI Scientist', 'Auto Research', 'HPO', 'Agent']
    }]
  };

  let siteData = fallbackData;
  let activeCategory = 'all';
  let query = '';

  const byId = (id) => document.getElementById(id);
  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const categoryLabel = (id) =>
    siteData.categories.find((category) => category.id === id)?.label || id;

  const formatDate = (date) => {
    const parsed = new Date(`${date}T00:00:00`);
    return Number.isNaN(parsed.valueOf())
      ? date
      : new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' }).format(parsed);
  };

  function renderStats() {
    const usedCategories = new Set(siteData.items.map((item) => item.category));
    byId('stat-items').textContent = siteData.items.length;
    byId('stat-categories').textContent = usedCategories.size;
    byId('stat-year').textContent = String(siteData.updated || '').slice(0, 4) || new Date().getFullYear();
  }

  function renderFeatured() {
    const featured = siteData.items.filter((item) => item.featured);
    const primary = featured[0] || siteData.items[0];
    if (!primary) return;

    const secondary = featured[1];
    const primaryCard = `
      <a class="featured-card primary-feature" href="${escapeHtml(primary.url)}">
        <div class="feature-meta">
          <span class="pill">${escapeHtml(categoryLabel(primary.category))}</span>
          <span>${escapeHtml(formatDate(primary.date))}</span>
          <span>·</span>
          <span>${escapeHtml(primary.status || '已发布')}</span>
        </div>
        <h3>${escapeHtml(primary.title)}</h3>
        <p>${escapeHtml(primary.description)}</p>
        <div class="feature-link">阅读全文 <span>↗</span></div>
      </a>`;

    const sideCard = secondary ? `
      <a class="featured-card featured-side" href="${escapeHtml(secondary.url)}">
        <div>
          <div class="card-meta"><span class="card-category">${escapeHtml(categoryLabel(secondary.category))}</span></div>
          <h3>${escapeHtml(secondary.title)}</h3>
          <p>${escapeHtml(secondary.description)}</p>
        </div>
        <div class="feature-link">查看内容 <span>↗</span></div>
      </a>` : `
      <article class="featured-card featured-side">
        <div>
          <div class="card-meta"><span class="card-category">NEXT</span></div>
          <h3>这里会持续生长</h3>
          <p>后续的论文解读、研究演示、工具项目和实验笔记，会按照统一结构沉淀到这个内容库。</p>
        </div>
        <a class="feature-link" href="https://github.com/chendaihao31">关注更新 <span>↗</span></a>
      </article>`;

    byId('featured-grid').innerHTML = primaryCard + sideCard;
  }

  function renderFilters() {
    const used = new Set(siteData.items.map((item) => item.category));
    const categories = siteData.categories.filter((category) => used.has(category.id));
    const buttons = [{ id: 'all', label: '全部' }, ...categories]
      .map((category) => `
        <button class="filter-button${activeCategory === category.id ? ' active' : ''}"
                type="button" data-category="${escapeHtml(category.id)}">
          ${escapeHtml(category.label)}
        </button>`)
      .join('');
    byId('category-filters').innerHTML = buttons;
  }

  function cardTemplate(item) {
    const tags = (item.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
    return `
      <a class="content-card" href="${escapeHtml(item.url)}">
        <div class="card-meta">
          <span class="card-category">${escapeHtml(categoryLabel(item.category))}</span>
          <span>${escapeHtml(formatDate(item.date))}</span>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <div class="tags">${tags}</div>
        <div class="card-footer">
          <span>${escapeHtml(item.readingTime || item.status || '查看内容')}</span>
          <span>↗</span>
        </div>
      </a>`;
  }

  function renderLibrary() {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = siteData.items.filter((item) => {
      const categoryHit = activeCategory === 'all' || item.category === activeCategory;
      const haystack = [item.title, item.description, item.category, ...(item.tags || [])].join(' ').toLowerCase();
      return categoryHit && (!normalizedQuery || haystack.includes(normalizedQuery));
    });

    byId('content-grid').innerHTML = filtered.map(cardTemplate).join('');
    byId('empty-state').hidden = filtered.length !== 0;
  }

  function bindEvents() {
    byId('theme-toggle').addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('research-atlas-theme', next);
    });

    byId('content-search').addEventListener('input', (event) => {
      query = event.target.value;
      renderLibrary();
    });

    byId('category-filters').addEventListener('click', (event) => {
      const button = event.target.closest('[data-category]');
      if (!button) return;
      activeCategory = button.dataset.category;
      renderFilters();
      renderLibrary();
    });
  }

  async function loadData() {
    try {
      const response = await fetch('/data/contents.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const loaded = await response.json();
      if (!Array.isArray(loaded.items)) throw new Error('Invalid content data');
      siteData = loaded;
    } catch (error) {
      console.info('Using embedded content data for local preview.', error);
    }

    renderStats();
    renderFeatured();
    renderFilters();
    renderLibrary();
  }

  bindEvents();
  loadData();
})();
