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
			const data = await fetch('/api/bible');
			const compressedData = await data.text();
			const uncompressed = lz.decompressFromUTF16(compressedData);
			bible.set(JSON.parse(uncompressed));
		}

		bible.subscribe((x) => db.setItem('bible', JSON.stringify(x)));
	})();
}
