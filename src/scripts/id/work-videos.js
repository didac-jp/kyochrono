const ACTIVE = ['border-white/40', 'text-white', 'bg-white/10'];
const INACTIVE = [
    'border-white/10',
    'text-white/30',
    'hover:text-white/60',
    'hover:border-white/30'
];

function idx(v) {
    const n = Number.parseInt(String(v ?? ''), 10);
    return Number.isFinite(n) ? n : 0;
}

function captureHtml() {
    document.querySelectorAll('[data-video-slot] [data-video-id]').forEach((w) => {
        if (!w.dataset.originalHtml) w.dataset.originalHtml = w.innerHTML;
    });
}

function handleSelectorClick(btn) {
    const group = btn.dataset.group;
    const target = idx(btn.dataset.idx);

    document.querySelectorAll('[data-selector]').forEach((b) => {
        if (b.dataset.group !== group) return;
        const on = idx(b.dataset.idx) === target;
        ACTIVE.forEach((c) => b.classList.toggle(c, on));
        INACTIVE.forEach((c) => b.classList.toggle(c, !on));
    });

    document.querySelectorAll('[data-video-slot]').forEach((slot) => {
        if (slot.dataset.group !== group) return;
        const on = idx(slot.dataset.idx) === target;
        if (!on) {
            const w = slot.querySelector('[data-video-id]');
            if (w?.querySelector('iframe, video') && w.dataset.originalHtml) {
                w.innerHTML = w.dataset.originalHtml;
                w.classList.add('group/video');
            }
        }
        slot.classList.toggle('invisible', !on);
        slot.classList.toggle('pointer-events-none', !on);
    });
}

function initVideoSelectors() {
    captureHtml();

    const w = window;
    w.__kyoWorkVideosAbort?.abort();
    w.__kyoWorkVideosAbort = new AbortController();
    const { signal } = w.__kyoWorkVideosAbort;

    document.addEventListener(
        'click',
        (e) => {
            const el = e.target;
            const btn = el instanceof Element ? el.closest('[data-selector]') : null;
            if (btn instanceof HTMLElement) handleSelectorClick(btn);
        },
        { signal }
    );
}

// ClientRouter (astro:transitions): DOM nuevo en cada vista; hay que re-capturar HTML y sustituir el listener delegado.
if (!window.__kyoWorkVideosBound) {
    window.__kyoWorkVideosBound = true;
    document.addEventListener('astro:page-load', initVideoSelectors);
}

initVideoSelectors();
