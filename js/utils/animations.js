// Animation utilities
export function initAnimations() {
    // First, mark elements that will be animated
    const elementsToAnimate = [
        '.hero-title',
        '.hero-subtitle', 
        '.hero-actions',
        '.process-step',
        '.product-card',
        '.occasion-card'
    ];

    // Add fade-in class but don't hide immediately
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            if (!el.classList.contains('fade-in')) {
                el.classList.add('fade-in');
                
                // Add a small delay before hiding to prevent flash
                setTimeout(() => {
                    el.classList.add('waiting-for-animation');
                }, 10);
                
                el.style.animationDelay = `${index * 0.1}s`;
            }
        });
    });

    // Intersection Observer for fade-in animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                // Remove the waiting class once animation is complete
                setTimeout(() => {
                    entry.target.classList.remove('waiting-for-animation');
                }, 600);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        fadeObserver.observe(el);
    });

    // Animate hero elements immediately (no intersection needed)
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroActions = document.querySelector('.hero-actions');

    if (heroTitle) {
        setTimeout(() => {
            heroTitle.classList.add('fade-in-visible');
            heroTitle.classList.remove('waiting-for-animation');
        }, 200);
    }

    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.classList.add('fade-in-visible');
            heroSubtitle.classList.remove('waiting-for-animation');
        }, 400);
    }

    if (heroActions) {
        setTimeout(() => {
            heroActions.classList.add('fade-in-visible');
            heroActions.classList.remove('waiting-for-animation');
        }, 600);
    }
}

export function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}