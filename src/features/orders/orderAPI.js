export function createOrder(order) {
	return new Promise(async (resolve) => {
		const response = await fetch("/orders", {
			method: "POST",
			body: JSON.stringify(order),
			headers: { "content-type": "application/json" },
		});

		const data = await response.json();

		resolve({ data });
	});
}

export function updateOrder(order) {
	return new Promise(async (resolve) => {
		const response = await fetch("/orders/" + order.id, {
			method: "PATCH",
			body: JSON.stringify(order),
			headers: { "content-type": "application/json" },
		});

		const data = await response.json();
		resolve({ data });
	});
}
export function fetchAllOrders({ sort, pagination }) {
	let queryString = "";
	for (let key in pagination) {
		queryString += `${key}=${pagination[key]}&`;
	}

	for (let key in sort) {
		queryString += `${key}=${sort[key]}&`;
	}

	const URL = `/orders?${queryString}`;
	return new Promise(async (resolve) => {
		const response = await fetch(URL);
		const data = await response.json();
		const totalOrders = await response.headers.get("X-Total-Count");
		resolve({ data: { orders: data, totalOrders: +totalOrders } });
	});
}
