<script lang="ts">
	import { onMount } from "svelte";
	import { browser } from "$app/environment";

	let showInstallPrompt = false;
	let deferredPrompt: any = null;
	let isIOS = false;
	let isAndroid = false;
	let isStandalone = false;
	let isMobile = false;

	onMount(() => {
		if (!browser) return;

		// Detect device type
		const userAgent = navigator.userAgent.toLowerCase();
		isIOS = /iphone|ipad|ipod/.test(userAgent);
		isAndroid = /android/.test(userAgent);
		isMobile = isIOS || isAndroid || /mobile/.test(userAgent);

		// Check if already installed (standalone mode)
		isStandalone =
			window.matchMedia("(display-mode: standalone)").matches ||
			(window.navigator as any)?.standalone === true;

		// Only show prompt if mobile and not already installed
		if (isMobile && !isStandalone) {
			showInstallPrompt = true;
		}

		// Handle Android install prompt
		if (isAndroid) {
			window.addEventListener("beforeinstallprompt", (e) => {
				e.preventDefault();
				deferredPrompt = e;
			});
		}
	});

	function handleInstall() {
		if (isAndroid && deferredPrompt) {
			// Android: Use native prompt
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then((choiceResult: any) => {
				if (choiceResult.outcome === "accepted") {
					showInstallPrompt = false;
				}
				deferredPrompt = null;
			});
		} else {
			// iOS or fallback: Navigate to install page
			window.location.href = "/install";
		}
	}

	function dismissPrompt() {
		showInstallPrompt = false;
		// Remember dismissal for this session
		sessionStorage.setItem("pwa-dismissed", "true");
	}

	// Check if already dismissed this session
	onMount(() => {
		if (browser && sessionStorage.getItem("pwa-dismissed")) {
			showInstallPrompt = false;
		}
	});
</script>

{#if showInstallPrompt}
	<div
		class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mx-4 mb-4"
	>
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-3">
				<span class="text-2xl">📱</span>
				<div>
					<p class="font-medium text-blue-900 dark:text-blue-100">Add Arista to your home screen</p>
					<p class="text-sm text-blue-700 dark:text-blue-300">
						{#if isIOS}
							Tap Share → Add to Home Screen
						{:else if isAndroid}
							Install for quick access
						{:else}
							Get app-like experience
						{/if}
					</p>
				</div>
			</div>
			<div class="flex space-x-2">
				{#if isAndroid && deferredPrompt}
					<button
						on:click={handleInstall}
						class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
					>
						Install
					</button>
				{:else}
					<button
						on:click={handleInstall}
						class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
					>
						How
					</button>
				{/if}
				<button
					on:click={dismissPrompt}
					class="px-3 py-1 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded text-sm hover:bg-blue-50 dark:hover:bg-blue-900/30"
				>
					×
				</button>
			</div>
		</div>
	</div>
{/if}
