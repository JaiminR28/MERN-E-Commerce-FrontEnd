export function fetchAllProducts() {
	return new Promise(async (resolve) => {
		const response = await fetch("http://localhost:8000/products");
		const data = await response.json();
		resolve(data);
	});
}
export function fetchProductsByFilter(filter, sort) {
	let queryString = "";
	for (let key in filter) {
		const categoryValues = filter[key];
		if (categoryValues.length > 0) {
			const lastCategoryValue = categoryValues[categoryValues.length - 1];
			queryString += `${key}=${lastCategoryValue}&`;
		}
	}
	for (let key in sort) {
		queryString += `${key}=${sort[key]}&`;
	}

	const URL = `http://localhost:8000/products?${queryString}`;
	return new Promise(async (resolve) => {
		const response = await fetch(URL);
		const data = await response.json();

		resolve(data);
	});
}
