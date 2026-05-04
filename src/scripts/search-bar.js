const SECTION_SELECTOR = '[data-series-section]';

let attached = false;

function onDocumentInput(event) {
    if (!(event.target instanceof HTMLInputElement) || event.target.id !== 'works-filter') {
        return;
    }
    const catalogNodes = document.querySelectorAll('[data-catalog-item]');
    const items =
        catalogNodes.length > 0
            ? [...catalogNodes]
            : [...document.querySelectorAll('article[data-reveal]')];
    const useSections = catalogNodes.length > 0;

    const q = event.target.value.trim().toLowerCase();

    for (const el of items) {
        const title = (el.dataset.title ?? '').toLowerCase();
        const series = (el.dataset.series ?? '').toLowerCase();
        const match = !q || title.includes(q) || series.includes(q);
        el.style.display = match ? '' : 'none';
    }

    if (useSections) {
        for (const section of document.querySelectorAll(SECTION_SELECTOR)) {
            const children = section.querySelectorAll('[data-catalog-item]');
            const anyVisible = [...children].some((li) => li.style.display !== 'none');
            section.style.display = anyVisible ? '' : 'none';
        }
    }
}

function attachSearchBarFilter() {
    if (attached) return;
    attached = true;
    document.addEventListener('input', onDocumentInput);
}

attachSearchBarFilter();
