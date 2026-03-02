<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
</script>

<main class="container mx-auto p-8 space-y-8">
	<hgroup>
		<h1 class="h1">Freshman Resources</h1>
		<p>Essential resources and guides for incoming freshmen</p>
	</hgroup>

	<!-- Freshmen Push-In Slides -->
	<section class="card p-6 space-y-4">
		<div class="flex items-center gap-3">
			<div>
				<h2 class="h2">Freshmen Push-In Slides</h2>
				<p class="text-surface-600 dark:text-surface-400">Orientation presentation for incoming students</p>
			</div>
		</div>
		<!-- Hide iframe on mobile, show on desktop -->
		<div class="hidden md:block aspect-video w-full max-w-2xl mx-auto">
			<iframe 
				src="https://docs.google.com/presentation/d/175Cbn57TR8R3gi4jjRrRfUrOjPmYV83ZF9zkv4qLWAY/embed?start=false&loop=false&delayms=3000" 
				frameborder="0" 
				class="w-full h-full rounded-lg"
				title="Freshmen Push-In Presentation"
			></iframe>
		</div>
		<div class="flex justify-center">
			<a 
				href="https://docs.google.com/presentation/d/175Cbn57TR8R3gi4jjRrRfUrOjPmYV83ZF9zkv4qLWAY/edit?usp=sharing" 
				target="_blank"
				class="btn variant-filled-primary"
			>
				<span class="md:hidden">View Slides</span>
				<span class="hidden md:inline">Open in Google Slides</span>
			</a>
		</div>
	</section>

	<!-- Email Organization Video -->
	<section class="card p-6 space-y-4">
		<div class="flex items-center gap-3">
			<div>
				<h2 class="h2">Email Organization Video</h2>
				<p class="text-surface-600 dark:text-surface-400">Learn how to manage your school email effectively</p>
			</div>
		</div>
		<!-- Hide iframe on mobile, show on desktop -->
		<div class="hidden md:block aspect-video w-full max-w-2xl mx-auto">
			<iframe 
				src="https://drive.google.com/file/d/1VLqBZd2xlR37_qT4ZtN8xzGCrJArUhmF/preview" 
				class="w-full h-full rounded-lg"
				allow="autoplay"
				title="Email Organization Video"
			></iframe>
		</div>
		<div class="flex justify-center">
			<a 
				href="https://drive.google.com/file/d/1VLqBZd2xlR37_qT4ZtN8xzGCrJArUhmF/view?usp=sharing" 
				target="_blank"
				class="btn variant-filled-primary"
			>
				<span class="md:hidden">Watch Video</span>
				<span class="hidden md:inline">Open in Google Drive</span>
			</a>
		</div>
	</section>

	<!-- Freshman Teacher Form -->
	<section class="card p-6 space-y-4">
		<div class="flex items-center gap-3">
			<div>
				<h2 class="h2">Freshman Teacher Form</h2>
				<p class="text-surface-600 dark:text-surface-400">Important information and guidelines for teachers</p>
			</div>
		</div>
		<!-- Hide iframe on mobile, show on desktop -->
		<div class="hidden md:block w-full max-w-2xl mx-auto" style="height: 500px;">
			<iframe 
				src="https://docs.google.com/document/d/16bO9caNPWnIHgfo1tOg5JCfOqgCGYPOKSO5YPZmb27k/preview" 
				class="w-full h-full rounded-lg"
				title="Freshman Teacher Form"
			></iframe>
		</div>
		<div class="flex justify-center">
			<a 
				href="https://docs.google.com/document/d/16bO9caNPWnIHgfo1tOg5JCfOqgCGYPOKSO5YPZmb27k/edit?usp=sharing" 
				target="_blank"
				class="btn variant-filled-primary"
			>
				<span class="md:hidden">View Form</span>
				<span class="hidden md:inline">Open in Google Docs</span>
			</a>
		</div>
	</section>
</main>