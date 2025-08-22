<script lang="ts">
	import { onMount } from 'svelte';
	
	let isMobile = false;
	
	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 768;
		};
		
		checkMobile();
		window.addEventListener('resize', checkMobile);
		
		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	});
</script>

<svelte:head>
	<title>Annual Report - ARISTA</title>
	<meta name="description" content="View the ARISTA Annual Report for 2024-25" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-6xl">
	<div class="text-center mb-8">
		<h1 class="text-4xl font-bold mb-4">ARISTA Annual Report</h1>
		<p class="text-lg text-surface-600-300-token mb-6">2024-25 Academic Year</p>
		
		<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
			<a 
				href="/ARISTA-report-24-25.pdf" 
				download
				class="btn bg-primary-500 text-white hover:bg-primary-600 transition-colors px-6 py-3 rounded-lg font-medium"
			>
				📱 Download PDF
			</a>
			<a 
				href="/ARISTA-report-24-25.pdf" 
				target="_blank"
				class="btn border border-primary-500 text-primary-500 hover:bg-primary-50 transition-colors px-6 py-3 rounded-lg font-medium"
			>
				🔗 Open in New Tab
			</a>
		</div>
	</div>

	<!-- PDF Viewer Container -->
	<div class="bg-white rounded-lg shadow-lg overflow-hidden">
		{#if isMobile}
			<!-- Mobile-optimized view -->
			<div class="p-6 text-center bg-surface-50-900-token">
				<div class="mb-4">
					<svg class="w-16 h-16 mx-auto text-primary-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					<h2 class="text-xl font-semibold mb-2">Annual Report 2024-25</h2>
					<p class="text-surface-600-300-token mb-6">For the best viewing experience on mobile, please download or open the PDF in a new tab.</p>
				</div>
				
				<div class="flex flex-col gap-3">
					<a 
						href="/ARISTA-report-24-25.pdf" 
						download
						class="btn bg-primary-500 text-white hover:bg-primary-600 transition-colors py-3 px-6 rounded-lg font-medium w-full"
					>
						📱 Download PDF
					</a>
					<a 
						href="/ARISTA-report-24-25.pdf" 
						target="_blank"
						class="btn border border-primary-500 text-primary-500 hover:bg-primary-50 transition-colors py-3 px-6 rounded-lg font-medium w-full"
					>
						🔗 Open in Browser
					</a>
				</div>
			</div>
		{:else}
			<!-- Desktop PDF viewer -->
			<div class="w-full" style="height: 80vh;">
				<iframe 
					src="/ARISTA-report-24-25.pdf" 
					title="ARISTA Annual Report 2024-25"
					class="w-full h-full border-0"
					loading="lazy"
				>
					<div class="p-8 text-center">
						<p class="mb-4">Your browser doesn't support PDF viewing.</p>
						<a 
							href="/ARISTA-report-24-25.pdf" 
							download
							class="btn bg-primary-500 text-white hover:bg-primary-600 transition-colors px-6 py-3 rounded-lg font-medium"
						>
							Download PDF Instead
						</a>
					</div>
				</iframe>
			</div>
		{/if}
	</div>

	<!-- Additional Information -->
	<div class="mt-8 text-center">
		<div class="bg-surface-100-800-token rounded-lg p-6">
			<h3 class="text-lg font-semibold mb-3">About This Report</h3>
			<p class="text-surface-600-300-token">
				This annual report provides a comprehensive overview of ARISTA's activities, achievements, 
				and impact during the 2024-25 academic year. It includes program statistics, member accomplishments, 
				and our ongoing commitment to academic excellence and community service.
			</p>
		</div>
	</div>
</div>