const SECTION_SELECTOR = '[data-series-section]';

let attached = false;

function getActiveCatalogRoot() {
	return document.querySelector('[data-catalog-active-root]');
}

function onDocumentInput(event) {
    if (!(event.target instanceof HTMLInputElement) || event.target.id !== 'works-filter') {
        return;
    }
    const activeRoot = getActiveCatalogRoot();
    const catalogNodes = activeRoot
        ? activeRoot.querySelectorAll('[data-catalog-item]')
        : document.querySelectorAll('[data-catalog-item]');
    const items =
        catalogNodes.length > 0
            ? [...catalogNodes]
            : [...document.querySelectorAll('article[data-reveal]')];
    const useSections =
        Boolean(activeRoot) && activeRoot.querySelector(SECTION_SELECTOR) !== null;

    const q = event.target.value.trim().toLowerCase();

    for (const el of items) {
        const filterOk = el.dataset.catalogVisibleByFilter !== 'false';
        const title = (el.dataset.title ?? '').toLowerCase();
        const series = (el.dataset.series ?? '').toLowerCase();
        const tags = (el.dataset.tags ?? '').toLowerCase();
        const textMatch = !q || title.includes(q) || series.includes(q) || tags.includes(q);
        const match = filterOk && textMatch;
        el.style.display = match ? '' : 'none';
    }

    if (useSections && activeRoot) {
        for (const section of activeRoot.querySelectorAll(SECTION_SELECTOR)) {
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
