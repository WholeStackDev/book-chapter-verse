<script>
	import FaCircleNotch from 'svelte-icons/fa/FaCircleNotch.svelte';
	import { bible } from '$lib/stores/persistent';
	import { onMount } from 'svelte';
	import '../app.css';
	onMount(async () => {
		if (!$bible?.length) {
			const data = await fetch('/api/bible');
			$bible = await data.json();
		}
	});
</script>

{#if $bible?.length}
	<slot />
{:else}
	<div class="flex justify-center items-center w-screen h-screen">
		<div class="-mr-1 ml-2 h-14 w-14 animate-spin text-sky-700">
			<FaCircleNotch />
		</div>
	</div>
{/if}
