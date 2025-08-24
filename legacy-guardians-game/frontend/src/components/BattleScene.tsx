import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
	Heart, 
	Sword, 
	Shield, 
	Zap, 
	Target, 
	AlertTriangle,
	CheckCircle,
	XCircle
} from 'lucide-react';
import { Enemy, BattleAction, BattleState } from '../types/game';
import { EnemyFactory } from '../utils/enemyFactory';
import { GameLoopManager } from '../utils/gameLoopManager';

interface BattleSceneProps {
	onBattleEnd: (victory: boolean, rewards?: any[]) => void;
	initialEnemy?: Enemy;
	playerLevel?: number;
}

const BattleScene: React.FC<BattleSceneProps> = ({ 
	onBattleEnd, 
	initialEnemy, 
	playerLevel = 1 
}) => {
	const [battleState, setBattleState] = useState<BattleState>({
		isInBattle: true,
		enemy: initialEnemy || EnemyFactory.getInstance().generateEnemyForLevel(playerLevel),
		battleRound: 1,
		playerHealth: 100,
		enemyHealth: initialEnemy?.maxHealth || 100,
		battleActions: [],
		battleRewards: []
	});

	const [gameLoopManager] = useState(() => new GameLoopManager());
	const [selectedAction, setSelectedAction] = useState<string>('');
	const [battleLog, setBattleLog] = useState<string[]>([]);
	const [isPlayerTurn, setIsPlayerTurn] = useState(true);
	const [actionPoints, setActionPoints] = useState(5);
	const [showRewards, setShowRewards] = useState(false);

	useEffect(() => {
		if (battleState.enemy) {
			gameLoopManager.startBattle(battleState.enemy);
			addBattleLog(`遭遇了 ${battleState.enemy.name}！`);
			addBattleLog(`敌人等级: ${battleState.enemy.level}`);
		}

		return () => {
			gameLoopManager.destroy();
		};
	}, []);

	// 添加战斗日志
	const addBattleLog = (message: string) => {
		setBattleLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
	};

	// 玩家攻击
	const handlePlayerAttack = () => {
		if (!battleState.enemy || actionPoints < 1) return;

		const damage = Math.floor(Math.random() * 20) + 10; // 10-30伤害
		const newEnemyHealth = Math.max(0, battleState.enemyHealth - damage);
		
		setBattleState(prev => ({
			...prev,
			enemyHealth: newEnemyHealth
		}));

		setActionPoints(prev => prev - 1);
		addBattleLog(`你对 ${battleState.enemy?.name} 造成了 ${damage} 点伤害！`);

		if (newEnemyHealth <= 0) {
			handleBattleVictory();
		} else {
			setIsPlayerTurn(false);
			setTimeout(() => handleEnemyTurn(), 1000);
		}
	};

	// 玩家防御
	const handlePlayerDefend = () => {
		if (actionPoints < 1) return;

		setActionPoints(prev => prev - 1);
		addBattleLog('你采取了防御姿态！');
		
		setIsPlayerTurn(false);
		setTimeout(() => handleEnemyTurn(), 1000);
	};

	// 使用技能卡
	const handleUseSkill = () => {
		if (actionPoints < 2) return;

		setActionPoints(prev => prev - 2);
		addBattleLog('你使用了技能卡！');
		
		// 技能效果
		const healing = Math.floor(Math.random() * 15) + 10;
		const newPlayerHealth = Math.min(100, battleState.playerHealth + healing);
		
		setBattleState(prev => ({
			...prev,
			playerHealth: newPlayerHealth
		}));

		addBattleLog(`你恢复了 ${healing} 点生命值！`);
		
		setIsPlayerTurn(false);
		setTimeout(() => handleEnemyTurn(), 1000);
	};

	// 敌人回合
	const handleEnemyTurn = () => {
		if (!battleState.enemy) return;

		const enemy = battleState.enemy;
		const damage = Math.floor(Math.random() * enemy.attack) + 5;
		const newPlayerHealth = Math.max(0, battleState.playerHealth - damage);

		setBattleState(prev => ({
			...prev,
			playerHealth: newPlayerHealth
		}));

		addBattleLog(`${enemy.name} 对你造成了 ${damage} 点伤害！`);

		if (newPlayerHealth <= 0) {
			handleBattleDefeat();
		} else {
			setIsPlayerTurn(true);
			setActionPoints(5); // 重置行动点数
		}
	};

	// 战斗胜利
	const handleBattleVictory = () => {
		addBattleLog(`你击败了 ${battleState.enemy?.name}！`);
		setShowRewards(true);
		
		// 延迟结束战斗
		setTimeout(() => {
			onBattleEnd(true, battleState.battleRewards);
		}, 3000);
	};

	// 战斗失败
	const handleBattleDefeat = () => {
		addBattleLog('你被击败了...');
		setTimeout(() => {
			onBattleEnd(false);
		}, 2000);
	};

	// 跳过回合
	const handleSkipTurn = () => {
		setIsPlayerTurn(false);
		setTimeout(() => handleEnemyTurn(), 1000);
	};

	// 获取敌人弱点描述
	const getWeaknessDescription = () => {
		if (!battleState.enemy) return '';
		return EnemyFactory.getInstance().getWeaknessDescription(battleState.enemy.weaknesses);
	};

	// 获取敌人抗性描述
	const getResistanceDescription = () => {
		if (!battleState.enemy) return '';
		return EnemyFactory.getInstance().getResistanceDescription(battleState.enemy.resistances);
	};

	if (showRewards) {
		return (
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center p-4"
			>
				<div className="bg-white rounded-lg p-8 text-center max-w-md w-full">
					<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-gray-800 mb-4">战斗胜利！</h2>
					<p className="text-gray-600 mb-6">你成功击败了敌人</p>
					
					{battleState.battleRewards.length > 0 && (
						<div className="space-y-2 mb-6">
							<h3 className="font-semibold text-gray-700">获得奖励：</h3>
							{battleState.battleRewards.map((reward, index) => (
								<div key={index} className="text-sm text-gray-600">
									{reward.description}
								</div>
							))}
						</div>
					)}
					
					<div className="text-sm text-gray-500">
						正在返回游戏...
					</div>
				</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="min-h-screen bg-gradient-to-br from-red-900 to-red-700 p-4"
		>
			{/* 战斗状态栏 */}
			<div className="max-w-6xl mx-auto">
				{/* 玩家状态 */}
				<div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
					<div className="flex items-center justify-between text-white">
						<div className="flex items-center space-x-4">
							<div className="text-center">
								<div className="text-sm opacity-80">玩家</div>
								<div className="flex items-center space-x-2">
									<Heart className="w-5 h-5 text-red-400" />
									<span className="font-bold text-lg">
										{battleState.playerHealth}/100
									</span>
								</div>
							</div>
							<div className="text-center">
								<div className="text-sm opacity-80">行动点数</div>
								<div className="flex items-center space-x-2">
									<Zap className="w-5 h-5 text-yellow-400" />
									<span className="font-bold text-lg">{actionPoints}</span>
								</div>
							</div>
						</div>
						<div className="text-right">
							<div className="text-sm opacity-80">回合</div>
							<div className="font-bold text-lg">{battleState.battleRound}</div>
						</div>
					</div>
				</div>

				{/* 敌人信息 */}
				{battleState.enemy && (
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-4 text-center"
					>
						<div className="text-white mb-4">
							<h2 className="text-2xl font-bold mb-2">{battleState.enemy.name}</h2>
							<p className="text-sm opacity-80 mb-4">{battleState.enemy.description}</p>
							
							{/* 敌人状态 */}
							<div className="flex items-center justify-center space-x-6 mb-4">
								<div className="text-center">
									<div className="text-sm opacity-80">生命值</div>
									<div className="flex items-center space-x-2">
										<Heart className="w-5 h-5 text-red-400" />
										<span className="font-bold">
											{battleState.enemyHealth}/{battleState.enemy.maxHealth}
										</span>
									</div>
								</div>
								<div className="text-center">
									<div className="text-sm opacity-80">攻击力</div>
									<div className="flex items-center space-x-2">
										<Sword className="w-5 h-5 text-blue-400" />
										<span className="font-bold">{battleState.enemy.attack}</span>
									</div>
								</div>
								<div className="text-center">
									<div className="text-sm opacity-80">防御力</div>
									<div className="flex items-center space-x-2">
										<Shield className="w-5 h-5 text-green-400" />
										<span className="font-bold">{battleState.enemy.defense}</span>
									</div>
								</div>
							</div>

							{/* 敌人能力 */}
							{battleState.enemy.abilities.length > 0 && (
								<div className="mb-4">
									<div className="text-sm opacity-80 mb-2">特殊能力：</div>
									<div className="flex flex-wrap justify-center gap-2">
										{battleState.enemy.abilities.map((ability) => (
											<div
												key={ability.id}
												className="bg-white/20 rounded px-3 py-1 text-sm"
												title={ability.description}
											>
												{ability.name}
											</div>
										))}
									</div>
								</div>
							)}

							{/* 弱点与抗性 */}
							<div className="grid grid-cols-2 gap-4 text-sm">
								{battleState.enemy.weaknesses.length > 0 && (
									<div className="text-left">
										<div className="text-green-400 font-semibold mb-1">弱点：</div>
										<div className="opacity-80">{getWeaknessDescription()}</div>
									</div>
								)}
								{battleState.enemy.resistances.length > 0 && (
									<div className="text-right">
										<div className="text-red-400 font-semibold mb-1">抗性：</div>
										<div className="opacity-80">{getResistanceDescription()}</div>
									</div>
								)}
							</div>
						</div>
					</motion.div>
				)}

				{/* 战斗行动区域 */}
				{isPlayerTurn && (
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-4"
					>
						<h3 className="text-white text-lg font-semibold mb-4 text-center">你的回合</h3>
						
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<button
								onClick={handlePlayerAttack}
								disabled={actionPoints < 1}
								className={`flex flex-col items-center p-4 rounded-lg transition-all ${
									actionPoints >= 1
										? 'bg-red-600 hover:bg-red-700 text-white'
										: 'bg-gray-600 text-gray-400 cursor-not-allowed'
								}`}
							>
								<Sword className="w-8 h-8 mb-2" />
								<span className="font-semibold">攻击</span>
								<span className="text-sm opacity-80">消耗 1 点</span>
							</button>

							<button
								onClick={handlePlayerDefend}
								disabled={actionPoints < 1}
								className={`flex flex-col items-center p-4 rounded-lg transition-all ${
									actionPoints >= 1
										? 'bg-blue-600 hover:bg-blue-700 text-white'
										: 'bg-gray-600 text-gray-400 cursor-not-allowed'
								}`}
							>
								<Shield className="w-8 h-8 mb-2" />
								<span className="font-semibold">防御</span>
								<span className="text-sm opacity-80">消耗 1 点</span>
							</button>

							<button
								onClick={handleUseSkill}
								disabled={actionPoints < 2}
								className={`flex flex-col items-center p-4 rounded-lg transition-all ${
									actionPoints >= 2
										? 'bg-purple-600 hover:bg-purple-700 text-white'
										: 'bg-gray-600 text-gray-400 cursor-not-allowed'
								}`}
							>
								<Zap className="w-8 h-8 mb-2" />
								<span className="font-semibold">技能</span>
								<span className="text-sm opacity-80">消耗 2 点</span>
							</button>

							<button
								onClick={handleSkipTurn}
								className="flex flex-col items-center p-4 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-all"
							>
								<Target className="w-8 h-8 mb-2" />
								<span className="font-semibold">跳过</span>
								<span className="text-sm opacity-80">不消耗点数</span>
							</button>
						</div>
					</motion.div>
				)}

				{/* 战斗日志 */}
				<div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
					<h3 className="text-white text-lg font-semibold mb-3">战斗日志</h3>
					<div className="bg-black/30 rounded p-3 h-32 overflow-y-auto">
						{battleLog.map((log, index) => (
							<div key={index} className="text-white text-sm mb-1">
								{log}
							</div>
						))}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default BattleScene;
