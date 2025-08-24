import React, { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import HandArea from './HandArea';
import PortfolioDisplay from './PortfolioDisplay';
import CardDisplay from './CardDisplay';
import { AssetCard, SkillCard } from '../types/cards';
import { Play, RotateCcw, TrendingUp, Zap } from 'lucide-react';

const GameTest: React.FC = () => {
	const {
		hand,
		portfolio,
		marketCondition,
		currentTurn,
		player,
		drawCards,
		addAssetToPortfolio,
		applyCardEffects,
		nextTurn,
		nextPhase,
		updatePortfolioReturns
	} = useGameStore();

	const [selectedCard, setSelectedCard] = useState<AssetCard | SkillCard | null>(null);
	const [investmentAmount, setInvestmentAmount] = useState<number>(100);

	const handleCardSelect = (card: AssetCard | SkillCard) => {
		setSelectedCard(card);
	};

	const handlePlayAssetCard = (card: AssetCard) => {
		if (player.adventureCoins >= card.cost) {
			addAssetToPortfolio(card, 1);
			useGameStore.getState().spendAdventureCoins(card.cost);
			useGameStore.getState().playCard(card);
			setSelectedCard(null);
		} else {
			alert('探险币不足！');
		}
	};

	const handlePlaySkillCard = (card: SkillCard) => {
		applyCardEffects(card);
		useGameStore.getState().playCard(card);
		setSelectedCard(null);
	};

	const handleNextTurn = () => {
		updatePortfolioReturns();
		nextTurn();
		setSelectedCard(null);
	};

	const handleNextPhase = () => {
		nextPhase();
	};

	const getPhaseName = (phase: string) => {
		const phaseNames: Record<string, string> = {
			'draw': '抽牌阶段',
			'play': '出牌阶段',
			'event': '事件阶段',
			'resolution': '结算阶段',
			'reward': '奖励阶段'
		};
		return phaseNames[phase] || phase;
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
			<div className="max-w-7xl mx-auto">
				{/* 页面标题 */}
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">核心卡牌系统测试</h1>
					<p className="text-gray-600">测试阶段2：核心卡牌系统功能</p>
				</div>

				{/* 游戏状态概览 */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
					{/* 玩家状态 */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<h3 className="text-lg font-semibold text-gray-800 mb-4">玩家状态</h3>
						<div className="space-y-3">
							<div className="flex justify-between">
								<span className="text-gray-600">等级:</span>
								<span className="font-medium">{player.level}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">经验:</span>
								<span className="font-medium">{player.experience}/100</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">生命值:</span>
								<span className="font-medium">{player.health}/{player.maxHealth}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">探险币:</span>
								<span className="font-medium text-yellow-600">¥{player.adventureCoins}</span>
							</div>
						</div>
					</div>

					{/* 回合信息 */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<h3 className="text-lg font-semibold text-gray-800 mb-4">回合信息</h3>
						<div className="space-y-3">
							<div className="flex justify-between">
								<span className="text-gray-600">回合数:</span>
								<span className="font-medium">{currentTurn.number}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">当前阶段:</span>
								<span className="font-medium text-blue-600">{getPhaseName(currentTurn.phase)}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">剩余行动:</span>
								<span className="font-medium">{currentTurn.actionsRemaining}</span>
							</div>
						</div>
						<div className="mt-4 space-y-2">
							<button
								onClick={handleNextPhase}
								className="w-full btn-secondary text-sm flex items-center justify-center space-x-2"
							>
								<Play className="w-4 h-4" />
								<span>下一阶段</span>
							</button>
							<button
								onClick={handleNextTurn}
								className="w-full btn-primary text-sm flex items-center justify-center space-x-2"
							>
								<RotateCcw className="w-4 h-4" />
								<span>下一回合</span>
							</button>
						</div>
					</div>

					{/* 市场条件 */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<h3 className="text-lg font-semibold text-gray-800 mb-4">市场条件</h3>
						<div className="space-y-3">
							<div className="flex justify-between">
								<span className="text-gray-600">当前状态:</span>
								<span className="font-medium text-purple-600">{marketCondition.replace('_', ' ')}</span>
							</div>
							<div className="text-sm text-gray-500">
								市场条件会影响资产收益和风险表现
							</div>
						</div>
					</div>
				</div>

				{/* 主要内容区域 */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* 左侧：手牌区域 */}
					<div className="space-y-6">
						<HandArea
							hand={hand}
							onCardSelect={handleCardSelect}
							onDrawCards={drawCards}
						/>
					</div>

					{/* 右侧：投资组合和卡牌详情 */}
					<div className="space-y-6">
						{/* 投资组合 */}
						<PortfolioDisplay
							portfolio={portfolio.assets}
							marketCondition={marketCondition}
						/>

						{/* 选中的卡牌详情 */}
						{selectedCard && (
							<div className="bg-white rounded-lg shadow-md p-6">
								<h3 className="text-lg font-semibold text-gray-800 mb-4">选中的卡牌</h3>
								<div className="mb-4">
									<CardDisplay
										card={selectedCard}
										selected={true}
										className="w-full max-w-sm mx-auto"
									/>
								</div>
								
								{/* 卡牌操作 */}
								<div className="space-y-3">
									{selectedCard.type === 'asset' && (
										<div>
											<div className="mb-3">
												<label className="block text-sm font-medium text-gray-700 mb-2">
													投资金额: ¥{investmentAmount}
												</label>
												<input
													type="range"
													min="100"
													max="1000"
													step="100"
													value={investmentAmount}
													onChange={(e) => setInvestmentAmount(Number(e.target.value))}
													className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
												/>
											</div>
											<button
												onClick={() => handlePlayAssetCard(selectedCard as AssetCard)}
												disabled={player.adventureCoins < (selectedCard as AssetCard).cost}
												className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
											>
												<TrendingUp className="w-4 h-4" />
												<span>投资 ¥{(selectedCard as AssetCard).cost}</span>
											</button>
										</div>
									)}
									
									{selectedCard.type === 'skill' && (
										<button
											onClick={() => handlePlaySkillCard(selectedCard as SkillCard)}
											className="w-full btn-secondary flex items-center justify-center space-x-2"
										>
											<Zap className="w-4 h-4" />
											<span>使用技能</span>
										</button>
									)}
									
									<button
										onClick={() => setSelectedCard(null)}
										className="w-full btn-outline"
									>
										取消选择
									</button>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* 回合事件显示 */}
				{currentTurn.events.length > 0 && (
					<div className="mt-8 bg-white rounded-lg shadow-md p-6">
						<h3 className="text-lg font-semibold text-gray-800 mb-4">回合事件</h3>
						<div className="space-y-2">
							{currentTurn.events.map((event, index) => (
								<div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
									<span className="text-sm text-blue-800">{event}</span>
								</div>
							))}
						</div>
					</div>
				)}

				{/* 使用说明 */}
				<div className="mt-8 bg-yellow-50 rounded-lg border border-yellow-200 p-6">
					<h3 className="text-lg font-semibold text-yellow-800 mb-4">使用说明</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
						<div>
							<h4 className="font-medium mb-2">资产卡操作:</h4>
							<ul className="space-y-1">
								<li>• 点击资产卡选择</li>
								<li>• 调整投资金额</li>
								<li>• 点击"投资"按钮购买</li>
								<li>• 消耗探险币获得资产</li>
							</ul>
						</div>
						<div>
							<h4 className="font-medium mb-2">技能卡操作:</h4>
							<ul className="space-y-1">
								<li>• 点击技能卡选择</li>
								<li>• 点击"使用技能"按钮</li>
								<li>• 技能效果影响投资组合</li>
								<li>• 不同技能有不同激活条件</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameTest;
