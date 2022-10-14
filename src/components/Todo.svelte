<script lang="ts">
	import { enhance } from '$app/forms';
	import type { TodoDocument } from '$types/todo';
	import Checkbox from '$UI/Checkbox.svelte';
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';

	export let todo: TodoDocument;

	const dispatch = createEventDispatcher<{
		update: TodoDocument;
	}>();
</script>

<form
	class="todo"
	method="POST"
	action="/?/delete"
	use:enhance={({ action }) => {
		if (action.href.includes('update')) {
			// Optimistically update the todo
			const oldTodo = { ...todo };
			dispatch('update', { ...oldTodo, checked: !todo.checked });

			return async ({ result, update: _update }) => {
				if (['invalid', 'error'].includes(result.type)) {
					// Revert the optimistic update
					dispatch('update', { ...oldTodo });
				}

				// We don't call update to prevent the page data to being updated with old data
				// TODO: Find a better way to do this
			};
		}
	}}
>
	<input type="hidden" name="id" value={todo.$id} />
	<input type="hidden" name="checked" value={!todo.checked} />

	<!-- TODO: Implement progressively enhanced debouncer -->
	<Checkbox checked={todo.checked} formaction="/?/update" />

	<div class="title" class:checked={todo.checked}>
		<span>{todo.title}</span>
	</div>

	<div class="points">
		<span>{todo.points}</span>
		<Icon icon="star" />
	</div>

	<button class="clickable">
		<Icon icon="trash-2" />
	</button>
</form>

<style lang="postcss">
	.todo {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.title {
		margin-left: var(--space-8);
		transition: var(--transition-appearance);

		&.checked {
			opacity: 0.5;
		}
	}

	.points {
		display: flex;
		align-items: center;
		gap: var(--space-4);

		color: var(--palette-cyan-30);
		font-weight: var(--fw-bold);

		margin-left: auto;
	}

	.clickable {
		display: grid;
		place-items: center;

		color: var(--palette-red-60);
		margin-left: var(--space-12);
	}
</style>
