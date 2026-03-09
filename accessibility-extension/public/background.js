const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;

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
});