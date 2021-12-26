import axios from "../axios";

const endpoints = {
    registration: (data) => axios.post("/v1/auth/email/register", data),
    login: (data) => axios.post("/auth", data),
    forgotPassword: (data) => axios.post("/v1/auth/forgot/password", data),
    getProfile: (id) => axios.get(`/users/${id}`),
    updateProfile: (data) => axios.patch("/v1/auth/me", data),
};

export default endpoints;