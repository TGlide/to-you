<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import Todo from '$components/Todo.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: todos = data.todos;

	let todoTitle = '';
</script>

<div class="container">
	<div class="add-wrapper">
		<form
			method="POST"
			action="?/add"
			use:enhance={() => {
				todoTitle = '';
			}}
		>
			<input class="input" bind:value={todoTitle} placeholder="Title" name="title" />
			<button class="btn" disabled={browser && !todoTitle}>Add</button>
		</form>
	</div>
	<div class="todos">
		{#each todos.documents as todo}
			<Todo {todo} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.container {
		padding-top: var(--space-32);
	}

	.todos {
		margin-top: var(--space-16);
	}

	.add-wrapper {
		display: flex;
		gap: var(--space-8);
	}
</style>
