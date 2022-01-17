import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const authToken = localStorage.getItem("access");
        if (authToken) {
            config.headers.authorization = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error).then(r => console.log(r)) ;
    }
);

export default axiosInstance;