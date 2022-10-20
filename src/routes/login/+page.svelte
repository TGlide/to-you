<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="container">
	<h1 class="text-xl">Login / Create account</h1>
	<form method="POST" use:enhance>
		<label class="label" for="name">Name</label>
		<!-- svelte-ignore a11y-autofocus -- This shouldn't disrupt accessibility -->
		<input class="input" type="text" name="name" placeholder="Jane Doe" required autofocus />
		<label class="label" for="email">Email</label>
		<input class="input" placeholder="jane@appwrite.io" name="email" type="email" required />
		<label class="label" for="password">Password</label>
		<input
			class="input"
			placeholder="pleasedontwritemypassword123"
			name="password"
			type="password"
			minlength="8"
			required
		/>
		<button class="btn btn-success">Login</button>
	</form>
</div>

<style lang="postcss">
	.container {
		padding-top: var(--space-32);
	}

	form {
		margin-top: var(--space-24);

		& label:not(:first-child) {
			margin-top: var(--space-16);
		}

		& button {
			margin-top: var(--space-24);
		}
	}

	.input {
		width: 100%;
	}
</style>
