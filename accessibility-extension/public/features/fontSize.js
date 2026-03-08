window.FontSizeFeature = {
  id: 'font-size-slider',
  sliderContainer: null,
  slider: null,

  createSlider: function() {
    // container
    this.sliderContainer = document.createElement('div');
    this.sliderContainer.id = 'font-size-slider-container';
    this.sliderContainer.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      padding: 12px 16px;
      background-color: #ede8f5; /* light purple */
      border-radius: 12px;
      z-index: 9999999;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `;

    // label
    const label = document.createElement('span');
    label.innerText = 'Font Size';
    label.style.fontFamily = `'DM Sans', sans-serif`;
    label.style.color = '#1a1f36'; // body text color
    label.style.fontSize = '13px';
    this.sliderContainer.appendChild(label);

    // slider track
    this.slider = document.createElement('input');
    this.slider.type = 'range';
    this.slider.min = 95;
    this.slider.max = 130;
    this.slider.step = 5; // snap by 5
    this.slider.value = 100;
    this.slider.style.cssText = `
      -webkit-appearance: none;
      width: 180px;
      height: 6px;
      background: #3d52a0; /* dark blue */
      border-radius: 3px;
      outline: none;
      cursor: pointer;
    `;

    this.slider.addEventListener('input', this.updateFontSize.bind(this));
    this.sliderContainer.appendChild(this.slider);
    document.body.appendChild(this.sliderContainer);

    // slider circle styles
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #1a1f36;
        cursor: pointer;
        border: none;
        margin-top: 0px;
      }
      input[type=range]::-moz-range-thumb {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #1a1f36;
        cursor: pointer;
        border: none;
      }
      input[type=range]::-ms-thumb {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #1a1f36;
        cursor: pointer;
        border: none;
      }
    `;
    document.head.appendChild(styleEl);
  },

  updateFontSize: function() {
    const scale = parseInt(this.slider.value, 10) / 100;
    const allElements = document.querySelectorAll('body *');

    allElements.forEach(el => {
      const hasText = Array.from(el.childNodes).some(
        n => n.nodeType === Node.TEXT_NODE && n.nodeValue.trim() !== ''
      );
      if (hasText) {
        const original = parseFloat(el.getAttribute('data-orig-font-size') || window.getComputedStyle(el).fontSize);
        el.style.fontSize = `${original * scale}px`;
        el.setAttribute('data-orig-font-size', original);
      }
    });
  },

  toggle: function(isEnabled) {
    if (isEnabled) {
      if (!this.sliderContainer) this.createSlider();
      this.sliderContainer.style.display = 'flex';
    } else if (this.sliderContainer) {
      this.sliderContainer.style.display = 'none';

      document.querySelectorAll('[data-orig-font-size]').forEach(el => {
        el.style.fontSize = el.getAttribute('data-orig-font-size');
        el.removeAttribute('data-orig-font-size');
      });
    }
  }
};