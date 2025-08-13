<script lang="ts">
	import { onMount } from "svelte";
	import { browser } from "$app/environment";

	let isIOS = false;
	let isAndroid = false;
	let browserName = "";

	onMount(() => {
		if (!browser) return;

		const userAgent = navigator.userAgent.toLowerCase();
		isIOS = /iphone|ipad|ipod/.test(userAgent);
		isAndroid = /android/.test(userAgent);

		// Detect browser
		if (isIOS) {
			browserName = /safari/.test(userAgent) ? "Safari" : "your browser";
		} else if (isAndroid) {
			if (/chrome/.test(userAgent)) browserName = "Chrome";
			else if (/firefox/.test(userAgent)) browserName = "Firefox";
			else browserName = "your browser";
		}
	});
</script>

<svelte:head>
	<title>Install Arista - Add to Home Screen</title>
</svelte:head>

<main class="container mx-auto p-4 md:p-8 space-y-6">
	<div class="text-center space-y-4">
		<h1 class="h1">📱 Install Arista</h1>
		<p class="text-lg opacity-75">Get app-like experience on your device</p>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<!-- iOS Instructions -->
		<div
			class="bg-surface-100-800-token border border-surface-300-600-token rounded-lg p-6 {isIOS
				? 'ring-2 ring-primary-500'
				: ''}"
		>
			<div class="flex items-center space-x-2 mb-4">
				<span class="text-2xl">🍎</span>
				<h2 class="h2">iPhone & iPad</h2>
			</div>
			<ol class="space-y-3 text-sm">
				<li class="flex items-start space-x-2">
					<span class="font-bold text-primary-500">1.</span>
					<span>Open this site in <strong>Safari</strong></span>
				</li>
				<li class="flex items-start space-x-2">
					<span class="font-bold text-primary-500">2.</span>
					<span
						>Tap the <strong>Share</strong> button <span class="text-lg">⎋</span> (bottom center)</span
					>
				</li>
				<li class="flex items-start space-x-2">
					<span class="font-bold text-primary-500">3.</span>
					<span>Scroll down and tap <strong>"Add to Home Screen"</strong></span>
				</li>
				<li class="flex items-start space-x-2">
					<span class="font-bold text-primary-500">4.</span>
					<span>Tap <strong>"Add"</strong> in the top right</span>
				</li>
			</ol>
			{#if isIOS}
				<div class="mt-4 p-3 bg-primary-500/10 rounded-lg">
					<p class="text-sm text-primary-600 dark:text-primary-400">
						<strong>You're on iOS!</strong> Follow these steps to install.
					</p>
				</div>
			{/if}
		</div>

		<!-- Android Instructions -->
		<div
			class="bg-surface-100-800-token border border-surface-300-600-token rounded-lg p-6 {isAndroid
				? 'ring-2 ring-primary-500'
				: ''}"
		>
			<div class="flex items-center space-x-2 mb-4">
				<span class="text-2xl">🤖</span>
				<h2 class="h2">Android</h2>
			</div>
			<ol class="space-y-3 text-sm">
				<li class="flex items-start space-x-2">
					<span class="font-bold text-primary-500">1.</span>
					<span>Open this site in <strong>Chrome</strong></span>
				</li>
				<li class="flex items-start space-x-2">
					<span class="font-bold text-primary-500">2.</span>
					<span>Tap the <strong>menu</strong> (⋮) in the top right</span>
				</li>
				<li class="flex items-start space-x-2">
					<span class="font-bold text-primary-500">3.</span>
					<span>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong></span>
				</li>
				<li class="flex items-start space-x-2">
					<span class="font-bold text-primary-500">4.</span>
					<span>Tap <strong>"Install"</strong> or <strong>"Add"</strong></span>
				</li>
			</ol>
			{#if isAndroid}
				<div class="mt-4 p-3 bg-primary-500/10 rounded-lg">
					<p class="text-sm text-primary-600 dark:text-primary-400">
						<strong>You're on Android!</strong> You may also see a banner at the bottom to install directly.
					</p>
				</div>
			{/if}
		</div>
	</div>
	<div class="text-center">
		<a href="/" class="btn variant-filled-primary">← Back to Home</a>
	</div>
</main>
