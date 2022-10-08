<script lang="ts">
	import Todo from '$components/Todo.svelte';
	import { subscribeTodosOnMount } from '$lib/todos';

	export let data: import('./$types').PageData;
	let todos = data.todos;

	subscribeTodosOnMount((data) => {
		const todo = data.payload;
		if (todos.documents.find((t) => t.$id === todo.$id)) {
			todos = {
				...todos,
				documents: todos.documents.map((t) => (t.$id === todo.$id ? todo : t))
			};
		} else {
			todos = {
				...todos,
				documents: [todo, ...todos.documents]
			};
		}
	});
</script>

<div class="container">
	<h1>To You</h1>
	<div class="todos">
		{#each todos.documents as todo}
			<Todo {todo} />
		{/each}
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
	}
</style>
