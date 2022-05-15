import { writable } from 'svelte/store';
import { browser } from '$app/env';
import db from 'localforage';
import lz from 'lz-string';

export const bible = writable([]);

if (browser) {
	(async function () {
		if (await db.getItem('bible')) {
			bible.set(JSON.parse(await db.getItem('bible')));
		} else {
			try {
				const data = await fetch(`../compressed.txt`);
				const compressedData = await data.text();
				const uncompressed = lz.decompressFromUTF16(compressedData);
				bible.set(JSON.parse(uncompressed));
				console.log('first method worked');
			} catch (error) {
				console.log(error);
				try {
					const data = await fetch(`/compressed.txt`);
					const compressedData = await data.text();
					const uncompressed = lz.decompressFromUTF16(compressedData);
					bible.set(JSON.parse(uncompressed));
					console.log('second method worked');
				} catch (error) {
					console.log(error);
					const data = await fetch('/api/bible');
					const compressedData = await data.text();
					const uncompressed = lz.decompressFromUTF16(compressedData);
					bible.set(JSON.parse(uncompressed));
					console.log('third method worked');
				}
			}
		}

		bible.subscribe((x) => db.setItem('bible', JSON.stringify(x)));
	})();
}
