<script lang="ts">
	import { updateTodo } from '$lib/todos';
	import type { Todo, TodoDocument } from '$types/todo';

	export let todo: TodoDocument;

	const handleChange = async (e: Event) => {
		e.preventDefault();
		const target = e.target as HTMLInputElement;
		const checked = target.checked;

		target.checked = todo.checked ?? false;

		await updateTodo({
			...todo,
			checked
		});
	};
</script>

<div class="todo">
	<input type="checkbox" checked={todo.checked} on:change={handleChange} />
	<span>{todo.title}</span>
</div>
