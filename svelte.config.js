import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// The docs site is fully prerendered and deployed to GitHub Pages.
		adapter: adapter({ fallback: '404.html' }),

		// GitHub Pages serves the site from /design-system; the deploy workflow sets BASE_PATH.
		paths: {
			base: process.env.BASE_PATH ?? ''
		},

		// Docs-site-only components live outside src/lib so that svelte-package
		// does not publish them to consumers.
		alias: {
			$internal: 'src/internal'
		}
	}
};

export default config;
