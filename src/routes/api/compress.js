import { data } from '$lib/data/web';
import lz from 'lz-string';
import fs from 'fs';

export async function get() {
	try {
		compressedData = lz.compressToUTF16(JSON.stringify(data));
		fs.writeFileSync('compressed.txt', compressedData);
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
