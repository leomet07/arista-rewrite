<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
</script>

<main class="container mx-auto p-8 space-y-8">
	<hgroup>
		<h1 class="h1">Study Guides</h1>
		<p>Explore our collection of study guides and study smarter.</p>
	</hgroup>

	<section>
		<a
			href="https://drive.google.com/drive/u/3/folders/19-RDLg0JAxgJqaLJ9uUb7lU42vT4a-bj"
			type="button"
			class="btn variant-filled"
		>
			View the Study Guides
		</a>
	</section>
	{#if $currentUser && !$currentUser.is_tutee}
		<section class="card p-4 w-full text-token space-y-4">
			<p class="">
				Please submit any study guides you have created to receive "other" credits. Each study guide
				can receive up to 2 credits, depending on the quality. Please note that this year, we are
				encouraging submissions of all formats, including Quizlets, Kahoots, handwritten notes, and
				more. We hope that offering a wider range of formats will support all students with varying
				learning styles.
			</p>
			<a
				href="https://docs.google.com/forms/d/e/1FAIpQLScT7NVwl3E_EehVg5-aDXQgQGmGxaKGC1gL0lotmMgbWWvJ_g/viewform"
				type="button"
				class="btn variant-filled-tertiary"
			>
				Submit a Study Guide!
			</a>
		</section>
	{/if}
</main>
