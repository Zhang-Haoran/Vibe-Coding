import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Hand, AssetCard, SkillCard, EventCard, Card } from '../types/cards';
import { GameState, GamePhase, Player, PortfolioAsset, MarketCondition, TurnPhase } from '../types/game';
import { deckManager } from '../utils/deckManager';
import { cardEffectSystem } from '../utils/cardEffectSystem';

// 初始游戏状态
const initialGameState: GameState = {
	phase: GamePhase.MAIN_MENU,
	player: {
		id: 'player-1',
		name: '财富守护者',
		level: 1,
		experience: 0,
		health: 100,
		maxHealth: 100,
		adventureCoins: 1000,
		riskLevel: 'moderate',
		achievements: [],
		learningProgress: {
			financialLiteracy: 0,
			riskManagement: 0,
			investmentStrategy: 0,
			marketAnalysis: 0
		},
		badges: []
	},
	portfolio: {
		assets: [],
		totalValue: 0,
		totalReturn: 0,
		riskLevel: 'low'
	},
	currentTurn: {
		number: 1,
		phase: TurnPhase.DRAW,
		actionsRemaining: 3,
		events: []
	},
	hand: {
		assetCards: [],
		skillCards: [],
		maxSize: 5
	},
	marketCondition: MarketCondition.STABLE,
	gameHistory: [],
	settings: {
		difficulty: 'normal',
		aiCoachEnabled: true,
		soundEnabled: true,
		musicEnabled: true
	},
	parentalControls: {
		budgetLimit: 10000,
		riskLevels: ['low', 'moderate'],
		reportsEnabled: true
	}
};

// 游戏状态管理接口
interface GameStore extends GameState {
	// 游戏控制
	startNewGame: () => void;
	continueGame: () => void;
	pauseGame: () => void;
	endGame: () => void;
	
	// 玩家管理
	updatePlayer: (updates: Partial<Player>) => void;
	addExperience: (amount: number) => void;
	healPlayer: (amount: number) => void;
	damagePlayer: (amount: number) => void;
	addAdventureCoins: (amount: number) => void;
	spendAdventureCoins: (amount: number) => void;
	
	// 回合管理
	nextTurn: () => void;
	nextPhase: () => void;
	useAction: () => void;
	
	// 投资组合管理
	addAssetToPortfolio: (assetCard: AssetCard, quantity: number) => void;
	removeAssetFromPortfolio: (assetId: string, quantity: number) => void;
	updatePortfolioReturns: () => void;
	
	// 手牌管理
	drawCards: () => void;
	playCard: (card: Card) => void;
	discardCard: (cardId: string) => void;
	
	// 地图管理
	moveToNode: (nodeId: string) => void;
	unlockNode: (nodeId: string) => void;
	
	// 战斗管理
	startBattle: (enemyId: string) => void;
	endBattle: (victory: boolean) => void;
	useSkillInBattle: (skillCard: SkillCard) => void;
	
	// 成就和学习
	unlockAchievement: (achievementId: string) => void;
	updateLearningProgress: (category: string, progress: number) => void;
	addBadge: (badgeId: string) => void;
	
	// 设置管理
	updateSettings: (updates: Partial<GameState['settings']>) => void;
	updateParentalControls: (updates: Partial<GameState['parentalControls']>) => void;
	
	// 市场事件
	triggerMarketEvent: (eventCard: EventCard) => void;
	updateMarketCondition: (condition: MarketCondition) => void;
	
	// 卡牌效果系统
	applyCardEffects: (card: Card) => void;
	calculatePortfolioRisk: () => number;
	calculateDiversificationScore: () => number;
}

