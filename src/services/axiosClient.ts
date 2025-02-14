import axios from "axios";

console.log("API Base URL:", import.meta.env.VITE_API_URL);

const axiosClient = axios.create({
	baseURL: "/api",
	withCredentials: true,
});

export default axiosClient;
