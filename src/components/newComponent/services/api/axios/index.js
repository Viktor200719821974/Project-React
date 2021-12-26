import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const authToken = Cookies.get("auth-token");
        console.log(authToken)
        if (authToken) {
            config.headers.authorization = `Bearer ${authToken}`;
        }
        console.log(config)
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;