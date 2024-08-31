import React from 'react';
import './App.css'; 

function LevelSelection({ onLevelSelect, onMainMenu, levels }) {
  return (
    <div className="level-selection">
      
      {/* Main Menu Button positioned in the top left corner */}
      <button className="btn control-btn main-menu-btn" onClick={onMainMenu}>Main Menu</button>

      <h1>Select a Level</h1>

      <div className="level-grid">
        {levels.map((level, index) => (
          <button
            key={index} // Unique key for each button
            className={`btn level-btn ${level.locked ? 'locked' : ''}`} // Apply class based on locked status
            onClick={() => onLevelSelect(index)} // Trigger onLevelSelect with the index of the level
            disabled={level.locked} // Disable the button if the level is locked
          >
            {level.locked ? `Level ${index + 1} (Locked)` : `Level ${index + 1}`} {/* Display locked status */}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LevelSelection;
