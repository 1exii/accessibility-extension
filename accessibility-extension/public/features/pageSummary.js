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

        const pageText = Array.from(
            document.body.querySelectorAll('p, h1, h2, h3, h4, h5, h6')
        ).map(el => el.innerText).join(' ');

        let allDifficulties = [];

        chrome.runtime.sendMessage({
            action: 'GENERATE_SUMMARY',
            pageText: pageText
        }, (response) => {
            if (response && response.content) {
                const content = response.content;
                allDifficulties = Array.from({ length: 10 }, (_, i) => {
                    const regex = new RegExp(`${i + 1}:\\s*([\\s\\S]*?)(?=${i + 2}:|Original difficulty:|$)`, 'm');
                    const match = content.match(regex);
                    return match ? match[1].trim() : '';
                });

                const origMatch = content.match(/Original difficulty:\s*(\d+)/);
                const originalDifficulty = origMatch ? parseInt(origMatch[1], 10) : 5;

                slider.value = originalDifficulty;
                summaryText.innerText = allDifficulties[originalDifficulty - 1] || 'No summary';
            } else {
                summaryText.innerText = 'Error generating summaries';
            }
        });

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