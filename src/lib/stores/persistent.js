import { writable } from 'svelte/store';
import { browser } from '$app/env';
import db from 'localforage';

export const bible = writable([]);

if (browser) {
	(async function () {
		if (await db.getItem('bible')) bible.set(JSON.parse(await db.getItem('bible')));

		bible.subscribe((x) => db.setItem('bible', JSON.stringify(x)));
	})();
}
