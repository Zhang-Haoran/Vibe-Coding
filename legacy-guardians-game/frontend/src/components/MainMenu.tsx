import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../stores/gameStore';
import { Play, BookOpen, Settings, Trophy, HelpCircle, Save } from 'lucide-react';

const MainMenu: React.FC = () => {
	const navigate = useNavigate();
	const { startNewGame, loadGame } = useGameStore();
	const [showLoadGame, setShowLoadGame] = useState(false);

	const handleNewGame = () => {
		startNewGame();
		navigate('/map');
	};

	const handleContinueGame = () => {
		const savedGame = localStorage.getItem('legacy-guardians-save');
		if (savedGame) {
			try {
				const gameData = JSON.parse(savedGame);
				loadGame(gameData);
				navigate('/map');
			} catch (error) {
				console.error('加载游戏失败:', error);
				alert('加载游戏失败，请重新开始游戏');
			}
		}
	};

	const handleLoadGame = () => {
		setShowLoadGame(!showLoadGame);
	};

	const menuItems = [
		{
			icon: <Play className="w-8 h-8" />,
			title: '开始新游戏',
			description: '踏上财富守护者的冒险之旅',
			action: handleNewGame,
			color: 'from-blue-500 to-purple-600',
			iconColor: 'text-blue-500'
		},
		{
			icon: <Save className="w-8 h-8" />,
			title: '继续游戏',
			description: '继续之前的冒险',
			action: handleContinueGame,
			color: 'from-green-500 to-teal-600',
			iconColor: 'text-green-500'
		},
		{
			icon: <BookOpen className="w-8 h-8" />,
			title: '学习中心',
			description: '学习财商知识和投资技巧',
			action: () => navigate('/learning'),
			color: 'from-purple-500 to-pink-600',
			iconColor: 'text-purple-500'
		},
		{
			icon: <Trophy className="w-8 h-8" />,
			title: '成就系统',
			description: '查看已获得的徽章和成就',
			action: () => navigate('/portfolio'),
			color: 'from-yellow-500 to-orange-600',
			iconColor: 'text-yellow-500'
		},
		{
			icon: <Settings className="w-8 h-8" />,
			title: '游戏设置',
			description: '调整游戏参数和家长控制',
			action: () => navigate('/settings'),
			color: 'from-gray-500 to-slate-600',
			iconColor: 'text-gray-500'
		},
		{
			icon: <HelpCircle className="w-8 h-8" />,
			title: '游戏帮助',
			description: '了解游戏规则和操作方法',
			action: () => alert('游戏帮助功能开发中...'),
			color: 'from-indigo-500 to-blue-600',
			iconColor: 'text-indigo-500'
		}
	];

	return (
		<div className="min-h-screen flex items-center justify-center py-12">
			<div className="max-w-6xl mx-auto px-4">
				{/* 游戏标题 */}
				<div className="text-center mb-12">
					<h1 className="text-6xl font-bold text-gradient mb-4">
						🎮 财富守护者
					</h1>
					<h2 className="text-2xl text-gray-600 mb-6">
						卡牌远征
					</h2>
					<p className="text-lg text-gray-500 max-w-2xl mx-auto">
						在游戏中学习投资理财，成为真正的财富守护者！
					</p>
				</div>

				{/* 主菜单网格 */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{menuItems.map((item, index) => (
						<div
							key={index}
							onClick={item.action}
							className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
						>
							<div className={`bg-gradient-to-br ${item.color} rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
								<div className="flex flex-col items-center text-center space-y-4">
									<div className={`${item.iconColor} bg-white/20 p-4 rounded-full`}>
										{item.icon}
									</div>
									<h3 className="text-xl font-bold">{item.title}</h3>
									<p className="text-white/80 text-sm leading-relaxed">
										{item.description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* 游戏特色说明 */}
				<div className="mt-16 text-center">
					<h3 className="text-2xl font-bold text-gray-800 mb-6">
						游戏特色
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="space-y-3">
							<div className="text-4xl">🎯</div>
							<h4 className="text-lg font-semibold text-gray-700">财商教育</h4>
							<p className="text-gray-600 text-sm">
								通过游戏化方式学习投资组合管理、风险分散等财商概念
							</p>
						</div>
						<div className="space-y-3">
							<div className="text-4xl">🃏</div>
							<h4 className="text-lg font-semibold text-gray-700">卡牌策略</h4>
							<p className="text-gray-600 text-sm">
								双槽卡牌系统，资产卡与技能卡配合，制定投资策略
							</p>
						</div>
						<div className="space-y-3">
							<div className="text-4xl">🗺️</div>
							<h4 className="text-lg font-semibold text-gray-700">冒险地图</h4>
							<p className="text-gray-600 text-sm">
								Roguelike地图设计，挑战市场危机，击败经济Boss
							</p>
						</div>
					</div>
				</div>

				{/* 版本信息 */}
				<div className="mt-12 text-center text-gray-500 text-sm">
					<p>版本 0.1.0 | 财富守护者：卡牌远征</p>
					<p className="mt-1">让财商教育变得有趣而有效</p>
				</div>
			</div>
		</div>
	);
};

export default MainMenu;
