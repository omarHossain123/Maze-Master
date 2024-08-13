import React from 'react'; 
import './App.css'; 

function HowToPlay({ onClose }) {
  return (
    <div className="how-to-play-overlay">
      <div className="how-to-play-popup">
        <button className="close-btn" onClick={onClose}>X</button> {/* Close button */}
        <h2>How to Play</h2> {/* Title of the pop-up */}
        <p>Use arrow keys to move the ball through the maze. Your goal is to reach the end of the maze while leaving a trail. If you backtrack, the trail will disappear.</p> {/* Instructions */}
      </div>
    </div>
  );
}

export default HowToPlay;
