import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../stores/gameStore';
import { Heart, Coins, Star, Trophy, Settings as SettingsIcon } from 'lucide-react';

const GameHeader: React.FC = () => {
	const navigate = useNavigate();
	const { player, gamePhase } = useGameStore();

	const handleNavigation = (path: string) => {
		navigate(path);
	};

	return (
		<header className="game-header">
			<div className="container mx-auto px-4 py-3">
				<div className="flex items-center justify-between">
					{/* 游戏标题 */}
					<div className="flex items-center space-x-3">
						<div className="text-2xl font-bold text-gradient">
							🎮 财富守护者
						</div>
						<div className="text-sm text-gray-600">
							卡牌远征
						</div>
					</div>

					{/* 玩家状态 */}
					<div className="flex items-center space-x-6">
						{/* 生命值 */}
						<div className="flex items-center space-x-2">
							<Heart className="w-5 h-5 text-red-500" />
							<div className="text-sm">
								<span className="font-medium">{player.health}</span>
								<span className="text-gray-500">/{player.maxHealth}</span>
							</div>
						</div>

						{/* 探险币 */}
						<div className="flex items-center space-x-2">
							<Coins className="w-5 h-5 text-yellow-500" />
							<div className="text-sm">
								<span className="font-medium">{player.adventureCoins}</span>
								<span className="text-gray-500">/{player.maxAdventureCoins}</span>
							</div>
						</div>

						{/* 等级和经验 */}
						<div className="flex items-center space-x-2">
							<Star className="w-5 h-5 text-blue-500" />
							<div className="text-sm">
								<span className="font-medium">Lv.{player.level}</span>
								<span className="text-gray-500"> ({player.experience}/100)</span>
							</div>
						</div>

						{/* 成就徽章 */}
						<div className="flex items-center space-x-2">
							<Trophy className="w-5 h-5 text-purple-500" />
							<div className="text-sm">
								<span className="font-medium">{player.learningProgress.badges.length}</span>
								<span className="text-gray-500"> 徽章</span>
							</div>
						</div>
					</div>

					{/* 导航按钮 */}
					<div className="flex items-center space-x-3">
						<button
							onClick={() => handleNavigation('/portfolio')}
							className="btn-secondary text-sm"
						>
							投资组合
						</button>
						<button
							onClick={() => handleNavigation('/learning')}
							className="btn-secondary text-sm"
						>
							学习中心
						</button>
						<button
							onClick={() => handleNavigation('/settings')}
							className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
						>
							<SettingsIcon className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* 进度条 */}
				<div className="mt-3 space-y-2">
					{/* 生命值进度条 */}
					<div className="flex items-center space-x-2">
						<span className="text-xs text-gray-600 w-16">生命值</span>
						<div className="progress-bar flex-1">
							<div
								className="progress-fill health"
								style={{ width: `${(player.health / player.maxHealth) * 100}%` }}
							/>
						</div>
					</div>

					{/* 经验进度条 */}
					<div className="flex items-center space-x-2">
						<span className="text-xs text-gray-600 w-16">经验值</span>
						<div className="progress-bar flex-1">
							<div
								className="progress-fill experience"
								style={{ width: `${(player.experience % 100)}%` }}
							/>
						</div>
					</div>

					{/* 风险评分进度条 */}
					<div className="flex items-center space-x-2">
						<span className="text-xs text-gray-600 w-16">风险评分</span>
						<div className="progress-bar flex-1">
							<div
								className="progress-fill risk"
								style={{ width: `${player.portfolio.riskScore}%` }}
							/>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default GameHeader;
