import { useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../../../context/AuthContext";
import api from "../../services/api";
import {getUser} from "../../../../hook/token_user_id";

function AuthProvider(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setTokenData] = useState(null);
    console.log(token);
    console.log(user);
    const setToken = useCallback((tokenData) => {
        setTokenData(tokenData);
        if (tokenData) {
            Cookies.set("auth-token", tokenData);
        } else {
            Cookies.remove("auth-token");
        }
    }, []);

    const logOut = useCallback(() => {
        setUser(null);
        setToken(null);

    }, [setToken]);

    const loadData = useCallback(async () => {
        const tokenData = Cookies.get("access");
        setTokenData(tokenData);
        console.log(loadData)
        try {
            if (tokenData) {
                const { data } = getUser(tokenData);
                setUser(data);
            }
        } catch {
            setToken(null);
        } finally {
            setIsLoaded(true);
        }
    }, [setToken]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const contextValue = useMemo(
        () => ({
            isLoaded,
            user,
            token,
            setUser,
            setToken,
            logOut,

        }),
        [isLoaded, user, token, setToken, logOut]
    );
    console.log(contextValue);
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;