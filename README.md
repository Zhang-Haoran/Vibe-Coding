# Claude AI Assistant Rules and Commands

Claude AI 助手规则和命令的完整集合，用于指导 AI 处理各种开发任务。

## 📁 项目结构

```
Vibe-Coding/
├── CLAUDE.md                    # 主配置文件
├── global-rules/               # 全局规则
└── project-rules/             # 项目命令
    ├── 16个.mdc文件            # 各种开发命令
```

## 🚀 可用命令总览

| 命令 | 类型 | 用途 | 主要功能 |
|------|------|------|----------|
| `/analyze-issue` | 📊 分析 | GitHub问题分析 | 获取问题详情并创建实现规范 |
| `/five` | 📊 分析 | 五个为什么分析 | 根本原因分析技术 |
| `/code-analysis` | 📊 分析 | 高级代码分析 | 6种分析选项（质量、性能、安全等） |
| `/context-prime` | 📊 分析 | 项目上下文加载 | 理解项目结构和配置 |
| `/implement-task` | 🔧 实现 | 任务实现 | 有条理的任务实现方法 |
| `/bug-fix` | 🔧 实现 | Bug修复工作流 | 从问题到PR的完整流程 |
| `/create-docs` | 🔧 实现 | 文档生成 | 创建全面的组件文档 |
| `/mermaid` | 🔧 实现 | 图表生成 | 生成各种Mermaid图表 |
| `/check` | 🎯 质量 | 代码质量检查 | 运行linting、测试、安全检查 |
| `/clean` | 🎯 质量 | 代码格式化 | 修复格式和质量问题 |
| `/commit` | 🎯 质量 | 结构化提交 | 带表情符号的规范提交 |
| `/commit-fast` | 🎯 质量 | 快速提交 | 自动选择第一个提交建议 |
| `/pr-review` | 🎯 质量 | PR审查 | 从6个角色视角审查代码 |
| `/add-to-changelog` | 📝 文档 | 变更日志管理 | 更新CHANGELOG.md |
| `/update-docs` | 📝 文档 | 文档更新 | 生成LLM优化的文档 |
| `/github-issue-creation` | 📝 文档 | 问题创建 | 创建结构化GitHub问题 |
| `/create-command` | 🔄 系统 | 命令创建指南 | 创建新的Claude命令 |
| `/continuous-improvement` | 🔄 系统 | 持续改进 | 改进AI助手规则的系统方法 |
| `/cursor-rules-meta-guide` | 🔄 系统 | Cursor规则管理 | 创建和维护Cursor规则 |

## 💡 快速使用指南

### 分析类命令 📊
- **问题分析**: `/analyze-issue` → 创建实现规范
- **根本原因**: `/five` → 五个为什么分析法
- **代码评估**: `/code-analysis` → 质量、性能、安全分析
- **项目理解**: `/context-prime` → 加载项目上下文

### 实现类命令 🔧  
- **任务实现**: `/implement-task` → 有计划的实现方法
- **Bug修复**: `/bug-fix` → 完整的修复工作流
- **文档创建**: `/create-docs` → 生成完整文档
- **图表生成**: `/mermaid` → 各种可视化图表

### 质量类命令 🎯
- **代码检查**: `/check` → 运行所有质量检查
- **代码格式**: `/clean` → 修复格式问题
- **标准提交**: `/commit` → 规范的Git提交
- **快速提交**: `/commit-fast` → 自动化提交
- **代码审查**: `/pr-review` → 多角度PR审查

### 文档类命令 📝
- **变更日志**: `/add-to-changelog <version> <type> <message>`
- **项目文档**: `/update-docs` → 生成7个文档文件
- **问题创建**: `/github-issue-creation` → 标准化问题

### 系统类命令 🔄
- **创建命令**: `/create-command` → 新命令开发指南
- **持续改进**: `/continuous-improvement` → 规则改进系统
- **规则管理**: `/cursor-rules-meta-guide` → Cursor规则

## ⚡ 提交类型参考

| 表情符号 | 类型 | 说明 |
|---------|------|------|
| ✨ | feat | 新功能 |
| 🐛 | fix | Bug修复 |
| 📝 | docs | 文档更改 |
| ♻️ | refactor | 代码重构 |
| 🎨 | style | 代码格式 |
| ⚡️ | perf | 性能改进 |
| ✅ | test | 测试相关 |
| 🧑‍💻 | chore | 工具维护 |

## 🛠️ 最佳实践

- 复杂任务使用todo列表跟踪进度
- 遵循规范提交格式
- 提交前运行代码检查
- 优先使用TDD方法
- 记录架构决策
- 多角度代码审查