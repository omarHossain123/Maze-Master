import React, { useState } from 'react'; 
import './App.css'; 
import { levels as initialLevels } from './levels';
import WelcomeScreen from './WelcomeScreen'; 
import LevelSelection from './LevelSelection'; 
import HowToPlay from './HowToPlay'; 
import Maze from './Maze'; 

function App() {
  const [currentLevel, setCurrentLevel] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [levels, setLevels] = useState(initialLevels);

  const startGame = () => setShowWelcome(false);

  const showInstructions = () => setShowHowToPlay(true);

  const closeInstructions = () => setShowHowToPlay(false);

  const handleLevelSelect = (levelIndex) => setCurrentLevel(levelIndex);

  const handleLevelComplete = () => {
    if (currentLevel < levels.length - 1) {
      const updatedLevels = [...levels];
      updatedLevels[currentLevel + 1].locked = false;
      setLevels(updatedLevels);
      setCurrentLevel(currentLevel + 1);
    } else {
      alert('Congratulations! You have completed all levels!');
      setShowWelcome(true);
      setCurrentLevel(null);
    }
  };

  const handleRestart = () => setCurrentLevel(currentLevel);

  const handleMainMenu = () => {
    setShowWelcome(true);
    setCurrentLevel(null);
  };

  return (
    <div className="App">
      {showWelcome && <WelcomeScreen onPlay={startGame} onHowToPlay={showInstructions} />}
      {currentLevel === null && !showWelcome && <LevelSelection onLevelSelect={handleLevelSelect} levels={levels} />}
      {showHowToPlay && <HowToPlay onClose={closeInstructions} />}
      {currentLevel !== null && !showWelcome && !showHowToPlay && (
        <Maze
          level={levels[currentLevel]}
          onLevelComplete={handleLevelComplete}
          onRestart={handleRestart}
          onMainMenu={handleMainMenu}
        />
      )}
    </div>
  );
}

export default App; 
