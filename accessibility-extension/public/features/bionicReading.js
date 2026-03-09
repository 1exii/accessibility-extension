window.BionicReadingFeature = {
    id: 'bionic-reading',
    css:`
        html.bionic-reading .bionic-reading-word {
            font-weight: 900 !important;
        }

        html.bionic-reading .bionic-unbold {
            font-weight: normal !important;
        }   
    `,

    applyBionic: (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent.split(' ');
        const newHTML = words.map(word => {
            if (word.length <= 1) return word;
            const boldPart = word.slice(0, Math.ceil(word.length / 2));
            const restPart = word.slice(Math.ceil(word.length / 2));
            
            return `<span class="bionic-reading-word">${boldPart}</span><span class="bionic-unbold">${restPart}</span>`;
        }).join(' ');

        const span = document.createElement('span');
        span.innerHTML = newHTML;
        node.replaceWith(span);
        } else if (node.nodeType === Node.ELEMENT_NODE) {

        if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.tagName)) return;
        Array.from(node.childNodes).forEach(window.BionicReadingFeature.applyBionic);
        }
    },


    toggle:(enabled) => {        
        if (enabled) {
            window.PageModifier.injectCSS(window.BionicReadingFeature.id, window.BionicReadingFeature.css);
            document.documentElement.classList.add('bionic-reading');
            window.BionicReadingFeature.applyBionic(document.body);
        } else {
            window.PageModifier.removeCSS(window.BionicReadingFeature.id);
            document.documentElement.classList.remove('bionic-reading');
            location.reload(); 
        }
    }
}