export function fetchAllProducts() {
	return new Promise(async (resolve) => {
		const response = await fetch("http://localhost:8000/products");
		const data = await response.json();
		resolve(data);
	});
}
export function fetchProductsByFilter(filter) {
	let queryString = "";
	for (let key in filter) {
		queryString += `${key}=${filter[key]}&`;
	}

	const URL = `http://localhost:8000/products?${queryString}`;
	console.log(URL);
	return new Promise(async (resolve) => {
		const response = await fetch(URL);
		const data = await response.json();

		resolve(data);
	});
}
