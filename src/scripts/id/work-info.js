import EmblaCarousel from 'embla-carousel';

/** @type {WeakMap<HTMLElement, { destroy: () => void }>} */
const ytmusicEmblaInstances = new WeakMap();

let descToggleAbort;

function initDescToggle() {
	descToggleAbort?.abort();
	descToggleAbort = new AbortController();
	const { signal } = descToggleAbort;

	const wrap = document.querySelector('[data-desc-wrap]');
	const text = wrap?.querySelector('[data-desc-text]');
	const toggle = wrap?.querySelector('[data-desc-toggle]');
	if (!wrap || !text || !toggle) return;

	const t = text;
	const btn = toggle;
	const readMore = btn.dataset.readMore ?? 'Read more';
	const readLess = btn.dataset.readLess ?? 'Show less';
	const isClamped = () => t.scrollHeight > t.clientHeight + 2;

	function check() {
		if (isClamped() || t.dataset.expanded === 'true') {
			btn.classList.remove('hidden');
		} else {
			btn.classList.add('hidden');
		}
	}

	btn.addEventListener(
		'click',
		() => {
			const expanded = t.dataset.expanded === 'true';
			if (expanded) {
				t.classList.add('line-clamp-5', 'md:line-clamp-6');
				t.dataset.expanded = 'false';
				btn.textContent = readMore;
			} else {
				t.classList.remove('line-clamp-5', 'md:line-clamp-6');
				t.dataset.expanded = 'true';
				btn.textContent = readLess;
			}
			check();
		},
		{ signal },
	);

	window.addEventListener('resize', check, { passive: true, signal });

	function scheduleCheck() {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				check();
			});
		});
	}

	scheduleCheck();
	document.fonts.ready.then(() => check());
}

function initWorkInfoYtmusicEmbla() {
	document.querySelectorAll('[data-work-info-embla-viewport]').forEach((node) => {
		if (!(node instanceof HTMLElement)) return;
		ytmusicEmblaInstances.get(node)?.destroy();
		const api = EmblaCarousel(node, {
			align: 'start',
			axis: 'x',
			containScroll: 'trimSnaps',
			dragFree: true,
			skipSnaps: true,
		});
		ytmusicEmblaInstances.set(node, api);
	});
}

document.addEventListener('astro:page-load', initDescToggle);
document.addEventListener('astro:page-load', initWorkInfoYtmusicEmbla);
