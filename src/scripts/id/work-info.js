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

document.addEventListener('astro:page-load', initDescToggle);

function initHScroll() {
	document.querySelectorAll('[data-hscroll]').forEach((el) => {
		let didDrag = false;

		el.addEventListener('dragstart', (e) => e.preventDefault());
		el.addEventListener('mousedown', (e) => {
			const startX = e.clientX;
			const scrollStart = el.scrollLeft;
			didDrag = false;

			const onMove = (e) => {
				const dx = e.clientX - startX;
				if (Math.abs(dx) > 4) didDrag = true;
				el.scrollLeft = scrollStart - dx;
			};

			const onUp = () => {
				document.removeEventListener('mousemove', onMove);
				document.removeEventListener('mouseup', onUp);
			};

			document.addEventListener('mousemove', onMove);
			document.addEventListener('mouseup', onUp);
		});

		el.addEventListener(
			'click',
			(e) => {
				if (didDrag) e.preventDefault();
			},
			{ capture: true },
		);
	});
}

document.addEventListener('astro:page-load', initHScroll);
