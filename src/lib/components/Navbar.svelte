<script lang="ts">
	import { AppBar } from "@skeletonlabs/skeleton";
	import { pb, currentUser } from "$lib/pocketbase";
	import { LightSwitch, Avatar } from "@skeletonlabs/skeleton";
	import { isOnCommittee } from "$lib/isOnCommittee";

	let mobileMenuOpen = false;

	function generateInitials(user: any | null) {
		return !user?.name
			? ""
			: (user.name as string)
					.split(" ")
					.map((v: string) => v.substring(0, 1))
					.join("");
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<AppBar class="!pt-2 !pb-1">
	<svelte:fragment slot="lead">
		<a href="/"><strong class="text-xl uppercase">ARISTA</strong></a>
	</svelte:fragment>
	<svelte:fragment slot="default">
		<!-- Desktop Navigation -->
		<div class="hidden md:flex items-center space-x-2">
			{#if $currentUser}
				{#if $currentUser.is_tutee}
					<a href="/tutoring" class="hover:text-primary-500 transition-colors">Tutoring</a>
				{:else}
					<a href="/events" class="hover:text-primary-500 transition-colors">Events</a>
					<a href="/tutoring" class="hover:text-primary-500 transition-colors">Tutor</a>
				{/if}
				{#if isOnCommittee($currentUser, "admin")}
					<a href="/admin" class="hover:text-primary-500 transition-colors">Admin</a>
				{/if}
			{/if}
			<a href="/studyguides" class="hover:text-primary-500 transition-colors">
				<span class="hidden lg:inline">Study </span>Guides
			</a>
			<a href="/cramcentral" class="hover:text-primary-500 transition-colors">
				Cram <span class="hidden lg:inline">Central</span>
			</a>
			<a href="/faq" class="hover:text-primary-500 transition-colors">FAQ</a>
			{#if !$currentUser || ($currentUser && $currentUser.is_tutee)}
				<a href="/apply" class="hover:text-primary-500 transition-colors">
					Apply <span class="hidden lg:inline">to ARISTA</span>
				</a>
			{/if}
		</div>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<!-- Desktop User Actions -->
		<div class="hidden md:flex items-center space-x-2">
			{#if !$currentUser}
				<a href="/register" class="hover:text-primary-500 transition-colors">Register</a>
				<a href="/login" class="hover:text-primary-500 transition-colors">Login</a>
			{:else}
				<a href="/settings">
					<Avatar initials={generateInitials($currentUser)} background="bg-primary-500" class="w-8" />
				</a>
			{/if}
		</div>

		<!-- Mobile Hamburger Button -->
		<button
			class="md:hidden p-1 rounded-md hover:bg-surface-200-700-token transition-colors"
			on:click={toggleMobileMenu}
			aria-label="Toggle mobile menu"
		>
			<svg
				class="w-6 h-6 transition-transform duration-200 {mobileMenuOpen ? 'rotate-90' : ''}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				{#if mobileMenuOpen}
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				{:else}
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				{/if}
			</svg>
		</button>
	</svelte:fragment>
</AppBar>

<!-- Mobile Menu Overlay -->
{#if mobileMenuOpen}
	<div
		class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
		on:click={closeMobileMenu}
		role="button"
		tabindex="0"
		on:keydown={(e) => e.key === 'Escape' && closeMobileMenu()}
	></div>
{/if}

<!-- Mobile Menu Panel -->
<div
	class="fixed top-0 right-0 h-full w-64 bg-surface-100-800-token shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden {mobileMenuOpen
		? 'translate-x-0'
		: 'translate-x-full'}"
>
	<div class="flex flex-col h-full">
		<!-- Mobile Menu Header -->
		<div class="flex items-center justify-between p-3 border-b border-surface-300-600-token">
			<strong class="text-lg uppercase">Menu</strong>
			<button
				on:click={closeMobileMenu}
				class="p-2 rounded-md hover:bg-surface-200-700-token transition-colors"
				aria-label="Close menu"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<!-- Mobile Menu Links -->
		<nav class="flex-1 px-3 py-4">
			<div class="space-y-2">
				{#if $currentUser}
					{#if $currentUser.is_tutee}
						<a
							href="/tutoring"
							class="block py-1.5 px-3 rounded-md hover:bg-surface-200-700-token transition-colors"
							on:click={closeMobileMenu}
						>
							Tutoring
						</a>
					{:else}
						<a
							href="/events"
							class="block py-1.5 px-3 rounded-md hover:bg-surface-200-700-token transition-colors"
							on:click={closeMobileMenu}
						>
							Events
						</a>
						<a
							href="/tutoring"
							class="block py-1.5 px-3 rounded-md hover:bg-surface-200-700-token transition-colors"
							on:click={closeMobileMenu}
						>
							Tutor
						</a>
					{/if}
					{#if isOnCommittee($currentUser, "admin")}
						<a
							href="/admin"
							class="block py-1.5 px-3 rounded-md hover:bg-surface-200-700-token transition-colors"
							on:click={closeMobileMenu}
						>
							Admin
						</a>
					{/if}
				{/if}
				<a
					href="/studyguides"
					class="block py-2 px-3 rounded-md hover:bg-surface-200-700-token transition-colors"
					on:click={closeMobileMenu}
				>
					Study Guides
				</a>
				<a
					href="/cramcentral"
					class="block py-2 px-3 rounded-md hover:bg-surface-200-700-token transition-colors"
					on:click={closeMobileMenu}
				>
					Cram Central
				</a>
				<a
					href="/faq"
					class="block py-2 px-3 rounded-md hover:bg-surface-200-700-token transition-colors"
					on:click={closeMobileMenu}
				>
					FAQ
				</a>
				{#if !$currentUser || ($currentUser && $currentUser.is_tutee)}
					<a
						href="/apply"
						class="block py-2 px-3 rounded-md hover:bg-surface-200-700-token transition-colors"
						on:click={closeMobileMenu}
					>
						Apply to ARISTA
					</a>
				{/if}
			</div>
		</nav>

		<!-- Mobile Menu Footer -->
		<div class="border-t border-surface-300-600-token p-3 pb-6">
			{#if !$currentUser}
				<div class="space-y-1.5">
					<a
						href="/register"
						class="block w-full py-2 px-3 text-center bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
						on:click={closeMobileMenu}
					>
						Register
					</a>
					<a
						href="/login"
						class="block w-full py-2 px-3 text-center border border-primary-500 text-primary-500 rounded-md hover:bg-primary-50 transition-colors"
						on:click={closeMobileMenu}
					>
						Login
					</a>
				</div>
			{:else}
				<a
					href="/settings"
					class="flex items-center space-x-3 py-1.5 px-3 rounded-md hover:bg-surface-200-700-token transition-colors"
					on:click={closeMobileMenu}
				>
					<Avatar initials={generateInitials($currentUser)} background="bg-primary-500" class="w-8" />
					<span>Settings</span>
				</a>
			{/if}
		</div>
	</div>
</div>
