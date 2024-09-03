import React from 'react';
import './App.css';

// Destructure the new prop `isHowToPlayVisible` to control visibility
function WelcomeScreen({ onPlay, onHowToPlay, isHowToPlayVisible }) {
  return (
    <div className={`welcome-screen ${isHowToPlayVisible ? 'hidden' : ''}`}>
      <div className="welcome-content">
        {/* Conditionally hide/show the title and buttons */}
        {!isHowToPlayVisible && (
          <>
            <h1>Welcome to Maze Master</h1>
            <button className="btn play-btn" onClick={onPlay}>Play</button>
            <button className="btn how-to-play-btn" onClick={onHowToPlay}>How to Play</button>
          </>
        )}
      </div>
    </div>
  );
}

export default WelcomeScreen;
