window.letterSpacingFeature = {
  id: 'letter-spacing',

  toggle: (isEnabled) => {
    if (isEnabled) {
      const allElements = document.querySelectorAll('body *');

      allElements.forEach(el => {
        const hasDirectText = Array.from(el.childNodes).some(
          node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== ''
        );

        if (hasDirectText) {
          const currentStyle = window.getComputedStyle(el);
          let currentLetterSpacing = currentStyle.letterSpacing;
          
          let sizeInPx = currentLetterSpacing === 'normal' ? 0 : parseFloat(currentLetterSpacing);
          const fontSizePx = parseFloat(currentStyle.fontSize);
          const newSpacingPx = sizeInPx + (fontSizePx * 0.12);

          el.setAttribute('data-orig-letter-spacing', currentLetterSpacing);
          el.style.setProperty('letter-spacing', `${newSpacingPx}px`, 'important');
        }
      });
    } else {
      const modifiedElements = document.querySelectorAll('[data-orig-letter-spacing]');
      
      modifiedElements.forEach(el => {
        const originalSize = el.getAttribute('data-orig-letter-spacing');
        el.style.setProperty('letter-spacing', originalSize);
        el.removeAttribute('data-orig-letter-spacing');
        
        if (el.getAttribute('style') === '') {
          el.removeAttribute('style');
        }
      });
    }
  }
};