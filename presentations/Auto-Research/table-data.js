window.AUTO_RESEARCH_TABLE_DETAILS = {
  "karpathy-autoresearch": {
    domain: "机器学习实验自动化 / 单指标优化",
    input: "训练代码、数据集、单一评价指标、实验预算",
    output: "代码补丁、指标变化、实验历史与最佳候选",
    need: "用最小成本持续改进一个可执行 ML 基线",
    pain: "单路径贪心容易锁定；没有结构化失败记忆、独立审计和证据链"
  },
  "hidden-pitfalls": {
    domain: "AI Scientist 可靠性 / 方法审计",
    input: "AI Scientist 的数据、benchmark、指标、实验记录与最终结论",
    output: "四类风险审计：错误 benchmark、数据泄漏、指标误用、事后选择偏差",
    need: "确认自动研究结果是真的，而不是流程看起来完整",
    pain: "自动化会隐藏实验协议错误；漂亮结果可能来自泄漏、挑结果或指标投机"
  },
  "centaur": {
    domain: "AutoML / 超参数优化 / 混合搜索",
    input: "参数化搜索空间、目标函数、实验预算、历史观测",
    output: "候选配置、最佳指标，以及 CMA-ES 的均值、步长和协方差状态",
    need: "让自主研究在连续参数空间中稳定收敛",
    pain: "纯 LLM 搜索噪声大，缺少数值优化状态，容易反复试相似配置"
  },
  "gear": {
    domain: "种群优化 / Agentic Code Evolution",
    input: "研究代码、评价指标、初始研究状态与计算预算",
    output: "mutation / crossover 后的候选种群、精英路径和改进代码",
    need: "保留多个高层研究方向，寻找非显然改进",
    pain: "单路径贪心过早收敛到局部最优，后续只做低层微调"
  },
  "negative-knowledge": {
    domain: "失败记忆 / 跨任务经验复用",
    input: "失败实验、错误日志、上下文、失败原因与采纳反馈",
    output: "类型化 negative-knowledge bank，可检索、可采纳或拒绝的失败资产",
    need: "让后续 agent 不再重复同一种失败",
    pain: "自然语言 reflection 松散、不可检索，失败只留在单次上下文里"
  },
  "soundnessbench": {
    domain: "科研方案评测 / 方法学门控",
    input: "研究 proposal、方法设计、实验计划与判断理由",
    output: "方案 soundness 标签、错误类型与模型判断偏差",
    need: "在投入昂贵实验前筛掉方法学上站不住的计划",
    pain: "模型存在 optimism bias，会把有根本缺陷的方案判断为可行"
  },
  "swarmresearch": {
    domain: "多智能体分支搜索 / 长程探索",
    input: "研究目标、代码仓库、evaluator、多个隔离分支与预算",
    output: "并行候选、分支结果、Shepherd 调度决策与最佳改进",
    need: "长时间探索时保持方案多样性",
    pain: "单一累积上下文和单一 program state 会固化高层思路"
  },
  "autoresearchclaw": {
    domain: "端到端自主科研 / 人机协作",
    input: "研究主题、数据与环境、模型 API、工具权限、预算和人工反馈",
    output: "文献分析、代码、实验结果、论文草稿与跨运行经验",
    need: "快速跑通 topic → 实验 → 论文的完整流程",
    pain: "现有工具碎片化，执行易失败，跨运行经验和人工接管方式不统一"
  },
  "aris": {
    domain: "异构多模型审计 / 证据治理",
    input: "已有实验、论文草稿、代码仓库、claims 与引用",
    output: "对抗式复核、claim ledger、research wiki、修订意见和证据状态",
    need: "给自动生成的研究结果增加独立复核层",
    pain: "同模型自评容易确认偏差；claim、代码、数据与引用彼此断开"
  },
  "eurekagent": {
    domain: "科学发现环境工程 / 可验证优化",
    input: "任务定义、隔离环境、可执行 evaluator、权限、artifact 与预算",
    output: "被验证的代码或算法改进、评分记录、实验 artifact",
    need: "安全、可复现地运行自主实验",
    pain: "如果权限、评分器和环境不受控，agent 容易利用漏洞或产出不可复现实验"
  },
  "xscientist": {
    domain: "长程研究协议 / Provenance / Artifact DAG",
    input: "假设、实验分支、代码数据 artifact、事件记录与 claims",
    output: "Git-like 研究 DAG、来源追踪、claim-evidence anchor、分叉与重执行记录",
    need: "让长期研究可以暂停、接手、回滚、分叉和审计",
    pain: "普通聊天历史无法表达研究状态，长任务缺少稳定 provenance"
  },
  "sibyl": {
    domain: "自进化 Trial-and-Error Harness / 失败恢复",
    input: "trial 结果、执行错误、验证反馈、轨迹与当前 harness",
    output: "后续任务路由、harness 修复、记忆更新与研究报告",
    need: "让每次失败真正改变后续系统行为",
    pain: "传统流水线把失败压成一句总结，无法定位应该修计划、代码还是 harness"
  },
  "scientistone": {
    domain: "证据链科研 / 事后完整性审计",
    input: "研究问题、数据、代码、文献和实验结果",
    output: "claims、数据 / 代码 / 引用证据链及公开生成 artifacts",
    need: "逐条追溯论文结论的来源",
    pain: "最终 PDF 中的主张常与原始数据、代码运行和引用脱节"
  },
  "autoscientists": {
    domain: "自组织多智能体 / 长时科学实验",
    input: "长期研究目标、工具、实验环境、团队预算与共享状态",
    output: "动态团队、并行实验、共享成功和失败、阶段性发现",
    need: "像研究团队一样持续推进复杂 campaign",
    pain: "单 agent 吞吐不足；固定角色无法随实验阶段和新证据动态调整"
  },
  "search-discipline": {
    domain: "长程搜索治理 / Evaluator 审计",
    input: "候选方案、总体与分 slice 指标、运行状态、停止记录",
    output: "按 slice 的稳健性审计、重新排序、停止或重新打开 run 的决策",
    need: "选出真正稳健的候选，而不是总体分数最高的候选",
    pain: "单一聚合指标掩盖局部失败；过早停止后错误候选被永久锁定"
  },
  "arbor": {
    domain: "通用自主研究 / Hypothesis-Tree Refinement",
    input: "开放研究目标、代码仓库、evaluator、假设和实验反馈",
    output: "持续更新的 hypothesis tree、隔离 worktree、实验 artifact 与候选结论",
    need: "长期推进研究，同时保留替代假设和完整演化路径",
    pain: "扁平历史和单分支无法承载长期探索；当前论文又缺少可直接安装的官方实现"
  },
  "sage": {
    domain: "失败归因 / 自纠错研究",
    input: "失败实验、执行遥测、多个候选原因与上下文",
    output: "多假设因果归因、原因排序与针对正确修复层的动作",
    need: "失败后修到真正根因，而不是盲目重试",
    pain: "一次 free-form reflection 容易把数据、方法、实现和环境问题混在一起"
  },
  "researchclawbench": {
    domain: "端到端 Auto Research Benchmark",
    input: "待测研究系统、标准任务、参考论文与统一执行协议",
    output: "论文重发现结果、可复现轨迹和可比较的系统评分",
    need: "公平验收不同 Auto Research 系统",
    pain: "各项目使用作者自建任务和 LLM judge，结果无法横向比较"
  },
  "execution-grounded-autoresearch": {
    domain: "执行落地的多智能体科研工作流",
    input: "研究问题、文献、数据、代码环境与引用来源",
    output: "实际执行的分析、修复后的代码、引用验证、claim support 与 LaTeX",
    need: "让报告中的每个结果都有真实执行依据",
    pain: "纯文本 agent 容易虚构实验、引用和结论，工作流完成不等于证据成立"
  },
  "firstresearch": {
    domain: "研究问题形成 / 实验前门控",
    input: "研究主题、已有文献、先验证据与候选问题",
    output: "问题证书：机制、假设、反证条件、最小决定性测试与失败更新规则",
    need: "先判断应该问什么问题、什么证据才算回答",
    pain: "研究问题常过于宽泛、不可证伪，实验完成后也不知道如何更新信念"
  },
  "cartograph": {
    domain: "实验引导 / 停止与拒绝机制",
    input: "观测数据、残差、候选模型库与当前实验状态",
    output: "下一实验建议、模型库不足判断、拒绝结论与可验证停止依据",
    need: "让 AI Scientist 知道什么时候必须停、必须说不知道",
    pain: "模型库不充分时 agent 仍会强行拟合并给出看似确定的结论"
  },
  "red-queen": {
    domain: "Agent–Evaluator 协同演化",
    input: "初始 solver / writer、reviewer / evaluator、任务与反馈",
    output: "共同演化的 agent 和 evaluator 种群、对抗记录与更强候选",
    need: "让评审标准随着 agent 能力一起变强",
    pain: "固定 evaluator 会过时或被投机；agent-as-judge 又可能与 agent 一起漂移"
  },
  "robophd": {
    domain: "预算受限的种群 Agent 优化",
    input: "候选 agent、任务集合、昂贵 evaluator 与有限评测预算",
    output: "Elo 排名、演化后的多样化 agent、精英 archive",
    need: "在 evaluator 很贵时仍能进行种群优化",
    pain: "全量评测成本过高；简单择优又会牺牲多样性和 stepping stones"
  },
  "remember-dont-reread": {
    domain: "长程 Agent 状态管理 / Token 效率",
    input: "任务、连续观测、实验状态、历史动作与中间 artifact",
    output: "紧凑持久状态、下一步动作和可恢复实验进度",
    need: "长时间运行时控制 token 成本并保留关键状态",
    pain: "每轮重读完整历史造成二次增长；长上下文仍会遗漏真正重要的信息"
  },
  "alphaevolve": {
    domain: "算法发现 / 进化式程序优化",
    input: "可执行问题、种子程序、自动 evaluator 与计算预算",
    output: "演化后的算法或代码、验证分数与候选 archive",
    need: "自动发现可程序验证的新算法",
    pain: "一般科学任务缺少便宜可信的 ground truth，而且官方完整系统尚未开源"
  },
  "dgm": {
    domain: "开放式自改进 Agent / 代码演化",
    input: "agent 源码、基准任务、archive 与代码修改工具",
    output: "经基准验证的自修改 agent、多路径 stepping stones 与成长 archive",
    need: "让 agent 在开放式搜索中持续改进自身",
    pain: "单纯 hill climbing 丢失多样性；自修改又可能破坏已有能力和安全边界"
  },
  "epistemic-benchmark": {
    domain: "科学推理行为评测 / Epistemic Audit",
    input: "agent 推理轨迹、实验结果、反证、信念更新与干预条件",
    output: "证据使用、反证更新和科学推理行为分析",
    need: "判断 agent 是否真的在科学推理，而不是只完成科研流程",
    pain: "结果指标看不出 agent 是否忽略证据；增加 scaffold 也未必改善认识行为"
  },
  "kosmos": {
    domain: "长程数据驱动科学发现",
    input: "开放目标、数据集、文献访问、分析工具与长时预算",
    output: "数据分析、假设、结构化 world model、引用和研究报告",
    need: "连续数小时进行文献—数据—假设循环",
    pain: "普通 agent 行动数和上下文受限；系统闭源且外部审计发现部分假设不可靠"
  },
  "alphalab": {
    domain: "定量密集型多智能体实验",
    input: "数据集、自然语言目标、GPU、领域 evaluator 与实验环境",
    output: "分析代码、对抗验证的 evaluator、实验报告、改进模型与持续 playbook",
    need: "自动完成 CUDA、预训练、时序预测等重计算研究",
    pain: "evaluator 构建困难，作者自报结果为主，跨运行知识与完整证据链仍不足"
  },
  "ai-researcher": {
    domain: "早期端到端 AI Scientist 基线",
    input: "研究主题、文献、代码环境、数据与实验预算",
    output: "候选想法、实验实现、结果与论文草稿",
    need: "获得一个可复现的端到端历史 baseline",
    pain: "架构和维护已落后一代，许可不清，不适合作为新系统主基座"
  },
  "parness": {
    domain: "动态论文 Harness / 跨运行知识管理",
    input: "研究目标、全文 PDF、代码仓库、YAML 工作流与历史运行",
    output: "动态实验流程、论文、全文索引、知识图谱和跨运行知识",
    need: "让研究组织长期积累文献、代码和运行经验",
    pain: "固定流水线不适配不同学科；摘要级检索和单次上下文会丢失大量知识"
  }
};
