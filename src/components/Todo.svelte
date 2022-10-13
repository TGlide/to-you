<script lang="ts">
	import { enhance } from '$app/forms';
	import type { TodoDocument } from '$types/todo';
	import Icon from './Icon.svelte';

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
</script>

<form method="POST" action="/?/delete" use:enhance>
	<div class="todo">
		<input type="hidden" name="id" value={todo.$id} />

		<div class="checkbox-wrapper">
			<input type="checkbox" name="checked" checked={!todo.checked} />
			<button class="btn btn-icon" formaction="/?/update">
				{#if todo.checked}
					<Icon icon="check" />
				{:else}
					<Icon icon="" />
				{/if}
			</button>
		</div>

		<span>{todo.title}</span>
		<button class="btn btn-s btn-danger">delete</button>
	</div>
</form>

<style lang="postcss">
	.todo {
		display: flex;
		align-items: center;

		& span {
			margin-left: var(--space-8);
		}

		& > button {
			margin-left: var(--space-12);
		}
	}

	.checkbox-wrapper {
		display: flex;
		align-items: center;
		gap: var(--space-4);

		& input {
			display: none;
		}
	}
</style>
