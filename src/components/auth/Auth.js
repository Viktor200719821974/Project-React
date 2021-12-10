import React, {useEffect, useState} from 'react';
import './Auth.css';
import {loginUser} from "../../services/login_services";
import {Link} from 'react-router-dom';
import User from "../user/User";


function Auth() {
    const [token, setToken] = useState({});
    console.log(token);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const accessToken = token.access;
    const refreshToken = token.refresh;
    if (accessToken !== undefined){
        localStorage.setItem('access', `${accessToken}`);
    }
    if (refreshToken !== undefined){
        localStorage.setItem('refresh', `${refreshToken}`);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {access, refresh} = await loginUser({
            email,
            password
        });
        setToken({access, refresh});
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
                                <Link className={'auth_link'} to={'/registration'}>Registration</Link>
                            </span>
                        </fieldset>
                    </form>
                    </div>

        </>
    );
}


export default Auth;