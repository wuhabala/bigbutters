---
title: AI 学术前沿：内容、背景与人物
date: 2026-05-23
length: 5480
type: 人物思想综述
tags:
  - "AI"
  - "学术"
  - "图灵奖"
  - "Hinton"
  - "Hassabis"
  - "Sutton"
---

2026 年的 AI 学术界有一个奇特的双重特征:**它刚刚被"封神",又同时"分裂"了。**

- **封神**:2024 年的奖项几乎被 AI 包圆——诺贝尔物理奖给了神经网络(Hopfield、Hinton),诺贝尔化学奖给了 AlphaFold(Hassabis、Jumper)与蛋白设计(Baker),2024 年图灵奖给了强化学习奠基人(Sutton、Barto)。AI 第一次被基础科学正式追认。
- **分裂**:正当登顶,领域却在"下一步往哪走"上裂成了几个**互相竞争的命题**——继续 scaling?转向推理?押注世界模型?还是先解决安全?

这一篇按这些**竞争中的研究命题**来组织,每块给三件:**背景 / 内容(前沿)/ 人物**。它是 [07 · AI 科技前沿](/research/ai-safety-boundary/07-five-threads-ai-tech/)(产品能力侧)的学术对应,也补全 [06 · 五条贯穿线索](/research/ai-safety-boundary/06-five-threads-safety-science/) 里的人物谱。

---

## 1. 推理与强化学习:从"更大"到"更会想"

**背景**:CoT(思维链)证明让模型"分步想"能大幅提升推理;而 RL 提供了"用奖励雕刻能力"的引擎。两者合流,催生了"推理模型"范式——这也是 2024 图灵奖颁给 RL 的现实注脚。

**内容(前沿)**:o 系列把**推理时计算**做成新的 scaling 轴(o3 在 ARC-AGI-2 拿 75.7%)。开源侧的标志是 **DeepSeek-R1**(2025 年初,Nature 2025):用 **GRPO** 做大规模 RL,其 **R1-Zero 甚至跳过监督微调、纯靠 RL** 就长出推理能力(AIME 15.6%→71.0%),震动全行业。

**人物**:**Richard Sutton & Andrew Barto**(2024 图灵奖,RL 奠基、时序差分学习;Sutton 的《The Bitter Lesson》是领域圣经);**Jason Wei**(CoT 2022,"涌现");**Noam Brown**(OpenAI 推理,曾做扑克 Libratus、外交 Cicero);**DeepSeek** 团队。

## 2. 世界模型与空间智能:押注"LLM 不是终点"

**背景**:一派人认为纯语言模型**永远到不了通用智能**——因为它不理解物理世界的因果。出路是让 AI 先学一个**世界模型**(能预测"如果我这样做,世界会怎样")。

**内容(前沿)**:**JEPA / V-JEPA 2**(联合嵌入预测架构,带物理推理);**World Labs** 提出"大世界模型(LWM)",2026 年 2 月融资 10 亿美元,发布可生成可交互 3D 世界的 Marble;Genie 式可交互生成环境(见 [07 · AI 科技前沿](/research/ai-safety-boundary/07-five-threads-ai-tech/) 线索三)。这是一场把投资焦点从 LLM 拉向 LWM 的转向。

**人物**:**Yann LeCun**(2018 图灵奖教父之一,离开 Meta 创办 AMI Labs,旗帜鲜明反对"LLM 通往 AGI");**Fei-Fei Li**(ImageNet 之母,创办 World Labs,主张"空间智能是 AI 下一前沿")。

## 3. 机制可解释性:给黑箱做"显微镜"

**背景**:我们能造出模型,却读不懂它内部在算什么。可解释性想把神经网络从"黑箱"变成"可读的对象科学"——它也是 [05 · 防御前沿](/research/ai-safety-boundary/05-defense-frontier-walls/) 的承重支柱。

**内容(前沿)**:稀疏自编码器(SAE)、电路追踪、归因图;用它们做"对齐审计"已能挖出模型的隐藏目标(详见 [05 · 防御前沿](/research/ai-safety-boundary/05-defense-frontier-walls/))。被 MIT Tech Review 列为 2026 突破技术,但仍早期、脆弱。

**人物**:**Chris Olah**(Anthropic 联创,从图像模型可视化起家,奠基性人物);**Neel Nanda**(领衔 Google DeepMind 机制可解释性团队)。

## 4. 架构创新:Transformer 之后是什么?

**背景**:Transformer 的注意力是序列长度的**平方**复杂度,长上下文吃不消;于是有人找线性复杂度的替代或补充。

**内容(前沿)**:**状态空间模型(SSM)**——Mamba 用"选择性状态空间"实现线性时间,Mamba-2 的**状态空间对偶(SSD)**把 SSM 与注意力统一(论文标题就叫"Transformers are SSMs");工程主流仍是 **MoE(专家混合)**与混血架构(Transformer+Mamba+MoE);**扩散式语言模型**开始上规模(见 [07 · AI 科技前沿](/research/ai-safety-boundary/07-five-threads-ai-tech/) 线索五)。

**人物**:**Albert Gu**(CMU,SSM/Mamba 主推);**Tri Dao**(普林斯顿 / Together AI,FlashAttention 与 Mamba 共同作者)。

## 5. AI for Science:从"读知识"到"产知识"

**背景**:AlphaFold 把"50 年未解的蛋白折叠"压缩到几秒——这成了"AI 能直接推进基础科学"的样板,也直接拿下 2024 诺贝尔化学奖。

