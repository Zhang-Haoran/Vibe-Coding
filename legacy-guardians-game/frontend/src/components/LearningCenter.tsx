import React from 'react';

const LearningCenter: React.FC = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
					📚 财商学习中心
				</h1>
				<div className="text-center text-gray-600 mb-8">
					学习投资理财知识，完成课程获得徽章，提升你的财商水平！
				</div>
				
				{/* 学习内容将在后续开发中实现 */}
				<div className="bg-white rounded-lg shadow-lg p-8 text-center">
					<div className="text-6xl mb-4">📚</div>
					<h2 className="text-xl font-semibold text-gray-700 mb-2">
						学习系统开发中
					</h2>
					<p className="text-gray-500">
						课程内容、问答小游戏、徽章系统等功能正在开发中...
					</p>
				</div>
			</div>
		</div>
	);
};

export default LearningCenter;
