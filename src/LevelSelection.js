import React from "react";

function LevelSelection({ onLevelSelect }) {
    return (
      <div className="level-selection">
        <h1>Select a Level</h1> {/* Title for level selection */}
        <button className="btn" onClick={() => onLevelSelect(0)}>Level 1</button> 
        <button className="btn" onClick={() => onLevelSelect(1)}>Level 2</button> 
        {/* Add more level buttons as needed */}
      </div>
    );
  }
  
  export default LevelSelection;