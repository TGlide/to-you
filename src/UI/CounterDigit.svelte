<script lang="ts">
	import { browser } from '$app/environment';
	import { range } from '$utils/array';
	import { pxToRem } from '$utils/style';
	import { onMount } from 'svelte';

	export let fontSize = 16;
	export let value = 0;

	let initialized = !browser;
	$: transformStyle = `translateY(-${(initialized ? value : 10) * pxToRem(fontSize)}rem)`;
	$: ulStyle = `--font-size: ${pxToRem(fontSize)}rem`;

	onMount(() => {
		initialized = true;
	});
</script>

<ul style={ulStyle}>
	{#each range(0, 10) as digit}
		<li style:transform={transformStyle}>{digit}</li>
	{/each}
</ul>

<style lang="postcss">
	ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: var(--font-mono);
		font-size: var(--font-size, 1rem);
		height: var(--font-size, 1rem);
		overflow: var(--overflow, hidden);
	}

	* {
		transition: 0.5s ease;
	}
</style>
