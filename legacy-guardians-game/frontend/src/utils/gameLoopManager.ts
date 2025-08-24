import { GamePhase, TurnState, BattleState, ActionPointSystem, GameLoopState, Enemy, BattleAction } from '../types/game';

export class GameLoopManager {
	private turnState: TurnState;
	private battleState: BattleState;
	private actionPointSystem: ActionPointSystem;
	private gameLoopState: GameLoopState;
	private phaseTimer: NodeJS.Timeout | null = null;
	private actionPointTimer: NodeJS.Timeout | null = null;

	constructor() {
		this.turnState = {
			currentTurn: 1,
			currentPhase: GamePhase.PREPARE,
			actionPoints: 5,
			maxActionPoints: 5,
			phaseTimeRemaining: 30,
			isPlayerTurn: true
		};

		this.battleState = {
			isInBattle: false,
			enemy: null,
			battleRound: 0,
			playerHealth: 100,
			enemyHealth: 100,
			battleActions: [],
			battleRewards: []
		};

		this.actionPointSystem = {
			currentPoints: 5,
			maxPoints: 5,
			pointCosts: {
				playCard: 1,
				useSkill: 2,
				move: 1,
				interact: 1
			},
			regenerationRate: 1
		};

		this.gameLoopState = {
			isActive: false,
			currentPhase: GamePhase.PREPARE,
			phaseTimer: 0,
			phaseDuration: 30,
			autoAdvance: false,
			paused: false
		};
	}

	// 开始游戏循环
	startGameLoop(): void {
		this.gameLoopState.isActive = true;
		this.gameLoopState.paused = false;
		this.startPhaseTimer();
		this.startActionPointRegeneration();
	}

	// 停止游戏循环
	stopGameLoop(): void {
		this.gameLoopState.isActive = false;
		this.clearTimers();
	}

	// 暂停游戏
	pauseGame(): void {
		this.gameLoopState.paused = true;
		this.clearTimers();
	}

	// 恢复游戏
	resumeGame(): void {
		this.gameLoopState.paused = false;
		if (this.gameLoopState.isActive) {
			this.startPhaseTimer();
			this.startActionPointRegeneration();
		}
	}

	// 开始新回合
	startNewTurn(): void {
		this.turnState.currentTurn++;
		this.turnState.currentPhase = GamePhase.PREPARE;
		this.turnState.actionPoints = this.actionPointSystem.maxPoints;
		this.turnState.phaseTimeRemaining = this.gameLoopState.phaseDuration;
		this.turnState.isPlayerTurn = true;
		
		this.gameLoopState.currentPhase = GamePhase.PREPARE;
		this.gameLoopState.phaseTimer = 0;
		
		this.startPhaseTimer();
	}

	// 推进到下一阶段
	advancePhase(): void {
		const phases = Object.values(GamePhase);
		const currentIndex = phases.indexOf(this.turnState.currentPhase);
		const nextIndex = (currentIndex + 1) % phases.length;
		
		this.turnState.currentPhase = phases[nextIndex];
		this.gameLoopState.currentPhase = phases[nextIndex];
		this.turnState.phaseTimeRemaining = this.gameLoopState.phaseDuration;
		this.gameLoopState.phaseTimer = 0;
		
		// 特殊阶段处理
		this.handlePhaseTransition(phases[nextIndex]);
		
		this.startPhaseTimer();
	}

	// 处理阶段转换
	private handlePhaseTransition(phase: GamePhase): void {
		switch (phase) {
			case GamePhase.DRAW:
				this.handleDrawPhase();
				break;
			case GamePhase.ACTION:
				this.handleActionPhase();
				break;
			case GamePhase.EVENT:
				this.handleEventPhase();
				break;
			case GamePhase.RESOLUTION:
				this.handleResolutionPhase();
				break;
			case GamePhase.REWARD:
				this.handleRewardPhase();
				break;
			case GamePhase.PREPARE:
				this.handlePreparePhase();
				break;
		}
	}

	// 准备阶段处理
	private handlePreparePhase(): void {
		// 重置行动点数
		this.turnState.actionPoints = this.actionPointSystem.maxPoints;
		// 可以在这里添加其他准备逻辑
	}

	// 抽牌阶段处理
	private handleDrawPhase(): void {
		// 这里会触发抽牌逻辑，由外部调用
		console.log('进入抽牌阶段');
	}

	// 行动阶段处理
	private handleActionPhase(): void {
		console.log('进入行动阶段');
		// 玩家可以执行行动
	}

	// 事件阶段处理
	private handleEventPhase(): void {
		console.log('进入事件阶段');
		// 处理随机事件
	}

	// 结算阶段处理
	private handleResolutionPhase(): void {
		console.log('进入结算阶段');
		// 计算收益、损失等
	}

	// 奖励阶段处理
	private handleRewardPhase(): void {
		console.log('进入奖励阶段');
		// 发放奖励
	}

	// 开始阶段计时器
	private startPhaseTimer(): void {
		if (this.phaseTimer) {
			clearInterval(this.phaseTimer);
		}
		
		this.phaseTimer = setInterval(() => {
			if (!this.gameLoopState.paused) {
				this.turnState.phaseTimeRemaining--;
				this.gameLoopState.phaseTimer++;
				
				if (this.turnState.phaseTimeRemaining <= 0) {
					if (this.gameLoopState.autoAdvance) {
						this.advancePhase();
					} else {
						// 阶段超时，可以在这里添加超时处理逻辑
						console.log(`阶段 ${this.turnState.currentPhase} 超时`);
					}
				}
			}
		}, 1000);
	}

