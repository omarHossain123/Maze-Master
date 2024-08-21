import React from 'react';
import './App.css';

function HowToPlay({ onClose }) {
  return (
    <div className="how-to-play-overlay">
      <div className="how-to-play-popup">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>How to Play</h2>
        <p>Use the arrow keys to navigate the ball through the maze. Your goal is to reach the end point without hitting any obstacles.</p>
        <p>If you backtrack, the trail behind the ball will disappear. Be careful!</p>
        <p><img src="speed-boost.png" alt="Speed Boost"/> Collect the <strong>Speed Boost</strong> power-up to temporarily double your speed. This will help you dodge obstacles and reach the end faster!</p>
      </div>
    </div>
  );
}

export default HowToPlay;
