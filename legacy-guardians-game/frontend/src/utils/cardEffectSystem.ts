import { AssetCard, SkillCard, EventCard, AssetType, SkillType, MarketCondition } from '../types/cards';
import { PortfolioAsset } from '../types/game';

// 卡牌效果系统
export class CardEffectSystem {
	// 计算资产卡在特定市场条件下的收益
	calculateAssetReturn(asset: AssetCard, marketCondition: MarketCondition): number {
		let baseReturn = asset.baseReturn;
		let marketModifier = 1.0;

		// 根据市场条件调整收益
		switch (marketCondition) {
			case MarketCondition.BULL_MARKET:
				if (asset.assetType === AssetType.STOCK || asset.assetType === AssetType.CRYPTO) {
					marketModifier = 1.3; // 牛市时股票和加密资产收益提升
				}
				break;
			case MarketCondition.BEAR_MARKET:
				if (asset.assetType === AssetType.STOCK || asset.assetType === AssetType.CRYPTO) {
					marketModifier = 0.7; // 熊市时股票和加密资产收益下降
				} else if (asset.assetType === AssetType.BOND || asset.assetType === AssetType.STABLECOIN) {
					marketModifier = 1.1; // 熊市时债券和稳定币收益提升
				}
				break;
			case MarketCondition.CRISIS:
				if (asset.assetType === AssetType.GOLD) {
					marketModifier = 1.5; // 危机时黄金收益大幅提升
				} else if (asset.assetType === AssetType.CRYPTO) {
					marketModifier = 0.5; // 危机时加密资产收益大幅下降
				}
				break;
			case MarketCondition.INFLATION:
				if (asset.assetType === AssetType.GOLD || asset.assetType === AssetType.REAL_ESTATE) {
					marketModifier = 1.2; // 通胀时黄金和房地产收益提升
				} else if (asset.assetType === AssetType.BOND || asset.assetType === AssetType.STABLECOIN) {
					marketModifier = 0.8; // 通胀时债券和稳定币收益下降
				}
				break;
			case MarketCondition.VOLATILE:
				// 波动市场时，高波动性资产收益变化更大
				const volatilityFactor = asset.volatility / 10;
				marketModifier = 1.0 + (Math.random() - 0.5) * volatilityFactor * 0.4;
				break;
			default:
				marketModifier = 1.0;
		}

		// 添加随机波动
		const volatilityFactor = asset.volatility / 10;
		const randomModifier = 1.0 + (Math.random() - 0.5) * volatilityFactor * 0.2;

		return baseReturn * marketModifier * randomModifier;
	}

	// 应用技能卡效果到投资组合
	applySkillCardEffects(skillCard: SkillCard, portfolio: PortfolioAsset[], marketCondition: MarketCondition): {
		modifiedPortfolio: PortfolioAsset[];
		effects: string[];
	} {
		const modifiedPortfolio = [...portfolio];
		const effects: string[] = [];

		switch (skillCard.skillType) {
			case SkillType.DIVERSIFICATION:
				// 分散配置：如果投资组合包含3种以上不同类型的资产，所有资产收益提升
				const assetTypes = new Set(portfolio.map(asset => asset.card.assetType));
				if (assetTypes.size >= 3) {
					modifiedPortfolio.forEach(asset => {
						asset.return *= 1.2; // 收益提升20%
					});
					effects.push(`分散配置生效！投资组合包含${assetTypes.size}种资产类型，所有资产收益提升20%`);
				} else {
					effects.push(`分散配置需要至少3种不同类型的资产才能生效（当前：${assetTypes.size}种）`);
				}
				break;

			case SkillType.STOP_LOSS:
				// 止损策略：如果投资组合总收益为负，减少损失
				const totalReturn = portfolio.reduce((sum, asset) => sum + asset.return, 0);
				if (totalReturn < 0) {
					const lossReduction = Math.abs(totalReturn) * 0.3; // 减少30%的损失
					modifiedPortfolio.forEach(asset => {
						if (asset.return < 0) {
							asset.return += lossReduction;
						}
					});
					effects.push(`止损策略生效！减少投资组合损失${lossReduction.toFixed(2)}`);
				} else {
					effects.push('止损策略：当前投资组合收益为正，无需止损');
				}
				break;

			case SkillType.REBALANCE:
				// 再平衡：调整资产配置，使风险更均衡
				const totalValue = portfolio.reduce((sum, asset) => sum + asset.currentValue, 0);
				const targetAllocation = 1 / portfolio.length; // 等权重分配

				portfolio.forEach((asset, index) => {
					const currentAllocation = asset.currentValue / totalValue;
					const rebalanceBonus = (targetAllocation - currentAllocation) * 0.1;
					asset.return += rebalanceBonus;
				});

				effects.push('再平衡策略生效！调整资产配置比例，获得额外收益');
				break;

			case SkillType.LONG_TERM:
				// 长期持有：如果资产持有时间较长，获得复利收益
				modifiedPortfolio.forEach(asset => {
					// 模拟长期持有效果
					const longTermBonus = asset.return * 0.15; // 15%的长期持有奖励
					asset.return += longTermBonus;
				});
				effects.push('长期持有策略生效！获得15%的复利收益奖励');
				break;

			case SkillType.HEDGE:
				// 对冲策略：使用负相关资产对冲风险
				const hedgeableAssets = portfolio.filter(asset => 
					asset.card.assetType === AssetType.GOLD || 
					asset.card.assetType === AssetType.BOND
				);

				if (hedgeableAssets.length > 0) {
					hedgeableAssets.forEach(asset => {
						asset.return *= 1.25; // 对冲资产收益提升25%
					});
					effects.push(`对冲策略生效！避险资产收益提升25%`);
				} else {
					effects.push('对冲策略：需要黄金或债券等避险资产才能生效');
				}
				break;

			default:
				effects.push('技能卡效果：未知技能类型');
		}

		return { modifiedPortfolio, effects };
	}

