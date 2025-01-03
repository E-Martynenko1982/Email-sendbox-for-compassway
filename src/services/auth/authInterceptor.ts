import axiosClient from "../axiosClient";
import { getStoredCredentials } from "./authStorage";

export function setupAuthInterceptor() {
	axiosClient.interceptors.request.use((config) => {
		const { username, password } = getStoredCredentials();
		if (username && password && config.headers) {
			const token = btoa(`${username}:${password}`);
			config.headers.Authorization = `Basic ${token}`;
		}
		return config;
	});
}
