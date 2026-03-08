# Accessify: AI-powered accessibility extension

## Overview
This platform enhances web content with AI-powered tools and accessibility features, improving readability and engagement for all users. It combines text simplification, adaptive summaries, selective text-to-speech, and smart visual aids to create a highly interactive and user-friendly experience.  

---

## Contributors
- Nithya K
- Lexi L
- Arie L
- Priya P

---

## Technologies used
- ReactJS
- JavaScript
- ElevenLabs Text-to-Speech
- Featherless.ai Gemma model (via HuggingFace)

---

## Features

### 1. AI-powered text processing
- **Adaptive page summaries:** Automatically generates summaries tailored to 10 difficulty levels, from simple explanations for young readers to technical explanations for experts
- **Selective text-to-speech:** Reads only highlighted paragraphs using ElevenLabs TTS
- **Responsive image captioning:** Generates image descriptions based on user selection for better comprehension

### 2. Typography and readability
- **Dyslexia-friendly font:** Improves text legibility for users with dyslexia by using OpenDyslexic font
- **Adjustable text:** Users can modify font size, line spacing, and letter spacing based on their specific needs
- **Bionic reading:** Highlights key letters in words to guide reading flow and increase speed

### 3. Visual aids
- **Large cursor:** Easier navigation for users with visual impairments
- **High contrast mode:** Enhances readability by increasing color contrast
- **Smart magnifier:** Magnifies content near the cursor for better focus

---

## Tech Stack

- **Frontend:** ReactJS, JavaScript, CSS
- **Text processing:** Featherless.ai Gemma model (via HuggingFace) for text simplification and adaptive summaries
- **TTS:** ElevenLabs for selective text-to-speech

---

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yourproject.git
   bash```
2. Install dependencies:
   ```bash
   npm install
   bash```
4. Set environment variables:
   ```bash
    REACT_APP_FEATHERLESS_API_KEY=<your_featherless_api_key>
    REACT_APP_ELEVENLABS_API_KEY=<your_elevenlabs_api_key>
    REACT_APP_VOICE_ID=<your_voice_id>
   bash```
5. Start the npm server:
   ```bash
   npm run build
   bash```
6. Navigate to Chrome Extensions and enable Developer Mode. Click "Load unpacked" and select the dist folder of the project.
