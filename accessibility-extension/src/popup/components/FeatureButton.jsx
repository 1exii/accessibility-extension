import React from 'react';

function FeatureButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: isActive ? '#4CAF50' : '#f1f1f1',
        color: isActive ? 'white' : 'black',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <span>{label}</span>
      <span>{isActive ? 'ON' : 'OFF'}</span>
    </button>
  );
}

export default FeatureButton;