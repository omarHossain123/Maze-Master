import React from 'react';
import './App.css';

function WelcomeScreen({ onPlay, onHowToPlay }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <h1>Welcome to Maze Master</h1>
        <button className="btn play-btn" onClick={onPlay}>Play</button>
        <button className="btn how-to-play-btn" onClick={onHowToPlay}>How to Play</button>
      </div>
    </div>
  );
}

export default WelcomeScreen;
