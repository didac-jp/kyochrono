import type { Lang } from '../i18n/ui';
import { useTranslatedPath } from '../i18n/utils';

export const navLinkDefs = [
	{ path: '/', labelKey: 'nav.home' },
	{ path: '/catalog/animes/', labelKey: 'nav.animes' },
	{ path: '/timeline/', labelKey: 'nav.timeline' },
] as const;

export function navLinksForLang(lang: Lang, t: (key: string) => string) {
	const tp = useTranslatedPath(lang);
	return navLinkDefs.map(({ path, labelKey }) => ({
		href: tp(path),
		label: t(labelKey),
	}));
}

export function catalogAnimes(lang: Lang): string {
	return useTranslatedPath(lang)('/catalog/animes/');
}

/** Query params for the unified catalog (decade key e.g. `2000s`, tag slug). */
export function catalogAnimesQuery(lang: Lang, q: { decade?: string; tag?: string }): string {
	const base = catalogAnimes(lang);
	const params = new URLSearchParams();
	if (q.decade) params.set('decade', q.decade);
	if (q.tag) params.set('tag', q.tag);
	const s = params.toString();
	return s ? `${base}?${s}` : base;
}

export function catalogAnimesDecade(lang: Lang, decade: string): string {
	return catalogAnimesQuery(lang, { decade });
}

export function catalogAnimesTag(lang: Lang, tagSlug: string): string {
	return catalogAnimesQuery(lang, { tag: tagSlug });
}

export function workDetailPath(lang: Lang, id: string): string {
	return useTranslatedPath(lang)(`/works/${id}/`);
}

export function homePath(lang: Lang): string {
	return useTranslatedPath(lang)('/');
}

export function tagToSlug(tag: string): string {
	return tag
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
}

