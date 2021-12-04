import React, {useState} from 'react';
import './Auth.css';
import {loginUser, tokenAccess} from "../../services/login_services";
import useToken from "../../hook/useToken";
import {Link} from 'react-router-dom';

function Auth() {
    // const {token, setToken}=  useToken();
    // console.log(token)
    const [token, setToken] = useState({});
    const accessToken = token.access;
    const refreshToken = token.refresh;
    localStorage.setItem('access', `${accessToken}`);
    localStorage.setItem('refresh', `${refreshToken}`);
    if (accessToken){
        tokenAccess()
    }


    // getToken(accessToken, refreshToken);
    console.log(accessToken, refreshToken);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {access, refresh} = await loginUser({
            email,
            password
        });
        setToken({access, refresh});
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
        <div className={'form_main'}>
        <form onSubmit={handleSubmit}>
    <fieldset>
    <legend>Authorization</legend>
    <label htmlFor="email">
                <input name={'email'} type="text" onChange={e => setEmail(e.target.value)} placeholder={'email'}/>
    </label>
    <label htmlFor="password">
                <input name={'password'} type="password" onChange={e => setPassword(e.target.value)} placeholder={'password'}/>
    </label>
                <button className={'btn'} name={'submit'} type="submit" >Login</button>



            <span className={'span_link'}>
                <Link className={'auth_link'} to={'/registration'} >Registration</Link>
        </span>
        </fieldset>
        </form> </div>


        </>
    );
}

export default Auth;