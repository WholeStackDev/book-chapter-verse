import { data } from '$lib/data/web';

export async function get() {
	try {
		const stringData = JSON.stringify(data);
		return {
			body: stringData
		};
	} catch (error) {
		console.log(error);
		return {
			status: 500,
			body: error
		};
	}
}
