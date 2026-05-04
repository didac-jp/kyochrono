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

export function catalogDecade(lang: Lang, decade: string): string {
	return useTranslatedPath(lang)(`/catalog/decade/${decade}/`);
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

export function catalogTag(lang: Lang, tagSlug: string): string {
	return useTranslatedPath(lang)(`/catalog/tag/${tagSlug}/`);
}
