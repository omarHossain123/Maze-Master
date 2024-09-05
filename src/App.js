import React, { useState } from 'react';
import Confetti from 'react-confetti';
import './App.css';
import { levels as initialLevels } from './levels';
import WelcomeScreen from './WelcomeScreen';
import LevelSelection from './LevelSelection';
import HowToPlay from './HowToPlay';
import Maze from './Maze';
import emailjs from 'emailjs-com'; 

function App() {
  const [currentLevel, setCurrentLevel] = useState(null); // Track current level
  const [showWelcome, setShowWelcome] = useState(true); // Manage welcome screen visibility
  const [showHowToPlay, setShowHowToPlay] = useState(false); // Manage how-to-play screen visibility
  const [levels, setLevels] = useState(initialLevels); // Track levels
  const [showEndGamePopup, setShowEndGamePopup] = useState(false); // Manage end-game popup visibility
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [messageType, setMessageType] = useState(''); // To know if it's a bug report or suggestion
  const [message, setMessage] = useState(''); // Store the user's message

  const startGame = () => setShowWelcome(false);

  const showInstructions = () => setShowHowToPlay(true);

  const closeInstructions = () => setShowHowToPlay(false);

  const handleLevelSelect = (levelIndex) => setCurrentLevel(levelIndex);

  const handleLevelComplete = () => {
    if (currentLevel < levels.length - 1) {
      const updatedLevels = [...levels];
      updatedLevels[currentLevel + 1].locked = false;
      setLevels(updatedLevels);
      setCurrentLevel(currentLevel + 1);
    } else {
      setShowEndGamePopup(true);
      setCurrentLevel(null);
    }
  };

  const handleRestart = () => setCurrentLevel(currentLevel);

  const handleMainMenu = () => {
    setShowWelcome(true);
    setCurrentLevel(null);
    setShowEndGamePopup(false);
  };

  // Function to open the modal for bug report or suggestion
  const openModal = (type) => {
    setMessageType(type); // Set the type of message
    setShowModal(true); // Show the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false); // Hide the modal
    setMessage(''); // Clear the message
  };

  // Function to send email via EmailJS
  const sendEmail = (e) => {
    e.preventDefault(); // Prevent page reload

    // Configuration for sending the email
    const templateParams = {
      message: message, // User's message
      type: messageType, // Type: bug report or suggestion
    };

    // EmailJS service 
    emailjs
      .send('service_sktyzkg', 'template_t5yngdc', templateParams, 'RInHbSGYfFbhM8V1B')
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Message sent successfully!');
          closeModal(); // Close the modal after sending
        },
        (err) => {
          console.log('FAILED...', err);
          alert('Failed to send message. Please try again later.');
        }
      );
  };

  return (
    <div className="App">
      {/* Pass `showHowToPlay` state to control the visibility of welcome screen elements */}
      {showWelcome && <WelcomeScreen onPlay={startGame} onHowToPlay={showInstructions} isHowToPlayVisible={showHowToPlay} />}
      
      {currentLevel === null && !showWelcome && !showEndGamePopup && (
        <LevelSelection onLevelSelect={handleLevelSelect} onMainMenu={handleMainMenu} levels={levels} />
      )}
      
      {showHowToPlay && <HowToPlay onClose={closeInstructions} />}
      
      {currentLevel !== null && !showWelcome && !showHowToPlay && (
        <Maze
          level={levels[currentLevel]}
          currentLevelIndex={currentLevel}
          onLevelComplete={handleLevelComplete}
          onRestart={handleRestart}
          onMainMenu={handleMainMenu}
        />
      )}
      
      {showEndGamePopup && (
        <div className="end-game-popup">
          <Confetti width={window.innerWidth} height={window.innerHeight} /> {/* Confetti effect */}
          <h2>Congratulations, you have completed all levels!!</h2> {/* Display the final message */}
          <button className="btn control-btn" onClick={handleMainMenu}>Main Menu</button> {/* Button to return to the main menu */}
        </div>
      )}
      
      {/* Bug Report & Suggestion buttons in the bottom right corner */}
      <div className="bottom-right-buttons">
        <button className="btn report-btn" onClick={() => openModal('bug')}>Report a Bug</button>
        <button className="btn suggestion-btn" onClick={() => openModal('suggestion')}>Make a Suggestion</button>
      </div>

      {/* Modal for bug report / suggestion */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{messageType === 'bug' ? 'Report a Bug' : 'Make a Suggestion'}</h2>
            <form onSubmit={sendEmail}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)} // Update message state
                placeholder="Type your message here..."
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="btn send-btn">Send</button>
                <button type="button" className="btn cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
