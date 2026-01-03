<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div
	class="fixed inset-0 bg-surface-50-900-token/80 backdrop-blur-sm z-50 flex items-center justify-center"
	transition:fade={{ duration: 200 }}
>
	<div class="flex flex-col items-center space-y-4">
		<!-- Loading spinner -->
		<div class="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
		
		<!-- Loading text -->
		<p class="text-surface-600-300-token font-medium">Loading...</p>
	</div>
</div>