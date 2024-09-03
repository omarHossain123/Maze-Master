import React, { useState } from 'react';
import Confetti from 'react-confetti';
import './App.css';
import { levels as initialLevels } from './levels';
import WelcomeScreen from './WelcomeScreen';
import LevelSelection from './LevelSelection';
import HowToPlay from './HowToPlay';
import Maze from './Maze';

function App() {
  const [currentLevel, setCurrentLevel] = useState(null); // Track current level
  const [showWelcome, setShowWelcome] = useState(true); // Manage welcome screen visibility
  const [showHowToPlay, setShowHowToPlay] = useState(false); // Manage how-to-play screen visibility
  const [levels, setLevels] = useState(initialLevels); // Track levels
  const [showEndGamePopup, setShowEndGamePopup] = useState(false); // Manage end-game popup visibility

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
      setShowEndGamePopup(true);
      setCurrentLevel(null);
    }
  };

  const handleRestart = () => setCurrentLevel(currentLevel);

  const handleMainMenu = () => {
    setShowWelcome(true);
    setCurrentLevel(null);
    setShowEndGamePopup(false);
  };

  return (
    <div className="App">
      {/* Pass `showHowToPlay` state to control the visibility of welcome screen elements */}
      {showWelcome && <WelcomeScreen onPlay={startGame} onHowToPlay={showInstructions} isHowToPlayVisible={showHowToPlay} />}
      
      {currentLevel === null && !showWelcome && !showEndGamePopup && (
        <LevelSelection onLevelSelect={handleLevelSelect} onMainMenu={handleMainMenu} levels={levels} />
      )}
      
      {showHowToPlay && <HowToPlay onClose={closeInstructions} />}
      
      {currentLevel !== null && !showWelcome && !showHowToPlay && (
        <Maze
          level={levels[currentLevel]}
          currentLevelIndex={currentLevel}
          onLevelComplete={handleLevelComplete}
          onRestart={handleRestart}
          onMainMenu={handleMainMenu}
        />
      )}
      
      {showEndGamePopup && (
        <div className="end-game-popup">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <h2>Congratulations, you have completed all levels!!</h2>
          <button className="btn control-btn" onClick={handleMainMenu}>Main Menu</button>
        </div>
      )}
    </div>
  );
}

export default App;