	// 应用事件卡效果
	applyEventCardEffects(eventCard: EventCard, portfolio: PortfolioAsset[], marketCondition: MarketCondition): {
		modifiedPortfolio: PortfolioAsset[];
		effects: string[];
		newMarketCondition: MarketCondition;
	} {
		const modifiedPortfolio = [...portfolio];
		const effects: string[] = [];
		let newMarketCondition = marketCondition;

		switch (eventCard.eventType) {
			case 'bull_run':
				// 牛市狂奔：股票类资产收益大幅提升
				modifiedPortfolio.forEach(asset => {
					if (asset.card.assetType === AssetType.STOCK || asset.card.assetType === AssetType.ETF) {
						asset.return *= 1.5;
					}
				});
				effects.push('牛市狂奔！股票和ETF类资产收益提升50%');
				newMarketCondition = MarketCondition.BULL_MARKET;
				break;

			case 'economic_crisis':
				// 金融危机：高风险资产收益下降，避险资产收益提升
				modifiedPortfolio.forEach(asset => {
					if (asset.card.assetType === AssetType.CRYPTO || asset.card.assetType === AssetType.STOCK) {
						asset.return *= 0.6; // 高风险资产收益下降40%
					} else if (asset.card.assetType === AssetType.GOLD || asset.card.assetType === AssetType.BOND) {
						asset.return *= 1.3; // 避险资产收益提升30%
					}
				});
				effects.push('金融危机！高风险资产收益下降，避险资产收益提升');
				newMarketCondition = MarketCondition.CRISIS;
				break;

			case 'inflation_spike':
				// 通胀飙升：现金类资产贬值，实物资产升值
				modifiedPortfolio.forEach(asset => {
					if (asset.card.assetType === AssetType.STABLECOIN || asset.card.assetType === AssetType.BOND) {
						asset.return *= 0.8; // 现金类资产贬值20%
					} else if (asset.card.assetType === AssetType.GOLD || asset.card.assetType === AssetType.REAL_ESTATE) {
						asset.return *= 1.4; // 实物资产升值40%
					}
				});
				effects.push('通胀飙升！现金类资产贬值，实物资产升值');
				newMarketCondition = MarketCondition.INFLATION;
				break;

			default:
				effects.push('事件卡效果：未知事件类型');
		}

		return { modifiedPortfolio, effects, newMarketCondition };
	}

	// 计算投资组合风险评分
	calculatePortfolioRisk(portfolio: PortfolioAsset[]): number {
		if (portfolio.length === 0) return 0;

		// 基于资产风险等级和集中度计算
		let totalRisk = 0;
		let concentrationRisk = 0;

		portfolio.forEach(asset => {
			totalRisk += asset.card.baseRisk * asset.quantity;
		});

		// 计算集中度风险
		const totalValue = portfolio.reduce((sum, asset) => sum + asset.currentValue, 0);
		portfolio.forEach(asset => {
			const weight = asset.currentValue / totalValue;
			concentrationRisk += weight * weight; // 赫芬达尔指数
		});

		// 综合风险评分 (0-100)
		const averageRisk = totalRisk / portfolio.length;
		const diversificationBonus = Math.max(0, (1 - concentrationRisk) * 20);
		const finalRisk = Math.min(100, averageRisk - diversificationBonus);

		return Math.round(finalRisk);
	}

	// 计算投资组合分散度评分
	calculateDiversificationScore(portfolio: PortfolioAsset[]): number {
		if (portfolio.length === 0) return 0;

		const assetTypes = new Set(portfolio.map(asset => asset.card.assetType));
		const typeDiversity = assetTypes.size / 8; // 8种资产类型

		// 计算权重分布
		const totalValue = portfolio.reduce((sum, asset) => sum + asset.currentValue, 0);
		let weightDiversity = 0;

		if (totalValue > 0) {
			portfolio.forEach(asset => {
				const weight = asset.currentValue / totalValue;
				weightDiversity += weight * weight;
			});
			weightDiversity = 1 - weightDiversity; // 转换为分散度
		}

		// 综合分散度评分 (0-100)
		const finalScore = (typeDiversity * 60 + weightDiversity * 40) * 100;
		return Math.round(Math.min(100, finalScore));
	}

	// 检查技能卡激活条件
	checkSkillActivationConditions(skillCard: SkillCard, portfolio: PortfolioAsset[], marketCondition: MarketCondition): boolean {
		switch (skillCard.skillType) {
			case SkillType.DIVERSIFICATION:
				const assetTypes = new Set(portfolio.map(asset => asset.card.assetType));
				return assetTypes.size >= 3;

			case SkillType.STOP_LOSS:
				const totalReturn = portfolio.reduce((sum, asset) => sum + asset.return, 0);
				return totalReturn < 0;

			case SkillType.REBALANCE:
				return portfolio.length >= 2;

			case SkillType.LONG_TERM:
				return portfolio.length > 0; // 只要有资产就可以

			case SkillType.HEDGE:
				return portfolio.some(asset => 
					asset.card.assetType === AssetType.GOLD || 
					asset.card.assetType === AssetType.BOND
				);

			default:
				return true;
		}
	}
}

// 导出单例实例
export const cardEffectSystem = new CardEffectSystem();
