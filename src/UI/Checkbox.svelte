<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import { elasticOut, linear } from 'svelte/easing';
	import { fade, type TransitionConfig } from 'svelte/transition';

	export let checked: boolean = false;
</script>

<button class="btn btn-icon" {...$$restProps}>
	{#if checked}
		<div class="icon-wrapper" transition:fade|local={{ duration: 200 }}>
			<Icon icon="check" />
		</div>
	{/if}
</button>

<style lang="postcss">
	button {
		color: var(--palette-cyan-40);
		width: 1.5rem;
		height: 1.5rem;
	}

	.icon-wrapper {
		display: grid;
		place-items: center;
	}
</style>
