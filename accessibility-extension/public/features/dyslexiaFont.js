const regularUrl = chrome.runtime.getURL('fonts/OpenDyslexic-Regular.otf');
const boldUrl = chrome.runtime.getURL('fonts/OpenDyslexic-Bold.otf');
const italicUrl = chrome.runtime.getURL('fonts/OpenDyslexic-Italic.otf');
const boldItalicUrl = chrome.runtime.getURL('fonts/OpenDyslexic-BoldItalic.otf');

window.DyslexiaFontFeature = {
    id: 'dyslexia-font',

    css: `
    @font-face {
        font-family: 'OpenDyslexic-Extension';
        src: url('${regularUrl}') format('opentype');
        font-weight: normal;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'OpenDyslexic-Extension';
        src: url('${boldUrl}') format('opentype');
        font-weight: bold;
        font-style: normal;
    }

    @font-face {
        font-family: 'OpenDyslexic-Extension';
        src: url('${italicUrl}') format('opentype');
        font-weight: normal;
        font-style: italic;
    }

    @font-face {
        font-family: 'OpenDyslexic-Extension';
        src: url('${boldItalicUrl}') format('opentype');
        font-weight: bold;
        font-style: italic;
    }
    
    * {
        font-family: 'OpenDyslexic-Extension', 'Comic Sans MS', sans-serif !important;
        font-size-adjust: 0.45 !important; 
        letter-spacing: -0.2px !important; 
        line-height: 1.5 !important; 
    }
    }
  `,

    toggle: (isEnabled) => {
        if (isEnabled) {
            window.PageModifier.injectCSS(window.DyslexiaFontFeature.id, window.DyslexiaFontFeature.css);
        } else {
            window.PageModifier.removeCSS(window.DyslexiaFontFeature.id);
        }
    }
};