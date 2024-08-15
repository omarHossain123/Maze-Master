// This file imports the levels configuration and the Maze component, handle the current level, and manages 
// level transitions.

import React, { useState } from 'react'; 
import './App.css';
import './index.css'; 
import { levels } from './levels'; 
import Maze from './Maze'; 
import WelcomeScreen from './WelcomeScreen'; 
import LevelSelection from './LevelSelection'; 
import HowToPlay from './HowToPlay'; 

function App() {
  const [currentLevel, setCurrentLevel] = useState(null); // State to track the current level
  const [showWelcome, setShowWelcome] = useState(true); // State to show welcome screen
  const [showHowToPlay, setShowHowToPlay] = useState(false); // State to show how-to-play pop-up

  // Function to start the game and show level selection
  const startGame = () => {
    setShowWelcome(false); // Hide welcome screen
  };

  // Function to show the how-to-play pop-up
  const showInstructions = () => {
    setShowHowToPlay(true); // Show pop-up
  };

  // Function to close the how-to-play pop-up
  const closeInstructions = () => {
    setShowHowToPlay(false); // Hide pop-up
  };

  // Function to handle level selection
  const handleLevelSelect = (levelIndex) => {
    setCurrentLevel(levelIndex); // Set the current level
  };

  // Function to handle level completion
  const handleLevelComplete = () => {
    if (currentLevel < levels.length - 1) {
      alert('Level Complete! Moving to the next level.'); // Notify the user
      setCurrentLevel(currentLevel + 1); // Move to the next level
    } else {
      alert('Congratulations! You have completed all levels!'); // Notify the user of completion
      setShowWelcome(true); // Show welcome screen again
      setCurrentLevel(null); // Reset current level
    }
  };

  return (
    <div className="App">
      {showWelcome && <WelcomeScreen onPlay={startGame} onHowToPlay={showInstructions} />} {/* Show WelcomeScreen */}
      {currentLevel === null && !showWelcome && <LevelSelection onLevelSelect={handleLevelSelect} />} {/* Show LevelSelection */}
      {showHowToPlay && <HowToPlay onClose={closeInstructions} />} {/* Show HowToPlay pop-up */}
      {currentLevel !== null && !showWelcome && !showHowToPlay && <Maze level={levels[currentLevel]} onLevelComplete={handleLevelComplete} />} {/* Show Maze */}
    </div>
  );
}

export default App; // Export the App component



