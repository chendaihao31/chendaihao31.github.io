(() => {
  const data = window.AUTO_RESEARCH_DATA;
  const tableDetails = window.AUTO_RESEARCH_TABLE_DETAILS || {};
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

  // The requested five-column research table is the primary content, so place
  // it immediately after the section navigation while keeping the source HTML maintainable.
  const surveySection = $("#catalog");
  $(".section-nav").after(surveySection);

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

  const displayUrl = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const renderSourceLinks = (item) => {
    const links = [];
    if (item.github) links.push(`<a class="source-url" href="${escapeHtml(item.github)}" target="_blank" rel="noopener"><b>GitHub ↗</b><code>${escapeHtml(displayUrl(item.github))}</code></a>`);
    if (item.project) links.push(`<a class="source-url" href="${escapeHtml(item.project)}" target="_blank" rel="noopener"><b>项目主页 ↗</b><code>${escapeHtml(displayUrl(item.project))}</code></a>`);
    if (!links.length) links.push(`<p class="no-repo">未找到可核验的官方开源网址</p>`);
    return links.join("");
  };

  const renderSurveyRow = (item) => {
    const [statusLabel, statusClass] = statusMeta[item.status] || [item.status, "paper"];
    const detail = tableDetails[item.id] || {};
    const starLabel = formatStars(item.stars);
    const mainHref = item.paper || item.github || item.project || "#";
    return `
      <tr id="item-${escapeHtml(item.id)}" data-priority="${item.priority}">
        <th scope="row" class="paper-cell">
          <div class="row-badges"><span class="badge priority-${item.priority.toLowerCase()}">PRIORITY ${item.priority}</span>${item.arxiv ? `<span class="badge">arXiv ${escapeHtml(item.arxiv)}</span>` : `<span class="badge">Repository</span>`}</div>
          <a class="paper-title" href="${escapeHtml(mainHref)}" target="_blank" rel="noopener">${escapeHtml(item.title)} ↗</a>
          <p>${escapeHtml(item.method)}</p>
        </th>
        <td class="opensource-cell">
          <div class="source-status"><span class="badge ${statusClass}">${escapeHtml(statusLabel)}</span>${item.license ? `<span class="badge">${escapeHtml(item.license)}</span>` : ""}${starLabel ? `<span class="stars">★ ${escapeHtml(starLabel)}</span>` : ""}</div>
          ${renderSourceLinks(item)}
        </td>
        <td class="domain-cell"><span>${escapeHtml(detail.domain || clusterNames[item.cluster] || item.method)}</span><small>${escapeHtml(item.best)}</small></td>
        <td class="flow-cell">
          <div class="flow-block input"><b>输入</b><p>${escapeHtml(detail.input || "—")}</p></div>
          <div class="flow-arrow" aria-hidden="true">↓</div>
          <div class="flow-block output"><b>输出</b><p>${escapeHtml(detail.output || "—")}</p></div>
        </td>
        <td class="need-cell">
          <div class="need-block"><b>真正用户需求</b><p>${escapeHtml(detail.need || item.best)}</p></div>
          <div class="pain-block"><b>用户痛点</b><p>${escapeHtml(detail.pain || item.gap)}</p></div>
        </td>
      </tr>`;
  };

  const searchInput = $("#search-input");
  const priorityFilter = $("#priority-filter");
  const availabilityFilter = $("#availability-filter");
  const clearFilters = $("#clear-filters");
  const grid = $("#survey-body");
  const resultCount = $("#result-count");
  const emptyState = $("#empty-state");

  const applyFilters = () => {
    const query = searchInput.value.trim().toLowerCase();
    const priority = priorityFilter.value;
    const availability = availabilityFilter.value;
    const capability = capabilityFilter.value;

    const filtered = data.items.filter((item) => {
      const detail = tableDetails[item.id] || {};
      const haystack = [item.name, item.title, item.method, item.best, item.assessment, item.gap, item.arxiv, clusterNames[item.cluster], detail.domain, detail.input, detail.output, detail.need, detail.pain].join(" ").toLowerCase();
      const statusGroup = statusMeta[item.status]?.[2] || "paper";
      const capMatch = capability === "all" || ["solves", "partial"].includes(item.caps[Number(capability)]);
      return (!query || haystack.includes(query))
        && (priority === "all" || item.priority === priority)
        && (availability === "all" || statusGroup === availability)
        && capMatch;
    });

    grid.innerHTML = filtered.map(renderSurveyRow).join("");
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
