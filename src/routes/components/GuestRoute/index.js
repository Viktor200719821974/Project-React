import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import useAuth from "../../../hook/useAuth";

function GuestRoute({component: Component, restricted, ...rest}) {
    const auth = useAuth();
        return (
            <Route {...rest} render={props => (
               auth.isLoaded && restricted ?
                    <Redirect to="/" />
                    : <Component {...props} />
            )} />
        );
    };

export default GuestRoute;