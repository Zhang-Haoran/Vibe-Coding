import { AssetCard, SkillCard, EventCard, CardRarity, AssetType, SkillType, EventType, MarketCondition, SkillActivation, EventTrigger } from '../types/cards';

// 卡牌工厂类
export class CardFactory {
	private static instance: CardFactory;
	private cardCounter = 0;

	private constructor() {}

	static getInstance(): CardFactory {
		if (!CardFactory.instance) {
			CardFactory.instance = new CardFactory();
		}
		return CardFactory.instance;
	}

	private generateId(): string {
		return `card-${++this.cardCounter}`;
	}

	// 创建资产卡
	createAssetCard(config: Partial<AssetCard>): AssetCard {
		const defaultCard: AssetCard = {
			id: this.generateId(),
			name: '未知资产',
			description: '这是一个资产卡',
			rarity: CardRarity.COMMON,
			cost: 10,
			type: 'asset',
			assetType: AssetType.STOCK,
			baseReturn: 5.0,
			baseRisk: 5,
			volatility: 5,
			correlation: [],
			marketCondition: MarketCondition.STABLE,
			effects: []
		};

		return { ...defaultCard, ...config };
	}

	// 创建技能卡
	createSkillCard(config: Partial<SkillCard>): SkillCard {
		const defaultCard: SkillCard = {
			id: this.generateId(),
			name: '未知技能',
			description: '这是一个技能卡',
			rarity: CardRarity.COMMON,
			cost: 15,
			type: 'skill',
			skillType: SkillType.DIVERSIFICATION,
			activation: SkillActivation.ON_PLAY,
			effects: []
		};

		return { ...defaultCard, ...config };
	}

	// 创建事件卡
	createEventCard(config: Partial<EventCard>): EventCard {
		const defaultCard: EventCard = {
			id: this.generateId(),
			name: '未知事件',
			description: '这是一个事件卡',
			rarity: CardRarity.COMMON,
			cost: 0,
			type: 'event',
			eventType: EventType.MARKET_CRASH,
			trigger: EventTrigger.IMMEDIATE,
			effects: []
		};

		return { ...defaultCard, ...config };
	}

	// 生成预设的资产卡
	generatePresetAssetCards(): AssetCard[] {
		return [
			// 股票类
			this.createAssetCard({
				name: '科技股',
				description: '高科技公司股票，高收益高风险',
				rarity: CardRarity.UNCOMMON,
				cost: 40,
				assetType: AssetType.STOCK,
				baseReturn: 8.5,
				baseRisk: 7,
				volatility: 8,
				marketCondition: MarketCondition.BULL_MARKET,
				correlation: [
					{ assetType: AssetType.CRYPTO, correlation: 0.6 },
					{ assetType: AssetType.GOLD, correlation: -0.3 }
				]
			}),
			this.createAssetCard({
				name: '蓝筹股',
				description: '稳定的大型公司股票，中等收益风险',
				rarity: CardRarity.COMMON,
				cost: 35,
				assetType: AssetType.STOCK,
				baseReturn: 6.0,
				baseRisk: 5,
				volatility: 6,
				marketCondition: MarketCondition.STABLE,
				correlation: [
					{ assetType: AssetType.BOND, correlation: -0.2 },
					{ assetType: AssetType.ETF, correlation: 0.8 }
				]
			}),
			// 债券类
			this.createAssetCard({
				name: '政府债券',
				description: '低风险政府债券，稳定收益',
				rarity: CardRarity.COMMON,
				cost: 15,
				assetType: AssetType.BOND,
				baseReturn: 3.2,
				baseRisk: 2,
				volatility: 2,
				marketCondition: MarketCondition.STABLE,
				correlation: [
					{ assetType: AssetType.STOCK, correlation: -0.2 },
					{ assetType: AssetType.GOLD, correlation: 0.1 }
				]
			}),
			// ETF类
			this.createAssetCard({
				name: '指数ETF',
				description: '跟踪市场指数的ETF，分散风险',
				rarity: CardRarity.COMMON,
				cost: 25,
				assetType: AssetType.ETF,
				baseReturn: 7.0,
				baseRisk: 4,
				volatility: 5,
				marketCondition: MarketCondition.STABLE,
				correlation: [
					{ assetType: AssetType.STOCK, correlation: 0.8 },
					{ assetType: AssetType.BOND, correlation: -0.1 }
				]
			}),
			// 黄金
			this.createAssetCard({
				name: '黄金',
				description: '避险资产，在危机中表现良好',
				rarity: CardRarity.UNCOMMON,
				cost: 30,
				assetType: AssetType.GOLD,
				baseReturn: 4.5,
				baseRisk: 3,
				volatility: 4,
				marketCondition: MarketCondition.CRISIS,
				correlation: [
					{ assetType: AssetType.STOCK, correlation: -0.3 },
					{ assetType: AssetType.CRYPTO, correlation: 0.2 }
				]
			}),
			// 稳定币
			this.createAssetCard({
				name: '稳定币',
				description: '价格稳定的数字货币',
				rarity: CardRarity.COMMON,
				cost: 10,
				assetType: AssetType.STABLECOIN,
				baseReturn: 2.0,
				baseRisk: 1,
				volatility: 1,
				marketCondition: MarketCondition.STABLE,
				correlation: [
					{ assetType: AssetType.STOCK, correlation: 0.0 },
					{ assetType: AssetType.BOND, correlation: 0.0 }
				]
			}),
			// 加密资产
			this.createAssetCard({
				name: '比特币',
				description: '高风险高收益的加密资产',
				rarity: CardRarity.RARE,
				cost: 60,
				assetType: AssetType.CRYPTO,
				baseReturn: 12.0,
				baseRisk: 9,
				volatility: 10,
				marketCondition: MarketCondition.VOLATILE,
				correlation: [
					{ assetType: AssetType.STOCK, correlation: 0.6 },
					{ assetType: AssetType.GOLD, correlation: 0.2 }
				]
			})
		];
	}