**内容(前沿)**:数学上,**AlphaProof**(IMO 2024 银牌、Lean 形式化 + RL,Nature 2025)、**AlphaGeometry 2**(几何金牌级);2025 IMO Gemini Deep Think 与 OpenAI 模型双双金牌。结构与材料上,**AlphaFold3**(蛋白—DNA/RNA/配体相互作用)、**GNoME**(新材料)、AlphaMissense、AlphaQubit、AlphaEvolve。再加自动化科研流水线(**AI Scientist**)。

**人物**:**Demis Hassabis & John Jumper**(2024 诺奖,AlphaFold);**David Baker**(2024 诺奖,蛋白设计);DeepMind 的 AlphaProof/AlphaGeometry 团队。

## 6. 智能的度量与本质:我们到底在造什么?

**背景**:当模型刷爆一个个 benchmark,"它真的更聪明了吗"成了元问题。需要能区分"记忆技能"与"流体智力"的新标尺。

**内容(前沿)**:**ARC-AGI** 系列——把智能定义为"在陌生任务上获取新技能的效率";ARC-AGI-2(2025)、ARC-AGI-3(2026)持续制造"人类easy、AI 难"的题。它和 Stanford AI Index 的"**锯齿状前沿**"(奥数金牌却读不准钟表)一起,提醒人们当前能力**参差而非均匀**(见 [07 · AI 科技前沿](/research/ai-safety-boundary/07-five-threads-ai-tech/) 线索四)。

**人物**:**François Chollet**(Keras 之父,《On the Measure of Intelligence》2019,ARC Prize 发起人)。

## 7. 基础与安全的学术化:教父们的转向

**背景**:登顶之后,几位奠基者把研究重心**从"造得更强"转向"造得安全/可控"**,把 AI 安全从工程话题抬成了学术议程。

**内容(前沿)**:**LawZero** 的"**Scientist AI**"——做**非智能体、无自身目标**、只做概率预测的安全 AI(与 [05 · 防御前沿](/research/ai-safety-boundary/05-defense-frontier-walls/) 的 GS AI 思路呼应);Russell 的辅助博弈 / CIRL(见 [02 · AI 安全中深刻的风险观点](/research/ai-safety-boundary/02-deep-risk-views/));SSI 把"安全的超级智能"当成唯一产品。

**人物**:**Geoffrey Hinton**(诺奖后成为最高调的风险警告者);**Yoshua Bengio**(创办非营利 LawZero,2025;主持《国际 AI 安全报告》);**Stuart Russell**(伯克利,assistance games);**Ilya Sutskever**(离开 OpenAI 创办 SSI,名言"我们正从 scaling 的时代,走向 research 的时代")。

---

## 人物地图:三条主线

学术前沿的"人"可以用三条线看清:

- **三位教父,三条路**(2018 图灵奖)。同一批人,如今分道扬镳:**Hinton** 警告末日、**Bengio** 转去造"安全设计"的 Scientist AI、**LeCun** 赌 LLM 是死路、押注世界模型。三条路恰好对应本系列的三种立场:风险([06 · 五条贯穿线索](/research/ai-safety-boundary/06-five-threads-safety-science/))、可控、与另辟能力新路。
- **OpenAI 离散(diaspora)**。一批核心研究者出走自立:**Sutskever → SSI**、**Mira Murati → Thinking Machines Lab**(携 John Schulman、Lilian Weng 等,产品 Tinker);前沿研究的重心,从大学实验室转移到了这些"实验室型公司"。
- **学界与产业合流**。今天最前沿的论文,大多出自 DeepMind、Anthropic、OpenAI 及其衍生体,而非传统院系——**"学术前沿"已经在很大程度上发生在公司内部**。这也正是 [06 · 五条贯穿线索](/research/ai-safety-boundary/06-five-threads-safety-science/) 线索一那个张力的根源:对象科学(可解释性)还没成熟,产业却已全速推进。

> 一句话定位整张图:**领域刚被基础科学追认,就立刻在"下一步"上分裂成几个互相竞争的命题——而每个命题背后,都站着一两位你叫得出名字的人。**

---

### 来源
- 奖项:2024 ACM 图灵奖(Sutton & Barto,2025-03 公布);2024 诺贝尔物理(Hopfield、Hinton)、化学(Hassabis、Jumper、Baker)
- 推理/RL:Wei et al. *Chain-of-Thought*(2022);DeepSeek-R1(Nature 2025);o 系列与 ARC-AGI-2
- 世界模型:Meta *V-JEPA 2*;World Labs(2026-02 融资 10 亿,Marble);LeCun AMI Labs
- 可解释性:Anthropic(Olah);DeepMind 机制可解释性(Nanda)
- 架构:*Mamba*(2023)、*Mamba-2 / SSD*(2024,Gu & Dao)
- AI for science:*AlphaProof*(Nature 2025)、*AlphaFold3*(2024)、GNoME;*The AI Scientist*
- 度量:Chollet *On the Measure of Intelligence*(2019);ARC Prize(ARC-AGI-2/3)
- 安全学术化:Bengio *LawZero / Scientist AI*(2025);Sutskever *SSI*;Russell *Human Compatible*

*相关笔记:[06 · 五条贯穿线索](/research/ai-safety-boundary/06-five-threads-safety-science/) · [07 · AI 科技前沿](/research/ai-safety-boundary/07-five-threads-ai-tech/) · [09 · 中国与世界 AI 对比](/research/ai-safety-boundary/09-china-vs-world/)*
