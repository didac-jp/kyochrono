// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const DEFAULT_SITE_URL = 'https://kyochrono.dev';

export default defineConfig({
	site: DEFAULT_SITE_URL,
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
