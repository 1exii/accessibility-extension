window.LineSpacingFeature = {
  id: 'line-spacing',

  toggle: (isEnabled) => {
    if (isEnabled) {
      const allElements = document.querySelectorAll('body *');

      allElements.forEach(el => {
        const hasDirectText = Array.from(el.childNodes).some(
          node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== ''
        );

        if (hasDirectText) {
          const currentStyle = window.getComputedStyle(el);
          let currentLineHeight = currentStyle.lineHeight;
          let sizeInPx = parseFloat(currentLineHeight);
          
          if (isNaN(sizeInPx) || currentLineHeight === 'normal') {
            const fontSizePx = parseFloat(currentStyle.fontSize);
            sizeInPx = fontSizePx * 1.2; 
            currentLineHeight = 'normal';
          }

          if (sizeInPx) {
            el.setAttribute('data-orig-line-height', currentLineHeight);
            el.style.setProperty('line-height', `${sizeInPx * 1.15}px`, 'important');
          }
        }
      });
    } else {
      const modifiedElements = document.querySelectorAll('[data-orig-line-height]');
      
      modifiedElements.forEach(el => {
        const originalSize = el.getAttribute('data-orig-line-height');
        el.style.setProperty('line-height', originalSize);
        el.removeAttribute('data-orig-line-height');
        
        if (el.getAttribute('style') === '') {
          el.removeAttribute('style');
        }
      });
    }
  }
};