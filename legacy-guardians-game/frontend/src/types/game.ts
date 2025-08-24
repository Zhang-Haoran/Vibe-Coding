import { Card, AssetCard, SkillCard, EventCard } from './cards';

// 玩家状态
export interface Player {
	id: string;
	name: string;
	level: number;
	experience: number;
	health: number;
	maxHealth: number;
	adventureCoins: number; // 探险币
	maxAdventureCoins: number;
	riskLevel: RiskLevel;
	portfolio: Portfolio;
	achievements: Achievement[];
	learningProgress: LearningProgress;
}

// 风险等级
export enum RiskLevel {
	LOW = 'low',       // 低风险：储蓄、ETF、债券、稳定币
	MEDIUM = 'medium', // 中风险：股票、黄金、部分收益类资产
	HIGH = 'high'      // 高风险：加密资产、创业投资等
}

// 投资组合
export interface Portfolio {
	assets: PortfolioAsset[];
	totalValue: number;
	totalReturn: number;
	riskScore: number;
	diversificationScore: number;
	lastRebalanced: Date;
}

// 组合资产
export interface PortfolioAsset {
	card: AssetCard;
	quantity: number;
	investedAmount: number; // 投入的探险币
	currentValue: number;
	return: number;
	risk: number;
	effects: AssetEffect[];
}

// 资产效果
export interface AssetEffect {
	type: 'buff' | 'debuff';
	source: string;
	value: number;
	duration: number;
	remainingTurns: number;
}

// 成就系统
export interface Achievement {
	id: string;
	name: string;
	description: string;
	icon: string;
	unlockedAt?: Date;
	progress: number;
	maxProgress: number;
	rewards: Reward[];
}

// 奖励
export interface Reward {
	type: 'coins' | 'cards' | 'experience' | 'badge';
	value: number;
	description: string;
}

// 学习进度
export interface LearningProgress {
	completedLessons: string[];
	currentLesson?: string;
	quizScores: Record<string, number>;
	badges: Badge[];
}

// 徽章
export interface Badge {
	id: string;
	name: string;
	description: string;
	icon: string;
	earnedAt: Date;
	category: BadgeCategory;
}

// 徽章类别
export enum BadgeCategory {
	INVESTMENT = 'investment',     // 投资相关
	RISK_MANAGEMENT = 'risk_management', // 风险管理
	DIVERSIFICATION = 'diversification', // 分散配置
	LONG_TERM = 'long_term',      // 长期投资
	EDUCATION = 'education'       // 学习成就
}

// 游戏回合
export interface GameTurn {
	turnNumber: number;
	phase: TurnPhase;
	playerActions: PlayerAction[];
	marketEvents: MarketEvent[];
	enemyActions: EnemyAction[];
	results: TurnResults;
}

// 回合阶段
export enum TurnPhase {
	DRAW = 'draw',           // 抽牌阶段
	PLAY = 'play',           // 出牌阶段
	EVENT = 'event',         // 事件阶段
	RESOLUTION = 'resolution', // 结算阶段
	REWARD = 'reward'        // 奖励阶段
}

// 玩家行动
export interface PlayerAction {
	type: 'play_card' | 'use_skill' | 'end_turn';
	card?: Card;
	target?: string;
	timestamp: Date;
}

// 市场事件
export interface MarketEvent {
	type: EventType;
	description: string;
	effects: EventEffect[];
	duration: number;
	remainingTurns: number;
}

// 敌人行动
export interface EnemyAction {
	type: 'attack' | 'buff' | 'debuff' | 'special';
	description: string;
	effects: EventEffect[];
}

// 回合结果
export interface TurnResults {
	playerHealthChange: number;
	enemyHealthChange: number;
	portfolioReturn: number;
	coinsEarned: number;
	experienceGained: number;
	achievementsUnlocked: string[];
}

// 敌人/Boss
export interface Enemy {
	id: string;
	name: string;
	description: string;
	health: number;
	maxHealth: number;
	attack: number;
	defense: number;
	abilities: EnemyAbility[];
	phase: EnemyPhase;
	rewards: Reward[];
}

// 敌人能力
export interface EnemyAbility {
	name: string;
	description: string;
	damage: number;
	effects: EventEffect[];
	cooldown: number;
	currentCooldown: number;
}

// 敌人阶段
export enum EnemyPhase {
	NORMAL = 'normal',       // 正常状态
	ENRAGED = 'enraged',     // 愤怒状态
	VULNERABLE = 'vulnerable', // 脆弱状态
	ULTIMATE = 'ultimate'    // 终极状态
}

