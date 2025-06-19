import React, { useState } from 'react';
import './ControlPanel.css';
import TextInput from '../components/TextInput';
import PrimaryButton from '../components/PrimaryButton';

const ControlPanel = () => {
  const [playerName, setPlayerName] = useState('');
  const [showHints, setShowHints] = useState(false);

  return (
    <div className="control-panel">
      <TextInput
        label="Import FEN"
        value={playerName}
        onChange={setPlayerName}
        helpText="Enter your display name for this game"
        placeholder="Enter FEN string"
      />
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <input
          type="checkbox"
          checked={showHints}
          onChange={() => setShowHints(!showHints)}
        />
        <span>Show move hints</span>
      </div>

      <PrimaryButton style={{ marginTop: '1rem' }} onClick={() => alert(`Starting game for ${playerName}`)}>
        Start Game
      </PrimaryButton>
    </div>
  );
};

export default ControlPanel;
