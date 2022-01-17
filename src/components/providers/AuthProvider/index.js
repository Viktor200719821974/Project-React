import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import api from "../../../services/api";
import {tokenDecoded} from "../../../hook/token_user_id";

const AuthProvider = (props) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setTokenData] = useState(null);

    const setToken = useCallback((tokenData) => {
        setTokenData(tokenData);
        if (tokenData) {
           localStorage.setItem("access", tokenData.access);
           localStorage.setItem("refresh", tokenData.refresh);
        } else {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
        }
    }, []);

    const logOut = useCallback(() => {
        setUser(null);
        setToken(null);
        setIsLoaded(false);
    }, [setToken]);

    const setRefreshToken = useCallback(async(value) => {
        if (value) {
            const refreshToken = localStorage.getItem('refresh');
            let data = {refresh: refreshToken};
            try {
                const token = await api.auth.refresh(data);
                if (token.status === 200) {
                    setToken(token.data);
                }
            } catch (e) {
                if (e.response.status === 401){
                    logOut();
                }
                console.log(e.message);
            }
        }
    },[isLoaded, setToken])
    const loadData = useCallback(async () => {
        const tokenData = localStorage.getItem("access");
        setTokenData(tokenData);
        try {
            if (tokenData) {
                const id = tokenDecoded(tokenData);
                const { data } = await api.auth.getUser(id);
                setUser(data);
                setIsLoaded(true);
            }
        } catch (e) {
            console.log(e);
            setToken(null);
        } finally {

        }
    }, [setToken]);

    useEffect(() => {
        loadData().then(r => console.log(r) );
    }, [loadData, isLoaded, token]);

    const contextValue = useMemo(
        () => ({
            isLoaded,
            user,
            token,
            setUser,
            setToken,
            logOut,
            setRefreshToken,
        }),
        [isLoaded, user, token, setToken, logOut, setRefreshToken]
    );
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;