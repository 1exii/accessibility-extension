window.FontSizeFeature = {
  id: 'font-size',

  toggle: (isEnabled) => {
    if (isEnabled) {
      const allElements = document.querySelectorAll('body *');

      allElements.forEach(el => {
    
        const hasDirectText = Array.from(el.childNodes).some(
          node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== ''
        );

        if (hasDirectText) {
          const currentSize = window.getComputedStyle(el).fontSize;
          const sizeInPx = parseFloat(currentSize);
          
          if (sizeInPx) {
            el.setAttribute('data-a11y-orig-font-size', currentSize);
            el.style.setProperty('font-size', `${sizeInPx * 1.15}px`, 'important');
          }
        }
      });
    } else {
      const modifiedElements = document.querySelectorAll('[data-a11y-orig-font-size]');
      
      modifiedElements.forEach(el => {
        const originalSize = el.getAttribute('data-a11y-orig-font-size');
        el.style.setProperty('font-size', originalSize);
        el.removeAttribute('data-a11y-orig-font-size');
        
        if (el.getAttribute('style') === '') {
          el.removeAttribute('style');
        }
      });
    }
  }
};