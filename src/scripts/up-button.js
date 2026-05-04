let upButtonAbort;

function syncVisibility(btns, scrollY) {
    const show = scrollY > 300;
    btns.forEach((btn) => btn.classList.toggle('visible', show));
}

function initUpButton() {
    upButtonAbort?.abort();
    upButtonAbort = new AbortController();
    const { signal } = upButtonAbort;

    const btns = document.querySelectorAll('.up-button');
    if (!btns.length) return;

    const onScroll = () => syncVisibility(btns, window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true, signal });

    btns.forEach((btn) => {
        btn.addEventListener(
            'click',
            () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
            { signal },
        );
    });

    onScroll();
}

document.addEventListener('astro:page-load', initUpButton);