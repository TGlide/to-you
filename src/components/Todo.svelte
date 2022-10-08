<script lang="ts">
	import type { Todo } from '$types/todo';

	export let todo: Todo;
</script>

<div class="todo">
	<input type="checkbox" checked={todo.checked} />
	<span>{todo.title}</span>
</div>
