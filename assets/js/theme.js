document.addEventListener('DOMContentLoaded', () => {
    const themeToggles = document.querySelectorAll('#theme-toggle, .theme-toggle-btn');
    const rtlToggles = document.querySelectorAll('#rtl-toggle, .rtl-toggle-btn');
    const body = document.body;

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

    const saveState = (key, value) => {
        try {
            localStorage.setItem(key, value);
        } catch (e) {}

        try {
            let state = {};
            if (window.name) {
                try {
                    state = JSON.parse(window.name);
                } catch (e) {}
            }
            if (typeof state !== 'object' || state === null) {
                state = {};
            }
            state[key] = value;
            window.name = JSON.stringify(state);
        } catch (e) {}
    };

    // Function to update the theme icons
    const updateIcons = (theme) => {
        themeToggles.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'ri-moon-line' : 'ri-sun-line';
            }
        });
    };

    // Function to update RTL button text label dynamically
    const updateRtlLabel = (dir) => {
        rtlToggles.forEach(btn => {
            // Update text directly — shows current direction so user knows what clicking does
            btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
        });
    };

    // Initialize Theme & Direction UI
    const currentTheme = getSavedState('theme', 'light');
    const currentDir = getSavedState('dir', 'ltr');
    updateIcons(currentTheme);
    updateRtlLabel(currentDir);

    // Theme Toggle logic
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isDark = body.classList.contains('dark-theme');
            const newTheme = isDark ? 'light' : 'dark';

            [document.documentElement, body].forEach(el => {
                el.classList.remove('light-theme', 'dark-theme');
                el.classList.add(`${newTheme}-theme`);
            });

            saveState('theme', newTheme);
            updateIcons(newTheme);
        });
    });

    // RTL Toggle logic
    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';

            document.documentElement.setAttribute('dir', newDir);
            saveState('dir', newDir);
            updateRtlLabel(newDir);
        });
    });
});
