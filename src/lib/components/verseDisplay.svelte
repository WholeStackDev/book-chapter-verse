<script>
	import { currentVerse, revealed } from '$lib/stores/transient';
</script>

<div class="bg-sky-100 max-w-2xl overflow-hidden shadow rounded-lg m-6 cursor-default">
	<div class="px-4 py-5 sm:p-6 text-xl">
		<span>{$currentVerse.text}</span>
		{#if $revealed}
			<span class=" font-bold whitespace-nowrap"
				>{`  - ${$currentVerse.bookName} ${$currentVerse.chapter}:${$currentVerse.verse}`}</span
			>
		{/if}
	</div>
</div>
