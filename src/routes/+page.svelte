<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance, type SubmitFunction } from '$app/forms';
	import Todo from '$components/Todo.svelte';
	import { isAddTodoInput, type TodoDocument } from '$types/todo';
	import { formDataToObject } from '$utils/object';
	import { todoStore } from '$stores/todoStore';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { v4 as uuidv4 } from 'uuid';
	import type { ActionData, PageData } from './$types';
	import Icon from '$components/Icon.svelte';
	import Counter from '$UI/Counter.svelte';

	export let data: PageData;
	$todoStore = data.todos.documents;

	$: todos = $todoStore.sort((a, b) => {
		// Check if the todo is checked
		const checkedRes = Number(a.checked ?? false) - Number(b.checked ?? false);
		if (checkedRes !== 0) return checkedRes;
		// Compare the title
		return a.title.localeCompare(b.title);
	});

	let todoTitle = '';
	let todoPoints = 1;
	let titleEl: HTMLInputElement;

	$: points = $todoStore.reduce((acc, todo) => {
		if (!todo.checked) return acc;
		return acc + (todo.points ?? 0);
	}, 0);

	// Progressive enhancement functions
	const handleSubmit: SubmitFunction<ActionData> = ({ data: formData }) => {
		const dataObj = formDataToObject(formData, { transformers: { points: Number } });
		if (!isAddTodoInput(dataObj)) return;

		// Optimistically add the todo
		const id = uuidv4();
		const tempTodo = {
			...dataObj,
			checked: false,
			disabled: true,
			tempId: id,
			$id: id,
			$collectionId: '',
			$databaseId: '',
			$createdAt: '',
			$updatedAt: '',
			$permissions: []
		};
		todoStore.add(tempTodo);

		// Reset the form state
		todoTitle = '';
		todoPoints = 1;
		titleEl.focus();

		return async ({ result }) => {
			if (['invalid', 'error'].includes(result.type)) {
				// Revert the optimistic update
				todoStore.remove(tempTodo.$id);
			} else if (result.type === 'success') {
				todoStore.update((prevTodos) => {
					return prevTodos.map((todo) => {
						if (todo.tempId === tempTodo.tempId) {
							return { ...todo, ...result.data, disabled: false };
						}
						return todo;
					});
				});
			}
		};
	};

	const handleClear: SubmitFunction<ActionData> = () => {
		// Optimistically delete the todos
		const checkedTodos = $todoStore.filter((t) => t.checked);
		todoStore.set($todoStore.filter((t) => !t.checked));

		return async ({ result }) => {
			if (['invalid', 'error'].includes(result.type)) {
				// Revert the optimistic update
				todoStore.set([...$todoStore, ...checkedTodos]);
			}
		};
	};
</script>

<div class="container">
	<div class="header">
		<div class="points">
			<Counter value={points} />
			<Icon icon="star" />
		</div>
		<div class="actions">
			<form method="POST" action="?/deleteChecked" use:enhance={handleClear}>
				<button
					class="clickable color-red-60"
					disabled={$todoStore.filter((t) => t.checked).length === 0}
				>
					Clear all completed
				</button>
			</form>
		</div>
	</div>
	<form class="add-wrapper" method="POST" action="?/add" use:enhance={handleSubmit}>
		<input
			bind:this={titleEl}
			class="input title"
			bind:value={todoTitle}
			placeholder="Todo title"
			name="title"
		/>
		<input
			class="input points"
			bind:value={todoPoints}
			type="number"
			name="points"
			min="1"
			max="10"
		/>
		<button class="btn" disabled={browser && !todoTitle}>Add</button>
	</form>

	<div class="todos">
		{#each todos as todo (todo.tempId || todo.$id)}
			<div animate:flip={{ duration: 500 }} in:fade out:fade={{ duration: 100 }}>
				<Todo {todo} disabled={todo.disabled} />
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.container {
		padding-top: var(--space-16);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		& .points {
			display: flex;
			align-items: center;
			gap: var(--space-4);

			color: var(--palette-cyan-30);
			font-weight: var(--fw-bold);
		}
	}

	.add-wrapper {
		display: flex;
		align-items: center;
		gap: var(--space-8);
		width: 100%;

		margin-top: var(--space-16);

		& input {
			min-width: 0;

			&.title {
				flex: 1 1 auto;
			}

			&.points {
				flex-basis: 5rem;
			}
		}
	}

	.todos {
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
		margin-top: var(--space-16);
	}
</style>
