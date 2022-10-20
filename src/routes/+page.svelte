<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import Todo from '$components/Todo.svelte';
	import type { TodoDocument } from '$types/todo';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;
	$: todos = data.todos.documents.sort((a, b) => {
		const checkedRes = Number(a.checked ?? false) - Number(b.checked ?? false);
		if (checkedRes !== 0) return checkedRes;
		return a.title.localeCompare(b.title);
	});

	let todoTitle = '';
	let todoPoints = 1;
	let titleEl: HTMLInputElement;

	const updateTodo = (e: CustomEvent<TodoDocument>) => {
		const todo = e.detail;
		const index = data.todos.documents.findIndex((t) => t.$id === todo.$id);
		if (index !== -1) data.todos.documents[index] = todo;
	};
</script>

<div class="container">
	<form
		class="add-wrapper"
		method="POST"
		action="?/add"
		use:enhance={() => {
			todoTitle = '';
			todoPoints = 1;
			titleEl.focus();
		}}
	>
		<input
			bind:this={titleEl}
			class="input title"
			bind:value={todoTitle}
			placeholder="Todo title"
			name="title"
		/>
		<input
			class="input points"
			bind:value={todoPoints}
			type="number"
			name="points"
			min="1"
			max="10"
		/>
		<button class="btn" disabled={browser && !todoTitle}>Add</button>
	</form>

	<div class="todos">
		{#each todos as todo (todo.$id)}
			<div animate:flip={{ duration: 500 }} in:fade out:fade={{ duration: 100 }}>
				<Todo {todo} on:update={updateTodo} />
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
		align-items: center;
		gap: var(--space-8);
		width: 100%;

		& input {
			min-width: 0;

			&.title {
				flex: 1 1 auto;
			}

			&.points {
				flex-basis: 5rem;
			}
		}
	}
</style>
