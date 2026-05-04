// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const env = /** @type {any} */ (globalThis).process?.env ?? {};
const publicSiteUrl =
	typeof env.PUBLIC_SITE_URL === 'string' && env.PUBLIC_SITE_URL.trim() !== ''
		? env.PUBLIC_SITE_URL.trim()
		: undefined;

// https://astro.build/config
export default defineConfig({
	...(publicSiteUrl ? { site: publicSiteUrl } : {}),
	prefetch: {
		prefetchAll: false,
		defaultStrategy: 'tap',
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: {
			prefixDefaultLocale: true,
		},
	},
	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			include: ['astro-leaflet > leaflet'],
		},
	},
});
