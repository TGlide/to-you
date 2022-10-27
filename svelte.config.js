import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: {
				prependData: '@import "index.pcss";'
			},
			scss: true
		})
	],

	kit: {
		adapter: adapter(),
		alias: {
			$styles: './src/styles',
			$components: './src/components',
			$utils: './src/utils',
			$lib: './src/lib',
			$types: './src/types',
			$UI: './src/UI',
			$stores: './src/stores'
		}
	},
	onwarn: (warning, defaultHandler) => {
		// Disable warning about unused CSS selectors, since we use postcss-import, and
		// svelte purges it anyway.
		if (warning.code === 'css-unused-selector') return;

		// Handle all other warnings normally
		defaultHandler?.(warning);
	}
};

export default config;
