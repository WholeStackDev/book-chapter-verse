<script>
	import { revealed, currentStage } from '$lib/stores/transient';

	export let guessingEnabled = true;
	export let options = [];
	export let correctOption = 0;
	export let prompt = '';

	const classGussable = 'bg-amber-100 hover:bg-amber-200 cursor-pointer';
	const classNotGussable = 'bg-slate-200 cursor-default';
	const classCorrect = 'bg-green-400 cursor-default';
	const classIncorrect = 'bg-red-400 cursor-default';

	$: {
		for (let i = 0; i < options.length; i++) {
			if (options[i].style !== classCorrect && options[i].style !== classIncorrect)
				options[i].style = guessingEnabled ? classGussable : classNotGussable;
		}
	}

	const guess = (index) => {
		if (!guessingEnabled) return;
		guessingEnabled = false;
		options[index].style = correctOption === index ? classCorrect : classIncorrect;
		if (correctOption !== index) $revealed = true;
		if (correctOption === index) $currentStage = $currentStage + 1;
	};
</script>

<div class=" text-lg font-semibold">{prompt}</div>
<div class="flex flex-wrap max-w-3xl justify-center">
	{#each options as option, index}
		<div
			on:click={() => guess(index)}
			class={`${option.style} max-w-2xl overflow-hidden shadow rounded-lg m-4`}
		>
			<div class="px-3 py-3 sm:p-4 text-xl font-semibold">{option.label}</div>
		</div>
	{/each}
</div>
