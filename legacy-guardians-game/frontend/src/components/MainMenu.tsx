import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../stores/gameStore';
import { Play, BookOpen, Trophy, Settings, HelpCircle, TestTube, RotateCcw } from 'lucide-react';

const MainMenu: React.FC = () => {
	const navigate = useNavigate();
	const { startNewGame, continueGame } = useGameStore();

	const handleStartNewGame = () => {
		startNewGame();
		navigate('/game-map');
	};

	const handleContinueGame = () => {
		continueGame();
		navigate('/game-map');
	};

	const handleNavigateTo = (path: string) => {
		navigate(path);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
			<div className="max-w-4xl w-full">
				{/* 游戏标题 */}
				<div className="text-center mb-12">
					<h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
						财富守护者：卡牌远征
					</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						让财商教育变得有趣而有效！🎓💰
					</p>
				</div>

				{/* 主要功能菜单 */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{/* 开始新游戏 */}
					<button
						onClick={handleStartNewGame}
						className="menu-card group hover:scale-105 transition-transform duration-300"
					>
						<div className="menu-card-icon bg-gradient-to-br from-green-500 to-emerald-600">
							<Play className="w-8 h-8 text-white" />
						</div>
						<h3 className="menu-card-title">开始新游戏</h3>
						<p className="menu-card-description">
							踏上财富守护之旅，学习投资理财知识
						</p>
					</button>

					{/* 继续游戏 */}
					<button
						onClick={handleContinueGame}
						className="menu-card group hover:scale-105 transition-transform duration-300"
					>
						<div className="menu-card-icon bg-gradient-to-br from-blue-500 to-cyan-600">
							<Play className="w-8 h-8 text-white" />
						</div>
						<h3 className="menu-card-title">继续游戏</h3>
						<p className="menu-card-description">
							继续之前的冒险，继续积累财富
						</p>
					</button>

					{/* 学习中心 */}
					<button
						onClick={() => handleNavigateTo('/learning')}
						className="menu-card group hover:scale-105 transition-transform duration-300"
					>
						<div className="menu-card-icon bg-gradient-to-br from-purple-500 to-pink-600">
							<BookOpen className="w-8 h-8 text-white" />
						</div>
						<h3 className="menu-card-title">学习中心</h3>
						<p className="menu-card-description">
							学习财商知识，提升投资技能
						</p>
					</button>

					{/* 成就系统 */}
					<button
						onClick={() => handleNavigateTo('/achievements')}
						className="menu-card group hover:scale-105 transition-transform duration-300"
					>
						<div className="menu-card-icon bg-gradient-to-br from-yellow-500 to-orange-600">
							<Trophy className="w-8 h-8 text-white" />
						</div>
						<h3 className="menu-card-title">成就系统</h3>
						<p className="menu-card-description">
							查看获得的成就和徽章
						</p>
					</button>

					{/* 游戏设置 */}
					<button
						onClick={() => handleNavigateTo('/settings')}
						className="menu-card group hover:scale-105 transition-transform duration-300"
					>
						<div className="menu-card-icon bg-gradient-to-br from-gray-500 to-slate-600">
							<Settings className="w-8 h-8 text-white" />
						</div>
						<h3 className="menu-card-title">游戏设置</h3>
						<p className="menu-card-description">
							调整游戏参数和个性化设置
						</p>
					</button>

					{/* 游戏帮助 */}
					<button
						onClick={() => handleNavigateTo('/help')}
						className="menu-card group hover:scale-105 transition-transform duration-300"
					>
						<div className="menu-card-icon bg-gradient-to-br from-indigo-500 to-blue-600">
							<HelpCircle className="w-8 h-8 text-white" />
						</div>
						<h3 className="menu-card-title">游戏帮助</h3>
						<p className="menu-card-description">
							查看游戏规则和操作指南
						</p>
					</button>
				</div>

				{/* 开发测试区域 */}
				<div className="text-center space-y-4">
					<div>
						<button
							onClick={() => handleNavigateTo('/test')}
							className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg hover:from-pink-600 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl mr-4"
						>
							<TestTube className="w-5 h-5" />
							<span>开发测试页面</span>
						</button>
						<button
							onClick={() => handleNavigateTo('/game-loop-test')}
							className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
						>
							<RotateCcw className="w-5 h-5" />
							<span>游戏循环测试</span>
						</button>
					</div>
					<div className="text-sm text-gray-500">
						<span className="mr-4">测试核心卡牌系统功能</span>
						<span>测试游戏循环与战斗机制</span>
					</div>
				</div>

				{/* 游戏特色介绍 */}
				<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="text-center p-4">
						<div className="text-3xl mb-2">🎯</div>
						<h4 className="font-semibold text-gray-800 mb-2">策略投资</h4>
						<p className="text-sm text-gray-600">
							通过卡牌系统学习投资策略，培养财商思维
						</p>
					</div>
					<div className="text-center p-4">
						<div className="text-3xl mb-2">🎮</div>
						<h4 className="font-semibold text-gray-800 mb-2">趣味游戏</h4>
						<p className="text-sm text-gray-600">
							将复杂的金融概念转化为有趣的游戏体验
						</p>
					</div>
					<div className="text-center p-4">
						<div className="text-3xl mb-2">📚</div>
						<h4 className="font-semibold text-gray-800 mb-2">知识学习</h4>
						<p className="text-sm text-gray-600">
							系统学习财商知识，提升投资理财能力
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainMenu;
