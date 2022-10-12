import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
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
			$UI: './src/UI'
		}
	}
};

export default config;
