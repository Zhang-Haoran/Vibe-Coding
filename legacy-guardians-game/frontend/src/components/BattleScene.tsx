import React from 'react';

const BattleScene: React.FC = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-6">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
					⚔️ 投资组合战斗
				</h1>
				<div className="text-center text-gray-600 mb-8">
					使用你的投资组合对抗市场危机，证明你的财商智慧！
				</div>
				
				{/* 战斗内容将在后续开发中实现 */}
				<div className="bg-white rounded-lg shadow-lg p-8 text-center">
					<div className="text-6xl mb-4">⚔️</div>
					<h2 className="text-xl font-semibold text-gray-700 mb-2">
						战斗系统开发中
					</h2>
					<p className="text-gray-500">
						Boss战机制、收益伤害转化、技能卡增益等功能正在开发中...
					</p>
				</div>
			</div>
		</div>
	);
};

export default BattleScene;
