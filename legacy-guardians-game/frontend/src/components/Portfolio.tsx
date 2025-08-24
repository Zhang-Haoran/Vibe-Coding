import React from 'react';

const Portfolio: React.FC = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
					💼 投资组合管理
				</h1>
				<div className="text-center text-gray-600 mb-8">
					查看你的投资组合表现，管理资产配置，追踪收益和风险！
				</div>
				
				{/* 投资组合内容将在后续开发中实现 */}
				<div className="bg-white rounded-lg shadow-lg p-8 text-center">
					<div className="text-6xl mb-4">💼</div>
					<h2 className="text-xl font-semibold text-gray-700 mb-2">
						投资组合系统开发中
					</h2>
					<p className="text-gray-500">
						资产展示、收益计算、风险评分、分散度分析等功能正在开发中...
					</p>
				</div>
			</div>
		</div>
	);
};

export default Portfolio;
