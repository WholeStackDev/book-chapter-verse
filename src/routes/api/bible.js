import fs from 'fs';

export async function get() {
	try {
		const data = fs.readFileSync('web.json');

		return {
			body: data
		};
	} catch (error) {
		log(error);
		return {
			status: 500
		};
	}
}
