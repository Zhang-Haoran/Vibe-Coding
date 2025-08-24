import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
	Play, 
	Pause, 
	SkipForward, 
	RotateCcw, 
	Clock, 
	Zap,
	Target,
	Shield,
	Sword,
	Heart
} from 'lucide-react';
import { GamePhase, TurnState, BattleState, ActionPointSystem, GameLoopState } from '../types/game';
import { GameLoopManager } from '../utils/gameLoopManager';
import { EnemyFactory } from '../utils/enemyFactory';
import { Enemy } from '../types/game';

const GameLoopTest: React.FC = () => {
	const [gameLoopManager] = useState(() => new GameLoopManager());
	const [turnState, setTurnState] = useState<TurnState>(gameLoopManager.getTurnState());
	const [battleState, setBattleState] = useState<BattleState>(gameLoopManager.getBattleState());
	const [actionPointSystem, setActionPointSystem] = useState<ActionPointSystem>(gameLoopManager.getActionPointSystem());
	const [gameLoopState, setGameLoopState] = useState<GameLoopState>(gameLoopManager.getGameLoopState());
	const [enemyFactory] = useState(() => EnemyFactory.getInstance());
	const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
	const [autoAdvance, setAutoAdvance] = useState(false);
	const [phaseDuration, setPhaseDuration] = useState(30);

	// 更新状态
	useEffect(() => {
		const updateState = () => {
			setTurnState(gameLoopManager.getTurnState());
			setBattleState(gameLoopManager.getBattleState());
			setActionPointSystem(gameLoopManager.getActionPointSystem());
			setGameLoopState(gameLoopManager.getGameLoopState());
		};

		const interval = setInterval(updateState, 100);
		return () => clearInterval(interval);
	}, [gameLoopManager]);

	// 开始游戏循环
	const handleStartGameLoop = () => {
		gameLoopManager.startGameLoop();
	};

	// 停止游戏循环
	const handleStopGameLoop = () => {
		gameLoopManager.stopGameLoop();
	};

	// 暂停游戏
	const handlePauseGame = () => {
		gameLoopManager.pauseGame();
	};

	// 恢复游戏
	const handleResumeGame = () => {
		gameLoopManager.resumeGame();
	};

	// 开始新回合
	const handleStartNewTurn = () => {
		gameLoopManager.startNewTurn();
	};

	// 推进阶段
	const handleAdvancePhase = () => {
		gameLoopManager.advancePhase();
	};

	// 设置自动推进
	const handleSetAutoAdvance = (value: boolean) => {
		setAutoAdvance(value);
		gameLoopManager.setAutoAdvance(value);
	};

	// 设置阶段持续时间
	const handleSetPhaseDuration = (duration: number) => {
		setPhaseDuration(duration);
		gameLoopManager.setPhaseDuration(duration);
	};

	// 生成敌人
	const handleGenerateEnemy = (level: number, isBoss: boolean = false) => {
		const enemy = isBoss 
			? enemyFactory.createBossEnemy(level)
			: enemyFactory.createNormalEnemy(level);
		setCurrentEnemy(enemy);
	};

	// 开始战斗
	const handleStartBattle = () => {
		if (currentEnemy) {
			gameLoopManager.startBattle(currentEnemy);
		}
	};

	// 结束战斗
	const handleEndBattle = () => {
		gameLoopManager.endBattle();
	};

	// 使用行动点数
	const handleUseActionPoints = (amount: number) => {
		if (gameLoopManager.hasEnoughActionPoints(amount)) {
			gameLoopManager.useActionPoints(amount);
		}
	};

	// 获取阶段名称
	const getPhaseName = (phase: GamePhase): string => {
		const phaseNames: Record<GamePhase, string> = {
			[GamePhase.PREPARE]: '准备阶段',
			[GamePhase.DRAW]: '抽牌阶段',
			[GamePhase.ACTION]: '行动阶段',
			[GamePhase.EVENT]: '事件阶段',
			[GamePhase.RESOLUTION]: '结算阶段',
			[GamePhase.REWARD]: '奖励阶段'
		};
		return phaseNames[phase];
	};

	// 获取阶段颜色
	const getPhaseColor = (phase: GamePhase): string => {
		const phaseColors: Record<GamePhase, string> = {
			[GamePhase.PREPARE]: 'bg-blue-500',
			[GamePhase.DRAW]: 'bg-green-500',
			[GamePhase.ACTION]: 'bg-yellow-500',
			[GamePhase.EVENT]: 'bg-purple-500',
			[GamePhase.RESOLUTION]: 'bg-orange-500',
			[GamePhase.REWARD]: 'bg-pink-500'
		};
		return phaseColors[phase];
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-3xl font-bold text-white text-center mb-8">
					游戏循环测试 - 阶段3
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* 游戏循环控制 */}
					<div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
						<h2 className="text-xl font-semibold text-white mb-4 flex items-center">
							<Play className="w-5 h-5 mr-2" />
							游戏循环控制
						</h2>
						
						<div className="space-y-4">
							<div className="flex flex-wrap gap-2">
								<button
									onClick={handleStartGameLoop}
									disabled={gameLoopState.isActive}
									className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-all flex items-center"
								>
									<Play className="w-4 h-4 mr-2" />
									开始
								</button>
								<button
									onClick={handleStopGameLoop}
									disabled={!gameLoopState.isActive}
									className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-all flex items-center"
								>
									<Pause className="w-4 h-4 mr-2" />
									停止
								</button>
								<button
									onClick={handlePauseGame}
									disabled={!gameLoopState.isActive || gameLoopState.paused}
									className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white rounded-lg transition-all flex items-center"
								>
									<Pause className="w-4 h-4 mr-2" />
									暂停
								</button>
								<button
									onClick={handleResumeGame}
									disabled={!gameLoopState.isActive || !gameLoopState.paused}
									className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-all flex items-center"
								>
									<Play className="w-4 h-4 mr-2" />
									恢复
								</button>
							</div>

							<div className="flex flex-wrap gap-2">
								<button
									onClick={handleStartNewTurn}
									disabled={!gameLoopState.isActive}
									className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition-all flex items-center"
								>
									<RotateCcw className="w-4 h-4 mr-2" />
									新回合
								</button>
								<button
									onClick={handleAdvancePhase}
									disabled={!gameLoopState.isActive}
									className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white rounded-lg transition-all flex items-center"
								>
									<SkipForward className="w-4 h-4 mr-2" />
									推进阶段
								</button>
							</div>

							<div className="flex items-center space-x-4">
								<label className="flex items-center text-white">
									<input
										type="checkbox"
										checked={autoAdvance}
										onChange={(e) => handleSetAutoAdvance(e.target.checked)}
										className="mr-2"
									/>
									自动推进阶段
								</label>
							</div>

							<div className="flex items-center space-x-4">
								<label className="text-white">
									阶段持续时间:
									<input
										type="range"
										min="10"
										max="60"
										value={phaseDuration}
										onChange={(e) => handleSetPhaseDuration(Number(e.target.value))}
										className="ml-2 w-32"
									/>
									<span className="ml-2">{phaseDuration}秒</span>
								</label>
							</div>
						</div>
					</div>

					{/* 当前状态显示 */}
					<div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
						<h2 className="text-xl font-semibold text-white mb-4 flex items-center">
							<Clock className="w-5 h-5 mr-2" />
							当前状态
						</h2>
						
						<div className="space-y-4 text-white">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<div className="text-sm opacity-80">回合数</div>
									<div className="font-bold text-lg">{turnState.currentTurn}</div>
								</div>
								<div>
									<div className="text-sm opacity-80">当前阶段</div>
									<div className={`inline-block px-2 py-1 rounded text-sm font-semibold ${getPhaseColor(turnState.currentPhase)}`}>
										{getPhaseName(turnState.currentPhase)}
									</div>
								</div>
							</div>
							
							<div>
								<div className="text-sm opacity-80 mb-2">阶段剩余时间</div>
								<div className="w-full bg-gray-700 rounded-full h-2">
									<div 
										className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
										style={{ width: `${(turnState.phaseTimeRemaining / phaseDuration) * 100}%` }}
									></div>
								</div>
								<div className="text-right text-sm mt-1">{turnState.phaseTimeRemaining}秒</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<div className="text-sm opacity-80">行动点数</div>
									<div className="flex items-center">
										<Zap className="w-4 h-4 text-yellow-400 mr-1" />
										<span className="font-bold">{turnState.actionPoints}/{actionPointSystem.maxPoints}</span>
									</div>
								</div>
								<div>
									<div className="text-sm opacity-80">是否玩家回合</div>
									<div className={turnState.isPlayerTurn ? 'text-green-400' : 'text-red-400'}>
										{turnState.isPlayerTurn ? '是' : '否'}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 行动点数测试 */}
				<div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-6">
					<h2 className="text-xl font-semibold text-white mb-4 flex items-center">
						<Zap className="w-5 h-5 mr-2" />
						行动点数测试
					</h2>
					
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<button
							onClick={() => handleUseActionPoints(1)}
							disabled={!gameLoopManager.hasEnoughActionPoints(1)}
							className="flex flex-col items-center p-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
							style={{ backgroundColor: gameLoopManager.hasEnoughActionPoints(1) ? '#dc2626' : '#6b7280' }}
						>
							<Sword className="w-8 h-8 mb-2 text-white" />
							<span className="font-semibold text-white">使用1点</span>
							<span className="text-sm text-white opacity-80">攻击/移动</span>
						</button>

						<button
							onClick={() => handleUseActionPoints(2)}
							disabled={!gameLoopManager.hasEnoughActionPoints(2)}
							className="flex flex-col items-center p-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
							style={{ backgroundColor: gameLoopManager.hasEnoughActionPoints(2) ? '#7c3aed' : '#6b7280' }}
						>
							<Zap className="w-8 h-8 mb-2 text-white" />
							<span className="font-semibold text-white">使用2点</span>
							<span className="text-sm text-white opacity-80">技能</span>
						</button>

						<button
							onClick={() => handleUseActionPoints(3)}
							disabled={!gameLoopManager.hasEnoughActionPoints(3)}
							className="flex flex-col items-center p-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
							style={{ backgroundColor: gameLoopManager.hasEnoughActionPoints(3) ? '#059669' : '#6b7280' }}
						>
							<Target className="w-8 h-8 mb-2 text-white" />
							<span className="font-semibold text-white">使用3点</span>
							<span className="text-sm text-white opacity-80">特殊行动</span>
						</button>

						<button
							onClick={() => handleUseActionPoints(5)}
							disabled={!gameLoopManager.hasEnoughActionPoints(5)}
							className="flex flex-col items-center p-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
							style={{ backgroundColor: gameLoopManager.hasEnoughActionPoints(5) ? '#dc2626' : '#6b7280' }}
						>
							<Shield className="w-8 h-8 mb-2 text-white" />
							<span className="font-semibold text-white">使用5点</span>
							<span className="text-sm text-white opacity-80">终极技能</span>
						</button>
					</div>
				</div>

				{/* 敌人生成测试 */}
				<div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-6">
					<h2 className="text-xl font-semibold text-white mb-4 flex items-center">
						<Target className="w-5 h-5 mr-2" />
						敌人生成测试
					</h2>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h3 className="text-lg font-semibold text-white mb-3">生成敌人</h3>
							<div className="space-y-3">
								<div className="flex items-center space-x-2">
									<label className="text-white text-sm">等级:</label>
									<input
										type="number"
										min="1"
										max="20"
										defaultValue="1"
										className="w-16 px-2 py-1 rounded text-black"
									/>
								</div>
								<div className="flex space-x-2">
									<button
										onClick={() => handleGenerateEnemy(1, false)}
										className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
									>
										生成普通敌人
									</button>
									<button
										onClick={() => handleGenerateEnemy(1, true)}
										className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
									>
										生成Boss敌人
									</button>
								</div>
							</div>
						</div>

						{currentEnemy && (
							<div className="bg-white/20 rounded-lg p-4">
								<h3 className="text-lg font-semibold text-white mb-3">当前敌人</h3>
								<div className="text-white space-y-2">
									<div><span className="opacity-80">名称:</span> {currentEnemy.name}</div>
									<div><span className="opacity-80">等级:</span> {currentEnemy.level}</div>
									<div><span className="opacity-80">生命值:</span> {currentEnemy.maxHealth}</div>
									<div><span className="opacity-80">攻击力:</span> {currentEnemy.attack}</div>
									<div><span className="opacity-80">防御力:</span> {currentEnemy.defense}</div>
									<div><span className="opacity-80">描述:</span> {currentEnemy.description}</div>
									
									{currentEnemy.weaknesses.length > 0 && (
										<div>
											<span className="opacity-80">弱点:</span> 
											{enemyFactory.getWeaknessDescription(currentEnemy.weaknesses)}
										</div>
									)}
									
									{currentEnemy.resistances.length > 0 && (
										<div>
											<span className="opacity-80">抗性:</span> 
											{enemyFactory.getResistanceDescription(currentEnemy.resistances)}
										</div>
									)}
								</div>
								
								<div className="mt-4 space-x-2">
									<button
										onClick={handleStartBattle}
										className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all"
									>
										开始战斗
									</button>
									<button
										onClick={handleEndBattle}
										className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
									>
										结束战斗
									</button>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* 战斗状态显示 */}
				{battleState.isInBattle && (
					<div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-6">
						<h2 className="text-xl font-semibold text-white mb-4 flex items-center">
							<Heart className="w-5 h-5 mr-2" />
							战斗状态
						</h2>
						
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
							<div className="text-center">
								<div className="text-sm opacity-80">战斗回合</div>
								<div className="font-bold text-lg">{battleState.battleRound}</div>
							</div>
							<div className="text-center">
								<div className="text-sm opacity-80">玩家生命</div>
								<div className="font-bold text-lg">{battleState.playerHealth}/100</div>
							</div>
							<div className="text-center">
								<div className="text-sm opacity-80">敌人生命</div>
								<div className="font-bold text-lg">{battleState.enemyHealth}/{battleState.enemy?.maxHealth || 100}</div>
							</div>
							<div className="text-center">
								<div className="text-sm opacity-80">战斗行动</div>
								<div className="font-bold text-lg">{battleState.battleActions.length}</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default GameLoopTest;
