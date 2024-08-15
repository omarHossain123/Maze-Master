import React from 'react';
import './App.css';

// LevelSelection component definition
function LevelSelection({ onLevelSelect }) {
  return (
    // Container for centering the level selection screen
    <div className="level-selection">
      <h1>Select a Level</h1>
      {/* Generate level buttons based on the number of levels */}
      {Array.from({ length: 7 }).map((_, index) => (
        <button
          key={index}
          className="btn"
          onClick={() => onLevelSelect(index)} // Pass the level index
        >
          Level {index + 1}
        </button>
      ))}
    </div>
  );
}

export default LevelSelection;
