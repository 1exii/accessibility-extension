let currentAudio = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'AUDIO_PLAY') {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    sendResponse({ received: true });
    playAudio(request);
    return true;
  }

  if (request.action === 'AUDIO_STOP') {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
      console.log("Audio stopped successfully");
    }
    sendResponse({ status: 'stopped' });
    return true;
  }
});

async function playAudio({ text, voiceId, apiKey }) {
  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_multilingual_v2"
      })
    });


    if (!response.ok) {
      const errBody = await response.json();
      console.error("ElevenLabs Error:", JSON.stringify(errBody, null, 2));
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    currentAudio = new Audio(url); 
    await currentAudio.play();

    currentAudio.onended = () => URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Fetch/Playback failed:", err);
  }
}