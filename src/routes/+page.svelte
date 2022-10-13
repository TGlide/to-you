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
	<div class="add-wrapper">
		<input class="input" bind:value={todoTitle} placeholder="Title" />
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

		& h2 {
			margin-bottom: var(--space-8);
		}
	}

	.add-wrapper {
		& button {
			cursor: pointer;
			color: teal;
		}
	}
</style>
