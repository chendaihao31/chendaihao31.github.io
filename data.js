window.AUTO_RESEARCH_DATA = {
  checkedOn: "2026-07-20",
  capabilityOrder: [
    ["data", "数据可信"],
    ["optimizer", "外部优化"],
    ["population", "种群搜索"],
    ["memory", "失败记忆"],
    ["audit", "独立审计"],
    ["gate", "方案门控"],
    ["lockin", "防止锁定"],
    ["execution", "执行落地"]
  ],
  items: [
    {
      id: "karpathy-autoresearch", name: "karpathy/autoresearch", priority: "A", cluster: "foundation",
      title: "karpathy/autoresearch", github: "https://github.com/karpathy/autoresearch", status: "official_code", stars: 91575,
      method: "最小指标驱动研究循环", usable: "yes", best: "单 GPU、单指标、可快速重跑的 ML 微型研究",
      caps: ["partial","no","no","partial","no","no","no","solves"],
      assessment: "最好的最小基线；约束清楚、能真实执行，但正是 GEAR 与 SwarmResearch 所批评的单路径模式。",
      gap: "没有种群搜索、结构化失败记忆、独立审计、计划严谨性门或证据链。"
    },
    {
      id: "hidden-pitfalls", name: "Hidden Pitfalls", priority: "A", cluster: "audit",
      title: "The More You Automate, the Less You See: Hidden Pitfalls of AI Scientist Systems", arxiv: "2509.08713", paper: "https://arxiv.org/abs/2509.08713", status: "no_verified_official_repo",
      method: "失败模式审计", usable: "checklist_only", best: "把数据泄漏、benchmark、指标和事后选择做成审计清单",
      caps: ["diagnoses","no","no","no","partial","no","no","diagnoses"],
      assessment: "四项核心风险是错误 benchmark 选择、数据泄漏、指标误用与事后选择偏差。",
      gap: "主要是诊断与治理建议，不是可直接运行的解决方案。"
    },
    {
      id: "centaur", name: "Centaur", priority: "A", cluster: "optimization",
      title: "Can LLMs Beat Classical Hyperparameter Optimization Algorithms? A Study on autoresearch", arxiv: "2603.24647", paper: "https://arxiv.org/abs/2603.24647", github: "https://github.com/ferreirafabio/autoresearch-automl", project: "https://ferreirafabio.github.io/autoresearch-automl/", status: "official_code", stars: 56, license: "MIT",
      method: "LLM + CMA-ES 混合 HPO", usable: "yes", best: "可参数化搜索空间中的 LLM + CMA-ES 混合优化",
      caps: ["partial","solves","partial","partial","no","no","partial","solves"],
      assessment: "混合优化解读成立；Centaur 的关键不是外部模型 reviewer，而是让 LLM 利用 CMA-ES 的均值、步长和协方差等结构化状态。",
      gap: "主要解决优化搜索，不解决论文证据、数据泄漏或科学计划的可靠评审。"
    },
    {
      id: "gear", name: "GEAR", priority: "A", cluster: "search",
      title: "GEAR: Genetic AutoResearch for Agentic Code Evolution", arxiv: "2605.13874", paper: "https://arxiv.org/abs/2605.13874", status: "no_verified_official_repo",
      method: "遗传式种群 AutoResearch", usable: "paper_only", best: "用种群、mutation、crossover 保留多条研究路径",
      caps: ["partial","no","solves","solves","no","partial","solves","solves"],
      assessment: "以生产力、新颖性和覆盖度选亲本，通过 mutation 与 crossover 避免贪心单路径过早陷入局部最优。",
      gap: "未证明可系统防止泄漏、指标投机和错误科学主张；未找到官方开源仓库。"
    },
    {
      id: "negative-knowledge", name: "Negative Knowledge", priority: "A", cluster: "memory",
      title: "Negative Knowledge as Failure-aware Shared Memory for AutoResearch", arxiv: "2606.21024", paper: "https://arxiv.org/abs/2606.21024", github: "https://github.com/hch-wang/Negative_Knowledge", status: "official_code", stars: 0, license: "MIT",
      method: "类型化负知识记忆", usable: "yes_module", best: "把失败尝试压成有类型、可采纳或拒绝、可跨任务迁移的记忆",
      caps: ["no","no","no","solves","partial","partial","partial","solves"],
      assessment: "失败可以沉淀为系统内部共享的结构化 negative-knowledge bank；这比反复重读完整日志更可复用。",
      gap: "它是记忆层，不是完整 Auto Research 系统，也不等同于必须公开到社区。"
    },
    {
      id: "soundnessbench", name: "SoundnessBench", priority: "A", cluster: "gate",
      title: "SoundnessBench: Can Your AI Scientist Really Tell Good Research Ideas from Bad Ones?", arxiv: "2605.30329", paper: "https://arxiv.org/abs/2605.30329", github: "https://github.com/hosytuyen/SoundnessBench", project: "https://hosytuyen.github.io/projects/SoundnessBench", status: "official_benchmark", stars: 3,
      method: "方案方法学可靠性基准", usable: "benchmark_only", best: "测试模型能否在投入实验前识别方法学上站不住的计划",
      caps: ["no","no","no","no","diagnoses","diagnoses","no","no"],
      assessment: "模型在 proposal-stage methodological viability 上存在 optimism bias；这不等于所有规划能力都不足。",
      gap: "它揭示 gate 不可靠，但没有提供一个已经可靠的自动 gate。"
    },
    {
      id: "swarmresearch", name: "SwarmResearch", priority: "A", cluster: "search",
      title: "SwarmResearch: Orchestrating Coding Agents for Open-Ended Discovery", arxiv: "2607.02807", paper: "https://arxiv.org/abs/2607.02807", github: "https://github.com/SwarmResearch/SwarmResearch", status: "official_code", stars: 10,
      method: "Shepherd 调度的分支搜索", usable: "yes_module", best: "用全局 Shepherd 调度多个短上下文、分支隔离的 Search Agents",
      caps: ["no","no","solves","partial","no","partial","solves","solves"],
      assessment: "长智能体的‘思维固化’更准确地说，是单一累积上下文与单一 program state 造成的高层方案锁定。",
      gap: "主要改善搜索多样性，不负责科学证据和数据治理。"
    },
    {
      id: "autoresearchclaw", name: "AutoResearchClaw", priority: "A", cluster: "system",
      title: "AutoResearchClaw: Self-Reinforcing Autonomous Research with Human-AI Collaboration", arxiv: "2605.20025", paper: "https://arxiv.org/abs/2605.20025", github: "https://github.com/aiming-lab/AutoResearchClaw", status: "official_code", stars: 13842, license: "MIT",
      method: "端到端自主研究流水线", usable: "yes", best: "Windows / 跨平台快速跑通 topic → 实验 → 论文；兼容 OpenAI API 与 ACP",
      caps: ["partial","partial","partial","solves","partial","partial","partial","solves"],
      assessment: "目前最接近开箱即用全流程的基座；具备自愈执行、结果验证、跨运行经验和多种 HITL 模式。",
      gap: "没有原生统合 Centaur、GEAR 与严格外部 soundness gate；论文指标主要是作者自建 benchmark。"
    },
    {
      id: "aris", name: "ARIS", priority: "A", cluster: "audit",
      title: "ARIS: Autonomous Research via Adversarial Multi-Agent Collaboration", arxiv: "2605.03042", paper: "https://arxiv.org/abs/2605.03042", github: "https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep", status: "official_code", stars: 13595, license: "MIT",
      method: "跨模型研究与审计 harness", usable: "yes", best: "已有实验或论文后的异构模型复核、claim ledger 与 research wiki",
      caps: ["partial","no","partial","solves","solves","partial","partial","solves"],
      assessment: "审计和证据层最成熟的实用工具之一，适合给 AutoResearchClaw 或自建执行器做 reviewer / assurance 层。",
      gap: "不是种群搜索或 HPO 引擎；cross-model review 不能替代确定性验证。"
    },
    {
      id: "eurekagent", name: "EurekAgent", priority: "A", cluster: "execution",
      title: "EurekAgent: Agent Environment Engineering is All You Need For Autonomous Scientific Discovery", arxiv: "2606.13662", paper: "https://arxiv.org/abs/2606.13662", github: "https://github.com/THU-Team-Eureka/EurekAgent", status: "official_code", stars: 73, license: "AGPL-3.0",
      method: "环境工程化的指标发现", usable: "yes_with_setup", best: "数学、kernel、ML 等有明确 evaluator 的任务",
      caps: ["partial","no","partial","partial","solves","partial","partial","solves"],
      assessment: "把权限、隔离评分、artifact、预算和 HITL 当作环境工程，方向正确且代码可用。",
      gap: "当前主线依赖 Claude Code + Docker；没有原生经典 HPO 混合。"
    },
    {
      id: "xscientist", name: "XScientist", priority: "A", cluster: "protocol",
      title: "XScientist: A Git-Like Research Protocol for Long-Running Autonomous Scientific Discovery", arxiv: "2607.12301", paper: "https://arxiv.org/abs/2607.12301", github: "https://github.com/smileformylove/XScientist", status: "official_code", stars: 109, license: "Apache-2.0",
      method: "Git-like 研究协议与 artifact 系统", usable: "yes_experimental", best: "探索 DAG、provenance、claim-evidence anchor、重执行和分叉",
      caps: ["solves","no","partial","solves","solves","partial","partial","solves"],
      assessment: "作为可审计 artifact / protocol 层最接近完整答案，适合承载其他搜索模块。",
      gap: "非常新、外部验证有限；没有原生 Centaur / GEAR，也没有已证明可靠的方案门控。"
    },
    {
      id: "sibyl", name: "Sibyl-AutoResearch", priority: "B", cluster: "memory",
      title: "Sibyl-AutoResearch: Autonomous Research Needs Self-Evolving Trial-and-Error Harnesses, Not Paper Generators", arxiv: "2605.22343", paper: "https://arxiv.org/abs/2605.22343", github: "https://github.com/Sibyl-Research-Team/AutoResearch-SibylSystem", status: "official_code", stars: 265,
      method: "自进化 trial-and-error harness", usable: "yes_experimental", best: "把 trial 结果路由到后续规划、验证、写作和 harness 修复",
      caps: ["partial","no","no","solves","partial","partial","partial","solves"],
      assessment: "比简单 memory 更进一步，强调 trial-to-behavior 与 trial-to-harness-behavior。",
      gap: "论文主要是可恢复轨迹审计，不是与主流系统的大规模独立性能对比。"
    },
    {
      id: "scientistone", name: "ScientistOne", priority: "A", cluster: "protocol",
      title: "ScientistOne: Towards Human-Level Autonomous Research via Chain-of-Evidence", arxiv: "2605.26340", paper: "https://arxiv.org/abs/2605.26340", github: "https://github.com/scientist-one/generated-artifacts", project: "https://scientist-one.github.io/", status: "official_artifacts_only", stars: 36, license: "Apache-2.0",
      method: "证据链自主科学家", usable: "artifacts_only", best: "claim → 数据 / 代码 / 引用证据链与事后完整性审计",
      caps: ["solves","no","no","partial","solves","partial","no","solves"],
      assessment: "证据链设计非常值得集成；当前公开的是生成 artifacts，而不是完整系统代码。",
      gap: "不能直接作为可安装工具；论文效果仍需独立复现。"
    },
    {
      id: "autoscientists", name: "AutoScientists", priority: "A", cluster: "search",
      title: "AutoScientists: Self-Organizing Agent Teams for Long-Running Scientific Experimentation", arxiv: "2605.28655", paper: "https://arxiv.org/abs/2605.28655", github: "https://github.com/mims-harvard/AutoScientists", status: "official_code", stars: 704,
      method: "自组织多智能体实验", usable: "yes_research_code", best: "长时并行科学实验、动态组队、共享成功和失败",
      caps: ["partial","no","solves","solves","partial","partial","solves","solves"],
      assessment: "比单 agent 更接近真正的 research campaign，适合作为种群或团队执行层。",
      gap: "没有完整 claim-evidence 治理，仓库未声明明确 license。"
    },
    {
      id: "search-discipline", name: "Search Discipline", priority: "A", cluster: "audit",
      title: "Search Discipline for Long-Horizon Research Agents", arxiv: "2606.11522", paper: "https://arxiv.org/abs/2606.11522", status: "no_verified_official_repo",
      method: "外部搜索纪律控制器", usable: "protocol_only", best: "防止单一聚合指标把局部或群体上错误的候选排第一",
      caps: ["solves","no","no","no","solves","partial","partial","solves"],
      assessment: "evaluator 本身必须按 slice 审计，并能在 agent 停止后重新打开 run。",
      gap: "是协议和案例，不是通用开源框架。"
    },
    {
      id: "arbor", name: "Arbor", priority: "A", cluster: "system",
      title: "Toward Generalist Autonomous Research via Hypothesis-Tree Refinement", arxiv: "2606.11926", paper: "https://arxiv.org/abs/2606.11926", status: "no_verified_official_repo",
      method: "假设树细化", usable: "paper_only", best: "长寿命 coordinator、隔离 worktree executor 和持续 hypothesis tree",
      caps: ["partial","no","solves","solves","partial","partial","solves","solves"],
      assessment: "架构上最接近长期研究操作系统；适合作为设计基座，而不是现成依赖。",
      gap: "目前未找到可用官方仓库，且缺少完整泄漏治理、证据治理与经典 optimizer 接口。"
    },
    {
      id: "sage", name: "SAGE", priority: "B", cluster: "memory",
      title: "One Reflection Is Not Enough: Self-Correcting Autonomous Research via Multi-Hypothesis Failure Attribution", arxiv: "2606.31478", paper: "https://arxiv.org/abs/2606.31478", status: "no_verified_official_repo",
      method: "多假设失败归因", usable: "paper_only", best: "实验失败后进行多假设因果归因并路由到正确修复层",
      caps: ["partial","no","partial","solves","partial","partial","partial","solves"],
      assessment: "比单次 free-form reflection 更可靠，适合做失败诊断模块。",
      gap: "无已验证官方代码；12-topic benchmark 规模仍小。"
    },
    {
      id: "researchclawbench", name: "ResearchClawBench", priority: "A", cluster: "benchmark",
      title: "ResearchClawBench: A Benchmark for End-to-End Autonomous Scientific Research", arxiv: "2606.07591", paper: "https://arxiv.org/abs/2606.07591", github: "https://github.com/InternScience/ResearchClawBench", status: "official_benchmark", stars: 220, license: "MIT",
      method: "端到端研究基准", usable: "benchmark_only", best: "对真实论文重发现能力做统一、可复现评测",
      caps: ["diagnoses","no","no","no","diagnoses","diagnoses","diagnoses","diagnoses"],
      assessment: "用它验收自建系统，比只用作者自建 LLM judge 更可信。",
      gap: "它是 benchmark，不是研究执行器。"
    },
    {
      id: "execution-grounded-autoresearch", name: "Execution-Grounded AutoResearch", priority: "B", cluster: "execution",
      title: "AutoResearch: An Execution-Grounded Multi-Agent Framework for Reliable Research Workflow Automation", arxiv: "2607.02520", paper: "https://arxiv.org/abs/2607.02520", github: "https://github.com/raja21068/AutoResearch", status: "official_code", stars: 2, license: "MIT",
      method: "执行落地的多智能体工作流", usable: "yes_research_code", best: "代码执行、修复、引用验证、claim support 与 LaTeX 输出",
      caps: ["partial","no","partial","partial","solves","partial","no","solves"],
      assessment: "可靠性导向；作者也明确不把它声称为完整自主科学家。",
      gap: "缺少长期种群搜索、经典 optimizer 和跨运行负知识。"
    },
    {
      id: "firstresearch", name: "FirstResearch", priority: "B", cluster: "gate",
      title: "FirstResearch: Auditable Question Formation for LLM Scientific Discovery Agents", arxiv: "2607.05682", paper: "https://arxiv.org/abs/2607.05682", github: "https://github.com/louiswang524/FirstResearch", status: "official_code", stars: 0,
      method: "研究问题证书", usable: "yes_module", best: "实验前明确机制、假设、反证条件、最小决定性测试和失败更新",
      caps: ["no","no","no","partial","partial","partial","partial","no"],
      assessment: "把问题形成阶段变得可审计，是 SoundnessBench 之后值得补入的模块。",
      gap: "主要依赖 LLM judge，作者也承认缺少人类领域专家验证。"
    },
    {
      id: "cartograph", name: "CARTOGRAPH", priority: "A", cluster: "gate",
      title: "When Should an AI Scientist Stop? Verifiable Experiment Steering and Refusal for Autonomous Discovery", arxiv: "2606.07576", paper: "https://arxiv.org/abs/2606.07576", github: "https://github.com/ai4science-boed/cartograph", status: "official_code", stars: 2,
      method: "实验引导与拒绝层", usable: "yes_module", best: "模型库不足或残差暴露结构失配时，要求系统拒绝下结论",
      caps: ["partial","no","no","partial","solves","partial","partial","solves"],
      assessment: "解决‘什么时候必须停或拒绝’这一常被忽略的 gate，可作为独立 verifier。",
      gap: "理论与案例较专门，需要按领域重实现残差与模型库充分性检查。"
    },
    {
      id: "red-queen", name: "Red Queen Gödel Machine", priority: "B", cluster: "search",
      title: "The Red Queen Gödel Machine: Co-Evolving Agents and Their Evaluators", arxiv: "2606.26294", paper: "https://arxiv.org/abs/2606.26294", github: "https://github.com/kingkillery/red-queen-godel-machine", status: "third_party_reimplementation", stars: 2, license: "MIT",
      method: "agent 与 evaluator 协同演化", usable: "third_party_only", best: "让 writer / solver 与 reviewer / evaluator 共同演化",
      caps: ["partial","no","solves","partial","solves","partial","solves","partial"],
      assessment: "固定 evaluator 也会过时；但论文仍属 preliminary，所列 GitHub 为第三方复现。",
      gap: "agent-as-judge 仍可能共谋或共同漂移，不能替代真实 ground truth。"
    },
    {
      id: "robophd", name: "RoboPhD", priority: "B", cluster: "search",
      title: "RoboPhD: Evolving Diverse Complex Agents Under Tight Evaluation Budgets", arxiv: "2604.04347", paper: "https://arxiv.org/abs/2604.04347", github: "https://github.com/andborth/RoboPhD", status: "official_code", stars: 24, license: "MIT",
      method: "Elo 种群演化", usable: "yes", best: "evaluator 很贵时，用 Elo tournament 演化复杂 agent",
      caps: ["partial","partial","solves","partial","partial","partial","solves","solves"],
      assessment: "提供可运行的种群优化工具，适合作为 GEAR 缺少官方代码时的替代。",
      gap: "优化的是 agent artifact，不自动提供科研证据链和泄漏审计。"
    },
    {
      id: "remember-dont-reread", name: "Remember, Don't Re-read", priority: "B", cluster: "memory",
      title: "Remember, Don't Re-read: Stateful ReAct Agents for Token-Efficient Autonomous Experimentation", arxiv: "2606.14945", paper: "https://arxiv.org/abs/2606.14945", status: "no_verified_official_repo",
      method: "有状态 ReAct 实验", usable: "architecture_only", best: "减少长 run 重读全部历史造成的 token 二次增长",
      caps: ["no","no","no","solves","no","no","partial","solves"],
      assessment: "适合做基础设施层的 typed persistent state；它降低成本，但不直接提高科学正确性。",
      gap: "未解决多路径、高层探索或证据审计。"
    },
    {
      id: "alphaevolve", name: "AlphaEvolve", priority: "B", cluster: "search",
      title: "AlphaEvolve: A coding agent for scientific and algorithmic discovery", arxiv: "2506.13131", paper: "https://arxiv.org/abs/2506.13131", project: "https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/", status: "closed_or_not_released",
      method: "LLM 引导的进化式代码发现", usable: "no_official_code", best: "理解为什么可程序验证的算法发现比 prompt-to-paper 更可靠",
      caps: ["partial","no","solves","solves","solves","partial","solves","solves"],
      assessment: "真实结果很强，但不是当前可直接采用的开源工具。",
      gap: "官方系统未完整开源；适用前提是便宜而可信的 evaluator。"
    },
    {
      id: "dgm", name: "Darwin Gödel Machine", priority: "B", cluster: "search",
      title: "Darwin Godel Machine: Open-Ended Evolution of Self-Improving Agents", arxiv: "2505.22954", paper: "https://arxiv.org/abs/2505.22954", github: "https://github.com/jennyzzt/dgm", status: "official_code", stars: 2183, license: "Apache-2.0",
      method: "开放式自改进 agent archive", usable: "yes_research_code", best: "研究开放式 archive、agent 自修改和多路径 stepping stones",
      caps: ["no","no","solves","solves","partial","no","solves","solves"],
      assessment: "是 GEAR / Red Queen 路线的重要祖先，但目标主要是 coding-agent 自改进。",
      gap: "不直接处理科研数据、实验协议或论文证据。"
    },
    {
      id: "epistemic-benchmark", name: "Scientific Reasoning Audit", priority: "A", cluster: "audit",
      title: "AI scientists produce results without reasoning scientifically", arxiv: "2604.18805", paper: "https://arxiv.org/abs/2604.18805", status: "no_verified_official_repo",
      method: "科学认识行为基准", usable: "benchmark_insight", best: "检查 agent 是否真的因反证更新信念，而非只完成流程",
      caps: ["diagnoses","no","no","diagnoses","diagnoses","diagnoses","diagnoses","diagnoses"],
      assessment: "单纯增加 scaffold 不够；base model 与训练目标仍然决定科学推理行为。",
      gap: "这是诊断证据，不是可安装工具。"
    },
    {
      id: "kosmos", name: "Kosmos", priority: "B", cluster: "system",
      title: "Kosmos: An AI Scientist for Autonomous Discovery", arxiv: "2511.02824", paper: "https://arxiv.org/abs/2511.02824", project: "https://www.edisonscientific.com/", status: "closed_or_not_released",
      method: "长程数据驱动 AI scientist", usable: "closed_service", best: "长时文献检索、数据分析与结构化 world model",
      caps: ["partial","no","partial","solves","partial","partial","partial","solves"],
      assessment: "能力强但闭源；必须与外部复核论文 2511.13825 一起阅读。",
      gap: "不可本地组装，且外部审计发现并非所有假设可靠。"
    },
    {
      id: "alphalab", name: "AlphaLab", priority: "B", cluster: "execution",
      title: "AlphaLab: Autonomous Multi-Agent Research Across Optimization Domains with Frontier LLMs", arxiv: "2604.08590", paper: "https://arxiv.org/abs/2604.08590", github: "https://github.com/morganstanley/MSML/tree/main/projects/alpha-lab", project: "https://brendanhogan.github.io/alphalab-paper/", status: "official_project_subdir", stars: 161, license: "Apache-2.0",
      method: "Strategist–Worker 自主实验", usable: "yes_research_code", best: "CUDA、LLM pretraining、时序预测等定量密集任务",
      caps: ["partial","no","partial","solves","solves","partial","partial","solves"],
      assessment: "自动构建并对抗验证 evaluator，持续 playbook 也很实用。",
      gap: "作者自报结果为主，尚未统合负知识、经典 HPO 和完整证据链。"
    },
    {
      id: "ai-researcher", name: "AI-Researcher", priority: "B", cluster: "system",
      title: "AI-Researcher: Autonomous Scientific Innovation", arxiv: "2505.18705", paper: "https://arxiv.org/abs/2505.18705", github: "https://github.com/HKUDS/AI-Researcher", status: "official_code", stars: 5598,
      method: "早期端到端 AI researcher", usable: "historical_baseline", best: "复现 2025 年 AI-Researcher 与 Scientist-Bench",
      caps: ["partial","no","no","partial","partial","partial","no","solves"],
      assessment: "比 AI Scientist-v2 稍后的完整开源历史 baseline。",
      gap: "维护和架构已落后一代，仓库许可不清，不建议作为新项目主基座。"
    },
    {
      id: "parness", name: "PARNESS", priority: "B", cluster: "memory",
      title: "PARNESS: A Paper Harness for End-to-End Automated Scientific Research with Dynamic Workflows, Full-Text Indexing, and Cross-Run Knowledge Accumulation", arxiv: "2605.05258", paper: "https://arxiv.org/abs/2605.05258", github: "https://github.com/gtrhythm/PARNESS", status: "official_code", stars: 8,
      method: "动态流程与跨运行知识的论文 harness", usable: "yes_experimental", best: "全 PDF / 代码索引、YAML 动态流程和跨运行知识积累",
      caps: ["partial","no","partial","solves","partial","partial","partial","solves"],
      assessment: "适合需要文献库和跨运行知识图谱的研究组织层。",
      gap: "社区和外部验证较少，未提供完整经典 optimizer 或种群机制。"
    }
  ]
};
