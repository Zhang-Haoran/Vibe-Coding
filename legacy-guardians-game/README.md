# 🎮 财富守护者：卡牌远征 (Legacy Guardians: Card Quest)

## 📋 项目概述

**财富守护者：卡牌远征** 是一款结合卡牌构筑 (Deck-building) 与财商教育的 Roguelike 游戏，灵感来自《小丑牌》与《杀戮尖塔》。

### 🎯 核心价值
- 让青少年 (12–18 岁) 在安全环境下体验投资思维
- 游戏化学习财务概念：组合、风险、分散、长期价值
- 家长端提供控制与报告，保证教育性与合规性

### 🎮 游戏特色
- **双槽卡牌系统**：资产卡 + 技能卡，模拟投资工具与策略
- **Roguelike 地图**：分岔路径，挑战市场危机与 Boss 战
- **探险币机制**：有限预算管理，培养资金分配意识
- **AI 教练**：友好角色提供投资组合解释与情绪疏导
- **家长控制端**：额度管理、风险等级控制、学习报告

## 🚀 技术架构

### 前端 (React + TypeScript)
- **框架**: React 18 + TypeScript
- **状态管理**: Zustand
- **UI 组件**: Shadcn UI + Radix UI
- **样式**: Tailwind CSS
- **图表**: Chart.js / Recharts
- **动画**: Framer Motion

### 后端 (Python + FastAPI)
- **框架**: FastAPI
- **数据库**: SQLite (开发) / PostgreSQL (生产)
- **ORM**: SQLAlchemy
- **数据模拟**: yfinance, CoinGecko API
- **AI 模块**: OpenAI API / 本地 LLM

### 数据架构
- **资产数据**: 股票、债券、ETF、黄金、稳定币、加密资产
- **市场事件**: 牛市/熊市、通胀、金融危机等
- **技能系统**: 止损、分散配置、再平衡、长期持有

## 📁 项目结构

```
legacy-guardians-game/
├── frontend/                 # React 前端应用
│   ├── src/
│   │   ├── components/      # 游戏组件
│   │   ├── hooks/          # 自定义 Hooks
│   │   ├── stores/         # 状态管理
│   │   ├── types/          # TypeScript 类型定义
│   │   └── utils/          # 工具函数
│   ├── public/             # 静态资源
│   └── package.json        # 前端依赖
├── backend/                 # Python 后端服务
│   ├── app/
│   │   ├── models/         # 数据模型
│   │   ├── routes/         # API 路由
│   │   ├── services/       # 业务逻辑
│   │   └── utils/          # 工具函数
│   ├── requirements.txt    # Python 依赖
│   └── main.py             # 应用入口
├── docs/                   # 项目文档
├── assets/                 # 游戏资源
└── README.md               # 项目说明
```

## 🛠️ 安装与运行

### 前端开发
```bash
cd frontend
npm install
npm run dev
```

### 后端开发
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 环境要求
- Node.js 18+
- Python 3.9+
- Git

## 🎯 MVP 开发计划

### 阶段1: 项目初始化与基础架构 ✅
- [x] 创建项目结构
- [x] 设置开发环境
- [ ] 配置构建工具

### 阶段2: 核心卡牌系统
- [ ] 卡牌数据模型
- [ ] 抽牌与出牌逻辑
- [ ] 资产与技能卡配合

### 阶段3: 游戏循环与战斗机制
- [ ] 回合系统
- [ ] Boss 战机制
- [ ] 收益计算

### 阶段4: 地图系统与关卡设计
- [ ] 分岔路径地图
- [ ] 节点类型实现
- [ ] 关卡进度管理

### 阶段5: AI 教练与家长端
- [ ] AI 对话系统
- [ ] 家长控制面板
- [ ] 学习报告生成

### 阶段6: 集成测试与优化
- [ ] 端到端测试
- [ ] 性能优化
- [ ] 部署准备

## 📊 成功指标

- **教育效果**: 玩家能理解分散投资与风险概念
- **留存度**: >50% 玩家完成 3 轮以上关卡
- **家长认可**: ≥70% 正面反馈
- **技术可扩展性**: 可无缝接入更多资产/事件

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系我们

- 项目主页: [GitHub Repository]
- 问题反馈: [Issues]
- 功能建议: [Discussions]

---

**让财商教育变得有趣而有效！** 🎓💰
