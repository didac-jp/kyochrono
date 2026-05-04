import { defaultLang, languages, type Lang, ui } from './ui';

export { defaultLang, languages, type Lang };

export const supportedLangs = Object.keys(languages) as Lang[];

export function getLangFromUrl(url: URL): Lang {
	const segment = url.pathname.split('/').filter(Boolean)[0];
	if (segment && segment in languages) {
		return segment as Lang;
	}
	return defaultLang;
}

export function useTranslations(lang: Lang) {
	const fallback = ui[defaultLang];
	const table = ui[lang] ?? fallback;
	return function t(key: string): string {
		const v = table[key];
		if (typeof v === 'string') return v;
		const fb = fallback[key];
		if (typeof fb === 'string') return fb;
		return key;
	};
}

/** Reemplaza `{clave}` en una plantilla de traducción. */
export function interpolate(template: string, vars: Record<string, string>): string {
	return template.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? `{${k}}`);
}

/** Prepends `/${lang}`; keeps trailing slash when `path` has one (except root → `/${lang}/`). */
export function useTranslatedPath(lang: Lang) {
	return function translatePath(path: string): string {
		const raw = path.trim();
		const normalized = raw === '' || raw === '/' ? '/' : raw.startsWith('/') ? raw : `/${raw}`;
		if (normalized === '/') {
			return `/${lang}/`;
		}
		const withLang = `/${lang}${normalized}`;
		return withLang.endsWith('/') ? withLang : `${withLang}/`;
	};
}

/** Separa `/{lang}/...` del resto de la ruta (trailing slash en `restPath` salvo raíz `/`). */
export function parseLocalizedPath(pathname: string): { lang: Lang | null; restPath: string } {
	const parts = pathname.split('/').filter(Boolean);
	const first = parts[0];
	if (first && first in languages) {
		const rest = parts.slice(1).join('/');
		return { lang: first as Lang, restPath: rest ? `/${rest}/` : '/' };
	}
	const normalized =
		pathname === '/' ? '/' : pathname.endsWith('/') ? pathname : `${pathname}/`;
	return { lang: null, restPath: normalized };
}
