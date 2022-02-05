import axios from "../axios";

const endpoints = {
    activateAccount: (data) => axios.post("auth/users/activation/", data),
    registration: (data) => axios.post("auth/users/", data),
    refresh: (data) => axios.post('/api/v1/auth/refresh', data),
    login: (data) => axios.post("/api/v1/auth", data),
    // forgotPassword: (data) => axios.post("/v1/auth/forgot/password", data),
    // getApartments: (page) => axios.get(`/apartments?page=${page}`),
    // updateProfile: (data) => axios.patch("/v1/auth/me", data),
    getApartment: (id) => axios.get(`/api/v1/apartments/${id}`),
    getUsers: (page) => axios.get(`/api/v1/users?page=${page}`),
    getUser: (id) => axios.get(`/api/v1/users/${id}`),
    getCommentsApartment: () => axios.get('/api/v1/comments_apartment'),
    getUserBlocked: (id) => axios.put(`/api/v1/users/${id}/blocked`),
    getUserActivate: (id) => axios.patch(`/api/v1/users/${id}/blocked`),
    getCommentsUsers: (page) => axios.get(`/api/v1/comments_user?page=${page}`),
    getCommentsApartments: (page) => axios.get(`/api/v1/comments_apartment?page=${page}`),
    getCommentApartments: (id) => axios.get(`/api/v1/comments_apartment/${id}`),
    getCommentUsers: (id) => axios.get(`/api/v1/comments_user/${id}`),
    deleteCommentApartment: (id) => axios.delete(`/api/v1/comments_apartment/${id}`),
    deleteCommentUser: (id) => axios.delete(`/api/v1/comments_user/${id}`),
    changeCommentApartment: (id, obj) => axios.patch(`/api/v1/comments_apartment/${id}`, obj),
    changeCommentUser: (id, obj) => axios.patch(`/api/v1/comments_user/${id}`, obj),
    changeApartment: (id, obj) => axios.patch(`/api/v1/apartments/${id}`, obj),
    deleteApartment: (id) => axios.delete(`/api/v1/apartments/${id}`),
    addApartment: (obj) => axios.post('/api/v1/apartments', obj),
    changeAllApartment: (id, obj) => axios.put(`/api/v1/apartments/${id}`, obj),
    changeUserNoManager: (id) => axios.put(`/api/v1/users/${id}/manager`),
    changeUserManager: (id) => axios.patch(`/api/v1/users/${id}/manager`),
    sendCommentsApartment: (id, obj) => axios.post(`/api/v1/apartments/${id}/comment_apartment`, obj),
    rentApartment: (id, obj) => axios.post(`/api/v1/apartments/${id}/selected_date`, obj),
    addPhotoRooms: (id, formData) => axios.patch(`/api/v1/apartments/${id}/photo_rooms`, formData),
    getDateSelection: () => axios.get('/api/v1/date_selection'),
    sendCommentUser: (id, obj) => axios.post(`/api/v1/users/${id}/comment_user`, obj),
    addPhotoCommentApartment: (id, formData) => axios.patch(`/api/v1/comments_apartment/${id}/addPhoto`, formData),
    addPhotoCommentUser: (id, obj) => axios.patch(`/api/v1/comments_user/${id}/addPhoto`, obj),
    deleteApartmentPhotoRooms: (id) => axios.delete(`/api/v1/apartments/photo_rooms/${id}`),
    deletePhotoCommentApartment: (id) => axios.delete(`/api/v1/comments_apartment/deletePhoto/${id}`),
    deletePhotoCommentUser: (id) => axios.delete(`/api/v1/comments_user/deletePhoto/${id}`),
};

export default endpoints;