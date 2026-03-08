import { useState, useEffect } from 'react';
import FeatureButton from './components/FeatureButton';
import './App.css';

function App() {
  const [activeFeatures, setActiveFeatures] = useState({
    dyslexiaFont: false,
    largeCursor: false,
    fontSize: false, 
  });

  useEffect(() => {
    chrome.storage.local.get(['settings'], (result) => {
      if (result.settings) {
        setActiveFeatures(result.settings);
      }
    });
  }, []);

  const handleToggle = async (featureName) => {
    const newState = !activeFeatures[featureName];
    
    const updatedFeatures = {
      ...activeFeatures,
      [featureName]: newState,
    };

    setActiveFeatures(updatedFeatures);
    chrome.storage.local.set({ settings: updatedFeatures });

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab) {
        chrome.tabs.sendMessage(tab.id, {
          action: 'TOGGLE_FEATURE',
          feature: featureName,
          enabled: newState,
        }).catch(() => {
        });
      }
    } catch (error) {
      console.error("Error finding active tab:", error);
    }
  };

  return (
    <div className="popup-container">
      <h2 className="popup-title">Accessibility Tools</h2>
      
      <div className="button-group">
        <FeatureButton 
          label="Dyslexia Font" 
          isActive={activeFeatures.dyslexiaFont}
          onClick={() => handleToggle('dyslexiaFont')}
        />
        <FeatureButton 
          label="Large Cursor" 
          isActive={activeFeatures.largeCursor}
          onClick={() => handleToggle('largeCursor')}
        />
        <FeatureButton 
          label="Larger Text" 
          isActive={activeFeatures.fontSize}
          onClick={() => handleToggle('fontSize')}
        />
      </div>
    </div>
  );
}

export default App;