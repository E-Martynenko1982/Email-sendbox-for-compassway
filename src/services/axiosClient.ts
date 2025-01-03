import axios from "axios";

const axiosClient = axios.create({
	baseURL: process.env.VITE_API_URL || "/api",
});

export default axiosClient;
