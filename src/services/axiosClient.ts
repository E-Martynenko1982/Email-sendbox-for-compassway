import axios from "axios";

console.log("API Base URL:", import.meta.env.VITE_API_URL);

const axiosClient = axios.create({
	baseURL: "/api",
	withCredentials: true,
});

export default axiosClient;

// axiosClient.interceptors.request.use(
// 	(config) => {
// 		// Пример добавления токена авторизации
// 		// const token = localStorage.getItem('token');
// 		// if (token) {
// 		//   config.headers.Authorization = `Bearer ${token}`;
// 		// }
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );
