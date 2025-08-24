import React from 'react';

const Settings: React.FC = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 p-6">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
					⚙️ 游戏设置
				</h1>
				<div className="text-center text-gray-600 mb-8">
					调整游戏参数，配置家长控制，个性化你的游戏体验！
				</div>
				
				{/* 设置内容将在后续开发中实现 */}
				<div className="bg-white rounded-lg shadow-lg p-8 text-center">
					<div className="text-6xl mb-4">⚙️</div>
					<h2 className="text-xl font-semibold text-gray-700 mb-2">
						设置系统开发中
					</h2>
					<p className="text-gray-500">
						游戏参数调整、家长控制面板、学习报告生成等功能正在开发中...
					</p>
				</div>
			</div>
		</div>
	);
};

export default Settings;
