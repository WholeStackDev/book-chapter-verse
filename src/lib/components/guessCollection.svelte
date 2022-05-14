<script>
	import { collections, currentTestament } from '$lib/stores/transient';
</script>

<div class="flex flex-col items-center">
	<div class=" text-lg font-semibold">What section is this book in?</div>
	<div class="flex">
		{#if $currentTestament === 'OT'}
			{#each $collections.old as collection}
				<div
					class={`bg-amber-100 hover:bg-amber-200 cursor-pointer max-w-2xl overflow-hidden shadow rounded-lg m-6`}
				>
					<div class="px-4 py-5 sm:p-6 text-xl font-semibold">{collection.name}</div>
				</div>
			{/each}
		{:else}
			<div>NT</div>
		{/if}
	</div>
</div>
