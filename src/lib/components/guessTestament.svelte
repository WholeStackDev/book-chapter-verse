<script>
	import { currentVerse, revealed, currentStage } from '$lib/stores/transient';

	let guessingEnabled = true;

	const classGussable = 'bg-amber-100 hover:bg-amber-200 cursor-pointer';
	const classNotGussable = 'bg-slate-200 cursor-default';
	const classCorrect = 'bg-green-400 cursor-default';
	const classIncorrect = 'bg-red-400 cursor-default';

	$: {
		if (guessingEnabled === false) {
			if (otStyle === classGussable) otStyle = classNotGussable;
			if (ntStyle === classGussable) ntStyle = classNotGussable;
		}
	}

	let otStyle = classGussable;
	let ntStyle = classGussable;

	const guess = (testament) => {
		if (!guessingEnabled) return;
		guessingEnabled = false;
		if ($currentVerse.bookNumber <= 39 && testament === 'old') {
			otStyle = classCorrect;
			$currentStage = 1;
		} else if ($currentVerse.bookNumber > 39 && testament === 'old') {
			otStyle = classIncorrect;
			$revealed = true;
		} else if ($currentVerse.bookNumber <= 39 && testament === 'new') {
			ntStyle = classIncorrect;
			$revealed = true;
		} else if ($currentVerse.bookNumber > 39 && testament === 'new') {
			ntStyle = classCorrect;
			$currentStage = 1;
		}
	};
</script>

<div class="flex">
	<div
		on:click={() => guess('old')}
		class={`${otStyle} max-w-2xl overflow-hidden shadow rounded-lg m-6`}
	>
		<div class="px-4 py-5 sm:p-6 text-xl font-semibold">Old Testament</div>
	</div>

	<div
		on:click={() => guess('new')}
		class={`${ntStyle} max-w-2xl overflow-hidden shadow rounded-lg m-6`}
	>
		<div class="px-4 py-5 sm:p-6 text-xl font-semibold">New Testament</div>
	</div>
</div>
