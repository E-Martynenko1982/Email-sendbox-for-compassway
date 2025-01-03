export const getStoredCredentials = () => {
	const username = localStorage.getItem("username");
	const password = localStorage.getItem("password");

	return { username, password };
};

export const storeCredentials = (username: string, password: string) => {
	localStorage.setItem("username", username);
	localStorage.setItem("password", password);
};

export const clearCredentials = () => {
	localStorage.removeItem("username");
	localStorage.removeItem("password");
};
