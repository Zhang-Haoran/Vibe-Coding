import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useGameStore } from './stores/gameStore';
import GameHeader from './components/GameHeader';
import MainMenu from './components/MainMenu';
import GameMap from './components/GameMap';
import BattleScene from './components/BattleScene';
import LearningCenter from './components/LearningCenter';
import Portfolio from './components/Portfolio';
import Settings from './components/Settings';
import './App.css';

function App() {
	const { gamePhase, setGamePhase } = useGameStore();

	return (
		<div className="game-container">
			<GameHeader />
			
			<main className="game-content">
				<Routes>
					<Route path="/" element={<MainMenu />} />
					<Route path="/map" element={<GameMap />} />
					<Route path="/battle" element={<BattleScene />} />
					<Route path="/learning" element={<LearningCenter />} />
					<Route path="/portfolio" element={<Portfolio />} />
					<Route path="/settings" element={<Settings />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
