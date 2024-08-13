// This file handles the rendering of the maze and user interactions.
import React, { useState, useEffect } from 'react'; 
import './App.css'; 

function Maze({ level, onLevelComplete }) {
  const [ballPosition, setBallPosition] = useState(level.start); // Ball initial position
  const [trail, setTrail] = useState([]); // Trail positions

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

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress); // Add keydown event listener
    return () => window.removeEventListener('keydown', handleKeyPress); // Cleanup on component unmount
  }, [ballPosition, trail, level]); // Re-run effect when dependencies change

  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${level.gridSize}, 30px)`, gridTemplateRows: `repeat(${level.gridSize}, 30px)` }}>
      {Array.from({ length: level.gridSize }).map((_, row) =>
        Array.from({ length: level.gridSize }).map((_, col) => {
          const isBall = ballPosition.x === col && ballPosition.y === row;
          const isTrail = trail.some(position => position.x === col && position.y === row);
          const isEnd = level.end.x === col && level.end.y === row; // Check if the cell is the end position
          return (
            <div
              key={`${row}-${col}`}
              className={`cell ${isBall ? 'ball' : isTrail ? 'trail' : isEnd ? 'end' : ''}`}
            />
          );
        })
      )}
    </div>
  );
}

export default Maze; // Export the Maze component


