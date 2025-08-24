import React, { useState } from 'react';
import { PortfolioAsset, MarketCondition } from '../types/game';
import { cardEffectSystem } from '../utils/cardEffectSystem';
import CardDisplay from './CardDisplay';
import { TrendingUp, TrendingDown, BarChart3, Target, AlertTriangle } from 'lucide-react';

interface PortfolioDisplayProps {
	portfolio: PortfolioAsset[];
	marketCondition: MarketCondition;
	onAssetClick?: (asset: PortfolioAsset) => void;
	className?: string;
}

const PortfolioDisplay: React.FC<PortfolioDisplayProps> = ({
	portfolio,
	marketCondition,
	onAssetClick,
	className = ''
}) => {
	const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
	const [showDetails, setShowDetails] = useState(false);

	const handleAssetClick = (asset: PortfolioAsset) => {
		setSelectedAsset(asset.id);
		onAssetClick?.(asset);
	};

	// 计算投资组合统计
	const calculatePortfolioStats = () => {
		if (portfolio.length === 0) {
			return {
				totalValue: 0,
				totalReturn: 0,
				totalReturnPercent: 0,
				riskScore: 0,
				diversificationScore: 0
			};
		}

		const totalValue = portfolio.reduce((sum, asset) => sum + asset.currentValue, 0);
		const totalReturn = portfolio.reduce((sum, asset) => sum + asset.return, 0);
		const totalReturnPercent = totalValue > 0 ? (totalReturn / totalValue) * 100 : 0;
		const riskScore = cardEffectSystem.calculatePortfolioRisk(portfolio);
		const diversificationScore = cardEffectSystem.calculateDiversificationScore(portfolio);

		return {
			totalValue,
			totalReturn,
			totalReturnPercent,
			riskScore,
			diversificationScore
		};
	};

	// 获取市场条件图标和颜色
	const getMarketConditionDisplay = () => {
		switch (marketCondition) {
			case MarketCondition.BULL_MARKET:
				return { icon: <TrendingUp className="w-4 h-4" />, color: 'text-green-600', bg: 'bg-green-100' };
			case MarketCondition.BEAR_MARKET:
				return { icon: <TrendingDown className="w-4 h-4" />, color: 'text-red-600', bg: 'bg-red-100' };
			case MarketCondition.CRISIS:
				return { icon: <AlertTriangle className="w-4 h-4" />, color: 'text-red-600', bg: 'bg-red-100' };
			case MarketCondition.INFLATION:
				return { icon: <TrendingUp className="w-4 h-4" />, color: 'text-orange-600', bg: 'bg-orange-100' };
			case MarketCondition.VOLATILE:
				return { icon: <BarChart3 className="w-4 h-4" />, color: 'text-purple-600', bg: 'bg-purple-100' };
			default:
				return { icon: <Target className="w-4 h-4" />, color: 'text-blue-600', bg: 'bg-blue-100' };
		}
	};

	const stats = calculatePortfolioStats();
	const marketDisplay = getMarketConditionDisplay();

	return (
		<div className={`portfolio-display ${className}`}>
			{/* 投资组合头部 */}
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-800">投资组合</h3>
				<button
					onClick={() => setShowDetails(!showDetails)}
					className="text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
				>
					{showDetails ? '隐藏详情' : '显示详情'}
				</button>
			</div>

			{/* 投资组合概览 */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
				<div className="p-3 bg-white rounded-lg border border-gray-200">
					<div className="text-sm text-gray-500 mb-1">总资产</div>
					<div className="text-lg font-bold text-gray-800">¥{stats.totalValue.toFixed(2)}</div>
				</div>
				<div className="p-3 bg-white rounded-lg border border-gray-200">
					<div className="text-sm text-gray-500 mb-1">总收益</div>
					<div className={`text-lg font-bold ${stats.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
						{stats.totalReturn >= 0 ? '+' : ''}¥{stats.totalReturn.toFixed(2)}
					</div>
				</div>
				<div className="p-3 bg-white rounded-lg border border-gray-200">
					<div className="text-sm text-gray-500 mb-1">收益率</div>
					<div className={`text-lg font-bold ${stats.totalReturnPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
						{stats.totalReturnPercent >= 0 ? '+' : ''}{stats.totalReturnPercent.toFixed(2)}%
					</div>
				</div>
				<div className="p-3 bg-white rounded-lg border border-gray-200">
					<div className="text-sm text-gray-500 mb-1">风险评分</div>
					<div className={`text-lg font-bold ${stats.riskScore <= 30 ? 'text-green-600' : stats.riskScore <= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
						{stats.riskScore}/100
					</div>
				</div>
				<div className="p-3 bg-white rounded-lg border border-gray-200">
					<div className="text-sm text-gray-500 mb-1">分散度</div>
					<div className={`text-lg font-bold ${stats.diversificationScore >= 70 ? 'text-green-600' : stats.diversificationScore >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
						{stats.diversificationScore}/100
					</div>
				</div>
			</div>

			{/* 市场条件显示 */}
			<div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<span className="text-sm font-medium text-gray-700">当前市场条件:</span>
						<div className={`flex items-center space-x-1 px-2 py-1 rounded ${marketDisplay.bg}`}>
							{marketDisplay.icon}
							<span className={`text-sm font-medium ${marketDisplay.color}`}>
								{marketCondition.replace('_', ' ')}
							</span>
						</div>
					</div>
					<div className="text-xs text-gray-500">
						影响资产收益和风险表现
					</div>
				</div>
			</div>

			{/* 资产列表 */}
			<div className="space-y-4">
				<h4 className="text-sm font-medium text-gray-700">持有资产 ({portfolio.length})</h4>
				
				{portfolio.length > 0 ? (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						{portfolio.map((asset) => (
							<div
								key={asset.id}
								onClick={() => handleAssetClick(asset)}
								className={`
									p-4 bg-white rounded-lg border-2 cursor-pointer transition-all duration-200
									${selectedAsset === asset.id ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'}
								`}
							>
								<div className="flex items-start justify-between mb-3">
									<div className="flex-1">
										<div className="flex items-center space-x-2 mb-2">
											<h5 className="font-semibold text-gray-800">{asset.card.name}</h5>
											<span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
												{asset.card.assetType}
											</span>
										</div>
										<p className="text-sm text-gray-600 mb-2">{asset.card.description}</p>
									</div>
									<div className="text-right">
										<div className="text-lg font-bold text-gray-800">¥{asset.currentValue.toFixed(2)}</div>
										<div className={`text-sm font-medium ${asset.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
											{asset.return >= 0 ? '+' : ''}¥{asset.return.toFixed(2)}
										</div>
									</div>
								</div>

								{/* 资产详情 */}
								{showDetails && (
									<div className="grid grid-cols-3 gap-2 text-xs text-gray-600 border-t pt-3">
										<div>
											<span className="text-gray-500">数量:</span>
											<span className="ml-1 font-medium">{asset.quantity}</span>
										</div>
										<div>
											<span className="text-gray-500">成本:</span>
											<span className="ml-1 font-medium">¥{asset.costBasis.toFixed(2)}</span>
										</div>
										<div>
											<span className="text-gray-500">风险:</span>
											<span className="ml-1 font-medium">{asset.card.baseRisk}/10</span>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-12 text-gray-500">
						<div className="text-4xl mb-2">💼</div>
						<p>投资组合为空</p>
						<p className="text-sm">使用手牌中的资产卡开始投资</p>
					</div>
				)}
			</div>

			{/* 投资组合建议 */}
			{portfolio.length > 0 && (
				<div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
					<h4 className="text-sm font-medium text-blue-800 mb-3">投资组合建议</h4>
					<div className="space-y-2 text-sm text-blue-700">
						{stats.riskScore > 70 && (
							<p>⚠️ 风险评分较高，建议增加低风险资产如债券或黄金</p>
						)}
						{stats.diversificationScore < 40 && (
							<p>📊 分散度较低，建议投资更多不同类型的资产</p>
						)}
						{stats.totalReturnPercent < -5 && (
							<p>📉 当前亏损，建议使用止损策略或调整资产配置</p>
						)}
						{stats.totalReturnPercent > 10 && (
							<p>📈 收益良好，建议保持当前策略或适当获利了结</p>
						)}
						{stats.riskScore <= 30 && stats.diversificationScore >= 70 && (
							<p>✅ 投资组合配置良好，风险分散，收益稳定</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default PortfolioDisplay;
