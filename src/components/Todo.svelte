<script lang="ts">
	import type { TodoDocument } from '$types/todo';
	import Checkbox from '$UI/Checkbox.svelte';

	export let todo: TodoDocument;

	const handleChange = async (e: Event) => {
		e.preventDefault();
		const target = e.target as HTMLInputElement;
		const checked = target.checked;

		// Optimistic updates
		const previousChecked = todo.checked ?? false;

		try {
			// await updateTodo({
			// 	...todo,
			// 	checked
			// });
		} catch (e) {
			// Revert optimistic update
			target.checked = previousChecked;
			// TODO: Show error
		}
	};

	const handleDelete = () => {
		// TODO: optimistic delete
		// deleteTodo(todo.$id);
	};
</script>

<div class="todo">
	<Checkbox checked={todo.checked} on:change={handleChange} />
	<span>{todo.title}</span>
	<button on:click={handleDelete}>delete</button>
</div>

<style lang="postcss">
	button {
		cursor: pointer;
		color: red;
	}
</style>
