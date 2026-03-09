const FEATHERLESS_API_URL = "https://api.featherless.ai/v1/chat/completions";

const handleImageClick = (event) => {

    const img = event.target;
    if (img.tagName.toLowerCase() !== 'img') return;

    if (img.width < 50 || img.height < 50) return;

    event.stopPropagation();
    event.preventDefault();

    let overlay = document.getElementById('image-caption-overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'image-caption-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 2147483647; /* Maximum possible z-index to stay on top */
            background-color: rgba(0, 0, 0, 0.9);
            color: #ffffff;
            padding: 16px 24px;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            font-size: 18px;
            max-width: 400px;
            box-shadow: 0px 4px 12px rgba(0,0,0,0.5);
            border: 2px solid #ffffff;
            pointer-events: none; /* Lets you click through it if it covers something */
        `;
        document.body.appendChild(overlay);
    }

    overlay.style.display = 'block';
    overlay.innerText = 'Generating caption...';
    chrome.runtime.sendMessage({
        action: 'GENERATE_CAPTION',
        imageUrl: img.src
    }, (response) => {
        if (response && response.caption) {
            overlay.innerText = response.caption;
        } else {
            overlay.innerText = 'Error: ' + (response?.error || 'Unknown error');
        }
    });
};

window.ImageCaptionFeature = {
    id: "image-caption",

    toggle: (isEnabled) => {
        if (isEnabled) {
            
            document.addEventListener('click', handleImageClick, true);

            window.PageModifier.injectCSS('caption-cursor', `
                img { 
                    cursor: pointer !important; 
                }
            `);

        } else {
      
            document.removeEventListener('click', handleImageClick, true);
            window.PageModifier.removeCSS('caption-cursor');
            const overlay = document.getElementById('image-caption-overlay');
            if (overlay) overlay.remove();
        }
    }
};