let listenersAttached = false;

const state = {
	q: '',
	cat: '',
	decade: '',
};

function getNodes() {
	const filteredRoot = document.querySelector('[data-catalog-filtered-root]');
	const franchiseRoot = document.querySelector('[data-catalog-franchise-root]');
	return { filteredRoot, franchiseRoot };
}

function normalizeQuery(s) {
	return (s ?? '').trim().toLowerCase();
}

function categoryMatches(el) {
	const cat = state.cat;
	if (!cat) return true;
	const raw = el.dataset.cats ?? '';
	return raw
		.split(',')
		.map((p) => p.trim())
		.includes(cat);
}

function decadeMatches(el) {
	const decade = state.decade;
	if (!decade) return true;
	return (el.dataset.decade ?? '').trim() === decade;
}

function itemMatches(el) {
	const q = state.q;
	let searchOk = true;
	if (q) {
		const title = (el.dataset.title ?? '').toLowerCase();
		const series = (el.dataset.series ?? '').toLowerCase();
		const tags = (el.dataset.tags ?? '').toLowerCase();
		searchOk = title.includes(q) || series.includes(q) || tags.includes(q);
	}
	return searchOk && categoryMatches(el) && decadeMatches(el);
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
		const anyVisible = [...items].some(
			(li) => li instanceof HTMLElement && !li.hasAttribute('hidden'),
		);
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

function syncCatalogSearchParams() {
	const url = new URL(window.location.href);
	if (state.cat) {
		url.searchParams.set('cat', state.cat);
		url.searchParams.delete('tag');
	} else {
		url.searchParams.delete('cat');
		url.searchParams.delete('tag');
	}
	if (state.decade) {
		url.searchParams.set('decade', state.decade);
	} else {
		url.searchParams.delete('decade');
	}
	const next = `${url.pathname}${url.search}${url.hash}`;
	const cur = `${window.location.pathname}${window.location.search}${window.location.hash}`;
	if (next !== cur) {
		history.replaceState({}, '', next);
	}
}

function readDecadeFromUrl() {
	const raw = new URLSearchParams(window.location.search).get('decade');
	let decade = (raw ?? '').trim();
	if (!decade) {
		state.decade = '';
		return;
	}
	try {
		decade = decodeURIComponent(decade).trim();
	} catch {
		/* keep trimmed raw */
	}
	state.decade = decade;
}

function readCatFromUrl() {
	const params = new URLSearchParams(window.location.search);
	if (params.has('cat')) {
		const raw = params.get('cat');
		try {
			state.cat = decodeURIComponent(raw ?? '').trim();
		} catch {
			state.cat = (raw ?? '').trim();
		}
		return;
	}
	if (params.has('tag')) {
		const slug = (params.get('tag') ?? '').trim();
		const buttons = document.querySelectorAll(
			'[data-catalog-cat-filter] button[data-catalog-chip-kind="tag"][data-tag]',
		);
		for (const btn of buttons) {
			if (btn instanceof HTMLButtonElement && btn.dataset.tag === slug && btn.dataset.cat) {
				state.cat = btn.dataset.cat;
				return;
			}
		}
	}
	state.cat = '';
}

function setFilterButtonsActive() {
	const root = document.querySelector('[data-catalog-cat-filter]');
	if (!(root instanceof HTMLElement)) return;
	const cat = state.cat;
	root.querySelectorAll('button[data-cat]').forEach((btn) => {
		if (!(btn instanceof HTMLButtonElement)) return;
		const btnCat = btn.dataset.cat ?? '';
		const active = btnCat === cat;
		btn.setAttribute('data-active', active ? 'true' : 'false');
		btn.setAttribute('aria-pressed', active ? 'true' : 'false');
	});
}

function onInput(event) {
	if (!(event.target instanceof HTMLInputElement) || event.target.id !== 'works-filter') return;
	state.q = normalizeQuery(event.target.value);
	applyAll();
}

function onCatalogCatClick(event) {
	const el = event.target;
	if (!(el instanceof Element)) return;
	const btn = el.closest('button[data-cat][data-catalog-chip-kind="tag"]');
	if (!(btn instanceof HTMLButtonElement)) return;
	const next = btn.dataset.cat ?? '';
	if (next === state.cat) return;
	state.cat = next;
	setFilterButtonsActive();
	syncCatalogSearchParams();
	applyAll();
}

function initCatalogFilters() {
	const input = document.getElementById('works-filter');
	state.q = input instanceof HTMLInputElement ? normalizeQuery(input.value) : '';
	readDecadeFromUrl();
	readCatFromUrl();
	setFilterButtonsActive();
	syncCatalogSearchParams();
	applyAll();

	if (!listenersAttached) {
		listenersAttached = true;
		document.addEventListener('input', onInput);
		document.addEventListener('click', onCatalogCatClick);
	}
}

document.addEventListener('astro:page-load', initCatalogFilters);
