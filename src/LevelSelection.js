import React from 'react'; 

// LevelSelection component definition
function LevelSelection({ onLevelSelect }) {
  // Generate level buttons based on the number of levels
  return (
    <div className="level-selection">
      <h1>Select a Level</h1>
      {Array.from({ length: 7 }).map((_, index) => ( // 7 levels
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
