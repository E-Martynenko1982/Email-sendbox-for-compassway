import axiosClient from "../axiosClient";

export const registerUser = async (
	username: string,
	email: string,
	password: string
) => {
	return axiosClient.post("/users/", {
		username,
		email,
		password,
	});
};

export const getCurrentUser = async () => {
	return axiosClient.get("/users/current/");
};
