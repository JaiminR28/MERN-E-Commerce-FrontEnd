export function createUser(userData) {
	return new Promise(async (resolve) => {
		//TODO: we will not hard-code server URL here
		const response = await fetch("/auth/signup", {
			method: "POST",
			body: JSON.stringify(userData),
			headers: { "content-type": "application/json" },
		});
		const data = await response.json();

		// TODO: on server it will only return some info of user ( not password)
		resolve({ data });
	});
}

export function logInUser(loginInfo) {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch("/auth/login", {
				method: "POST",
				body: JSON.stringify(loginInfo),
				headers: { "content-type": "application/json" },
			});

			if (response.ok) {
				const data = await response.json();
				if (data) {
					resolve({ data });
				}
			} else {
				const error = await response.text();
				reject(error);
			}
		} catch (error) {
			console.log(error.meesage);
			reject(error);
		}
	});
}

export function checkAuth() {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch("/auth/check");

			if (response.ok) {
				const data = await response.json();
				if (data) {
					resolve({ data });
				}
			} else {
				const error = await response.text();
				reject(error);
			}
		} catch (error) {
			console.log(error.meesage);
			reject(error);
		}
	});
}

export function signOut(userId) {
	return new Promise(async (resolve) => {
		// TODO: on server it will remove user session info
		resolve({ data: null });
	});
}
