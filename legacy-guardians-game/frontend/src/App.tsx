import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import GameMap from './components/GameMap';
import BattleScene from './components/BattleScene';
import LearningCenter from './components/LearningCenter';
import Portfolio from './components/Portfolio';
import Settings from './components/Settings';
import GameTest from './components/GameTest';
import GameLoopTest from './components/GameLoopTest';
import './App.css';

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<MainMenu />} />
					<Route path="/game-map" element={<GameMap />} />
					<Route path="/battle" element={<BattleScene />} />
					<Route path="/learning" element={<LearningCenter />} />
					<Route path="/portfolio" element={<Portfolio />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/test" element={<GameTest />} />
					<Route path="/game-loop-test" element={<GameLoopTest />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
