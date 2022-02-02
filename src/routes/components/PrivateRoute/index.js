import React from 'react';
import {Navigate} from "react-router-dom";
import useAuth from "../../../hook/useAuth";

function PrivateRoute({children}) {
    let auth = useAuth();
        return auth.isLoaded ? children : <Navigate to="/login" />;
}

export default PrivateRoute;