<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { todos } from '$stores/todoStore';
	import type { TodoDocument } from '$types/todo';
	import Checkbox from '$UI/Checkbox.svelte';
	import { sleep } from '$utils/async';
	import { createEventDispatcher, tick } from 'svelte';
	import Icon from './Icon.svelte';

	export let todo: TodoDocument;
	export let disabled: boolean = false;

	const handleUpdate: SubmitFunction = () => {
		// Optimistically update the todo
		const oldTodo = { ...todo };
		todos.updateTodo(todo.$id, { ...todo, checked: !todo.checked });

		return async ({ result, update: _update }) => {
			if (['invalid', 'error'].includes(result.type)) {
				// Revert the optimistic update
				todos.updateTodo(todo.$id, oldTodo);
			}
		};
	};

	const handleDelete: SubmitFunction = () => {
		// Optimistically remove the todo
		const oldTodo = { ...todo };
		todos.remove(todo.$id);

		return async ({ result, update: _update }) => {
			if (['failure', 'error'].includes(result.type)) {
				// Revert the optimistic update
				await sleep(500);
				todos.add(oldTodo);
			}
		};
	};
</script>

<div class="todo" class:disabled>
	<form method="POST" action="/?/update" use:enhance={handleUpdate}>
		<input type="hidden" name="id" value={todo.$id} />
		<input type="hidden" name="checked" value={!todo.checked} />

		<!-- TODO: Implement progressively enhanced debouncer -->
		<Checkbox checked={todo.checked} />

		<div class="title" class:checked={todo.checked}>
			<span>{todo.title}</span>
		</div>

		<div class="points">
			<span>{todo.points}</span>
			<Icon icon="star" />
		</div>

		<form method="POST" action="/?/delete" use:enhance={handleDelete}>
			<input type="hidden" name="id" value={todo.$id} />
			<button class="clickable">
				<Icon icon="trash-2" />
			</button>
		</form>
	</form>
</div>

<style lang="postcss">
	form {
		display: contents;
	}

	.todo {
		display: flex;
		align-items: center;
		width: 100%;

		transition: opacity var(--transition-appearance);

		&.disabled {
			cursor: not-allowed;
			opacity: 0.5;

			& :global(*) {
				pointer-events: none;
			}
		}
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
