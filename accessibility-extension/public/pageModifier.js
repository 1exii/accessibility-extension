window.PageModifier = {

  injectCSS: (id, cssRules) => {
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = cssRules;
      document.head.appendChild(style);
    }
  },

  removeCSS: (id) => {
    const style = document.getElementById(id);
    if (style) {
      style.remove();
    }
  }
};