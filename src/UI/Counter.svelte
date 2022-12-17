<script lang="ts">
	import { pxToRem } from '$utils/style';
	import { fade, slide } from 'svelte/transition';
	import CounterDigit from './CounterDigit.svelte';
	export let value = 0;
	export let fontSize = 18;
	$: charStyle = `font-size: ${pxToRem(fontSize)}rem`;
</script>

<div class="flex">
	{#each `${value}` as char, index (index)}
		<div transition:fade={{ duration: 200 }}>
			{#if Number.isNaN(Number(char))}
				<span style={charStyle}>{char}</span>
			{:else}
				<CounterDigit value={Number(char)} {fontSize} />
			{/if}
		</div>
	{/each}
</div>
