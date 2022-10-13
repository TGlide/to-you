<script lang="ts">
	import featherSprite from 'feather-icons/dist/feather-sprite.svg';

	const sizeMap = {
		sm: '0.75rem',
		base: '1rem',
		md: '1.25rem',
		lg: '1.5rem',
		xl: '2.25rem'
	} as const;
	type Size = keyof typeof sizeMap;

	export let size: Size = 'base';
	export let icon: string;

	$: width = sizeMap[size];
	$: height = sizeMap[size];
	$: href = `${featherSprite}#${icon}`;
</script>

<svg style:width style:height {...$$restProps}>
	<use {href} />
</svg>

<style lang="postcss">
	svg {
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
</style>