// 创建游戏状态管理
export const useGameStore = create<GameStore>()(
	devtools(
		persist(
			(set, get) => ({
				...initialGameState,

				// 游戏控制
				startNewGame: () => {
					set((state) => ({
						...initialGameState,
						phase: GamePhase.GAME_MAP,
						hand: deckManager.drawCards()
					}));
				},

				continueGame: () => {
					set((state) => ({
						...state,
						phase: GamePhase.GAME_MAP
					}));
				},

				pauseGame: () => {
					set((state) => ({
						...state,
						phase: GamePhase.PAUSED
					}));
				},

				endGame: () => {
					set((state) => ({
						...state,
						phase: GamePhase.MAIN_MENU
					}));
				},

				// 玩家管理
				updatePlayer: (updates) => {
					set((state) => ({
						...state,
						player: { ...state.player, ...updates }
					}));
				},

				addExperience: (amount) => {
					set((state) => {
						const newExp = state.player.experience + amount;
						const levelUp = Math.floor(newExp / 100) + 1;
						const newLevel = Math.min(levelUp, 100);
						
						return {
							...state,
							player: {
								...state.player,
								experience: newExp,
								level: newLevel,
								health: newLevel > state.player.level ? Math.min(state.player.health + 20, state.player.maxHealth) : state.player.health
							}
						};
					});
				},

				healPlayer: (amount) => {
					set((state) => ({
						...state,
						player: {
							...state.player,
							health: Math.min(state.player.health + amount, state.player.maxHealth)
						}
					}));
				},

				damagePlayer: (amount) => {
					set((state) => ({
						...state,
						player: {
							...state.player,
							health: Math.max(state.player.health - amount, 0)
						}
					}));
				},

				addAdventureCoins: (amount) => {
					set((state) => ({
						...state,
						player: {
							...state.player,
							adventureCoins: state.player.adventureCoins + amount
						}
					}));
				},

				spendAdventureCoins: (amount) => {
					set((state) => ({
						...state,
						player: {
							...state.player,
							adventureCoins: Math.max(state.player.adventureCoins - amount, 0)
						}
					}));
				},

				// 回合管理
				nextTurn: () => {
					set((state) => ({
						...state,
						currentTurn: {
							...state.currentTurn,
							number: state.currentTurn.number + 1,
							phase: TurnPhase.DRAW,
							actionsRemaining: 3,
							events: []
						},
						hand: deckManager.drawCards()
					}));
				},

				nextPhase: () => {
					set((state) => {
						const phases = [TurnPhase.DRAW, TurnPhase.PLAY, TurnPhase.EVENT, TurnPhase.RESOLUTION, TurnPhase.REWARD];
						const currentIndex = phases.indexOf(state.currentTurn.phase);
						const nextIndex = (currentIndex + 1) % phases.length;
						
						return {
							...state,
							currentTurn: {
								...state.currentTurn,
								phase: phases[nextIndex]
							}
						};
					});
				},

				useAction: () => {
					set((state) => ({
						...state,
						currentTurn: {
							...state.currentTurn,
							actionsRemaining: Math.max(state.currentTurn.actionsRemaining - 1, 0)
						}
					}));
				},

				// 投资组合管理
				addAssetToPortfolio: (assetCard, quantity) => {
					set((state) => {
						const existingAsset = state.portfolio.assets.find(asset => asset.card.id === assetCard.id);
						
						if (existingAsset) {
							// 更新现有资产
							const updatedAssets = state.portfolio.assets.map(asset =>
								asset.card.id === assetCard.id
									? {
											...asset,
											quantity: asset.quantity + quantity,
											costBasis: (asset.costBasis + assetCard.cost * quantity) / (asset.quantity + quantity),
											currentValue: asset.currentValue + assetCard.cost * quantity
										}
									: asset
							);
							
							return {
								...state,
								portfolio: {
									...state.portfolio,
									assets: updatedAssets
								}
							};
						} else {
							// 添加新资产
							const newAsset: PortfolioAsset = {
								id: `asset-${Date.now()}`,
								card: assetCard,
								quantity,
								costBasis: assetCard.cost,
								currentValue: assetCard.cost * quantity,
								return: 0,
								acquiredTurn: state.currentTurn.number
							};
							
							return {
								...state,
								portfolio: {
									...state.portfolio,
									assets: [...state.portfolio.assets, newAsset]
								}
							};
						}
					});
				},

				removeAssetFromPortfolio: (assetId, quantity) => {
					set((state) => {
						const updatedAssets = state.portfolio.assets.map(asset => {
							if (asset.id === assetId) {
								const newQuantity = Math.max(asset.quantity - quantity, 0);
								if (newQuantity === 0) {
									return null; // 标记为删除
								}
								return {
									...asset,
									quantity: newQuantity,
									currentValue: asset.currentValue * (newQuantity / asset.quantity)
								};
							}
							return asset;
						}).filter(Boolean) as PortfolioAsset[];
						
						return {
							...state,
							portfolio: {
								...state.portfolio,
								assets: updatedAssets
							}
						};
					});
				},

				updatePortfolioReturns: () => {
					set((state) => {
						const updatedAssets = state.portfolio.assets.map(asset => {
							const returnRate = cardEffectSystem.calculateAssetReturn(asset.card, state.marketCondition);
							const newReturn = (returnRate / 100) * asset.currentValue;
							
							return {
								...asset,
								return: newReturn,
								currentValue: asset.currentValue + newReturn
							};
						});
						
						const totalValue = updatedAssets.reduce((sum, asset) => sum + asset.currentValue, 0);
						const totalReturn = updatedAssets.reduce((sum, asset) => sum + asset.return, 0);
						
						return {
							...state,
							portfolio: {
								...state.portfolio,
								assets: updatedAssets,
								totalValue,
								totalReturn
							}
						};
					});
				},

				// 手牌管理
				drawCards: () => {
					set((state) => ({
						...state,
						hand: deckManager.drawCards()
					}));
				},

				playCard: (card) => {
					set((state) => {
						// 将卡牌移动到弃牌堆
						deckManager.playCard(card);
						
						// 从手牌中移除
						let newHand = { ...state.hand };
						if (card.type === 'asset') {
							newHand.assetCards = newHand.assetCards.filter(c => c.id !== card.id);
						} else if (card.type === 'skill') {
							newHand.skillCards = newHand.skillCards.filter(c => c.id !== card.id);
						}
						
						return {
							...state,
							hand: newHand
						};
					});
				},

				discardCard: (cardId) => {
					set((state) => {
						let newHand = { ...state.hand };
						newHand.assetCards = newHand.assetCards.filter(c => c.id !== cardId);
						newHand.skillCards = newHand.skillCards.filter(c => c.id !== cardId);
						
						return {
							...state,
							hand: newHand
						};
					});
				},

				// 地图管理
				moveToNode: (nodeId) => {
					set((state) => ({
						...state,
						currentNode: nodeId
					}));
				},

				unlockNode: (nodeId) => {
					set((state) => ({
						...state,
						unlockedNodes: [...(state.unlockedNodes || []), nodeId]
					}));
				},

				// 战斗管理
				startBattle: (enemyId) => {
					set((state) => ({
						...state,
						phase: GamePhase.BATTLE,
						currentEnemy: enemyId
					}));
				},

				endBattle: (victory) => {
					set((state) => ({
						...state,
						phase: GamePhase.GAME_MAP,
						currentEnemy: undefined
					}));
				},

				useSkillInBattle: (skillCard) => {
					// 战斗中使用技能卡的逻辑
					set((state) => ({
						...state,
						currentTurn: {
							...state.currentTurn,
							actionsRemaining: Math.max(state.currentTurn.actionsRemaining - 1, 0)
						}
					}));
				},

				// 成就和学习
				unlockAchievement: (achievementId) => {
					set((state) => ({
						...state,
						player: {
							...state.player,
							achievements: [...state.player.achievements, achievementId]
						}
					}));
				},

				updateLearningProgress: (category, progress) => {
					set((state) => ({
						...state,
						player: {
							...state.player,
							learningProgress: {
								...state.player.learningProgress,
								[category]: Math.min(progress, 100)
							}
						}
					}));
				},

				addBadge: (badgeId) => {
					set((state) => ({
						...state,
						player: {
							...state.player,
							badges: [...state.player.badges, badgeId]
						}
					}));
				},

				// 设置管理
				updateSettings: (updates) => {
					set((state) => ({
						...state,
						settings: { ...state.settings, ...updates }
					}));
				},

				updateParentalControls: (updates) => {
					set((state) => ({
						...state,
						parentalControls: { ...state.parentalControls, ...updates }
					}));
				},

				// 市场事件
				triggerMarketEvent: (eventCard) => {
					set((state) => {
						const { modifiedPortfolio, effects, newMarketCondition } = cardEffectSystem.applyEventCardEffects(
							eventCard,
							state.portfolio.assets,
							state.marketCondition
						);
						
						return {
							...state,
							portfolio: {
								...state.portfolio,
								assets: modifiedPortfolio
							},
							marketCondition: newMarketCondition,
							currentTurn: {
								...state.currentTurn,
								events: [...state.currentTurn.events, ...effects]
							}
						};
					});
				},

				updateMarketCondition: (condition) => {
					set((state) => ({
						...state,
						marketCondition: condition
					}));
				},

				// 卡牌效果系统
				applyCardEffects: (card) => {
					set((state) => {
						if (card.type === 'skill') {
							const { modifiedPortfolio, effects } = cardEffectSystem.applySkillCardEffects(
								card as SkillCard,
								state.portfolio.assets,
								state.marketCondition
							);
							
							return {
								...state,
								portfolio: {
									...state.portfolio,
									assets: modifiedPortfolio
								},
								currentTurn: {
									...state.currentTurn,
									events: [...state.currentTurn.events, ...effects]
								}
							};
						}
						return state;
					});
				},

				calculatePortfolioRisk: () => {
					const state = get();
					return cardEffectSystem.calculatePortfolioRisk(state.portfolio.assets);
				},

				calculateDiversificationScore: () => {
					const state = get();
					return cardEffectSystem.calculateDiversificationScore(state.portfolio.assets);
				}
			}),
			{
				name: 'legacy-guardians-game-storage',
				partialize: (state) => ({
					player: state.player,
					portfolio: state.portfolio,
					settings: state.settings,
					parentalControls: state.parentalControls
				})
			}
		),
		{
			name: 'legacy-guardians-game-store'
		}
	)
);
