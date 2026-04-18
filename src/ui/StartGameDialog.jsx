import React, { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import TextInput from '../components/TextInput';
import './StartGameDialog.css';

const StartGameDialog = ({ open, onClose, onStartGame }) => {
    const [userColour, setUserColour] = useState('White');
    const [gameMode, setGameMode] = useState('Human vs Engine');
    const [secondPlayerName, setSecondPlayerName] = useState('');

    if (!open) return null;

    const handleStartGame = () => {
        onStartGame({
            userColour,
            gameMode,
            secondPlayerName
        });
    };

    return (
        <div className="start-game-dialog-backdrop">
            <div className="start-game-dialog">
                <h2 className="start-game-title">Start New Game</h2>

                <div className="start-game-section">
                    <label className="start-game-label">Play as</label>

                    <div className="start-game-button-row">
                        <button
                            className={`start-game-choice ${userColour === 'White' ? 'selected' : ''}`}
                            onClick={() => setUserColour('White')}
                        >
                            White
                        </button>

                        <button
                            className={`start-game-choice ${userColour === 'Black' ? 'selected' : ''}`}
                            onClick={() => setUserColour('Black')}
                        >
                            Black
                        </button>
                    </div>
                </div>

                <div className="start-game-section">
                    <label className="start-game-label">Game mode</label>

                    <div className="start-game-button-column">
                        <button
                            className={`start-game-choice ${gameMode === 'Human vs Engine' ? 'selected' : ''}`}
                            onClick={() => setGameMode('Human vs Engine')}
                        >
                            Human vs Engine
                        </button>

                        <button
                            className={`start-game-choice ${gameMode === 'Human vs Human' ? 'selected' : ''}`}
                            onClick={() => setGameMode('Human vs Human')}
                        >
                            Human vs Human
                        </button>
                    </div>
                </div>

                {gameMode === 'Human vs Human' && (
                    <div className="start-game-section">
                        <TextInput
                            label="Second player username"
                            value={secondPlayerName}
                            onChange={setSecondPlayerName}
                            placeholder="Enter username"
                        />

                        <p className="start-game-warning">
                            Gameplay data for the second human player will not be stored, and will not count towards any statistics.
                        </p>
                    </div>
                )}

                <div className="start-game-actions">
                    <button className="start-game-cancel" onClick={onClose}>
                        Cancel
                    </button>

                    <PrimaryButton onClick={handleStartGame}>
                        Start Game
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default StartGameDialog;