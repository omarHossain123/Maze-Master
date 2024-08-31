import React, { useState } from 'react';
import Confetti from 'react-confetti'; // Import Confetti component
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
  const [showEndGamePopup, setShowEndGamePopup] = useState(false); // New state to manage end-game popup

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
      // When all levels are completed, show the end-game popup
      setShowEndGamePopup(true);
      setCurrentLevel(null);
    }
  };

  const handleRestart = () => setCurrentLevel(currentLevel);

  const handleMainMenu = () => {
    setShowWelcome(true);
    setCurrentLevel(null);
    setShowEndGamePopup(false); // Hide end-game popup if returning to main menu
  };

  return (
    <div className="App">
      {/* Render the welcome screen */}
      {showWelcome && <WelcomeScreen onPlay={startGame} onHowToPlay={showInstructions} />}
      
      {/* Render the level selection screen */}
      {currentLevel === null && !showWelcome && !showEndGamePopup && (
        <LevelSelection onLevelSelect={handleLevelSelect} onMainMenu={handleMainMenu} levels={levels} />
      )}
      
      {/* Render the how-to-play screen */}
      {showHowToPlay && <HowToPlay onClose={closeInstructions} />}
      
      {/* Render the maze screen */}
      {currentLevel !== null && !showWelcome && !showHowToPlay && (
        <Maze
          level={levels[currentLevel]}
          currentLevelIndex={currentLevel} // Pass the current level index
          onLevelComplete={handleLevelComplete}
          onRestart={handleRestart}
          onMainMenu={handleMainMenu} // Pass the handleMainMenu function
        />
      )}
      
      {/* Full-screen end-game popup with confetti */}
      {showEndGamePopup && (
        <div className="end-game-popup">
          <Confetti width={window.innerWidth} height={window.innerHeight} /> {/* Confetti covers the entire viewport */}
          <h2>Congratulations, you have completed all levels!!</h2>
          <button className="btn control-btn" onClick={handleMainMenu}>Main Menu</button>
        </div>
      )}
    </div>
  );
}

export default App;
