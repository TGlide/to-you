import { sveltekit } from '@sveltejs/kit/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		(() => {
			const plugins = sveltekit();
			const transformedPlugins = plugins.reduce<typeof plugins>((acc, plugin) => {
				if (plugin.name === 'vite-plugin-svelte') {
					return [
						...acc,
						...svelte({
							onwarn: (warning, defaultHandler) => {
								// Disable warning about unused CSS selectors, since we use postcss-import, and
								// svelte purges it anyway.
								if (warning.code === 'css-unused-selector') return;

								// Handle all other warnings normally
								defaultHandler?.(warning);
							}
						})
					];
				} else if (plugin.name === 'vite-plugin-svelte:inspector') {
					return [...acc];
				}

				return [...acc, plugin];
			}, []);

			return [...transformedPlugins];
		})()
	]
};

export default config;
