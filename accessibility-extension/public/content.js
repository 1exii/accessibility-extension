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
    if (settings.lineSpacing && window.LineSpacingFeature) {
      window.LineSpacingFeature.toggle(true);
    }
    if (settings.letterSpacing && window.letterSpacingFeature) {
      window.letterSpacingFeature.toggle(true);
    }
    if (settings.highContrast && window.HighContrastFeature) {
      window.HighContrastFeature.toggle(true);
    }
    if (settings.imageCaption && window.ImageCaptionFeature) {
      window.ImageCaptionFeature.toggle(true);
    }
    if (settings.bionicReading && window.BionicReadingFeature) {
      window.BionicReadingFeature.toggle(true);
    }
    if (settings.pageSummary && window.PageSummaryFeature) {
      window.PageSummaryFeature.toggle(true);
    }
    if (settings.textToSpeech && window.TextToSpeechFeature) {
      window.TextToSpeechFeature.toggle(true);
    }
    if (settings.smartMagnify && window.SmartMagnifyFeature) {
      window.SmartMagnifyFeature.toggle(true);
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
      case 'lineSpacing':
        if (window.LineSpacingFeature) window.LineSpacingFeature.toggle(request.enabled);
        break;
      case 'letterSpacing':
        if (window.letterSpacingFeature) window.letterSpacingFeature.toggle(request.enabled);
        break;
      case 'highContrast':
        if (window.HighContrastFeature) window.HighContrastFeature.toggle(request.enabled);
        break;
      case 'imageCaption':
        if (window.ImageCaptionFeature) window.ImageCaptionFeature.toggle(request.enabled);
        break;
      case 'bionicReading':
        if (window.BionicReadingFeature) window.BionicReadingFeature.toggle(request.enabled);
        break;
      case 'pageSummary':
        if (window.PageSummaryFeature) window.PageSummaryFeature.toggle(request.enabled);
        break;
      case 'textToSpeech':
        if (window.TextToSpeechFeature) window.TextToSpeechFeature.toggle(request.enabled);
        break;
      case 'smartMagnify':
        if (window.SmartMagnifyFeature) window.SmartMagnifyFeature.toggle(request.enabled);
        break;
    }
  }
  return true; 
});