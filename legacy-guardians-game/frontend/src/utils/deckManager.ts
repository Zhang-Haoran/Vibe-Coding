import { Card, AssetCard, SkillCard, EventCard, Hand } from '../types/cards';
import { cardFactory } from './cardFactory';

// 牌组管理器
export class DeckManager {
	private assetDeck: AssetCard[] = [];
	private skillDeck: SkillCard[] = [];
	private eventDeck: EventCard[] = [];
	private discardPile: Card[] = [];

	constructor() {
		this.initializeDecks();
	}

	// 初始化牌组
	private initializeDecks(): void {
		const presetCards = cardFactory.generateAllPresetCards();
		this.assetDeck = [...presetCards.assetCards];
		this.skillDeck = [...presetCards.skillCards];
		this.eventDeck = [...presetCards.eventCards];
		
		// 洗牌
		this.shuffleDeck(this.assetDeck);
		this.shuffleDeck(this.skillDeck);
		this.shuffleDeck(this.eventDeck);
	}

	// 洗牌算法
	private shuffleDeck<T>(deck: T[]): void {
		for (let i = deck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[deck[i], deck[j]] = [deck[j], deck[i]];
		}
	}

	// 抽牌 - 实现双槽机制
	drawCards(): Hand {
		const assetCards: AssetCard[] = [];
		const skillCards: SkillCard[] = [];

		// 抽取3张资产卡
		for (let i = 0; i < 3; i++) {
			if (this.assetDeck.length > 0) {
				assetCards.push(this.assetDeck.pop()!);
			} else {
				// 如果牌组空了，从弃牌堆重新洗牌
				this.reshuffleDiscardPile('asset');
				if (this.assetDeck.length > 0) {
					assetCards.push(this.assetDeck.pop()!);
				}
			}
		}

		// 抽取2张技能卡
		for (let i = 0; i < 2; i++) {
			if (this.skillDeck.length > 0) {
				skillCards.push(this.skillDeck.pop()!);
			} else {
				// 如果牌组空了，从弃牌堆重新洗牌
				this.reshuffleDiscardPile('skill');
				if (this.skillDeck.length > 0) {
					skillCards.push(this.skillDeck.pop()!);
				}
			}
		}

		// 保底机制：确保手牌混合
		const hand = this.applyGuaranteeMechanism(assetCards, skillCards);

		return {
			assetCards: hand.assetCards,
			skillCards: hand.skillCards,
			maxSize: 5
		};
	}

	// 保底机制：确保手牌至少包含资产卡和技能卡
	private applyGuaranteeMechanism(assetCards: AssetCard[], skillCards: SkillCard[]): Hand {
		let finalAssetCards = [...assetCards];
		let finalSkillCards = [...skillCards];

		// 如果全是资产卡，替换1张为技能卡
		if (finalAssetCards.length === 3 && finalSkillCards.length === 0) {
			if (this.skillDeck.length > 0) {
				finalSkillCards.push(this.skillDeck.pop()!);
				finalAssetCards.pop(); // 移除1张资产卡
			}
		}
		// 如果全是技能卡，替换1张为资产卡
		else if (finalAssetCards.length === 0 && finalSkillCards.length === 2) {
			if (this.assetDeck.length > 0) {
				finalAssetCards.push(this.assetDeck.pop()!);
				finalSkillCards.pop(); // 移除1张技能卡
			}
		}

		return {
			assetCards: finalAssetCards,
			skillCards: finalSkillCards,
			maxSize: 5
		};
	}

	// 从弃牌堆重新洗牌
	private reshuffleDiscardPile(cardType: 'asset' | 'skill' | 'event'): void {
		const relevantDiscards = this.discardPile.filter(card => {
			if (cardType === 'asset') return card.type === 'asset';
			if (cardType === 'skill') return card.type === 'skill';
			if (cardType === 'event') return card.type === 'event';
			return false;
		});

		if (relevantDiscards.length > 0) {
			// 将相关卡牌放回对应牌组
			relevantDiscards.forEach(card => {
				if (card.type === 'asset') {
					this.assetDeck.push(card as AssetCard);
				} else if (card.type === 'skill') {
					this.skillDeck.push(card as SkillCard);
				} else if (card.type === 'event') {
					this.eventDeck.push(card as EventCard);
				}
			});

			// 从弃牌堆中移除这些卡牌
			this.discardPile = this.discardPile.filter(card => {
				if (cardType === 'asset') return card.type !== 'asset';
				if (cardType === 'skill') return card.type !== 'skill';
				if (cardType === 'event') return card.type !== 'event';
				return true;
			});

			// 洗牌
			if (cardType === 'asset') {
				this.shuffleDeck(this.assetDeck);
			} else if (cardType === 'skill') {
				this.shuffleDeck(this.skillDeck);
			} else if (cardType === 'event') {
				this.shuffleDeck(this.eventDeck);
			}
		}
	}

	// 打出卡牌（移动到弃牌堆）
	playCard(card: Card): void {
		this.discardPile.push(card);
	}

	// 获取牌组状态
	getDeckStatus(): {
		assetDeckSize: number;
		skillDeckSize: number;
		eventDeckSize: number;
		discardPileSize: number;
	} {
		return {
			assetDeckSize: this.assetDeck.length,
			skillDeckSize: this.skillDeck.length,
			eventDeckSize: this.eventDeck.length,
			discardPileSize: this.discardPile.length
		};
	}

	// 重置牌组
	resetDecks(): void {
		this.discardPile = [];
		this.initializeDecks();
	}

	// 添加卡牌到牌组
	addCardToDeck(card: Card): void {
		if (card.type === 'asset') {
			this.assetDeck.push(card as AssetCard);
		} else if (card.type === 'skill') {
			this.skillDeck.push(card as SkillCard);
		} else if (card.type === 'event') {
			this.eventDeck.push(card as EventCard);
		}
	}

	// 从牌组中移除卡牌
	removeCardFromDeck(cardId: string): Card | null {
		// 从资产牌组中查找
		const assetIndex = this.assetDeck.findIndex(card => card.id === cardId);
		if (assetIndex !== -1) {
			return this.assetDeck.splice(assetIndex, 1)[0];
		}

		// 从技能牌组中查找
		const skillIndex = this.skillDeck.findIndex(card => card.id === cardId);
		if (skillIndex !== -1) {
			return this.skillDeck.splice(skillIndex, 1)[0];
		}

		// 从事件牌组中查找
		const eventIndex = this.eventDeck.findIndex(card => card.id === cardId);
		if (eventIndex !== -1) {
			return this.eventDeck.splice(eventIndex, 1)[0];
		}

		return null;
	}

	// 获取特定类型的卡牌
	getCardsByType(type: 'asset' | 'skill' | 'event'): Card[] {
		switch (type) {
			case 'asset':
				return [...this.assetDeck];
			case 'skill':
				return [...this.skillDeck];
			case 'event':
				return [...this.eventDeck];
			default:
				return [];
		}
	}

	// 搜索卡牌
	searchCards(query: string): Card[] {
		const allCards = [
			...this.assetDeck,
			...this.skillDeck,
			...this.eventDeck
		];

		return allCards.filter(card =>
			card.name.toLowerCase().includes(query.toLowerCase()) ||
			card.description.toLowerCase().includes(query.toLowerCase())
		);
	}
}

// 导出单例实例
export const deckManager = new DeckManager();
