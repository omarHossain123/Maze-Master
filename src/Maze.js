import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti'; 
import './App.css'; 

function Maze({ level, currentLevelIndex, onLevelComplete, onRestart, onMainMenu }) {
  const [ballPosition, setBallPosition] = useState(level.start); // Track the current position of the ball
  const [trail, setTrail] = useState([]); // Track the trail left by the ball
  const [movingObstacles, setMovingObstacles] = useState(level.movingObstacles || []); // Track the positions of moving obstacles
  const [speed, setSpeed] = useState(1); // Manage the speed of the ball
  const [showSpeedBoostPopup, setShowSpeedBoostPopup] = useState(false); // Control visibility of the speed boost pop-up
  const [showObstacleHitPopup, setShowObstacleHitPopup] = useState(false); // Control visibility of the obstacle hit pop-up
  const [showEndOfLevelUI, setShowEndOfLevelUI] = useState(false); // Control visibility of the end-of-level UI
  const [isGameOver, setIsGameOver] = useState(false); // State to manage whether the game is over (obstacle hit)

  // New state for handling sad face animation and level transition animation
  const [isSadFaceVisible, setIsSadFaceVisible] = useState(false); // Controls the sad face visibility
  const [isLevelTransitioning, setIsLevelTransitioning] = useState(false); // Controls the level transition animation

  // New state for touch events
  const [touchStart, setTouchStart] = useState(null); // Track the starting point of a touch
  const [touchEnd, setTouchEnd] = useState(null); // Track the end point of a touch

  // Reset the state when the level changes or when restarting the level
  useEffect(() => {
    setBallPosition(level.start); // Reset ball to the start position
    setTrail([]); // Clear the trail
    setSpeed(1); // Reset speed to normal
    setMovingObstacles(level.movingObstacles || []); // Reset moving obstacles
    setShowObstacleHitPopup(false); // Hide the obstacle hit pop-up
    setShowEndOfLevelUI(false); // Hide the end-of-level UI
    setIsGameOver(false); // Reset the game over state
    setIsSadFaceVisible(false); // Hide the sad face on level start
    setIsLevelTransitioning(false); // Reset level transition animation state
  }, [level]);

  /**
   * Function to detect collisions with obstacles.
   * If a collision is detected, show the obstacle-hit popup and stop the game.
   */
  const detectCollision = (position) => {
    const collisionWithObstacle = (level.obstacles || []).some(obstacle => obstacle.x === position.x && obstacle.y === position.y) ||
                                  movingObstacles.some(obstacle => obstacle.x === position.x && obstacle.y === position.y);

    if (collisionWithObstacle) {
      setShowObstacleHitPopup(true); // Show obstacle-hit popup
      setIsGameOver(true); // Set the game over state
      return true;
    }
    return false;
  };

  // Custom draw function for confetti to show sad face emojis instead of confetti shapes
  const drawSadFaceConfetti = (ctx) => {
    ctx.font = "50px Arial"; // Set the font for sad faces
    ctx.fillText("😢", 0, 0); // Draw the sad face emoji at each confetti position
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
   * Now includes a check to prevent movement if the game is over.
   */
  const handleKeyPress = (event) => {
    if (isGameOver) return; // Prevent any movement if the game is over

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
      setIsLevelTransitioning(true); // Trigger level transition animation
      setTimeout(() => setShowEndOfLevelUI(true), 500); // Show end-of-level UI after animation
    }
  };

  /**
   * New function to handle touch start event.
   * Stores the initial touch position.
   */
  const handleTouchStart = (event) => {
    const touch = event.touches[0]; // Get the first touch point
    setTouchStart({ x: touch.clientX, y: touch.clientY }); // Set the starting point of the touch
  };

  /**
   * New function to handle touch end event.
   * Determines the swipe direction and moves the ball accordingly.
   */
  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0]; // Get the touch end point
    setTouchEnd({ x: touch.clientX, y: touch.clientY });

    // Calculate the swipe direction
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;

    // Determine if it's a horizontal or vertical swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 0) {
        handleKeyPress({ key: 'ArrowRight' }); // Swipe right
      } else {
        handleKeyPress({ key: 'ArrowLeft' }); // Swipe left
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        handleKeyPress({ key: 'ArrowDown' }); // Swipe down
      } else {
        handleKeyPress({ key: 'ArrowUp' }); // Swipe up
      }
    }
  };

  // Effect to listen for key presses and attach the keydown event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress); // Listen for keyboard events
    window.addEventListener('touchstart', handleTouchStart); // Listen for touchstart events (for mobile swipes)
    window.addEventListener('touchend', handleTouchEnd); // Listen for touchend events (for mobile swipes)

    return () => {
      window.removeEventListener('keydown', handleKeyPress); // Cleanup keyboard listener
      window.removeEventListener('touchstart', handleTouchStart); // Cleanup touchstart listener
      window.removeEventListener('touchend', handleTouchEnd); // Cleanup touchend listener
    };
  }, [handleKeyPress, touchStart, isGameOver]); // Re-run the effect when handleKeyPress, touchStart, or isGameOver changes

  /**
   * Function to handle level restart.
   * Resets the ball position, trail, and speed, and hides any active pop-ups.
   * Also resets the isGameOver state to allow movement.
   */
  const handleRestart = () => {
  setBallPosition(level.start); 
  setTrail([]); 
  setSpeed(1); 
  setShowObstacleHitPopup(false); 
  setShowSpeedBoostPopup(false); 
  setShowEndOfLevelUI(false); 
  setIsGameOver(false);
  setIsSadFaceVisible(false);
  setMovingObstacles(level.movingObstacles || []);
};


  return (
    <div className="maze-container">
      {/* Level Indicator positioned above the grid with transition effect */}
      <h2 className={`level-indicator ${isLevelTransitioning ? 'outgoing' : ''}`}>
        Level {currentLevelIndex + 1}
      </h2>

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
        <button className="btn control-btn" onClick={handleRestart}>Restart</button> {/* Make sure this triggers handleRestart */}
      </div>

      {/* Popups remain unchanged... */}
      {showSpeedBoostPopup && (
        <div className="popup speed-boost-popup">
          Speed Boost Activated!
        </div>
      )}

      {showEndOfLevelUI && (
        <div className="popup end-of-level-popup">
          <h2>Great Job! You completed the level.</h2>
          <button className="btn control-btn" onClick={handleRestart}>Restart</button>
          <button className="btn control-btn" onClick={onLevelComplete}>Next Level</button>
          <button className="btn control-btn" onClick={onMainMenu}>Main Menu</button>
        </div>
      )}

      {/* Show the obstacle-hit popup when the player hits an obstacle */}
      {showObstacleHitPopup && (
          <div className="obstacle-hit-popup">
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={200}
              gravity={0.2}
              drawShape={drawSadFaceConfetti} // Customized sad face confetti
            />
            <div className="popup-content">
              <h2>Oops! You hit an obstacle.</h2>
              {/* Make sure this triggers the handleRestart function */}
              <button className="btn" onClick={handleRestart}>Restart</button>
              <button className="btn" onClick={onMainMenu}>Main Menu</button>
            </div>
          </div>
        )}
    </div>
  );
}

export default Maze;