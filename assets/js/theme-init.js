(function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedDir = localStorage.getItem('dir') || 'ltr';
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
