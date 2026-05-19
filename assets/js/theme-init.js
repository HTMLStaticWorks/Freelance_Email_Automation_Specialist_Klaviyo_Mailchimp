(function () {
    const getSavedState = (key, fallback) => {
        try {
            const val = localStorage.getItem(key);
            if (val) return val;
        } catch (e) {}

        try {
            if (window.name) {
                const state = JSON.parse(window.name);
                if (state && state[key]) {
                    return state[key];
                }
            }
        } catch (e) {}

        return fallback;
    };

    const savedTheme = getSavedState('theme', 'light');
    const savedDir = getSavedState('dir', 'ltr');
    document.documentElement.setAttribute('dir', savedDir);

    // Apply theme to documentElement immediately to prevent flicker
    document.documentElement.classList.add(savedTheme + '-theme');

    // Also apply to body as soon as it's available to satisfy the "body.theme-name" requirement
    const observer = new MutationObserver(() => {
        if (document.body) {
            document.body.classList.add(savedTheme + '-theme');
            observer.disconnect();
        }
    });
    observer.observe(document.documentElement, { childList: true });
})();
