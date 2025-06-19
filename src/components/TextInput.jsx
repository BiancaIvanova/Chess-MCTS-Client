import React from 'react';
import './TextInput.css';

const TextInput = ({ label, value, onChange, helpText, ...props }) => {
  return (
    <div className="text-input-group">
      {label && <label className="text-input-label">{label}</label>}
      <div className="text-input-wrapper">
        <input
          className="text-input"
          value={value}
          onChange={e => onChange(e.target.value)}
          {...props}
        />
        {helpText && <button className="text-input-help" title={helpText}>?</button>}
      </div>
    </div>
  );
};

export default TextInput;
