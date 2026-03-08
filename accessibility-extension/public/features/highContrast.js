window.HighContrastFeature = {
    id: 'a11y-high-contrast',

    css: `
    html.high-contrast {
        filter: invert(1) hue-rotate(180deg) !important;
    }

    html.high-contrast body {
        background-color: #ffffff !important;
    }

    html.high-contrast p,
    html.high-contrast h1, html.high-contrast h2, html.high-contrast h3,
    html.high-contrast h4, html.high-contrast h5, html.high-contrast h6,
    html.high-contrast span, html.high-contrast li, html.high-contrast td,
    html.high-contrast th, html.high-contrast label, html.high-contrast blockquote {
        background-color: white !important;
        color: black !important;
    }

    html.high-contrast :is(img, svg, picture, canvas, video, [role="img"]) {
        filter: invert(1) hue-rotate(180deg) !important;
    }

    html.high-contrast *:not(a):not(a *) {
        color: black !important;
    }

    html.high-contrast *::selection {
        background: black !important;
        color: white !important;
    }

    html.high-contrast a,
    html.high-contrast a:visited,
    html.high-contrast a:link {
        color: #002fff !important;
    }


    html.high-contrast a cite,
    html.high-contrast a span,
    html.high-contrast a div {
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