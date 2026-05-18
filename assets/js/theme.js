document.addEventListener('DOMContentLoaded', () => {
    const themeToggles = document.querySelectorAll('#theme-toggle, .theme-toggle-btn');
    const rtlToggles = document.querySelectorAll('#rtl-toggle, .rtl-toggle-btn');
    const body = document.body;

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
    const currentTheme = localStorage.getItem('theme') || 'light';
    const currentDir = localStorage.getItem('dir') || document.documentElement.getAttribute('dir') || 'ltr';
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

            localStorage.setItem('theme', newTheme);
            updateIcons(newTheme);
        });
    });

    // RTL Toggle logic
    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';

            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            updateRtlLabel(newDir);
        });
    });
});
