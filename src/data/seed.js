import { data } from './recipes';

export async function seedRecipes() {
	await fetch('https://restapi.fr/api/f-recipes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
}
