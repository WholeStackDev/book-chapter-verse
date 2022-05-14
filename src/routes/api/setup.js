import fs from 'fs';

export async function get() {
	try {
		var results = [];
		for (let i = 0; i < 66; i++) {
			const data = fs.readFileSync(`json/${files[i]}.json`);
			const original = JSON.parse(data);
			for (let c = 1; c < 200; c++) {
				if (!original.find((x) => x.chapterNumber === c)) break;
				for (let v = 1; v < 200; v++) {
					const verseParts = original.filter((x) => x.chapterNumber === c && x.verseNumber === v);
					if (!verseParts.length) break;
					var verseString = '';
					verseParts.forEach((x) => {
						verseString += ' ' + x.value.trim();
					});
					verseString = verseString.trim();
					results.push({
						bookNumber: i + 1,
						bookName: names[i],
						chapter: c,
						verse: v,
						text: verseString,
						startsParagraph:
							original[original.indexOf(verseParts[0]) - 1]?.type === 'paragraph start'
					});
				}
			}
		}
		fs.writeFileSync('web.json', JSON.stringify(results));

		return {
			body: ''
		};
	} catch (error) {
		console.log(error);
		return {
			status: 500
		};
	}
}

const files = [
	'genesis',
	'exodus',
	'leviticus',
	'numbers',
	'deuteronomy',
	'joshua',
	'judges',
	'ruth',
	'1samuel',
	'2samuel',
	'1kings',
	'2kings',
	'1chronicles',
	'2chronicles',
	'ezra',
	'nehemiah',
	'esther',
	'job',
	'psalms',
	'proverbs',
	'ecclesiastes',
	'songofsolomon',
	'isaiah',
	'jeremiah',
	'lamentations',
	'ezekiel',
	'daniel',
	'hosea',
	'joel',
	'amos',
	'obadiah',
	'jonah',
	'micah',
	'nahum',
	'habakkuk',
	'zephaniah',
	'haggai',
	'zechariah',
	'malachi',
	'matthew',
	'mark',
	'luke',
	'john',
	'acts',
	'romans',
	'1corinthians',
	'2corinthians',
	'galatians',
	'ephesians',
	'philippians',
	'colossians',
	'1thessalonians',
	'2thessalonians',
	'1timothy',
	'2timothy',
	'titus',
	'philemon',
	'hebrews',
	'james',
	'1peter',
	'2peter',
	'1john',
	'2john',
	'3john',
	'jude',
	'revelation'
];

const names = [
	'Genesis',
	'Exodus',
	'Leviticus',
	'Numbers',
	'Deuteronomy',
	'Joshua',
	'Judges',
	'Ruth',
	'1 Samuel',
	'2 Samuel',
	'1 Kings',
	'2 Kings',
	'1 Chronicles',
	'2 Chronicles',
	'Ezra',
	'Nehemiah',
	'Esther',
	'Job',
	'Psalms',
	'Proverbs',
	'Ecclesiastes',
	'Song of Solomon',
	'Isaiah',
	'Jeremiah',
	'Lamentations',
	'Ezekiel',
	'Daniel',
	'Hosea',
	'Joel',
	'Amos',
	'Obadiah',
	'Jonah',
	'Micah',
	'Nahum',
	'Habakkuk',
	'Zephaniah',
	'Haggai',
	'Zechariah',
	'Malachi',
	'Matthew',
	'Mark',
	'Luke',
	'John',
	'Acts',
	'Romans',
	'1 Corinthians',
	'2 Corinthians',
	'Galatians',
	'Ephesians',
	'Philippians',
	'Colossians',
	'1 Thessalonians',
	'2 Thessalonians',
	'1 Timothy',
	'2 Timothy',
	'Titus',
	'Philemon',
	'Hebrews',
	'James',
	'1 Peter',
	'2 Peter',
	'1 John',
	'2 John',
	'3 John',
	'Jude',
	'Revelation'
];
