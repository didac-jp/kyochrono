import EmblaCarousel from 'embla-carousel';

/** @type {WeakMap<HTMLElement, { destroy: () => void }>} */
const catalogTagEmblaByViewport = new WeakMap();

function initCatalogTagChipsEmbla() {
	document.querySelectorAll('[data-catalog-tag-embla-viewport]').forEach((node) => {
		if (!(node instanceof HTMLElement)) return;
		catalogTagEmblaByViewport.get(node)?.destroy();
		const api = EmblaCarousel(node, {
			align: 'start',
			axis: 'x',
			containScroll: 'trimSnaps',
			dragFree: true,
			skipSnaps: true,
		});
		catalogTagEmblaByViewport.set(node, api);
	});
}

document.addEventListener('astro:page-load', initCatalogTagChipsEmbla);
