import { data } from '$lib/data/web';
import lz from 'lz-string';

export async function get() {
	try {
		const compressedData = lz.compressToUTF16(JSON.stringify(data));
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
