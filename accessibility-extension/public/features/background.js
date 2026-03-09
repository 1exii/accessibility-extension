const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
    if (msg.action === 'PLAY_TTS') {
        try {
            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${msg.voiceId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': ELEVENLABS_API_KEY
                },
                body: JSON.stringify({
                    text: msg.text,
                    model_id: "eleven_multilingual_v1"
                })
            });

            if (!response.ok) throw new Error(`TTS API error: ${response.status}`);
            const audioBlob = await response.blob();
            const arrayBuffer = await audioBlob.arrayBuffer();
            const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

            sendResponse({ success: true, audioBase64: base64Audio });
        } catch (err) {
            console.error('TTS background error:', err);
            sendResponse({ success: false, error: err.message });
        }
        return true; // Keep message channel open for async response
    }
});