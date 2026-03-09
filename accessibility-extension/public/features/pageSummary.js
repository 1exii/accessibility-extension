const FEATHERLESS_API_KEY2 = import.meta.env.VITE_FEATHERLESS_API_KEY2;
const FEATHERLESS_API_URL2 = "https://api.featherless.ai/v1/chat/completions";

const handlePageSummary = () => {
    let overlay = document.getElementById('page-summary-overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'page-summary-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 2147483647;
            background-color: rgba(0, 0, 0, 0.9);
            color: #ffffff;
            padding: 16px 24px;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            font-size: 16px;
            max-width: 400px;
            max-height: 70vh;
            overflow-y: auto;
            box-shadow: 0px 4px 12px rgba(0,0,0,0.5);
            border: 2px solid #ffffff;
        `;

        const sliderLabel = document.createElement('label');
        sliderLabel.innerText = "Adjust difficulty level: ";
        sliderLabel.style.display = 'block';
        sliderLabel.style.marginBottom = '8px';

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = 1;
        slider.max = 10;
        slider.id = 'difficulty-slider';
        slider.style.width = '100%';

        const summaryText = document.createElement('div');
        summaryText.id = 'page-summary-text';
        summaryText.style.marginTop = '12px';

        overlay.appendChild(sliderLabel);
        overlay.appendChild(slider);
        overlay.appendChild(summaryText);
        document.body.appendChild(overlay);

        overlay.style.display = 'block';
        summaryText.innerText = 'Generating summary...';

        // get page text
        const pageText = Array.from(
            document.body.querySelectorAll('p, h1, h2, h3, h4, h5, h6')
        ).map(el => el.innerText).join(' ');

        let allDifficulties = []; // store 10 versions

        const generateAllDifficulties = () => {
            fetch(FEATHERLESS_API_URL2, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${FEATHERLESS_API_KEY2}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "google/gemma-3-27b-it",
                    messages: [
                        {
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
                                {
                                    type: "text",
                                    text: pageText
                                }
                            ]
                        }
                    ],
                    max_tokens: 4000
                })
            })
            .then(res => res.json())
            .then(data => {
                const content = data.choices?.[0]?.message?.content || '';

                // Parse the 10 difficulties
                allDifficulties = Array.from({length: 10}, (_, i) => {
                    const regex = new RegExp(`${i+1}:\\s*([\\s\\S]*?)(?=${i+2}:|Original difficulty:|$)`, 'm');
                    const match = content.match(regex);
                    return match ? match[1].trim() : '';
                });

                // Parse AI-assigned original difficulty
                const origMatch = content.match(/Original difficulty:\s*(\d+)/);
                const originalDifficulty = origMatch ? parseInt(origMatch[1], 10) : 5;

                // Set slider and initial summary
                slider.value = originalDifficulty;
                summaryText.innerText = allDifficulties[originalDifficulty - 1] || 'No summary';
            })
            .catch(err => {
                console.error('Error generating summaries:', err);
                summaryText.innerText = 'Error generating summaries';
            });
        };

        generateAllDifficulties();

        // Slider changes display from pre-generated summaries
        slider.addEventListener('input', () => {
            const difficulty = parseInt(slider.value, 10);
            summaryText.innerText = allDifficulties[difficulty - 1] || 'Generating...';
        });
    }
};

window.PageSummaryFeature = {
    id: "page-summary",
    toggle: (isEnabled) => {
        if (isEnabled) {
            handlePageSummary();
        } else {
            const overlay = document.getElementById('page-summary-overlay');
            if (overlay) overlay.remove();
        }
    }
};