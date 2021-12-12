import axios from "axios";

const url = 'http://localhost:8000/api/v1/users';

const axiosUser = axios.create(
    {
        baseURL: url,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

    })
export {axiosUser};