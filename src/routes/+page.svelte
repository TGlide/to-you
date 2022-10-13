<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import Todo from '$components/Todo.svelte';
	import { flip } from 'svelte/animate';
	import { fade, scale } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;
	$: todos = data.todos.documents.sort((a, b) => {
		const checkedRes = Number(a.checked ?? false) - Number(b.checked ?? false);
		if (checkedRes !== 0) return checkedRes;
		return a.title.localeCompare(b.title);
	});

	let todoTitle = '';
</script>

<div class="container">
	<form
		class="add-wrapper"
		method="POST"
		action="?/add"
		use:enhance={() => {
			todoTitle = '';
		}}
	>
		<input class="input" bind:value={todoTitle} placeholder="Title" name="title" />
		<button class="btn" disabled={browser && !todoTitle}>Add</button>
	</form>

	<div class="todos">
		{#each todos as todo (todo.$id)}
			<div animate:flip={{ duration: 500 }} in:fade out:fade={{ duration: 100 }}>
				<Todo {todo} />
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.container {
		padding-top: var(--space-32);
	}

	.todos {
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
		margin-top: var(--space-16);
	}

	.add-wrapper {
		display: flex;
		gap: var(--space-8);

		& input {
			flex-grow: 1;
		}
	}
</style>
