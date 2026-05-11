document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active Navigation Highlight
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a, .mobile-nav ul li a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath) {
            const fileName = linkPath.split('/').pop();
            const currentFileName = currentPath.split('/').pop() || 'index.html';

            if (fileName === currentFileName) {
                link.classList.add('active');
            }
        }
    });

    // Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Mobile Menu
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileClose = document.getElementById('mobile-close');

    mobileToggle?.addEventListener('click', () => {
        mobileNav.classList.add('active');
    });

    mobileClose?.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });

    // Animated Counters
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const count = +entry.target.innerText;
                const speed = 200;
                const inc = target / speed;

                const updateCount = () => {
                    const current = +entry.target.innerText;
                    if (current < target) {
                        entry.target.innerText = Math.ceil(current + inc);
                        setTimeout(updateCount, 1);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 1 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Back to Top Logic
    const backToTop = document.createElement('a');
    backToTop.href = '#';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="ri-arrow-up-line"></i>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
