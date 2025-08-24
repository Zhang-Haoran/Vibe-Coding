// 卡牌基础类型
export interface BaseCard {
	id: string;
	name: string;
	description: string;
	imageUrl?: string;
	rarity: CardRarity;
	cost: number; // 探险币成本
}

// 卡牌稀有度
export enum CardRarity {
	COMMON = 'common',
	UNCOMMON = 'uncommon',
	RARE = 'rare',
	EPIC = 'epic',
	LEGENDARY = 'legendary'
}

// 资产卡类型
export interface AssetCard extends BaseCard {
	type: 'asset';
	assetType: AssetType;
	baseReturn: number; // 基础收益率 (%)
	baseRisk: number;   // 基础风险等级 (1-10)
	volatility: number; // 波动性 (1-10)
	correlation: AssetCorrelation[]; // 与其他资产的相关性
	marketCondition: MarketCondition; // 市场条件偏好
	effects: AssetEffect[];
}

// 资产类型
export enum AssetType {
	STOCK = 'stock',           // 股票
	BOND = 'bond',             // 债券
	ETF = 'etf',               // ETF
	GOLD = 'gold',             // 黄金
	STABLECOIN = 'stablecoin', // 稳定币
	INCOME = 'income',         // 收益类资产
	CRYPTO = 'crypto',         // 加密资产
	REAL_ESTATE = 'real_estate', // 房地产
	COMMODITY = 'commodity'    // 大宗商品
}

// 市场条件
export enum MarketCondition {
	BULL_MARKET = 'bull_market',     // 牛市
	BEAR_MARKET = 'bear_market',     // 熊市
	INFLATION = 'inflation',         // 通胀
	DEFLATION = 'deflation',         // 通缩
	CRISIS = 'crisis',               // 危机
	STABLE = 'stable',               // 稳定
	VOLATILE = 'volatile'            // 波动
}

// 资产相关性
export interface AssetCorrelation {
	assetType: AssetType;
	correlation: number; // -1 到 1 之间
}

// 资产效果
export interface AssetEffect {
	type: 'buff' | 'debuff';
	condition: string;
	effect: string;
	value: number;
}

// 技能卡类型
export interface SkillCard extends BaseCard {
	type: 'skill';
	skillType: SkillType;
	activation: SkillActivation;
	effects: SkillEffect[];
	cooldown?: number; // 冷却回合数
}

// 技能类型
export enum SkillType {
	DIVERSIFICATION = 'diversification', // 分散配置
	STOP_LOSS = 'stop_loss',             // 止损
	REBALANCE = 'rebalance',             // 再平衡
	LONG_TERM = 'long_term',             // 长期持有
	HEDGE = 'hedge',                     // 对冲
	ARBITRAGE = 'arbitrage',             // 套利
	MOMENTUM = 'momentum',               // 动量策略
	VALUE = 'value'                      // 价值投资
}

// 技能激活条件
export enum SkillActivation {
	IMMEDIATE = 'immediate',     // 立即生效
	ON_PLAY = 'on_play',        // 打出时生效
	ON_TURN_END = 'on_turn_end', // 回合结束时生效
	ON_DAMAGE = 'on_damage',     // 受到伤害时生效
	ON_GAIN = 'on_gain'         // 获得收益时生效
}

// 技能效果
export interface SkillEffect {
	type: 'damage' | 'heal' | 'buff' | 'debuff' | 'draw' | 'energy';
	target: 'self' | 'enemy' | 'all' | 'random';
	value: number;
	condition?: string;
}

// 事件卡类型
export interface EventCard extends BaseCard {
	type: 'event';
	eventType: EventType;
	trigger: EventTrigger;
	effects: EventEffect[];
	duration?: number; // 持续回合数
}

// 事件类型
export enum EventType {
	MARKET_CRASH = 'market_crash',     // 市场崩盘
	BULL_RUN = 'bull_run',             // 牛市狂奔
	INFLATION_SPIKE = 'inflation_spike', // 通胀飙升
	INTEREST_RATE_CHANGE = 'interest_rate_change', // 利率变化
	REGULATORY_CHANGE = 'regulatory_change', // 监管变化
	ECONOMIC_CRISIS = 'economic_crisis', // 经济危机
	TECH_BUBBLE = 'tech_bubble',       // 科技泡沫
	RECESSION = 'recession'            // 经济衰退
}

// 事件触发条件
export enum EventTrigger {
	IMMEDIATE = 'immediate',     // 立即触发
	ON_TURN_START = 'on_turn_start', // 回合开始时触发
	ON_TURN_END = 'on_turn_end',     // 回合结束时触发
	ON_CONDITION = 'on_condition',   // 满足条件时触发
	RANDOM = 'random'           // 随机触发
}

// 事件效果
export interface EventEffect {
	type: 'market_change' | 'asset_modifier' | 'player_modifier' | 'enemy_modifier';
	target: 'all_assets' | 'specific_asset' | 'player' | 'enemy';
	modifier: number; // 修改值
	condition?: string;
}

// 卡牌集合类型
export type Card = AssetCard | SkillCard | EventCard;

// 手牌类型
export interface Hand {
	assetCards: AssetCard[];
	skillCards: SkillCard[];
	maxSize: number;
}

// 牌组类型
export interface Deck {
	id: string;
	name: string;
	cards: Card[];
	maxSize: number;
}

// 卡牌工厂函数类型
export interface CardFactory {
	createAssetCard: (config: Partial<AssetCard>) => AssetCard;
	createSkillCard: (config: Partial<SkillCard>) => SkillCard;
	createEventCard: (config: Partial<EventCard>) => EventCard;
}
