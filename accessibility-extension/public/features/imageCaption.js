const FEATHERLESS_API_KEY = "rc_46f718dc3e25106042d0861863bc5f337172d2d5578c421c1f9d05ca5f437c33";
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

    fetch(FEATHERLESS_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${FEATHERLESS_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "google/gemma-3-27b-it", 
            messages: [
            {
                role: "user",
                content: [
                { type: "text", text: "Write a concise, one-sentence caption that describes the key objects, actions, and setting in this image, highlighting what someone would need to know if they were unable to see the image. For example: 'A golden retriever puppy plays with a red ball in a grassy field.' NO MARKDOWN FORMATTING." },
                { type: "image_url", image_url: { url: img.src } }
                ]
            }
            ],
            max_tokens: 50
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log('Caption data for image:', img.src, data);
        console.log('Content:', data.choices?.[0]?.message?.content);
        const captionText = data.choices?.[0]?.message?.content || 'No caption available';
        overlay.innerText = captionText;
    })
    .catch(err => console.error('Error generating caption for image:', img.src, err));

};

window.ImageCaptionFeature = {
    id: "image-caption",

    toggle: (isEnabled) => {
        if (isEnabled) {
            
            document.addEventListener('click', handleImageClick, true);

            window.PageModifier.injectCSS('caption-cursor', `
                img { 
                    cursor: pointer !important; 
                    outline: 3px dashed #4CAF50 !important; 
                    outline-offset: 2px;
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