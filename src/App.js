import React, { useState } from 'react';
import './App.css';
import './index.css';
import { levels as initialLevels } from './levels'; 
import Maze from './Maze';
import WelcomeScreen from './WelcomeScreen'; 
import LevelSelection from './LevelSelection'; 
import HowToPlay from './HowToPlay'; 

function App() {
  // State to manage the current level the user is on
  const [currentLevel, setCurrentLevel] = useState(null);

  // State to manage the visibility of the welcome screen
  const [showWelcome, setShowWelcome] = useState(true);

  // State to manage the visibility of the "How to Play" pop-up
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // State to keep track of the levels and their locked/unlocked status
  const [levels, setLevels] = useState(initialLevels);

  // Function to start the game and show level selection
  const startGame = () => {
    setShowWelcome(false); // Hide the welcome screen
  };

  // Function to show the "How to Play" pop-up
  const showInstructions = () => {
    setShowHowToPlay(true); // Display the "How to Play" pop-up
  };

  // Function to close the "How to Play" pop-up
  const closeInstructions = () => {
    setShowHowToPlay(false); // Hide the "How to Play" pop-up
  };

  // Function to handle the selection of a level
  const handleLevelSelect = (levelIndex) => {
    setCurrentLevel(levelIndex); // Set the current level based on the user's selection
  };

  // Function to handle what happens when a level is completed
  const handleLevelComplete = () => {
    if (currentLevel < levels.length - 1) { // Check if there are more levels after the current one
      alert('Level Complete! Moving to the next level.'); // Notify the user of level completion
      setCurrentLevel(currentLevel + 1); // Move to the next level

      // Unlock the next level in the array
      const updatedLevels = [...levels];
      updatedLevels[currentLevel + 1].locked = false; // Unlock the next level
      setLevels(updatedLevels); // Update the levels state with the new unlocked status

    } else {
      // If the user has completed all levels
      alert('Congratulations! You have completed all levels!'); // Notify the user
      setShowWelcome(true); // Show the welcome screen again
      setCurrentLevel(null); // Reset the current level to null
    }
  };

  return (
    <div className="App">
      {/* Show the welcome screen if `showWelcome` is true */}
      {showWelcome && <WelcomeScreen onPlay={startGame} onHowToPlay={showInstructions} />}

      {/* Show the level selection screen if no level is selected and the welcome screen is not visible */}
      {currentLevel === null && !showWelcome && <LevelSelection onLevelSelect={handleLevelSelect} levels={levels} />}

      {/* Show the "How to Play" pop-up if `showHowToPlay` is true */}
      {showHowToPlay && <HowToPlay onClose={closeInstructions} />}

      {/* Show the maze for the selected level if a level is selected, and the welcome and how-to-play screens are not visible */}
      {currentLevel !== null && !showWelcome && !showHowToPlay && (
        <Maze level={levels[currentLevel]} onLevelComplete={handleLevelComplete} />
      )}
    </div>
  );
}

export default App;
