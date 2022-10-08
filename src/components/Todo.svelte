<script lang="ts">
	import { updateTodo } from '$lib/todos';
	import type { TodoDocument } from '$types/todo';

	export let todo: TodoDocument;

	const handleChange = async (e: Event) => {
		e.preventDefault();
		const target = e.target as HTMLInputElement;
		const checked = target.checked;

		// Optimistic updates
		const previousChecked = todo.checked ?? false;

		try {
			await updateTodo({
				...todo,
				checked
			});
		} catch (e) {
			// Revert optimistic update
			target.checked = previousChecked;
			// TODO: Show error
		}
	};
</script>

<div class="todo">
	<input type="checkbox" checked={todo.checked} on:change={handleChange} />
	<span>{todo.title}</span>
</div>
