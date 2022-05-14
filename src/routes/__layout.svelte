<script>
	import FaCircleNotch from 'svelte-icons/fa/FaCircleNotch.svelte';
	import { bible } from '$lib/stores/persistent';
	import '../app.css';
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
