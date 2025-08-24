import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { GameState, GamePhase, Player, GameTurn, Enemy, MapNode } from '../types/game';
import { Card, AssetCard, SkillCard } from '../types/cards';

// 初始游戏状态
const initialGameState: GameState = {
	player: {
		id: 'player-1',
		name: '财富守护者',
		level: 1,
		experience: 0,
		health: 100,
		maxHealth: 100,
		adventureCoins: 200,
		maxAdventureCoins: 200,
		riskLevel: 'low',
		portfolio: {
			assets: [],
			totalValue: 0,
			totalReturn: 0,
			riskScore: 0,
			diversificationScore: 0,
			lastRebalanced: new Date(),
		},
		achievements: [],
		learningProgress: {
			completedLessons: [],
			quizScores: {},
			badges: [],
		},
	},
	currentTurn: {
		turnNumber: 1,
		phase: 'draw',
		playerActions: [],
		marketEvents: [],
		enemyActions: [],
		results: {
			playerHealthChange: 0,
			enemyHealthChange: 0,
			portfolioReturn: 0,
			coinsEarned: 0,
			experienceGained: 0,
			achievementsUnlocked: [],
		},
	},
	map: [],
	currentNode: '',
	gamePhase: 'menu',
	history: [],
	settings: {
		soundEnabled: true,
		musicEnabled: true,
		animationSpeed: 'normal',
		difficulty: 'normal',
		parentalControls: {
			enabled: true,
			weeklyBudget: 200,
			maxSingleInvestment: 40,
			riskLevel: 'low',
			learningRequired: true,
			withdrawalDelay: 7,
			reportsEnabled: true,
		},
	},
};

// 游戏状态管理
interface GameStore extends GameState {
	// 游戏控制
	setGamePhase: (phase: GamePhase) => void;
	startNewGame: () => void;
	loadGame: (saveData: GameState) => void;
	saveGame: () => void;
	
	// 玩家管理
	updatePlayer: (updates: Partial<Player>) => void;
	addExperience: (amount: number) => void;
	updateHealth: (change: number) => void;
	updateAdventureCoins: (change: number) => void;
	
	// 回合管理
	nextTurn: () => void;
	setTurnPhase: (phase: string) => void;
	addPlayerAction: (action: any) => void;
	
	// 投资组合管理
	addAssetToPortfolio: (asset: AssetCard, amount: number) => void;
	removeAssetFromPortfolio: (assetId: string, amount: number) => void;
	updatePortfolioValue: () => void;
	rebalancePortfolio: () => void;
	
	// 地图管理
	setCurrentNode: (nodeId: string) => void;
	completeNode: (nodeId: string) => void;
	unlockNode: (nodeId: string) => void;
	
	// 战斗管理
	setEnemy: (enemy: Enemy | null) => void;
	updateEnemyHealth: (change: number) => void;
	
	// 成就和学习
	unlockAchievement: (achievementId: string) => void;
	completeLesson: (lessonId: string) => void;
	addBadge: (badge: any) => void;
	
	// 设置管理
	updateSettings: (updates: Partial<GameState['settings']>) => void;
	updateParentalControls: (updates: Partial<GameState['settings']['parentalControls']>) => void;
}

