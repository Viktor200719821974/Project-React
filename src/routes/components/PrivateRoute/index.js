import React from 'react';
import { Route, Redirect } from "react-router-dom";
import useAuth from "../../../hook/useAuth";

function PrivateRoute({component: Component, ...rest}) {
    let auth = useAuth();
        return (
            <Route {...rest} render={props => (
                auth.isLoaded ?
                    <Component {...props} />
                    : <Redirect to="/" />
            )} />
        );
}

export default PrivateRoute;