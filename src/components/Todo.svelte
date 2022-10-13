<script lang="ts">
	import { enhance } from '$app/forms';
	import type { TodoDocument } from '$types/todo';
	import Icon from './Icon.svelte';

	export let todo: TodoDocument;
</script>

<form
	method="POST"
	action="/?/delete"
	use:enhance={({ action }) => {
		if (action.href.includes('update')) {
			// Optimistically update the todo
			todo.checked = !todo.checked;

			return async ({ result }) => {
				if (['invalid', 'error'].includes(result.type)) {
					// Revert the optimistic update
					todo.checked = !todo.checked;
				}
			};
		}
	}}
>
	<div class="todo">
		<input type="hidden" name="id" value={todo.$id} />

		<div class="checkbox-wrapper">
			<input type="checkbox" name="checked" checked={!todo.checked} />
			<!-- TODO: Implement progressively enhanced debouncer -->
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
		color: var(--palette-cyan-40);

		& input {
			display: none;
		}
	}
</style>