	// 开始行动点数再生计时器
	private startActionPointRegeneration(): void {
		if (this.actionPointTimer) {
			clearInterval(this.actionPointTimer);
		}
		
		this.actionPointTimer = setInterval(() => {
			if (!this.gameLoopState.paused && this.turnState.actionPoints < this.actionPointSystem.maxPoints) {
				this.turnState.actionPoints = Math.min(
					this.turnState.actionPoints + this.actionPointSystem.regenerationRate,
					this.actionPointSystem.maxPoints
				);
			}
		}, 5000); // 每5秒再生1点
	}

	// 使用行动点数
	useActionPoints(amount: number): boolean {
		if (this.turnState.actionPoints >= amount) {
			this.turnState.actionPoints -= amount;
			return true;
		}
		return false;
	}

	// 检查是否有足够的行动点数
	hasEnoughActionPoints(amount: number): boolean {
		return this.turnState.actionPoints >= amount;
	}

	// 开始战斗
	startBattle(enemy: Enemy): void {
		this.battleState.isInBattle = true;
		this.battleState.enemy = enemy;
		this.battleState.battleRound = 1;
		this.battleState.playerHealth = 100;
		this.battleState.enemyHealth = enemy.maxHealth;
		this.battleState.battleActions = [];
		this.battleState.battleRewards = [];
		
		// 暂停主游戏循环
		this.pauseGame();
	}

	// 结束战斗
	endBattle(): void {
		this.battleState.isInBattle = false;
		this.battleState.enemy = null;
		this.battleState.battleRound = 0;
		this.battleState.battleActions = [];
		this.battleState.battleRewards = [];
		
		// 恢复主游戏循环
		this.resumeGame();
	}

	// 执行战斗行动
	performBattleAction(action: BattleAction): void {
		this.battleState.battleActions.push(action);
		
		// 根据行动类型处理战斗逻辑
		switch (action.type) {
			case 'attack':
				this.handleAttackAction(action);
				break;
			case 'defend':
				this.handleDefendAction(action);
				break;
			case 'skill':
				this.handleSkillAction(action);
				break;
			case 'item':
				this.handleItemAction(action);
				break;
		}
		
		// 检查战斗是否结束
		this.checkBattleEnd();
	}

	// 处理攻击行动
	private handleAttackAction(action: BattleAction): void {
		if (this.battleState.enemy) {
			const damage = Math.max(1, action.damage - this.battleState.enemy.defense);
			this.battleState.enemyHealth = Math.max(0, this.battleState.enemyHealth - damage);
		}
	}

	// 处理防御行动
	private handleDefendAction(action: BattleAction): void {
		// 增加玩家防御力
		this.turnState.actionPoints = Math.min(
			this.turnState.actionPoints + 1,
			this.actionPointSystem.maxPoints
		);
	}

	// 处理技能行动
	private handleSkillAction(action: BattleAction): void {
		// 技能效果处理
		if (action.effects.includes('heal')) {
			this.battleState.playerHealth = Math.min(100, this.battleState.playerHealth + action.healing);
		}
	}

	// 处理道具行动
	private handleItemAction(action: BattleAction): void {
		// 道具效果处理
		if (action.effects.includes('heal')) {
			this.battleState.playerHealth = Math.min(100, this.battleState.playerHealth + action.healing);
		}
	}

	// 检查战斗是否结束
	private checkBattleEnd(): void {
		if (this.battleState.enemyHealth <= 0) {
			// 玩家胜利
			this.handleBattleVictory();
		} else if (this.battleState.playerHealth <= 0) {
			// 玩家失败
			this.handleBattleDefeat();
		}
	}

	// 处理战斗胜利
	private handleBattleVictory(): void {
		if (this.battleState.enemy) {
			// 生成奖励
			this.battleState.battleRewards = [
				{
					type: 'coins',
					amount: this.battleState.enemy.level * 10,
					description: `击败 ${this.battleState.enemy.name} 获得金币`
				},
				{
					type: 'experience',
					amount: this.battleState.enemy.level * 5,
					description: `获得经验值`
				}
			];
		}
		
		// 延迟结束战斗，让玩家看到奖励
		setTimeout(() => {
			this.endBattle();
		}, 3000);
	}

	// 处理战斗失败
	private handleBattleDefeat(): void {
		// 战斗失败处理
		console.log('战斗失败');
		this.endBattle();
	}

	// 清理计时器
	private clearTimers(): void {
		if (this.phaseTimer) {
			clearInterval(this.phaseTimer);
			this.phaseTimer = null;
		}
		if (this.actionPointTimer) {
			clearInterval(this.actionPointTimer);
			this.actionPointTimer = null;
		}
	}

	// 获取当前状态
	getTurnState(): TurnState {
		return { ...this.turnState };
	}

	getBattleState(): BattleState {
		return { ...this.battleState };
	}

	getActionPointSystem(): ActionPointSystem {
		return { ...this.actionPointSystem };
	}

	getGameLoopState(): GameLoopState {
		return { ...this.gameLoopState };
	}

	// 设置自动推进
	setAutoAdvance(autoAdvance: boolean): void {
		this.gameLoopState.autoAdvance = autoAdvance;
	}

	// 设置阶段持续时间
	setPhaseDuration(duration: number): void {
		this.gameLoopState.phaseDuration = duration;
		this.turnState.phaseTimeRemaining = duration;
	}

	// 销毁管理器
	destroy(): void {
		this.clearTimers();
	}
}
