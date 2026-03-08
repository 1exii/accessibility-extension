chrome.storage.local.get(['settings'], (result) => {
  const settings = result.settings;
  
  if (settings) {
    if (settings.dyslexiaFont && window.DyslexiaFontFeature) {
      window.DyslexiaFontFeature.toggle(true);
    }
    if (settings.largeCursor && window.LargeCursorFeature) {
      window.LargeCursorFeature.toggle(true);
    }
    if (settings.fontSize && window.FontSizeFeature) {
      window.FontSizeFeature.toggle(true);
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'TOGGLE_FEATURE') {
    switch (request.feature) {
      case 'dyslexiaFont':
        if (window.DyslexiaFontFeature) window.DyslexiaFontFeature.toggle(request.enabled);
        break;
      case 'largeCursor':
        if (window.LargeCursorFeature) window.LargeCursorFeature.toggle(request.enabled);
        break;
      case 'fontSize':
        if (window.FontSizeFeature) window.FontSizeFeature.toggle(request.enabled);
        break;
    }
  }
  return true; 
});