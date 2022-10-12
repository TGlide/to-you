<script lang="ts">
	import Todo from '$components/Todo.svelte';
	import { addTodo, subscribeTodosOnMount } from '$lib/todos';
	import type { PageData } from './$types';

	export let data: PageData;
	let todos = data.todos;

	subscribeTodosOnMount((event) => {
		let newDocuments = [...todos.documents];
		const todo = event.payload;
		const isDeleteEvent = event.events[0].includes('delete');

		if (isDeleteEvent) {
			newDocuments = newDocuments.filter((doc) => doc.$id !== todo.$id);
		} else {
			const index = newDocuments.findIndex((doc) => doc.$id === todo.$id);
			if (index === -1) {
				newDocuments.push(todo);
			} else {
				newDocuments[index] = todo;
			}
		}

		todos = {
			...todos,
			documents: newDocuments
		};
	});

	let todoTitle = '';
</script>

<div class="container">
	<h1>To You</h1>
	<div class="todos">
		<h2>Todos</h2>
		{#each todos.documents as todo}
			<Todo {todo} />
		{/each}
	</div>
	<div class="add-wrapper">
		<input bind:value={todoTitle} />
		<button
			on:click={() => {
				addTodo({
					title: todoTitle,
					checked: false
				});
				todoTitle = '';
			}}
		>
			Add
		</button>
	</div>
</div>

<style lang="postcss">
	@import 'styles/index.pcss';

	.container {
		& h1 {
			@extend .text-2xl;
		}
	}

	.todos {
		margin-top: var(--space-16);

		& h2 {
			@extend .text-xl;
			margin-bottom: var(--space-8);
		}
	}

	.add-wrapper {
		margin-top: var(--space-32);

		& button {
			cursor: pointer;
			color: teal;
		}
	}
</style>
