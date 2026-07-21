(() => {
  const data = window.AUTO_RESEARCH_DATA;
  if (!data) return;

  const statusMeta = {
    official_code: ["官方代码", "open", "official"],
    official_benchmark: ["官方基准", "open", "official"],
    official_artifacts_only: ["官方产物", "open", "official"],
    official_project_subdir: ["官方项目", "open", "official"],
    no_verified_official_repo: ["未找到官方仓库", "paper", "paper"],
    closed_or_not_released: ["闭源 / 未发布", "closed", "closed"],
    third_party_reimplementation: ["第三方复现", "closed", "closed"]
  };

  const clusterNames = {
    foundation: "基础循环", audit: "可靠性 / 审计", optimization: "混合优化", search: "多路径搜索",
    memory: "记忆 / 恢复", gate: "方案 / 停止门", system: "端到端系统", execution: "执行环境",
    protocol: "证据协议", benchmark: "评测基准"
  };

  const capMeta = {
    solves: ["解决", "solves"], partial: ["部分覆盖", "partial"],
    diagnoses: ["诊断问题", "diagnoses"], no: ["未覆盖", "no"]
  };

  const $ = (selector) => document.querySelector(selector);
  const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
  const formatStars = (stars) => {
    if (stars === undefined || stars === null) return "";
    if (stars >= 1000) return `${(stars / 1000).toFixed(stars >= 10000 ? 0 : 1)}k stars`;
    return `${stars} stars`;
  };

  const officialCount = data.items.filter((item) => statusMeta[item.status]?.[2] === "official").length;
  $("#stat-total").textContent = data.items.length;
  $("#stat-open").textContent = officialCount;

  const themeButton = $("#theme-button");
  const savedTheme = localStorage.getItem("autoresearch-theme");
  if (savedTheme === "dark") document.documentElement.dataset.theme = "dark";
  themeButton.addEventListener("click", () => {
    const isDark = document.documentElement.dataset.theme === "dark";
    document.documentElement.dataset.theme = isDark ? "light" : "dark";
    localStorage.setItem("autoresearch-theme", isDark ? "light" : "dark");
  });

  const matrixHead = $("#matrix-head");
  data.capabilityOrder.forEach(([, label]) => {
    matrixHead.insertAdjacentHTML("beforeend", `<th scope="col">${escapeHtml(label)}</th>`);
  });

  $("#matrix-body").innerHTML = data.items.map((item) => {
    const cells = item.caps.map((state, index) => {
      const [label, className] = capMeta[state];
      const capLabel = data.capabilityOrder[index][1];
      return `<td class="matrix-cell" title="${escapeHtml(capLabel)}：${escapeHtml(label)}"><i class="dot ${className}" aria-label="${escapeHtml(label)}"></i></td>`;
    }).join("");
    return `<tr><th scope="row"><a class="matrix-name" href="#item-${escapeHtml(item.id)}"><span class="matrix-priority">${item.priority}</span>${escapeHtml(item.name)}</a></th>${cells}</tr>`;
  }).join("");

  const capabilityFilter = $("#capability-filter");
  data.capabilityOrder.forEach(([key, label], index) => {
    capabilityFilter.insertAdjacentHTML("beforeend", `<option value="${index}">${escapeHtml(label)}：解决 / 部分</option>`);
  });

  const renderLinks = (item) => {
    const links = [];
    if (item.paper) links.push(`<a href="${escapeHtml(item.paper)}" target="_blank" rel="noopener">论文 · ${escapeHtml(item.arxiv || "arXiv")} ↗</a>`);
    if (item.github) links.push(`<a href="${escapeHtml(item.github)}" target="_blank" rel="noopener">GitHub ↗</a>`);
    if (item.project) links.push(`<a href="${escapeHtml(item.project)}" target="_blank" rel="noopener">项目主页 ↗</a>`);
    return links.join("");
  };

  const renderCard = (item) => {
    const [statusLabel, statusClass] = statusMeta[item.status] || [item.status, "paper"];
    const miniCaps = item.caps.map((state, index) => {
      const [, className] = capMeta[state];
      return `<span class="mini-cap"><i class="dot ${className}"></i>${escapeHtml(data.capabilityOrder[index][1])}</span>`;
    }).join("");
    const starLabel = formatStars(item.stars);
    return `
      <article class="work-card" id="item-${escapeHtml(item.id)}" data-cluster="${escapeHtml(item.cluster)}">
        <div class="work-card-top">
          <div class="badge-row">
            <span class="badge priority-${item.priority.toLowerCase()}">PRIORITY ${item.priority}</span>
            <span class="badge ${statusClass}">${escapeHtml(statusLabel)}</span>
            <span class="badge">${escapeHtml(clusterNames[item.cluster] || item.cluster)}</span>
            ${item.license ? `<span class="badge">${escapeHtml(item.license)}</span>` : ""}
          </div>
          ${starLabel ? `<span class="stars">★ ${escapeHtml(starLabel)}</span>` : ""}
        </div>
        <h3>${escapeHtml(item.name)}</h3>
        <p class="full-title">${escapeHtml(item.title)}</p>
        <p class="method">${escapeHtml(item.method)}</p>
        <p class="best"><b>最适合：</b>${escapeHtml(item.best)}</p>
        <div class="card-copy">
          <p><b>判断：</b>${escapeHtml(item.assessment)}</p>
          <p class="gap"><b>缺口：</b>${escapeHtml(item.gap)}</p>
        </div>
        <div class="mini-caps" aria-label="能力覆盖">${miniCaps}</div>
        <div class="work-links">${renderLinks(item)}</div>
      </article>`;
  };

  const searchInput = $("#search-input");
  const priorityFilter = $("#priority-filter");
  const availabilityFilter = $("#availability-filter");
  const clearFilters = $("#clear-filters");
  const grid = $("#catalog-grid");
  const resultCount = $("#result-count");
  const emptyState = $("#empty-state");

  const applyFilters = () => {
    const query = searchInput.value.trim().toLowerCase();
    const priority = priorityFilter.value;
    const availability = availabilityFilter.value;
    const capability = capabilityFilter.value;

    const filtered = data.items.filter((item) => {
      const haystack = [item.name, item.title, item.method, item.best, item.assessment, item.gap, item.arxiv, clusterNames[item.cluster]].join(" ").toLowerCase();
      const statusGroup = statusMeta[item.status]?.[2] || "paper";
      const capMatch = capability === "all" || ["solves", "partial"].includes(item.caps[Number(capability)]);
      return (!query || haystack.includes(query))
        && (priority === "all" || item.priority === priority)
        && (availability === "all" || statusGroup === availability)
        && capMatch;
    });

    grid.innerHTML = filtered.map(renderCard).join("");
    resultCount.textContent = `显示 ${filtered.length} / ${data.items.length} 项`;
    emptyState.hidden = filtered.length !== 0;
  };

  [searchInput, priorityFilter, availabilityFilter, capabilityFilter].forEach((control) => {
    control.addEventListener(control === searchInput ? "input" : "change", applyFilters);
  });
  clearFilters.addEventListener("click", () => {
    searchInput.value = "";
    priorityFilter.value = "all";
    availabilityFilter.value = "all";
    capabilityFilter.value = "all";
    applyFilters();
    searchInput.focus();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)) {
      event.preventDefault();
      searchInput.focus();
    }
  });

  applyFilters();
})();
