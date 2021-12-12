import React, {useEffect, useState} from 'react';
import './Auth.css';
import {loginUser} from "../../services/login_services";
import {Link} from 'react-router-dom';
import jwt_decode from "jwt-decode";

function Auth() {
    const [token, setToken] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorAuth, setErrorAuth] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    // console.log(isAuthenticated);
    const accessToken = token.access;
    const refreshToken = token.refresh;

    if (accessToken !== undefined){
        localStorage.setItem('access', `${accessToken}`);
    }
    if (refreshToken !== undefined){
        localStorage.setItem('refresh', `${refreshToken}`);
    }
    // useEffect(() =>{
    //     if (localStorage.getItem('access')){
    //         setIsAuthenticated(true);
    //     }
    //
    // },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = await loginUser({
            email,
            password

        });
        if (!token['email'] || !token['password']){
            setToken(token);
            console.log(token['email'], token['password'])
        }
        if (token['detail']){
           setErrorAuth(true);
           setErrorMessage(token['detail']);
           console.log(token);
        }
        setLoading(false);
    }
    if (loading){
        return <div>Loading...</div>
    }
    return (
        <>

           <div className={'form_main'}>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            {/*<legend>Authorization</legend>*/}
                            <label htmlFor="email">
                                <input name={'email'} type="text" onChange={e => setEmail(e.target.value)}
                                       placeholder={'email'}/>
                            </label>
                            <label htmlFor="password">
                                <input name={'password'} type="password" onChange={e => setPassword(e.target.value)}
                                       placeholder={'password'}/>
                            </label>
                            <button className={'btn'} name={'submit'} type="submit">Login</button>
                            <span className={'span_link'}>
                                {errorAuth && <div className={'error_message'}>* {errorMessage}</div>}
                                <Link className={errorAuth ?'error_link' : 'auth_link'} to={'/registration'}>Registration</Link>
                            </span>
                        </fieldset>
                    </form>
                    </div>

        </>
    );
}

export default Auth;