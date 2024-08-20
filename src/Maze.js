import React, { useState, useEffect } from 'react';
import './App.css';

// Maze component definition
function Maze({ level, onLevelComplete }) {
  const [ballPosition, setBallPosition] = useState(level.start); // Ball initial position
  const [trail, setTrail] = useState([]); // Trail positions

  // Reset ball position and trail when the level changes
  useEffect(() => {
    setBallPosition(level.start); // Reset ball to the start position
    setTrail([]); // Clear the trail
  }, [level]); // Re-run the effect only when the level changes

  // Handle key press events to move the ball
  const handleKeyPress = (event) => {
    let newPosition = { ...ballPosition }; // Copy current position

    // Update position based on key press
    if (event.key === 'ArrowUp' && ballPosition.y > 0) newPosition.y -= 1;
    else if (event.key === 'ArrowDown' && ballPosition.y < level.gridSize - 1) newPosition.y += 1;
    else if (event.key === 'ArrowLeft' && ballPosition.x > 0) newPosition.x -= 1;
    else if (event.key === 'ArrowRight' && ballPosition.x < level.gridSize - 1) newPosition.x += 1;

    // Check if the new position is part of the trail (i.e., backtracking)
    const trailIndex = trail.findIndex(position => position.x === newPosition.x && position.y === newPosition.y);

    if (trailIndex !== -1) {
      setTrail(trail.slice(0, trailIndex)); // Remove the tail of the trail if backtracking
    } else {
      setTrail([...trail, ballPosition]); // Add current position to trail
    }

    setBallPosition(newPosition); // Update ball position

    // Check if the player has reached the end position
    if (newPosition.x === level.end.x && newPosition.y === level.end.y) {
      onLevelComplete(); // Notify the parent component that the level is complete
    }
  };

  // Add keydown event listener for the first render
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress); // Listen for key presses

    // Cleanup event listener on unmount
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]); // Dependency array ensures the function reference remains stable

  return (
    // Outer container for centering the maze on the page
    <div className="maze-container">
      {/* Grid container for the maze layout */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${level.gridSize}, 30px)`, // Dynamically set column count
          gridTemplateRows: `repeat(${level.gridSize}, 30px)` // Dynamically set row count
        }}
      >
        {/* Generate the grid cells based on level configuration */}
        {Array.from({ length: level.gridSize }).map((_, row) =>
          Array.from({ length: level.gridSize }).map((_, col) => {
            const isBall = ballPosition.x === col && ballPosition.y === row; // Check if the ball is in this cell
            const isTrail = trail.some(position => position.x === col && position.y === row); // Check if this cell is part of the trail
            const isEnd = level.end.x === col && level.end.y === row; // Check if the cell is the end position
            const isObstacle = level.obstacles.some(obstacle => obstacle.x === col && obstacle.y === row); // Check if the cell is an obstacle
            return (
              <div
                key={`${row}-${col}`}
                className={`cell ${
                  isBall
                    ? 'ball'
                    : isTrail
                    ? 'trail'
                    : isEnd
                    ? 'end'
                    : isObstacle
                    ? 'obstacle'
                    : ''
                }`} // Apply appropriate class based on cell type
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Maze;