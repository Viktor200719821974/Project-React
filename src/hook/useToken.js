import {useState} from "react";


export default function useToken() {
    const getToken = () => {
        // const access = localStorage.getItem('access');
        // const refresh = refreshToken.localStorage.getItem('refresh');
        // const userAccessToken = JSON.parse(access);
        // const userRefreshToken = JSON.parse(refresh);
        // return userAccessToken?.token, userRefreshToken?.token
        // const tokenString = localStorage.getItem('access');
        // const userToken = JSON.parse(tokenString);
        // return userToken?.token
    };

    const [token, setToken] = useState(getToken());


    const saveToken = userToken => {
        localStorage.setItem('access', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}