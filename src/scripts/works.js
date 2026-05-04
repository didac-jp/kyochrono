const STAGGER_MS = 80;
const OBSERVER_MARGIN = '150px 0px 150px 0px';

function isInViewport({ top, bottom }) {
    return top < window.innerHeight && bottom > 0;
}

function revealOnScroll(articles) {
    const observer = new IntersectionObserver(
        (entries) => {
            for (const { isIntersecting, target } of entries) {
                const el = target;
                if (isIntersecting) {
                    el.style.transitionDelay = el.dataset.stagger ?? '0ms';
                    el.classList.replace('below-fold', 'revealed');
                } else if (el.classList.contains('revealed')) {
                    el.style.transitionDelay = '0ms';
                    el.classList.replace('revealed', 'below-fold');
                }
            }
        },
        { threshold: 0, rootMargin: OBSERVER_MARGIN }
    );

    for (const [i, el] of articles.entries()) {
        el.dataset.stagger = `${(i % 3) * STAGGER_MS}ms`;
        if (!isInViewport(el.getBoundingClientRect())) {
            el.style.transitionDelay = el.dataset.stagger;
            el.classList.add('below-fold');
        }
        observer.observe(el);
    }
}

function init() {
    const articles = Array.from(
        document.querySelectorAll('article[data-reveal]')
    );
    revealOnScroll(articles);
}

document.addEventListener('astro:page-load', init);
