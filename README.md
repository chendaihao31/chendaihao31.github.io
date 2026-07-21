# GitHub Pages 上传包

目标目录结构：

```text
仓库根目录/
├─ _config.yml
├─ index.html
├─ assets/
│  ├─ css/home.css
│  ├─ js/home.js
│  └─ images/favicon.svg
├─ data/
│  └─ contents.json
└─ presentations/
   └─ Auto-Research/
      ├─ index.html
      ├─ styles.css
      ├─ data.js
      └─ app.js
```

当前仓库配置为 `chendaihao31/chendaihao31.github.io`，启用 GitHub Pages 后：

- 网站首页：`https://chendaihao31.github.io/`
- Auto Research 页面：`https://chendaihao31.github.io/presentations/Auto-Research/`

在仓库 `Settings` → `Pages` 中选择：

- Source：`Deploy from a branch`
- Branch：`main`
- Folder：`/(root)`

把本目录中的内容上传到 `chendaihao31/chendaihao31.github.io` 仓库根目录即可。

Auto Research 页面当前为完整调研版，收录 31 项工作。`data.js` 保存结构化条目；
以后补充论文或项目时，优先新增数据项，不需要重写页面布局。

## 以后新增内容

1. 将新页面放到独立目录，例如 `presentations/New-Topic/index.html`。
2. 编辑 `data/contents.json`，在 `items` 数组中增加一条记录。
3. 提交后，主页会自动生成新卡片，并支持搜索与分类筛选。
