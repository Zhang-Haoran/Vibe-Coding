import React, { useState } from 'react';
import { Hand, AssetCard, SkillCard } from '../types/cards';
import { deckManager } from '../utils/deckManager';
import CardDisplay from './CardDisplay';
import { Shuffle, RefreshCw, Eye } from 'lucide-react';

interface HandAreaProps {
	hand: Hand;
	onCardSelect?: (card: AssetCard | SkillCard) => void;
	onDrawCards?: () => void;
	className?: string;
}

const HandArea: React.FC<HandAreaProps> = ({
	hand,
	onCardSelect,
	onDrawCards,
	className = ''
}) => {
	const [selectedCard, setSelectedCard] = useState<string | null>(null);
	const [showDeckStatus, setShowDeckStatus] = useState(false);

	const handleCardClick = (card: AssetCard | SkillCard) => {
		setSelectedCard(card.id);
		onCardSelect?.(card);
	};

	const handleDrawCards = () => {
		deckManager.drawCards();
		onDrawCards?.();
	};

	const handleResetDeck = () => {
		deckManager.resetDecks();
		onDrawCards?.();
	};

	const getDeckStatus = () => {
		return deckManager.getDeckStatus();
	};

	return (
		<div className={`hand-area ${className}`}>
			{/* 手牌区域头部 */}
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center space-x-4">
					<h3 className="text-lg font-semibold text-gray-800">手牌区域</h3>
					<div className="flex items-center space-x-2 text-sm text-gray-600">
						<span>资产卡: {hand.assetCards.length}/3</span>
						<span>技能卡: {hand.skillCards.length}/2</span>
					</div>
				</div>
				
				<div className="flex items-center space-x-2">
					<button
						onClick={() => setShowDeckStatus(!showDeckStatus)}
						className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
						title="查看牌组状态"
					>
						<Eye className="w-4 h-4" />
					</button>
					<button
						onClick={handleDrawCards}
						className="btn-primary text-sm flex items-center space-x-1"
						title="抽取新卡牌"
					>
						<Shuffle className="w-4 h-4" />
						<span>抽牌</span>
					</button>
					<button
						onClick={handleResetDeck}
						className="btn-secondary text-sm flex items-center space-x-1"
						title="重置牌组"
					>
						<RefreshCw className="w-4 h-4" />
						<span>重置</span>
					</button>
				</div>
			</div>

			{/* 牌组状态显示 */}
			{showDeckStatus && (
				<div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
					<h4 className="text-sm font-medium text-gray-700 mb-2">牌组状态</h4>
					<div className="grid grid-cols-4 gap-4 text-xs">
						<div>
							<span className="text-gray-500">资产牌组:</span>
							<span className="ml-1 font-medium text-blue-600">{getDeckStatus().assetDeckSize}</span>
						</div>
						<div>
							<span className="text-gray-500">技能牌组:</span>
							<span className="ml-1 font-medium text-orange-600">{getDeckStatus().skillDeckSize}</span>
						</div>
						<div>
							<span className="text-gray-500">事件牌组:</span>
							<span className="ml-1 font-medium text-purple-600">{getDeckStatus().eventDeckSize}</span>
						</div>
						<div>
							<span className="text-gray-500">弃牌堆:</span>
							<span className="ml-1 font-medium text-gray-600">{getDeckStatus().discardPileSize}</span>
						</div>
					</div>
				</div>
			)}

			{/* 手牌显示 */}
			<div className="space-y-4">
				{/* 资产卡区域 */}
				<div>
					<h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
						<span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
						资产卡 ({hand.assetCards.length}/3)
					</h4>
					{hand.assetCards.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
							{hand.assetCards.map((card) => (
								<CardDisplay
									key={card.id}
									card={card}
									onClick={() => handleCardClick(card)}
									selected={selectedCard === card.id}
									className="w-full"
								/>
							))}
						</div>
					) : (
						<div className="text-center py-8 text-gray-500">
							<div className="text-4xl mb-2">📊</div>
							<p>暂无资产卡</p>
							<p className="text-sm">点击"抽牌"按钮抽取新卡牌</p>
						</div>
					)}
				</div>

				{/* 技能卡区域 */}
				<div>
					<h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
						<span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
						技能卡 ({hand.skillCards.length}/2)
					</h4>
					{hand.skillCards.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
							{hand.skillCards.map((card) => (
								<CardDisplay
									key={card.id}
									card={card}
									onClick={() => handleCardClick(card)}
									selected={selectedCard === card.id}
									className="w-full"
								/>
							))}
						</div>
					) : (
						<div className="text-center py-8 text-gray-500">
							<div className="text-4xl mb-2">⚡</div>
							<p>暂无技能卡</p>
							<p className="text-sm">点击"抽牌"按钮抽取新卡牌</p>
						</div>
					)}
				</div>
			</div>

			{/* 手牌说明 */}
			<div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
				<h4 className="text-sm font-medium text-blue-800 mb-2">手牌规则说明</h4>
				<ul className="text-xs text-blue-700 space-y-1">
					<li>• 每回合抽取3张资产卡 + 2张技能卡</li>
					<li>• 资产卡代表投资工具，具有收益和风险属性</li>
					<li>• 技能卡代表投资策略，用于调整资产表现</li>
					<li>• 保底机制确保手牌至少包含资产卡和技能卡</li>
					<li>• 点击卡牌可以选择使用</li>
				</ul>
			</div>
		</div>
	);
};

export default HandArea;
