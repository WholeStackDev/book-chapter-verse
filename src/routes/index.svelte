<script>
	import { currentVerse, currentStage, collections, revealed } from '$lib/stores/transient';
	import { bible } from '$lib/stores/persistent';
	import VerseDisplay from '$lib/components/verseDisplay.svelte';
	import Guess from '$lib/components/guess.svelte';

	const stages = [
		'Is this verse in the old or new testament?',
		'What section is this book in?',
		'What book of the Bible is this verse in?',
		'What chapter is this verse in?',
		'Which verse is this?'
	];
	$: {
		if ($currentStage === stages.length) {
			$revealed = true;
		}
	}

	let correctCollectionIndex;
	let currentTestamentCollections;
	let correctCollection;
	let bookNumberArray;
	let verseNumberArray;
	$: {
		const isOT = Math.random() < 0.5 ? true : false;
		const filtered = $bible.filter((x) => (isOT ? x.bookNumber < 40 : x.bookNumber >= 40));
		$currentVerse = filtered[Math.floor(Math.random() * filtered.length)];
		currentTestamentCollections =
			$currentVerse?.bookNumber < 40 ? $collections.old : $collections.new;
		correctCollectionIndex = currentTestamentCollections.findIndex((x) =>
			x.books.includes($currentVerse?.bookName)
		);
		correctCollection = currentTestamentCollections[correctCollectionIndex];
		const numberOfChapters = $bible
			.filter((x) => x.bookNumber === $currentVerse.bookNumber)
			.sort((a, b) => (a.chapter > b.chapter ? -1 : 1))[0]?.chapter;
		bookNumberArray = Array(numberOfChapters)
			.fill()
			.map((x, i) => {
				return { label: `${i + 1}` };
			});
		const numberOfVerses = $bible
			.filter(
				(x) => x.bookNumber === $currentVerse.bookNumber && x.chapter === $currentVerse.chapter
			)
			.sort((a, b) => (a.verse > b.verse ? -1 : 1))[0]?.verse;
		verseNumberArray = Array(numberOfVerses)
			.fill()
			.map((x, i) => {
				return { label: `${i + 1}` };
			});
	}
	const nextVerse = () => {
		const isOT = Math.random() < 0.5 ? true : false;
		const filtered = $bible.filter((x) => (isOT ? x.bookNumber < 40 : x.bookNumber >= 40));
		$currentVerse = filtered[Math.floor(Math.random() * filtered.length)];
		$currentStage = 0;
		$revealed = false;
	};
</script>

{#if $bible.length}
	{#key $currentVerse}
		<div class="flex flex-col items-center">
			<VerseDisplay />
			<Guess
				options={[{ label: 'Old Testament' }, { label: 'New Testament' }]}
				prompt={stages[0]}
				correctOption={$currentVerse.bookNumber < 40 ? 0 : 1}
			/>
			{#if $currentStage >= 1}
				<Guess
					options={currentTestamentCollections}
					prompt={stages[1]}
					correctOption={correctCollectionIndex}
				/>
			{/if}
			{#if $currentStage >= 2}
				<Guess
					options={correctCollection.books.map((x) => {
						return { label: x };
					})}
					prompt={stages[2]}
					correctOption={correctCollection.books?.indexOf($currentVerse.bookName)}
				/>
			{/if}
			{#if $currentStage >= 3}
				<Guess
					options={bookNumberArray}
					prompt={stages[3]}
					correctOption={$currentVerse.chapter - 1}
				/>
			{/if}
			{#if $currentStage >= 4}
				<Guess
					options={verseNumberArray}
					prompt={stages[4]}
					correctOption={$currentVerse.verse - 1}
				/>
			{/if}
			{#if $revealed}
				<div
					on:click={nextVerse}
					class={'bg-blue-400 hover:bg-blue-600 cursor-pointer max-w-2xl overflow-hidden shadow rounded-lg m-4'}
				>
					<div class="px-3 py-3 sm:p-4 text-xl font-semibold">Next Verse</div>
				</div>
			{/if}
		</div>
	{/key}
{/if}
