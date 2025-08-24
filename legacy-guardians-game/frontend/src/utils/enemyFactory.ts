import { Enemy, EnemyAbility } from '../types/game';

export class EnemyFactory {
	private static instance: EnemyFactory;
	private enemyTemplates: Map<string, Partial<Enemy>>;

	private constructor() {
		this.enemyTemplates = new Map();
		this.initializeEnemyTemplates();
	}

	public static getInstance(): EnemyFactory {
		if (!EnemyFactory.instance) {
			EnemyFactory.instance = new EnemyFactory();
		}
		return EnemyFactory.instance;
	}

	// 初始化敌人模板
	private initializeEnemyTemplates(): void {
		// 普通敌人模板
		this.enemyTemplates.set('market_volatility', {
			name: '市场波动',
			description: '市场的不确定性带来的挑战',
			weaknesses: ['diversification', 'long_term'],
			resistances: ['short_term'],
			abilities: [
				{
					id: 'volatility_attack',
					name: '波动冲击',
					description: '造成随机伤害',
					effect: 'random_damage',
					damage: 15,
					cooldown: 2,
					currentCooldown: 0
				}
			]
		});

		this.enemyTemplates.set('inflation', {
			name: '通货膨胀',
			description: '货币贬值带来的威胁',
			weaknesses: ['inflation_protection', 'real_assets'],
			resistances: ['cash'],
			abilities: [
				{
					id: 'inflation_drain',
					name: '通胀侵蚀',
					description: '持续造成伤害',
					effect: 'dot_damage',
					damage: 8,
					cooldown: 1,
					currentCooldown: 0
				}
			]
		});

		this.enemyTemplates.set('recession', {
			name: '经济衰退',
			description: '经济下行带来的系统性风险',
			weaknesses: ['defensive_stocks', 'bonds'],
			resistances: ['cyclical_stocks'],
			abilities: [
				{
					id: 'recession_impact',
					name: '衰退冲击',
					description: '大幅降低玩家属性',
					effect: 'debuff',
					damage: 20,
					cooldown: 3,
					currentCooldown: 0
				}
			]
		});

		// Boss敌人模板
		this.enemyTemplates.set('financial_crisis', {
			name: '金融危机',
			description: '最危险的敌人，需要多种策略应对',
			weaknesses: ['diversification', 'hedge', 'long_term'],
			resistances: ['single_asset', 'leverage'],
			abilities: [
				{
					id: 'crisis_wave',
					name: '危机浪潮',
					description: '造成大量伤害并降低防御',
					effect: 'heavy_damage_debuff',
					damage: 30,
					cooldown: 2,
					currentCooldown: 0
				},
				{
					id: 'panic_spread',
					name: '恐慌蔓延',
					description: '持续造成伤害',
					effect: 'continuous_damage',
					damage: 12,
					cooldown: 1,
					currentCooldown: 0
				}
			]
		});

		this.enemyTemplates.set('market_crash', {
			name: '市场崩盘',
			description: '突然的市场崩溃，需要快速反应',
			weaknesses: ['stop_loss', 'defensive_position'],
			resistances: ['aggressive_growth'],
			abilities: [
				{
					id: 'crash_impact',
					name: '崩盘冲击',
					description: '造成巨额伤害',
					effect: 'massive_damage',
					damage: 40,
					cooldown: 4,
					currentCooldown: 0
				},
				{
					id: 'fear_aura',
					name: '恐惧光环',
					description: '降低玩家攻击力',
					effect: 'attack_debuff',
					damage: 0,
					cooldown: 2,
					currentCooldown: 0
				}
			]
		});
	}

	// 创建普通敌人
	createNormalEnemy(level: number, type: string = 'random'): Enemy {
		const template = this.getRandomTemplate(type);
		const baseStats = this.calculateBaseStats(level);
		
		return {
			id: this.generateEnemyId(),
			name: template.name || '未知敌人',
			level: level,
			health: baseStats.health,
			maxHealth: baseStats.health,
			attack: baseStats.attack,
			defense: baseStats.defense,
			abilities: this.cloneAbilities(template.abilities || []),
			weaknesses: template.weaknesses || [],
			resistances: template.resistances || [],
			description: template.description || '一个神秘的敌人',
			imageUrl: template.imageUrl
		};
	}

