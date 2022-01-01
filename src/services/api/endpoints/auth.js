import axios from "../axios";

const endpoints = {
    // registration: (data) => axios.post("/v1/auth/email/register", data),
    login: (data) => axios.post("/auth", data),
    // forgotPassword: (data) => axios.post("/v1/auth/forgot/password", data),
    // getApartments: (page) => axios.get(`/apartments?page=${page}`),
    // updateProfile: (data) => axios.patch("/v1/auth/me", data),
    getApartment: (id) => axios.get(`/apartments/${id}`),
    getUsers: (page) => axios.get(`/users?page=${page}`),
    getUser: (id) => axios.get(`/users/${id}`),
    getCommentsApartment: () => axios.get('/comments_apartment'),
    getUserBlocked: (id) => axios.put(`/users/${id}/blocked`),
    getUserActivate: (id) => axios.patch(`/users/${id}/blocked`),
    getCommentsUsers: (page) => axios.get(`/comments_user?page=${page}`),
    getCommentsApartments: (page) => axios.get(`/comments_apartment?page=${page}`),
    getCommentApartments: (id) => axios.get(`/comments_apartment/${id}`),
    getCommentUsers: (id) => axios.get(`/comments_user/${id}`),
    deleteCommentApartment: (id) => axios.delete(`/comments_apartment/${id}`),
    deleteCommentUser: (id) => axios.delete(`/comments_user/${id}`),
    changeCommentApartment: (id, obj) => axios.patch(`/comments_apartment/${id}`, obj),
    changeCommentUser: (id, obj) => axios.patch(`/comments_user/${id}`, obj),
};

export default endpoints;