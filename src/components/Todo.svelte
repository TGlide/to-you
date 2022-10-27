<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { todoStore } from '$stores/todoStore';
	import type { TodoDocument } from '$types/todo';
	import Checkbox from '$UI/Checkbox.svelte';
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';

	export let todo: TodoDocument;
	export let disabled: boolean = false;

	const handleSubmit: SubmitFunction = ({ action }) => {
		if (action.href.includes('update')) {
			// Optimistically update the todo
			const oldTodo = { ...todo };
			todoStore.updateTodo(todo.$id, { ...todo, checked: !todo.checked });

			return async ({ result, update: _update }) => {
				if (['invalid', 'error'].includes(result.type)) {
					// Revert the optimistic update
					todoStore.updateTodo(todo.id, oldTodo);
				}
			};
		} else if (action.href.includes('delete')) {
			// Optimistically remove the todo
			const oldTodo = { ...todo };
			todoStore.remove(todo.$id);

			return async ({ result, update: _update }) => {
				if (['invalid', 'error'].includes(result.type)) {
					// Revert the optimistic update
					todoStore.add(oldTodo);
				}
			};
		}
	};
</script>

<form class="todo" method="POST" action="/?/delete" class:disabled use:enhance={handleSubmit}>
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
	form {
		transition: opacity var(--transition-appearance);

		&.disabled {
			cursor: not-allowed;
			opacity: 0.5;

			& :global(*) {
				pointer-events: none;
			}
		}
	}

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
