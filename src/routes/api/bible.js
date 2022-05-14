import { data } from '$lib/data/web';

export async function get() {
	try {
		return {
			body: JSON.stringify(data)
		};
	} catch (error) {
		console.log(error);
		return {
			status: 500,
			body: error
		};
	}
}
