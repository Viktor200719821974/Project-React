import React from 'react';
import {Redirect} from "react-router-dom";
import useAuth from "../../../hook/useAuth";

function PrivateRoute({children}) {
    let auth = useAuth();
        return auth.isLoaded ? children : <Redirect to="/login" />;
}

export default PrivateRoute;