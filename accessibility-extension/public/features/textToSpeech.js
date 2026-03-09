const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

window.TextToSpeechFeature = {
    id: "text-to-speech",

    currentAudio: null,
    currentPlayingElement: null,

    css: `
        .tts-hover {
            outline: 3px dashed #3e60f8 !important;
            background-color: rgba(62, 96, 248, 0.1) !important;
            cursor: pointer !important;
            transition: all 0.2s ease;
            border-radius: 4px;
        }
        .tts-playing {
            outline: 3px solid #83c401 !important;
            background-color: rgba(131, 196, 1, 0.2) !important;
            border-radius: 4px;
        }
        #tts-stop-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #ff4757;
            color: white;
            border: none;
            border-radius: 50px;
            padding: 14px 28px;
            font-size: 16px;
            font-weight: bold;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
            cursor: pointer;
            z-index: 2147483647;
            display: none; /* Hidden until audio starts */
            font-family: Arial, sans-serif;
            transition: transform 0.2s;
        }
        #tts-stop-btn:hover {
            transform: scale(1.05);
            background: #ff6b81;
        }
    `,

    validTags: ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'BLOCKQUOTE', 'SPAN', 'A'],


    stopAudio: () => {

        chrome.runtime.sendMessage({ action: 'STOP_TTS' });

        if (window.TextToSpeechFeature.currentPlayingElement) {
            window.TextToSpeechFeature.currentPlayingElement.classList.remove('tts-playing');
            window.TextToSpeechFeature.currentPlayingElement = null;
        }
        const stopBtn = document.getElementById('tts-stop-btn');
        if (stopBtn) stopBtn.style.display = 'none';

        window.TextToSpeechFeature.currentAudio = null;
    },


    handleMouseOver: (e) => {
        const target = e.target;
        if (window.TextToSpeechFeature.validTags.includes(target.tagName)) {
            target.classList.add('tts-hover');
        }
    },

    handleMouseOut: (e) => {
        e.target.classList.remove('tts-hover');
    },

    handleClick: async (e) => {
        if (!window.TextToSpeechFeature.validTags.includes(e.target.tagName)) return;

        const text = e.target.innerText.trim();
        if (!text) return;

        e.preventDefault();
        e.stopPropagation();

        window.TextToSpeechFeature.stopAudio();
        window.TextToSpeechFeature.currentPlayingElement = e.target;
        e.target.classList.add('tts-playing');
        e.target.classList.remove('tts-hover');
        document.getElementById('tts-stop-btn').style.display = 'block';

        chrome.runtime.sendMessage({
            action: 'PLAY_TTS',
            text: text,
            voiceId: VOICE_ID
        }, (response) => {
            if (response && response.error) {
                console.error('TTS Error from background:', response.error);
            }
        });
    },

    toggle: (isEnabled) => {
        if (isEnabled) {
            window.PageModifier.injectCSS(window.TextToSpeechFeature.id, window.TextToSpeechFeature.css);

            if (!document.getElementById('tts-stop-btn')) {
                const stopBtn = document.createElement('button');
                stopBtn.id = 'tts-stop-btn';
                stopBtn.innerText = 'Stop';
                stopBtn.onclick = window.TextToSpeechFeature.stopAudio;
                document.body.appendChild(stopBtn);
            }
            document.addEventListener('mouseover', window.TextToSpeechFeature.handleMouseOver);
            document.addEventListener('mouseout', window.TextToSpeechFeature.handleMouseOut);
            document.addEventListener('click', window.TextToSpeechFeature.handleClick);
        } else {
            window.PageModifier.removeCSS(window.TextToSpeechFeature.id);
            const stopBtn = document.getElementById('tts-stop-btn');
            if (stopBtn) stopBtn.remove();
            document.removeEventListener('mouseover', window.TextToSpeechFeature.handleMouseOver);
            document.removeEventListener('mouseout', window.TextToSpeechFeature.handleMouseOut);
            document.removeEventListener('click', window.TextToSpeechFeature.handleClick);
            window.TextToSpeechFeature.stopAudio();
            document.querySelectorAll('.tts-hover, .tts-playing').forEach(el => {
                el.classList.remove('tts-hover', 'tts-playing');
            });
        }
    }
};
        

