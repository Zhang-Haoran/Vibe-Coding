import React from 'react';
import { Card, AssetCard, SkillCard, EventCard, CardRarity, AssetType } from '../types/cards';
import { Coins, TrendingUp, Shield, Zap } from 'lucide-react';

interface CardDisplayProps {
	card: Card;
	onClick?: () => void;
	selected?: boolean;
	disabled?: boolean;
	showCost?: boolean;
	className?: string;
}

const CardDisplay: React.FC<CardDisplayProps> = ({
	card,
	onClick,
	selected = false,
	disabled = false,
	showCost = true,
	className = ''
}) => {
	// 获取卡牌稀有度颜色
	const getRarityColor = (rarity: CardRarity): string => {
		switch (rarity) {
			case CardRarity.COMMON:
				return 'border-gray-300 bg-gray-50';
			case CardRarity.UNCOMMON:
				return 'border-green-300 bg-green-50';
			case CardRarity.RARE:
				return 'border-blue-300 bg-blue-50';
			case CardRarity.EPIC:
				return 'border-purple-300 bg-purple-50';
			case CardRarity.LEGENDARY:
				return 'border-yellow-300 bg-yellow-50';
			default:
				return 'border-gray-300 bg-gray-50';
		}
	};

	// 获取资产类型颜色
	const getAssetTypeColor = (assetType: AssetType): string => {
		switch (assetType) {
			case AssetType.STOCK:
				return 'border-l-blue-500';
			case AssetType.BOND:
				return 'border-l-green-500';
			case AssetType.ETF:
				return 'border-l-purple-500';
			case AssetType.GOLD:
				return 'border-l-yellow-500';
			case AssetType.STABLECOIN:
				return 'border-l-gray-500';
			case AssetType.CRYPTO:
				return 'border-l-pink-500';
			case AssetType.REAL_ESTATE:
				return 'border-l-orange-500';
			case AssetType.COMMODITY:
				return 'border-l-red-500';
			default:
				return 'border-l-gray-500';
		}
	};

	// 获取卡牌类型图标
	const getCardTypeIcon = (card: Card) => {
		if (card.type === 'asset') {
			return <TrendingUp className="w-4 h-4 text-blue-600" />;
		} else if (card.type === 'skill') {
			return <Zap className="w-4 h-4 text-orange-600" />;
		} else if (card.type === 'event') {
			return <Shield className="w-4 h-4 text-purple-600" />;
		}
		return null;
	};

	// 渲染资产卡
	const renderAssetCard = (assetCard: AssetCard) => (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<span className="text-xs font-medium text-gray-600">资产类型</span>
				<span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
					{assetCard.assetType}
				</span>
			</div>
			<div className="grid grid-cols-2 gap-2 text-xs">
				<div>
					<span className="text-gray-500">收益:</span>
					<span className={`ml-1 font-medium ${assetCard.baseReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
						{assetCard.baseReturn > 0 ? '+' : ''}{assetCard.baseReturn}%
					</span>
				</div>
				<div>
					<span className="text-gray-500">风险:</span>
					<span className="ml-1 font-medium text-orange-600">{assetCard.baseRisk}/10</span>
				</div>
				<div>
					<span className="text-gray-500">波动:</span>
					<span className="ml-1 font-medium text-purple-600">{assetCard.volatility}/10</span>
				</div>
				<div>
					<span className="text-gray-500">市场:</span>
					<span className="ml-1 font-medium text-indigo-600">
						{assetCard.marketCondition.replace('_', ' ')}
					</span>
				</div>
			</div>
		</div>
	);

	// 渲染技能卡
	const renderSkillCard = (skillCard: SkillCard) => (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<span className="text-xs font-medium text-gray-600">技能类型</span>
				<span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded">
					{skillCard.skillType.replace('_', ' ')}
				</span>
			</div>
			<div className="text-xs">
				<span className="text-gray-500">激活:</span>
				<span className="ml-1 font-medium text-indigo-600">
					{skillCard.activation.replace('_', ' ')}
				</span>
			</div>
			{skillCard.cooldown && (
				<div className="text-xs">
					<span className="text-gray-500">冷却:</span>
					<span className="ml-1 font-medium text-red-600">{skillCard.cooldown}回合</span>
				</div>
			)}
		</div>
	);

	// 渲染事件卡
	const renderEventCard = (eventCard: EventCard) => (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<span className="text-xs font-medium text-gray-600">事件类型</span>
				<span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded">
					{eventCard.eventType.replace('_', ' ')}
				</span>
			</div>
			<div className="text-xs">
				<span className="text-gray-500">触发:</span>
				<span className="ml-1 font-medium text-indigo-600">
					{eventCard.trigger.replace('_', ' ')}
				</span>
			</div>
			{eventCard.duration && (
				<div className="text-xs">
					<span className="text-gray-500">持续:</span>
					<span className="ml-1 font-medium text-green-600">{eventCard.duration}回合</span>
				</div>
			)}
		</div>
	);

	return (
		<div
			onClick={onClick}
			className={`
				relative group cursor-pointer transform transition-all duration-300
				${selected ? 'scale-105 ring-2 ring-blue-500' : 'hover:scale-105'}
				${disabled ? 'opacity-50 cursor-not-allowed' : ''}
				${className}
			`}
		>
			<div
				className={`
					w-full h-48 rounded-lg shadow-lg border-2 overflow-hidden
					${getRarityColor(card.rarity)}
					${card.type === 'asset' ? getAssetTypeColor((card as AssetCard).assetType) : ''}
					${card.type === 'skill' ? 'border-l-orange-500' : ''}
					${card.type === 'event' ? 'border-l-purple-500' : ''}
					${selected ? 'ring-2 ring-blue-500' : ''}
					${disabled ? 'opacity-50' : ''}
				`}
			>
				{/* 卡牌头部 */}
				<div className="p-3 bg-white border-b border-gray-200">
					<div className="flex items-center justify-between mb-2">
						<div className="flex items-center space-x-2">
							{getCardTypeIcon(card)}
							<span className="text-sm font-bold text-gray-800">{card.name}</span>
						</div>
						{showCost && (
							<div className="flex items-center space-x-1 text-yellow-600">
								<Coins className="w-4 h-4" />
								<span className="text-sm font-bold">{card.cost}</span>
							</div>
						)}
					</div>
					<p className="text-xs text-gray-600 line-clamp-2">{card.description}</p>
				</div>

				{/* 卡牌内容 */}
				<div className="p-3">
					{card.type === 'asset' && renderAssetCard(card as AssetCard)}
					{card.type === 'skill' && renderSkillCard(card as SkillCard)}
					{card.type === 'event' && renderEventCard(card as EventCard)}
				</div>

				{/* 稀有度标识 */}
				<div className="absolute top-2 right-2">
					<div className={`
						w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
						${card.rarity === CardRarity.COMMON ? 'bg-gray-200 text-gray-700' : ''}
						${card.rarity === CardRarity.UNCOMMON ? 'bg-green-200 text-green-700' : ''}
						${card.rarity === CardRarity.RARE ? 'bg-blue-200 text-blue-700' : ''}
						${card.rarity === CardRarity.EPIC ? 'bg-purple-200 text-purple-700' : ''}
						${card.rarity === CardRarity.LEGENDARY ? 'bg-yellow-200 text-yellow-700' : ''}
					`}>
						{card.rarity.charAt(0).toUpperCase()}
					</div>
				</div>

				{/* 悬停效果 */}
				{!disabled && (
					<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg" />
				)}
			</div>
		</div>
	);
};

export default CardDisplay;