	// 生成预设的技能卡
	generatePresetSkillCards(): SkillCard[] {
		return [
			this.createSkillCard({
				name: '分散配置',
				description: '降低投资组合集中度，分散风险',
				rarity: CardRarity.COMMON,
				cost: 20,
				skillType: SkillType.DIVERSIFICATION,
				activation: SkillActivation.ON_PLAY,
				effects: [
					{
						type: 'buff',
						target: 'self',
						value: 2,
						condition: 'portfolio_diversification'
					}
				]
			}),
			this.createSkillCard({
				name: '止损策略',
				description: '在亏损时及时止损，控制风险',
				rarity: CardRarity.UNCOMMON,
				cost: 25,
				skillType: SkillType.STOP_LOSS,
				activation: SkillActivation.ON_DAMAGE,
				effects: [
					{
						type: 'heal',
						target: 'self',
						value: 3,
						condition: 'damage_taken'
					}
				]
			}),
			this.createSkillCard({
				name: '再平衡',
				description: '调整资产配置比例，保持目标分配',
				rarity: CardRarity.COMMON,
				cost: 15,
				skillType: SkillType.REBALANCE,
				activation: SkillActivation.ON_TURN_END,
				effects: [
					{
						type: 'buff',
						target: 'self',
						value: 1,
						condition: 'portfolio_imbalance'
					}
				]
			}),
			this.createSkillCard({
				name: '长期持有',
				description: '长期投资策略，获得复利收益',
				rarity: CardRarity.UNCOMMON,
				cost: 30,
				skillType: SkillType.LONG_TERM,
				activation: SkillActivation.ON_TURN_END,
				effects: [
					{
						type: 'buff',
						target: 'self',
						value: 1,
						condition: 'long_term_hold'
					}
				]
			}),
			this.createSkillCard({
				name: '对冲策略',
				description: '使用相关资产对冲风险',
				rarity: CardRarity.RARE,
				cost: 35,
				skillType: SkillType.HEDGE,
				activation: SkillActivation.ON_PLAY,
				effects: [
					{
						type: 'debuff',
						target: 'enemy',
						value: 2,
						condition: 'enemy_attack'
					}
				]
			})
		];
	}

	// 生成预设的事件卡
	generatePresetEventCards(): EventCard[] {
		return [
			this.createEventCard({
				name: '牛市狂奔',
				description: '市场情绪高涨，股票类资产收益提升',
				rarity: CardRarity.UNCOMMON,
				eventType: EventType.BULL_RUN,
				trigger: EventTrigger.ON_TURN_START,
				duration: 3,
				effects: [
					{
						type: 'asset_modifier',
						target: 'specific_asset',
						modifier: 1.5,
						condition: 'asset_type_stock'
					}
				]
			}),
			this.createEventCard({
				name: '金融危机',
				description: '市场恐慌，高风险资产大幅下跌',
				rarity: CardRarity.RARE,
				eventType: EventType.ECONOMIC_CRISIS,
				trigger: EventTrigger.ON_TURN_START,
				duration: 2,
				effects: [
					{
						type: 'asset_modifier',
						target: 'specific_asset',
						modifier: 0.5,
						condition: 'asset_type_crypto'
					}
				]
			}),
			this.createEventCard({
				name: '通胀飙升',
				description: '通货膨胀加剧，现金贬值',
				rarity: CardRarity.UNCOMMON,
				eventType: EventType.INFLATION_SPIKE,
				trigger: EventTrigger.ON_TURN_START,
				duration: 2,
				effects: [
					{
						type: 'asset_modifier',
						target: 'specific_asset',
						modifier: 1.3,
						condition: 'asset_type_gold'
					}
				]
			})
		];
	}

	// 生成所有预设卡牌
	generateAllPresetCards(): { assetCards: AssetCard[], skillCards: SkillCard[], eventCards: EventCard[] } {
		return {
			assetCards: this.generatePresetAssetCards(),
			skillCards: this.generatePresetSkillCards(),
			eventCards: this.generatePresetEventCards()
		};
	}
}

// 导出单例实例
export const cardFactory = CardFactory.getInstance();
