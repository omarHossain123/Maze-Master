// The component takes in onLevelSelect and levels as props
function LevelSelection({ onLevelSelect, levels }) { 
  return (
    // Container for centering the level selection screen
    <div className="level-selection">
      <h1>Select a Level</h1>
      {/* Generate level buttons based on the levels array */}
      {levels.map((level, index) => (
        <button
          key={index} // Unique key for each button
          className="btn"
          onClick={() => onLevelSelect(index)} // Trigger onLevelSelect with the index of the level
          disabled={level.locked} // Disable the button if the level is locked
        >
          {level.locked ? `Level ${index + 1} (Locked)` : `Level ${index + 1}`} {/* Display locked status */}
        </button>
      ))}
    </div>
  );
}

export default LevelSelection;