export const useGameStore = create<GameStore>()(
	devtools(
		persist(
			(set, get) => ({
				...initialGameState,
				
				// 游戏控制
				setGamePhase: (phase: GamePhase) =>
					set({ gamePhase: phase }),
				
				startNewGame: () =>
					set(initialGameState),
				
				loadGame: (saveData: GameState) =>
					set(saveData),
				
				saveGame: () => {
					const state = get();
					localStorage.setItem('legacy-guardians-save', JSON.stringify(state));
				},
				
				// 玩家管理
				updatePlayer: (updates: Partial<Player>) =>
					set((state) => ({
						player: { ...state.player, ...updates }
					})),
				
				addExperience: (amount: number) =>
					set((state) => {
						const newExp = state.player.experience + amount;
						const newLevel = Math.floor(newExp / 100) + 1;
						return {
							player: {
								...state.player,
								experience: newExp,
								level: newLevel,
							}
						};
					}),
				
				updateHealth: (change: number) =>
					set((state) => ({
						player: {
							...state.player,
							health: Math.max(0, Math.min(state.player.maxHealth, state.player.health + change))
						}
					})),
				
				updateAdventureCoins: (change: number) =>
					set((state) => ({
						player: {
							...state.player,
							adventureCoins: Math.max(0, Math.min(state.player.maxAdventureCoins, state.player.adventureCoins + change))
						}
					})),
				
				// 回合管理
				nextTurn: () =>
					set((state) => ({
						currentTurn: {
							...state.currentTurn,
							turnNumber: state.currentTurn.turnNumber + 1,
							phase: 'draw',
							playerActions: [],
							marketEvents: [],
							enemyActions: [],
							results: {
								playerHealthChange: 0,
								enemyHealthChange: 0,
								portfolioReturn: 0,
								coinsEarned: 0,
								experienceGained: 0,
								achievementsUnlocked: [],
							},
						}
					})),
				
				setTurnPhase: (phase: string) =>
					set((state) => ({
						currentTurn: {
							...state.currentTurn,
							phase: phase as any
						}
					})),
				
				addPlayerAction: (action: any) =>
					set((state) => ({
						currentTurn: {
							...state.currentTurn,
							playerActions: [...state.currentTurn.playerActions, action]
						}
					})),
				
				// 投资组合管理
				addAssetToPortfolio: (asset: AssetCard, amount: number) =>
					set((state) => {
						const existingAsset = state.player.portfolio.assets.find(a => a.card.id === asset.id);
						let newAssets;
						
						if (existingAsset) {
							newAssets = state.player.portfolio.assets.map(a =>
								a.card.id === asset.id
									? { ...a, quantity: a.quantity + amount, investedAmount: a.investedAmount + amount }
									: a
							);
						} else {
							newAssets = [...state.player.portfolio.assets, {
								card: asset,
								quantity: amount,
								investedAmount: amount,
								currentValue: amount,
								return: 0,
								risk: asset.baseRisk,
								effects: [],
							}];
						}
						
						return {
							player: {
								...state.player,
								portfolio: {
									...state.player.portfolio,
									assets: newAssets,
								}
							}
						};
					}),
				
				removeAssetFromPortfolio: (assetId: string, amount: number) =>
					set((state) => {
						const newAssets = state.player.portfolio.assets.map(asset => {
							if (asset.card.id === assetId) {
								const newQuantity = Math.max(0, asset.quantity - amount);
								const newInvestedAmount = (asset.investedAmount / asset.quantity) * newQuantity;
								return {
									...asset,
									quantity: newQuantity,
									investedAmount: newInvestedAmount,
								};
							}
							return asset;
						}).filter(asset => asset.quantity > 0);
						
						return {
							player: {
								...state.player,
								portfolio: {
									...state.player.portfolio,
									assets: newAssets,
								}
							}
						};
					}),
				
				updatePortfolioValue: () =>
					set((state) => {
						const totalValue = state.player.portfolio.assets.reduce((sum, asset) => sum + asset.currentValue, 0);
						const totalReturn = state.player.portfolio.assets.reduce((sum, asset) => sum + asset.return, 0);
						
						return {
							player: {
								...state.player,
								portfolio: {
									...state.player.portfolio,
									totalValue,
									totalReturn,
								}
							}
						};
					}),
				
				rebalancePortfolio: () =>
					set((state) => ({
						player: {
							...state.player,
							portfolio: {
								...state.player.portfolio,
								lastRebalanced: new Date(),
							}
						}
					})),
				
				// 地图管理
				setCurrentNode: (nodeId: string) =>
					set({ currentNode: nodeId }),
				
				completeNode: (nodeId: string) =>
					set((state) => ({
						map: state.map.map(node =>
							node.id === nodeId ? { ...node, completed: true } : node
						)
					})),
				
				unlockNode: (nodeId: string) =>
					set((state) => ({
						map: state.map.map(node =>
							node.id === nodeId ? { ...node, completed: false } : node
						)
					})),
				
				// 战斗管理
				setEnemy: (enemy: Enemy | null) =>
					set({ enemy }),
				
				updateEnemyHealth: (change: number) =>
					set((state) => {
						if (!state.enemy) return {};
						return {
							enemy: {
								...state.enemy,
								health: Math.max(0, state.enemy.health + change)
							}
						};
					}),
				
				// 成就和学习
				unlockAchievement: (achievementId: string) =>
					set((state) => {
						const achievement = state.player.achievements.find(a => a.id === achievementId);
						if (achievement && !achievement.unlockedAt) {
							return {
								player: {
									...state.player,
									achievements: state.player.achievements.map(a =>
										a.id === achievementId
											? { ...a, unlockedAt: new Date() }
											: a
									)
								}
							};
						}
						return {};
					}),
				
				completeLesson: (lessonId: string) =>
					set((state) => ({
						player: {
							...state.player,
							learningProgress: {
								...state.player.learningProgress,
								completedLessons: [...state.player.learningProgress.completedLessons, lessonId]
							}
						}
					})),
				
				addBadge: (badge: any) =>
					set((state) => ({
						player: {
							...state.player,
							learningProgress: {
								...state.player.learningProgress,
								badges: [...state.player.learningProgress.badges, badge]
							}
						}
					})),
				
				// 设置管理
				updateSettings: (updates: Partial<GameState['settings']>) =>
					set((state) => ({
						settings: { ...state.settings, ...updates }
					})),
				
				updateParentalControls: (updates: Partial<GameState['settings']['parentalControls']>) =>
					set((state) => ({
						settings: {
							...state.settings,
							parentalControls: {
								...state.settings.parentalControls,
								...updates
							}
						}
					})),
			}),
			{
				name: 'legacy-guardians-game-store',
				partialize: (state) => ({
					player: state.player,
					map: state.map,
					currentNode: state.currentNode,
					settings: state.settings,
				}),
			}
		),
		{
			name: 'legacy-guardians-game-store',
		}
	)
);
