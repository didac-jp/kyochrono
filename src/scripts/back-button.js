import { navigate } from 'astro:transitions/client';

const LANG_CODES = new Set(['en', 'es']);
const DEFAULT_LANG = 'en';

const STACK_KEY = 'kyoLogicalNavStack';
const MAX_STACK = 50;

function parseLocalizedPath(pathname) {
	const parts = pathname.split('/').filter(Boolean);
	const first = parts[0];
	if (first && LANG_CODES.has(first)) {
		const rest = parts.slice(1).join('/');
		return { lang: first, restPath: rest ? `/${rest}/` : '/' };
	}
	const normalized =
		pathname === '/' ? '/' : pathname.endsWith('/') ? pathname : `${pathname}/`;
	return { lang: null, restPath: normalized };
}

function toLogicalSnapshot(href) {
	const u = new URL(href);
	const { lang, restPath } = parseLocalizedPath(u.pathname);
	return {
		lang: lang ?? DEFAULT_LANG,
		restPath,
		search: u.search,
		hash: u.hash,
	};
}

function logicalKey(s) {
	return `${s.restPath}${s.search}${s.hash}`;
}

function sameRestPathAndHash(a, b) {
	return a.restPath === b.restPath && a.hash === b.hash;
}

function buildHref(lang, snap) {
	const base = snap.restPath === '/' ? `/${lang}/` : `/${lang}${snap.restPath}`;
	const path = base.endsWith('/') ? base : `${base}/`;
	return `${window.location.origin}${path}${snap.search}${snap.hash}`;
}

function readStack() {
	try {
		const raw = sessionStorage.getItem(STACK_KEY);
		const arr = raw ? JSON.parse(raw) : [];
		return Array.isArray(arr) ? arr : [];
	} catch {
		return [];
	}
}

function writeStack(stack) {
	sessionStorage.setItem(STACK_KEY, JSON.stringify(stack.slice(-MAX_STACK)));
}

function recordCurrentNavigation() {
	const snap = toLogicalSnapshot(window.location.href);
	const stack = readStack();
	const key = logicalKey(snap);
	const top = stack[stack.length - 1];
	if (!top) {
		stack.push(snap);
	} else if (logicalKey(top) === key) {
		stack[stack.length - 1] = snap;
	} else if (sameRestPathAndHash(top, snap)) {
		stack[stack.length - 1] = snap;
	} else {
		stack.push(snap);
	}
	writeStack(stack);
}

function setupHistoryUrlSyncForNavStack() {
	const w = window;
	if (w.__kyoHistoryPatchForNavStack) return;
	w.__kyoHistoryPatchForNavStack = true;

	const origReplace = history.replaceState.bind(history);
	const origPush = history.pushState.bind(history);
	history.replaceState = function kyoReplaceState(data, unused, url) {
		origReplace(data, unused, url);
		recordCurrentNavigation();
	};
	history.pushState = function kyoPushState(data, unused, url) {
		origPush(data, unused, url);
		recordCurrentNavigation();
	};
	window.addEventListener('popstate', () => {
		queueMicrotask(() => {
			recordCurrentNavigation();
		});
	});
}

function setupLogicalNavStack() {
	const w = window;
	if (w.__kyoLogicalNavStackBound) return;
	w.__kyoLogicalNavStackBound = true;

	setupHistoryUrlSyncForNavStack();

	const sync = () => {
		recordCurrentNavigation();
	};

	document.addEventListener('DOMContentLoaded', sync);
	document.addEventListener('astro:after-swap', sync);
	if (document.readyState !== 'loading') {
		sync();
	}
}

function findCatalogSeriesSection(seriesKey) {
	if (!seriesKey) return null;
	for (const el of document.querySelectorAll('section[data-series-section][data-series-key]')) {
		if (el.getAttribute('data-series-key') === seriesKey) return el;
	}
	return null;
}

function findTimelineYearBlock(yearAnchor) {
	if (!yearAnchor) return null;
	return document.querySelector(`[data-timeline-year="${yearAnchor}"]`);
}

function scrollSmartBackTarget(seriesKey, yearAnchor) {
	const { restPath } = parseLocalizedPath(window.location.pathname);
	const behavior = 'instant';

	if (restPath === '/catalog/animes/') {
		if (!seriesKey) return;
		const el = findCatalogSeriesSection(seriesKey);
		if (el instanceof HTMLElement && !el.hasAttribute('hidden')) {
			el.scrollIntoView({ block: 'start', behavior });
			return;
		}
		const root = document.querySelector('[data-catalog-active-root]');
		if (root instanceof HTMLElement) {
			root.scrollIntoView({ block: 'start', behavior });
		}
		return;
	}

	if (restPath === '/timeline/') {
		if (!yearAnchor) return;
		const el = findTimelineYearBlock(yearAnchor);
		if (el instanceof HTMLElement) {
			el.scrollIntoView({ block: 'start', behavior });
		}
	}
}

function scheduleScrollAfterSmartBack(seriesKey, yearAnchor) {
	const run = () => {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				scrollSmartBackTarget(seriesKey, yearAnchor);
			});
		});
	};
	document.addEventListener('astro:page-load', run, { once: true });
}

function setupSmartBack() {
	const w = window;
	if (w.__kyoBackButtonSmartBound) return;
	w.__kyoBackButtonSmartBound = true;
	document.addEventListener(
		'click',
		(e) => {
			const target = e.target;
			if (!(target instanceof Element)) return;
			const a = target.closest('a[data-smart-back]');
			if (!a) return;
			const stack = readStack();
			if (stack.length < 2) return;
			e.preventDefault();
			const seriesKey = a.dataset.backCatalogSeries ?? '';
			const yearAnchor = a.dataset.backTimelineYear ?? '';
			stack.pop();
			const prev = stack[stack.length - 1];
			writeStack(stack);
			const cur = toLogicalSnapshot(window.location.href);
			const built = buildHref(cur.lang, prev);
			const dest = new URL(built);
			const pathQueryHash = `${dest.pathname}${dest.search}${dest.hash}`;
			const { restPath: destRest } = parseLocalizedPath(dest.pathname);
			if (destRest === '/catalog/animes/' || destRest === '/timeline/') {
				scheduleScrollAfterSmartBack(seriesKey, yearAnchor);
			}
			navigate(pathQueryHash, { history: 'push' });
		},
		true,
	);
}

setupLogicalNavStack();
setupSmartBack();
