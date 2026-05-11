document.addEventListener('DOMContentLoaded', () => {
    const themeToggles = document.querySelectorAll('#theme-toggle, .theme-toggle-btn');
    const body = document.body;

    // Function to update the UI icons
    const updateIcons = (theme) => {
        themeToggles.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'ri-moon-line' : 'ri-sun-line';
            }
        });
    };

    // Initialize UI
    const currentTheme = localStorage.getItem('theme') || 'light';
    updateIcons(currentTheme);

    // Theme Toggle logic
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isDark = body.classList.contains('dark-theme');
            const newTheme = isDark ? 'light' : 'dark';

            // Update Class on both body and html (html for immediate init on next load)
            [document.documentElement, body].forEach(el => {
                el.classList.remove('light-theme', 'dark-theme');
                el.classList.add(`${newTheme}-theme`);
            });

            // Save to LocalStorage
            localStorage.setItem('theme', newTheme);

            // Update Icons
            updateIcons(newTheme);
        });
    });

    // RTL Toggle logic
    const rtlToggles = document.querySelectorAll('#rtl-toggle, .rtl-toggle-btn');
    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    });
});
