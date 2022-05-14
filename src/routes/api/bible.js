import { data } from '$lib/data/web';
import lz from 'lz-string';
import NodeCache from 'node-cache';

export async function get() {
	const serverCache = new NodeCache();
	try {
		var compressedData = serverCache.get('web');
		if (compressedData == undefined) {
			compressedData = lz.compressToUTF16(JSON.stringify(data));
			serverCache.set('web', compressedData);
		}
		return {
			body: compressedData
		};
	} catch (error) {
		console.log(error);
		return {
			status: 500,
			body: error
		};
	}
}
