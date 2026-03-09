const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const FEATHERLESS_API_KEY = import.meta.env.VITE_FEATHERLESS_API_KEY;

async function createOffscreen() {
    if (await chrome.offscreen.hasDocument()) return;
    await chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['AUDIO_PLAYBACK'],
        justification: 'TTS Playback'
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'PLAY_TTS') {
        createOffscreen().then(() => {
            const sendData = () => {
                chrome.runtime.sendMessage({
                    action: 'AUDIO_PLAY',
                    text: request.text,
                    voiceId: request.voiceId,
                    apiKey: ELEVENLABS_API_KEY
                }, (response) => {
                    if (chrome.runtime.lastError) {
                        setTimeout(sendData, 200);
                    } else {
                        sendResponse({ status: 'success' });
                    }
                });
            };
            sendData();
        });
        return true;
    }

    if (request.action === 'STOP_TTS') {
        chrome.offscreen.hasDocument().then(hasDoc => {
            if (hasDoc) {
                chrome.runtime.sendMessage({ action: 'AUDIO_STOP' });
            }
        });
        sendResponse({ status: 'stop_sent' });
        return true;
    }

    if (request.action === 'GENERATE_CAPTION') {
        fetch("https://api.featherless.ai/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${FEATHERLESS_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "google/gemma-3-27b-it",
                messages: [{
                    role: "user",
                    content: [
                        { type: "text", text: "Write a concise, one-sentence caption describing this image. NO MARKDOWN." },
                        { type: "image_url", image_url: { url: request.imageUrl } }
                    ]
                }],
                max_tokens: 50
            })
        })
            .then(res => res.json())
            .then(data => {
                const caption = data.choices?.[0]?.message?.content || 'No caption available';
                sendResponse({ caption });
            })
            .catch(err => {
                console.error('API Error:', err);
                sendResponse({ error: 'Failed to generate caption' });
            });

        return true;
    }

    if (request.action === 'GENERATE_SUMMARY') {
        fetch("https://api.featherless.ai/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${FEATHERLESS_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "google/gemma-3-27b-it",
                messages: [{
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `You are a text simplifier. Generate 10 versions of the following text, one for each difficulty level from 1 to 10. 
- DO NOT USE MARKDOWN.
- Keep meaning and key points.
- Output plain text.
- Label each difficulty clearly: 1:, 2:, 3:, ..., 10:.

Difficulty levels:
1 = explain to a 5 year old
2 = explain to a 7 year old  
3 = explain to a 10 year old
4 = explain to a middle schooler
5 = explain to a high schooler
6 = explain to a college freshman
7 = explain to a college graduate
8 = explain to a professional in the field
9 = explain to an expert researcher
10 = explain to a PhD specialist using technical jargon

Be concise. Keep key points. Match the vocabulary and sentence complexity to the level.
Output plain sentences only. Nothing else.

Also, assign a difficulty level (1-10) to the original text based on these categories, and output it at the end as: Original difficulty: X`
                        },
                        { type: "text", text: request.pageText }
                    ]
                }],
                max_tokens: 4000
            })
        })
            .then(res => res.json())
            .then(data => sendResponse({ content: data.choices?.[0]?.message?.content }))
            .catch(err => sendResponse({ error: err.message }));
        return true;
    }
})
