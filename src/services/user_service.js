import jwt_decode from "jwt-decode";
import {tokenRefresh} from "./login_services";

const tokenDecoded = () =>{
    const decoded = jwt_decode(localStorage.getItem("access"));
    return decoded.user_id;
}
let url ='http://localhost:8000/api/v1/users';

const accessToken = localStorage.getItem('access');
const getUser =  () => {
    if (localStorage.getItem('access')) {
        const id = tokenDecoded();
        return fetch(url + `/${id}`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(value => value.json())
            .catch(function (error){
                console.log(error)
                if(error){
                    tokenRefresh();
                }
                alert(error.config)
            })
        // console.log(res)
    }
};
export {getUser};