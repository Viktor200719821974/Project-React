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
       return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const authToken = localStorage.getItem("refresh");
            const originalConfig = err.config;
            if (authToken && originalConfig.url !== "/auth" && err.response ){
                if (err.response.status === 401 && !originalConfig._retry){
                    originalConfig._retry = true;

                    try{
                        const rs = await axiosInstance.post("/auth/refresh",{
                            refresh: localStorage.getItem('refresh'),
                        });
                        localStorage.setItem('access', rs.data.access);
                        localStorage.setItem('refresh', rs.data.refresh);
                        return axiosInstance(originalConfig);
                    }catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }
            return Promise.reject(err);
        }
    );

export default axiosInstance;