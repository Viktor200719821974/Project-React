import axios from "axios";

// const url = 'http://localhost:8000/api/v1/users';
//
// const axiosUser = axios.create(
//     {
//         baseURL: url,
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem('access')}`
//         }
//
//     })
// export {axiosUser};
// const getUser = async () => {
//     const { data } = await axios.get(
//         `http://localhost:8000/api/v1/users/${id}`, {
//             headers: {
//                 "Content-type": "application/json",
//                 Authorization: "Bearer" + localStorage.getItem("access")
//             }
//         });
//     setApartment(data);
// };