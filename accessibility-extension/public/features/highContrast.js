window.HighContrastFeature = {
    id: 'a11y-high-contrast',

    css:`
    html.high-contrast *:not(a):not(a *) {
        color: black !important;
    }
    html.high-contrast, html.high-contrast body {
        background-color: #ffffff !important;
        color: #000000 !important;
    }

    html.high-contrast {
        filter: invert(1) hue-rotate(180deg) !important;
    }

    html.high-contrast :is(img, svg, picture, canvas, video, [role="img"]) {
        filter: invert(1) hue-rotate(180deg) !important;
    }

    html.high-contrast *::selection { 
        background: black !important;
        color: white !important;
    }

    html.high-contrast a , html.high-contrast a:visited , html.high-contrast a:link{
        color: #002fff !important;
    }
    `,

    
    toggle: (enabled) => {
        if (enabled) {
            window.PageModifier.injectCSS(window.HighContrastFeature.id, window.HighContrastFeature.css);
            document.documentElement.classList.add('high-contrast');
        } else {
            window.PageModifier.removeCSS(window.HighContrastFeature.id);
            document.documentElement.classList.remove('high-contrast');
        }
    }
};
