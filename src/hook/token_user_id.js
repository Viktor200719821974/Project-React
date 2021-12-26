import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const tokenDecoded = (loginData) =>{
    const decoded = jwt_decode(loginData);
    console.log(decoded.user_id);
    return decoded.user_id;

}
let url ='http://localhost:8000/api/v1/users';

const getUser = async(loginData) => {
    const id = tokenDecoded(loginData);
    // const user = await api.auth.getProfile(id);
    // console.log(user);
    return fetch(url + `/${id}`, {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${loginData}`
        }
    })
        .then(value => value.json())
        .catch(err => err.message)
}
export {getUser};