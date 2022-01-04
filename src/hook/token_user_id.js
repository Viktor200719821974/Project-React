import jwt_decode from "jwt-decode";

const tokenDecoded = (loginData) =>{
    const decoded = jwt_decode(loginData);
    return decoded.user_id;
}
export {tokenDecoded};
