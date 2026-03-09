window.SmartMagnifyFeature = {
    id: 'smart-magnify',

    init: () => {
        if (document.getElementById('magnifier-lens')) return;

        const lens = document.createElement('div');
        lens.id = 'magnifier-lens';
        lens.style.cssText = `
      position: fixed;
      width: 300px;
      height: 200px;
      border-radius: 16px;
      border: 2px solid black;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      overflow: hidden;
      pointer-events: none;
      z-index: 2147483647;
      display: none;
      background: white;
    `;

        const inner = document.createElement('div');
        inner.id = 'magnifier-inner';
        inner.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      transform-origin: top left;
      pointer-events: none;
    `;

        lens.appendChild(inner);
        document.body.appendChild(lens);

        const bodyClone = document.body.cloneNode(true);
        bodyClone.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      margin: 0;
      pointer-events: none;
      width: ${document.body.scrollWidth}px;
    `;

        const clonedLens = bodyClone.querySelector('#magnifier-lens');
        if (clonedLens) clonedLens.remove();

        inner.appendChild(bodyClone);

        document.addEventListener('mousemove', (e) => {
            if (lens.style.display === 'none') return;

            const zoom = 2;
            const w = 300, h = 200;

            const lensX = e.clientX + 20 + w > window.innerWidth
                ? e.clientX - w - 20
                : e.clientX + 20;
            const lensY = e.clientY + 20 + h > window.innerHeight
                ? e.clientY - h - 20
                : e.clientY + 20;

            lens.style.left = lensX + 'px';
            lens.style.top = lensY + 'px';

            const offsetX = -e.clientX * zoom + w / 2;
            const offsetY = -e.clientY * zoom + h / 2;

            inner.style.transform = `scale(${zoom}) translate(${offsetX / zoom}px, ${offsetY / zoom}px)`;
        });
    },

    toggle: (isEnabled) => {
        if (isEnabled) {
            window.SmartMagnifyFeature.init();
            const lens = document.getElementById('magnifier-lens');
            document.body.style.cursor = 'none';
            lens.style.display = 'block';
        } else {
            const lens = document.getElementById('magnifier-lens');
            if (lens) lens.style.display = 'none';
            document.body.style.cursor = 'default';
        }
    }
};