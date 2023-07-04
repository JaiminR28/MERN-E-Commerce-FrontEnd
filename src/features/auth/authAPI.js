export function createUser(userData) {
	return new Promise(async (resolve) => {
		//TODO: we will not hard-code server URL here
		const response = await fetch("http://localhost:8000/users", {
			method: "POST",
			body: JSON.stringify(userData),
			headers: { "content-type": "application/json" },
		});
		const data = await response.json();

		// TODO: on server it will only return some info of user ( not password)
		resolve({ data });
	});
}

export function checkUser(loginInfo) {
	return new Promise(async (resolve, reject) => {
		//TODO: we will not hard-code server URL here
		const email = loginInfo.email;
		const password = loginInfo.password;
		const response = await fetch(
			"http://localhost:8000/users?email=" + email
		);
		const data = await response.json();
		if (data.length) {
			if (password === data[0].password) {
				resolve({ data: data[0] });
			} else reject({ message: "Wrong Credentials" });
		} else {
			reject({ message: "User not found" });
		}
	});
}

export function signOut(userId) {
	return new Promise(async (resolve) => {
		// TODO: on server it will remove user session info
		resolve({ data: null });
	});
}
