<script lang="ts">
	export let data: import('./$types').PageData;
	const todos = data.todos;
</script>

<div class="container">
	<h1>To You</h1>
	{#each todos.documents as todo}
		<p>{todo.title}</p>
	{/each}
</div>

<style lang="postcss">
	@import 'styles/index.pcss';

	.container {
		& h1 {
			@extend .text-2xl;
		}
	}
</style>
