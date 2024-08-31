import React, { useState, useEffect } from 'react';
import './App.css'; 

function Maze({ level, currentLevelIndex, onLevelComplete, onRestart, onMainMenu }) {
  const [ballPosition, setBallPosition] = useState(level.start); // Track the current position of the ball
  const [trail, setTrail] = useState([]); // Track the trail left by the ball
  const [movingObstacles, setMovingObstacles] = useState(level.movingObstacles || []); // Track the positions of moving obstacles
  const [speed, setSpeed] = useState(1); // Manage the speed of the ball
  const [showSpeedBoostPopup, setShowSpeedBoostPopup] = useState(false); // Control visibility of the speed boost pop-up
  const [showObstacleHitPopup, setShowObstacleHitPopup] = useState(false); // Control visibility of the obstacle hit pop-up
  const [showEndOfLevelUI, setShowEndOfLevelUI] = useState(false); // Control visibility of the end-of-level UI

  // Reset the state when the level changes or when restarting the level
  useEffect(() => {
    setBallPosition(level.start); // Reset ball to the start position
    setTrail([]); // Clear the trail
    setSpeed(1); // Reset speed to normal
    setMovingObstacles(level.movingObstacles || []); // Reset moving obstacles
    setShowObstacleHitPopup(false); // Hide the obstacle hit pop-up
    setShowEndOfLevelUI(false); // Hide the end-of-level UI
  }, [level]);

  /**
   * Function to detect collision between the ball and any obstacles.
   * Checks both static and moving obstacles.
   */
  const detectCollision = (position) => {
    const collisionWithObstacle = (level.obstacles || []).some(obstacle => obstacle.x === position.x && obstacle.y === position.y) ||
                                  movingObstacles.some(obstacle => obstacle.x === position.x && obstacle.y === position.y);

    if (collisionWithObstacle) {
      setShowObstacleHitPopup(true); // Show "Obstacle hit" pop-up if a collision is detected
      return true;
    }
    return false;
  };

  /**
   * Function to move the obstacles at regular intervals.
   * Includes collision detection between moving obstacles and the player's current position.
   */
  const moveObstacles = () => {
    const updatedObstacles = movingObstacles.map(obstacle => {
      let newPosition = { ...obstacle };

      // Simple movement logic: Move horizontally first, then vertically
      if (newPosition.x < level.gridSize - 1) {
        newPosition.x += 1;
      } else if (newPosition.y < level.gridSize - 1) {
        newPosition.x = 0; // Reset x position
        newPosition.y += 1;
      } else {
        newPosition.x = 0;
        newPosition.y = 0; // Reset both x and y to start the loop again
      }

      return newPosition;
    });

    setMovingObstacles(updatedObstacles); // Update moving obstacles' positions

    // Check for collisions after moving obstacles
    if (detectCollision(ballPosition)) {
      return; // Stop further execution if collision is detected
    }
  };

  // Effect to move obstacles periodically
  useEffect(() => {
    const interval = setInterval(moveObstacles, 1000); // Move obstacles every second
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [movingObstacles]);

  /**
   * Function to handle key press events for moving the ball.
   * Implements boundary-aware movement and speed boost logic.
   */
  const handleKeyPress = (event) => {
    let newPosition = { ...ballPosition };

    // Determine the movement direction and apply speed boost logic
    if (event.key === 'ArrowUp') {
      newPosition.y = Math.max(0, ballPosition.y - speed); // Move up, ensuring the ball doesn't go out of bounds
    } else if (event.key === 'ArrowDown') {
      newPosition.y = Math.min(level.gridSize - 1, ballPosition.y + speed); // Move down, ensuring the ball doesn't go out of bounds
    } else if (event.key === 'ArrowLeft') {
      newPosition.x = Math.max(0, ballPosition.x - speed); // Move left, ensuring the ball doesn't go out of bounds
    } else if (event.key === 'ArrowRight') {
      newPosition.x = Math.min(level.gridSize - 1, ballPosition.x + speed); // Move right, ensuring the ball doesn't go out of bounds
    }

    // Handle trail logic (prevent backtracking)
    const trailIndex = trail.findIndex(position => position.x === newPosition.x && position.y === newPosition.y);
    if (trailIndex !== -1) {
      setTrail(trail.slice(0, trailIndex)); // Remove part of the trail if backtracking
    } else {
      setTrail([...trail, ballPosition]); // Extend the trail
    }

    setBallPosition(newPosition); // Update the ball's position

    // Check for collisions immediately after movement
    if (detectCollision(newPosition)) {
      return; // Stop further execution if collision is detected
    }

    // Check if the player collected a power-up
    const powerUpIndex = (level.powerUps || []).findIndex(p => p.x === newPosition.x && p.y === newPosition.y);
    if (powerUpIndex !== -1) {
      const powerUp = level.powerUps[powerUpIndex];
      if (powerUp.type === 'speed') {
        setShowSpeedBoostPopup(true); // Show speed boost pop-up
        setSpeed(2); // Double the speed of the ball
        setTimeout(() => setSpeed(1), 5000); // Reset speed after 5 seconds
        setTimeout(() => setShowSpeedBoostPopup(false), 5000); // Hide pop-up after 5 seconds
      }
    }

    // Check if the player has reached the end position
    if (newPosition.x === level.end.x && newPosition.y === level.end.y) {
      setShowEndOfLevelUI(true); // Show end-of-level UI
    }
  };

  // Effect to listen for key presses and attach the keydown event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress); // Cleanup event listener on component unmount
  }, [handleKeyPress]);

  /**
   * Function to handle level restart.
   * Resets the ball position, trail, and speed, and hides any active pop-ups.
   */
  const handleRestart = () => {
    setBallPosition(level.start); // Reset ball to start position
    setTrail([]); // Clear the trail
    setSpeed(1); // Reset speed to normal
    setShowObstacleHitPopup(false); // Hide obstacle hit pop-up
    setShowEndOfLevelUI(false); // Hide end-of-level UI
  };

  /**
   * Function to handle proceeding to the next level.
   * Hides the end-of-level UI and triggers the parent function to move to the next level.
   */
  const handleNextLevel = () => {
    setShowEndOfLevelUI(false); // Hide end-of-level UI
    onLevelComplete(); // Trigger the parent function to move to the next level
  };

  return (
    <div className="maze-container">
      
      {/* Level Indicator positioned above the grid */}
      <h2 className="level-indicator">Level {currentLevelIndex + 1}</h2>

      {/* Grid container for the maze layout */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${level.gridSize}, 30px)`, // Dynamically set number of columns based on grid size
          gridTemplateRows: `repeat(${level.gridSize}, 30px)` // Dynamically set number of rows based on grid size
        }}
      >
        {/* Generate the grid cells based on the level configuration */}
        {Array.from({ length: level.gridSize }).map((_, row) =>
          Array.from({ length: level.gridSize }).map((_, col) => {
            const isBall = ballPosition.x === col && ballPosition.y === row;
            const isTrail = trail.some(position => position.x === col && position.y === row);
            const isEnd = level.end.x === col && level.end.y === row;
            const isObstacle = (level.obstacles || []).some(obstacle => obstacle.x === col && obstacle.y === row);
            const isMovingObstacle = movingObstacles.some(obstacle => obstacle.x === col && obstacle.y === row);
            const isPowerUp = (level.powerUps || []).some(powerUp => powerUp.x === col && powerUp.y === row);

            return (
              <div
                key={`${row}-${col}`} // Unique key for each cell
                className={`cell ${
                  isBall
                    ? 'ball'
                    : isTrail
                    ? 'trail'
                    : isEnd
                    ? 'end'
                    : isPowerUp
                    ? 'power-up'
                    : isMovingObstacle
                    ? 'obstacle'
                    : isObstacle
                    ? 'obstacle'
                    : ''
                }`} // Apply appropriate class based on the cell type
              />
            );
          })
        )}
      </div>

      {/* Main Menu and Restart Buttons positioned below the grid */}
      <div className="maze-controls">
        <button className="btn control-btn" onClick={onMainMenu}>Main Menu</button>
        <button className="btn control-btn" onClick={onRestart}>Restart</button>
      </div>

      {/* Popups remain unchanged... */}
      {showSpeedBoostPopup && (
        <div className="popup speed-boost-popup">
          Speed Boost Activated!
        </div>
      )}

      {showObstacleHitPopup && (
        <div className="popup obstacle-hit-popup">
          <h2>Oops! You hit an obstacle.</h2>
          <button className="btn control-btn" onClick={handleRestart}>Try Again</button>
          <button className="btn control-btn" onClick={onMainMenu}>Main Menu</button>
        </div>
      )}

      {showEndOfLevelUI && (
        <div className="popup end-of-level-popup">
          <h2>Great Job! You completed the level.</h2>
          <button className="btn control-btn" onClick={handleRestart}>Restart</button>
          <button className="btn control-btn" onClick={handleNextLevel}>Next Level</button>
          <button className="btn control-btn" onClick={onMainMenu}>Main Menu</button>
        </div>
      )}
    </div>
  );
}

export default Maze;