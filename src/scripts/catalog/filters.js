let attached = false;

function getNodes() {
	const filteredRoot = document.querySelector('[data-catalog-filtered-root]');
	const franchiseRoot = document.querySelector('[data-catalog-franchise-root]');
	return { filteredRoot, franchiseRoot };
}

const state = {
	q: '',
};

function normalizeQuery(s) {
	return (s ?? '').trim().toLowerCase();
}

function itemMatches(el) {
	const q = state.q;
	if (!q) return true;
	const title = (el.dataset.title ?? '').toLowerCase();
	const series = (el.dataset.series ?? '').toLowerCase();
	const tags = (el.dataset.tags ?? '').toLowerCase();
	return title.includes(q) || series.includes(q) || tags.includes(q);
}

function applyVisibilityToRoot(root) {
	if (!(root instanceof HTMLElement)) return;
	root.querySelectorAll('[data-catalog-item]').forEach((node) => {
		if (!(node instanceof HTMLElement)) return;
		node.toggleAttribute('hidden', !itemMatches(node));
	});
}

function applySectionVisibility(root) {
	if (!(root instanceof HTMLElement)) return;
	root.querySelectorAll('[data-series-section]').forEach((section) => {
		if (!(section instanceof HTMLElement)) return;
		const items = section.querySelectorAll('[data-catalog-item]');
		const anyVisible = [...items].some((li) => li instanceof HTMLElement && !li.hasAttribute('hidden'));
		section.toggleAttribute('hidden', !anyVisible);
	});
}

function setRootActive(rootEl) {
	const { filteredRoot, franchiseRoot } = getNodes();
	[filteredRoot, franchiseRoot].forEach((node) => {
		if (!(node instanceof HTMLElement)) return;
		node.removeAttribute('data-catalog-active-root');
	});
	if (rootEl instanceof HTMLElement) {
		rootEl.setAttribute('data-catalog-active-root', '');
	}
}

function toggleRoots() {
	const { filteredRoot, franchiseRoot } = getNodes();
	if (!(filteredRoot instanceof HTMLElement) || !(franchiseRoot instanceof HTMLElement)) return;

	const active = Boolean(state.q);

	if (active) {
		filteredRoot.classList.remove('hidden');
		filteredRoot.setAttribute('aria-hidden', 'false');
		franchiseRoot.classList.add('hidden');
		setRootActive(filteredRoot);
	} else {
		filteredRoot.classList.add('hidden');
		filteredRoot.setAttribute('aria-hidden', 'true');
		franchiseRoot.classList.remove('hidden');
		setRootActive(franchiseRoot);
	}
}

function applyAll() {
	const { filteredRoot, franchiseRoot } = getNodes();
	applyVisibilityToRoot(filteredRoot);
	applyVisibilityToRoot(franchiseRoot);
	applySectionVisibility(franchiseRoot);
	toggleRoots();
}

function onInput(event) {
	if (!(event.target instanceof HTMLInputElement) || event.target.id !== 'works-filter') return;
	state.q = normalizeQuery(event.target.value);
	applyAll();
}

function initCatalogSearchFilter() {
	const input = document.getElementById('works-filter');
	state.q = input instanceof HTMLInputElement ? normalizeQuery(input.value) : '';
	applyAll();

	if (attached) return;
	attached = true;
	document.addEventListener('input', onInput);
}

document.addEventListener('astro:page-load', initCatalogSearchFilter);
