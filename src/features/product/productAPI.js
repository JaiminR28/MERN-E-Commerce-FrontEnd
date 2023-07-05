export function fetchAllProducts() {
	return new Promise(async (resolve) => {
		const response = await fetch("http://localhost:8000/products");
		const data = await response.json();
		resolve(data);
	});
}

export function fetchBrands() {
	return new Promise(async (resolve) => {
		const response = await fetch("http://localhost:8000/brands");
		const data = await response.json();

		resolve(data);
	});
}

export function fetchCategories() {
	return new Promise(async (resolve) => {
		const response = await fetch("http://localhost:8000/categories");
		const data = await response.json();

		resolve(data);
	});
}
export function fetchProductById(id) {
	return new Promise(async (resolve) => {
		//TODO: we will not hard-code server URL here
		const response = await fetch("http://localhost:8000/products/" + id);
		const data = await response.json();
		resolve({ data });
	});
}
export function createProduct(product) {
	return new Promise(async (resolve) => {
		//TODO: we will not hard-code server URL here
		const response = await fetch("http://localhost:8000/products/", {
			method: "POST",
			body: JSON.stringify(product),
			headers: { "content-type": "application/json" },
		});
		const data = await response.json();
		resolve({ data });
	});
}
export function fetchProductsByFilter(filter, sort, pagination) {
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
	for (let key in pagination) {
		queryString += `${key}=${pagination[key]}&`;
	}

	const URL = `http://localhost:8000/products?${queryString}`;
	return new Promise(async (resolve) => {
		const response = await fetch(URL);
		const data = await response.json();
		const totalItems = await response.headers.get("X-Total-Count");
		resolve({ data: { products: data, totalItems: +totalItems } });
	});
}
