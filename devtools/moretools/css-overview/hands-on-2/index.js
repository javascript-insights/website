function blendColors(fgRGBA, bgRGBA) {
    const alpha = fgRGBA[3];
    return [
        ((1 - alpha) * bgRGBA[0]) + (alpha * fgRGBA[0]),
        ((1 - alpha) * bgRGBA[1]) + (alpha * fgRGBA[1]),
        ((1 - alpha) * bgRGBA[2]) + (alpha * fgRGBA[2]),
        alpha + (bgRGBA[3] * (1 - alpha)),
    ];
}

function luminance([rSRGB, gSRGB, bSRGB]) {
    const r = rSRGB <= 0.03928 ? rSRGB / 12.92 : Math.pow(((rSRGB + 0.055) / 1.055), 2.4);
    const g = gSRGB <= 0.03928 ? gSRGB / 12.92 : Math.pow(((gSRGB + 0.055) / 1.055), 2.4);
    const b = bSRGB <= 0.03928 ? bSRGB / 12.92 : Math.pow(((bSRGB + 0.055) / 1.055), 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(fgRGBA, bgRGBA) {
    const blendedFg = blendColors(fgRGBA, bgRGBA);
    const fgLuminance = luminance(blendedFg);
    const bgLuminance = luminance(bgRGBA);
    const contrastRatio = (Math.max(fgLuminance, bgLuminance) + 0.05) / (Math.min(fgLuminance, bgLuminance) + 0.05);
    return contrastRatio;
}

function rgbToArray(rgb) {
    return [...rgb.substring(4).split(',').map(p => parseInt(p, 10) / 255), 1];
}

setInterval(() => {
    document.querySelectorAll('.badge').forEach(badge => {
        const style = getComputedStyle(badge);
        const f = style.color;
        const b = style.backgroundColor;

        const ratio = contrastRatio(rgbToArray(f), rgbToArray(b));

        badge.dataset.contrast = ratio.toFixed(2);
        badge.classList.toggle('low-contrast', ratio < 4.5);
    });
}, 500);