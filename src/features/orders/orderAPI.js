export function createOrder(order) {
	return new Promise(async (resolve) => {
		const response = await fetch("http://localhost:8000/orders", {
			method: "POST",
			body: JSON.stringify(order),
			headers: { "content-type": "application/json" },
		});

		const data = await response.json();
		console.log("Order API:", data);

		// TODO: on server it will only return some info of user ( not password)
		resolve({ data });
	});
}
