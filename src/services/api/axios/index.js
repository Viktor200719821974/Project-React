import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const authToken = localStorage.getItem("access");
        // console.log(authToken)
        if (authToken) {
            config.headers.authorization = `Bearer ${authToken}`;
        }
        // console.log(authToken);
        return config;
    },
    (error) => {
        Promise.reject(error);
        console.log(error);
        console.log(error.response.status);
    }
);

export default axiosInstance;