	// 创建Boss敌人
	createBossEnemy(level: number, bossType: string = 'random'): Enemy {
		const bossTemplates = ['financial_crisis', 'market_crash'];
		const templateType = bossType === 'random' 
			? bossTemplates[Math.floor(Math.random() * bossTemplates.length)]
			: bossType;
		
		const template = this.enemyTemplates.get(templateType);
		if (!template) {
			throw new Error(`Boss模板 ${templateType} 不存在`);
		}

		const bossStats = this.calculateBossStats(level);
		
		return {
			id: this.generateEnemyId(),
			name: template.name || 'Boss敌人',
			level: level,
			health: bossStats.health,
			maxHealth: bossStats.health,
			attack: bossStats.attack,
			defense: bossStats.defense,
			abilities: this.cloneAbilities(template.abilities || []),
			weaknesses: template.weaknesses || [],
			resistances: template.resistances || [],
			description: template.description || '一个强大的Boss敌人',
			imageUrl: template.imageUrl
		};
	}

	// 获取随机模板
	private getRandomTemplate(type: string): Partial<Enemy> {
		if (type === 'random') {
			const normalTemplates = ['market_volatility', 'inflation', 'recession'];
			const randomType = normalTemplates[Math.floor(Math.random() * normalTemplates.length)];
			return this.enemyTemplates.get(randomType) || {};
		}
		return this.enemyTemplates.get(type) || {};
	}

	// 计算基础属性
	private calculateBaseStats(level: number): { health: number; attack: number; defense: number } {
		return {
			health: 50 + (level * 15),
			attack: 10 + (level * 3),
			defense: 5 + (level * 2)
		};
	}

	// 计算Boss属性
	private calculateBossStats(level: number): { health: number; attack: number; defense: number } {
		return {
			health: 100 + (level * 25),
			attack: 20 + (level * 5),
			defense: 10 + (level * 3)
		};
	}

	// 克隆能力数组
	private cloneAbilities(abilities: EnemyAbility[]): EnemyAbility[] {
		return abilities.map(ability => ({
			...ability,
			currentCooldown: 0
		}));
	}

	// 生成敌人ID
	private generateEnemyId(): string {
		return `enemy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	// 根据关卡生成敌人
	generateEnemyForLevel(level: number): Enemy {
		// 每5关出现一个Boss
		if (level % 5 === 0) {
			return this.createBossEnemy(level);
		}
		
		// 普通关卡生成普通敌人
		return this.createNormalEnemy(level);
	}

	// 获取敌人弱点描述
	getWeaknessDescription(weaknesses: string[]): string {
		const weaknessMap: Record<string, string> = {
			'diversification': '多样化投资',
			'long_term': '长期持有',
			'inflation_protection': '通胀保护',
			'real_assets': '实物资产',
			'defensive_stocks': '防御性股票',
			'bonds': '债券投资',
			'stop_loss': '止损策略',
			'defensive_position': '防御性仓位',
			'hedge': '对冲策略'
		};

		return weaknesses
			.map(weakness => weaknessMap[weakness] || weakness)
			.join('、');
	}

	// 获取敌人抗性描述
	getResistanceDescription(resistances: string[]): string {
		const resistanceMap: Record<string, string> = {
			'short_term': '短期交易',
			'cash': '现金持有',
			'cyclical_stocks': '周期性股票',
			'single_asset': '单一资产',
			'leverage': '杠杆投资',
			'aggressive_growth': '激进增长'
		};

		return resistances
			.map(resistance => resistanceMap[resistance] || resistance)
			.join('、');
	}

	// 获取所有敌人类型
	getAllEnemyTypes(): string[] {
		return Array.from(this.enemyTemplates.keys());
	}

	// 获取敌人模板信息
	getEnemyTemplateInfo(type: string): Partial<Enemy> | null {
		return this.enemyTemplates.get(type) || null;
	}
}
