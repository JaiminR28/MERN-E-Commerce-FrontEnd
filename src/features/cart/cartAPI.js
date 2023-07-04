export function addToCart(item) {
	return new Promise(async (resolve) => {
		//TODO: we will not hard-code server URL here
		console.log("item", JSON.stringify(item));
		const response = await fetch("http://localhost:8000/cart", {
			method: "POST",
			body: JSON.stringify(item),
			headers: { "content-type": "application/json" },
		});
		const data = await response.json();
		console.log(data);
		// TODO: on server it will only return some info of user ( not password)
		resolve({ data });
	});
}

export function fetchItemsByUserId(userId) {
	return new Promise(async (resolve) => {
		console.log("userId", userId);
		const response = await fetch(
			"http://localhost:8000/cart?user=" + userId
		);
		const data = await response.json();
		console.log("fetch User: ", data);

		resolve({ data });
	});
}

export function updateCart(update) {
	return new Promise(async (resolve) => {
		//TODO: we will not hard-code server URL here
		console.log("update", JSON.stringify(update));
		const response = await fetch(
			"http://localhost:8000/cart/" + update.id,
			{
				method: "PATCH",
				body: JSON.stringify(update),
				headers: { "content-type": "application/json" },
			}
		);
		console.log(response);
		const data = await response.json();
		// TODO: on server it will only return some info of user ( not password)
		resolve({ data });
	});
}

export function deleteItemInCart(itemId) {
	return new Promise(async (resolve) => {
		//TODO: we will not hard-code server URL here
		const response = await fetch("http://localhost:8000/cart/" + itemId, {
			method: "DELETE",
			headers: { "content-type": "application/json" },
		});
		const data = await response.json();
		// TODO: on server it will only return some info of user ( not password)
		resolve({ data: { id: itemId } });
	});
}

export async function resetCart(userId) {
	// get all items of the user cart --- delete each item from the cart

	return new Promise(async (resolve) => {
		console.log(userId);
		const response = await fetchItemsByUserId(userId);
		console.log("response", response);
		const items = response.data;
		console.log("items", items);
		for (let item of items) {
			console.log("item", item);
			await deleteItemInCart(item.id);
		}
		resolve({ status: "success" });
	});
}
