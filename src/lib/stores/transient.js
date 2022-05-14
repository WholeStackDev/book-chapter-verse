import { writable } from 'svelte/store';

export const bible = writable([]);
export const currentVerse = writable({});
export const currentStage = writable(0);
export const revealed = writable(false);
export const currentTestamentCollections = writable([]);

export const collections = writable({
	old: [
		{
			label: 'Law',
			// prettier-ignore
			books: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy']
		},
		{
			label: 'History',
			// prettier-ignore
			books: ['Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther']
		},
		{
			label: 'Poetry',
			// prettier-ignore
			books: ['Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon']
		},
		{
			label: 'Prophecy',
			// prettier-ignore
			books: ['Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi']
		}
	],
	new: [
		{
			label: 'Gospels',
			// prettier-ignore
			books: ['Matthew', 'Mark', 'Luke', 'John']
		},
		// prettier-ignore
		{
      label: 'History',
      // prettier-ignore
      books: ['Acts'],
    },
		{
			label: 'Epistles',
			// prettier-ignore
			books: ['Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude']
		},
		{
			label: 'Prophecy',
			// prettier-ignore
			books: ['Revelation']
		}
	]
});