// 地图节点
export interface MapNode {
	id: string;
	type: NodeType;
	name: string;
	description: string;
	position: { x: number; y: number };
	connections: string[]; // 连接的节点ID
	completed: boolean;
	rewards?: Reward[];
	requirements?: NodeRequirement[];
}

// 节点类型
export enum NodeType {
	MARKET = 'market',       // 市场挑战点
	TREASURE = 'treasure',   // 宝藏点
	LEARNING = 'learning',   // 学习点
	RANDOM = 'random',       // 随机事件点
	BOSS = 'boss',           // Boss点
	REST = 'rest'            // 休息点
}

// 节点要求
export interface NodeRequirement {
	type: 'level' | 'achievement' | 'item' | 'skill';
	value: any;
	description: string;
}

// 游戏状态
export interface GameState {
	player: Player;
	currentTurn: GameTurn;
	enemy?: Enemy;
	map: MapNode[];
	currentNode: string;
	gamePhase: GamePhase;
	history: GameHistory[];
	settings: GameSettings;
	turnState: TurnState;
	battleState: BattleState;
	actionPointSystem: ActionPointSystem;
	gameLoopState: GameLoopState;
}

// 游戏阶段
export enum GamePhase {
	PREPARE = 'prepare',      // 准备阶段
	DRAW = 'draw',            // 抽牌阶段
	ACTION = 'action',        // 行动阶段
	EVENT = 'event',          // 事件阶段
	RESOLUTION = 'resolution', // 结算阶段
	REWARD = 'reward'         // 奖励阶段
}

// 游戏回合状态
export interface TurnState {
	currentTurn: number;
	currentPhase: GamePhase;
	actionPoints: number;
	maxActionPoints: number;
	phaseTimeRemaining: number;
	isPlayerTurn: boolean;
}

// 战斗状态
export interface BattleState {
	isInBattle: boolean;
	enemy: Enemy | null;
	battleRound: number;
	playerHealth: number;
	enemyHealth: number;
	battleActions: BattleAction[];
	battleRewards: BattleReward[];
}

// 敌人类型
export interface Enemy {
	id: string;
	name: string;
	level: number;
	health: number;
	maxHealth: number;
	attack: number;
	defense: number;
	abilities: EnemyAbility[];
	weaknesses: string[];
	resistances: string[];
	description: string;
	imageUrl?: string;
}

// 敌人能力
export interface EnemyAbility {
	id: string;
	name: string;
	description: string;
	effect: string;
	damage: number;
	cooldown: number;
	currentCooldown: number;
}

// 战斗行动
export interface BattleAction {
	id: string;
	type: 'attack' | 'defend' | 'skill' | 'item';
	cardId?: string;
	damage: number;
	healing: number;
	effects: string[];
	timestamp: number;
}

// 战斗奖励
export interface BattleReward {
	type: 'coins' | 'cards' | 'experience' | 'items';
	amount: number;
	description: string;
}

// 行动点数系统
export interface ActionPointSystem {
	currentPoints: number;
	maxPoints: number;
	pointCosts: {
		playCard: number;
		useSkill: number;
		move: number;
		interact: number;
	};
	regenerationRate: number;
}

// 游戏循环状态
export interface GameLoopState {
	isActive: boolean;
	currentPhase: GamePhase;
	phaseTimer: number;
	phaseDuration: number;
	autoAdvance: boolean;
	paused: boolean;
}

// 游戏历史
export interface GameHistory {
	timestamp: Date;
	action: string;
	details: any;
	result: any;
}

// 游戏设置
export interface GameSettings {
	soundEnabled: boolean;
	musicEnabled: boolean;
	animationSpeed: 'slow' | 'normal' | 'fast';
	difficulty: 'easy' | 'normal' | 'hard';
	parentalControls: ParentalControls;
}

// 家长控制
export interface ParentalControls {
	enabled: boolean;
	weeklyBudget: number;
	maxSingleInvestment: number;
	riskLevel: RiskLevel;
	learningRequired: boolean;
	withdrawalDelay: number; // 提现延迟天数
	reportsEnabled: boolean;
}

// 游戏动作类型
export type GameAction = 
	| { type: 'START_TURN' }
	| { type: 'ADVANCE_PHASE' }
	| { type: 'USE_ACTION_POINTS'; amount: number }
	| { type: 'REGENERATE_ACTION_POINTS' }
	| { type: 'START_BATTLE'; enemy: Enemy }
	| { type: 'END_BATTLE' }
	| { type: 'PERFORM_BATTLE_ACTION'; action: BattleAction }
	| { type: 'PAUSE_GAME' }
	| { type: 'RESUME_GAME' };
