import React from 'react';

function FeatureButton({ label, isActive, onClick, description }) {
  return (
    <button
      onClick={onClick}
      className={`feature-button ${isActive ? 'active' : ''}`}
    >
      <span>{label}</span>
      <span>{isActive ? 'ON' : 'OFF'}</span>
    </button>
  );
}

export default FeatureButton;