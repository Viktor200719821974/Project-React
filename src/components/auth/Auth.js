import React, {useState} from 'react';
import './Auth.css';
import {loginUser} from "../../services/login_services";
import {Link} from 'react-router-dom';
import AuthModal from "./AuthModal";
import {Button} from "@material-ui/core";
import useAuth from "../../hook/useAuth";

function Auth() {
    const [token, setToken] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorAuth, setErrorAuth] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [errorEmail, setErrorEmail] = useState();
    const [errorPassword, setErrorPassword] = useState();
    const auth = useAuth();
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
        setLoading(true);
        const token = await loginUser({
            email,
            password
        });
        if (token['email']){
            setErrorEmail(token['email']);
        }
        if (token['password']){
            setErrorPassword(token['password']);
        }
        if (token['detail']){
           setErrorAuth(true);
           setErrorMessage(token['detail']);
        }
        if (token['refresh'] || token['access']){
            setToken(token);
            setIsAuthenticated(true);
        }
        auth.setToken(token);
        setLoading(false);
    }
    if (loading){
        return <div>Loading...</div>
    }
    return (
        <>
            <span className={'pageTitle'}>Authorization</span>
            {isAuthenticated && <AuthModal key={email} isAuthenticated={isAuthenticated}/>}
            <form className={'form_register'} onSubmit={handleSubmit}>
                <fieldset className={'register-group'}>
                    <label htmlFor={'email'} className={!isAuthenticated && errorEmail ?'error_label' : 'label'}>Email
                        <input className={!isAuthenticated && errorEmail ? 'error_input': 'input'} name={'email'}
                               type="text" onChange={e => setEmail(e.target.value)}
                               placeholder={errorEmail ? errorEmail : 'admin@gmail'}/>
                    </label>
                    <label htmlFor={'password'} className={!isAuthenticated && errorPassword ?'error_label' : 'label'}>
                        Гасло
                        <input className={!isAuthenticated && errorPassword ? 'error_input': 'input'} name={'password'}
                               type="password" onChange={e => setPassword(e.target.value)}
                               placeholder={errorPassword ? errorPassword : '************************'}/>
                    </label>
                    {errorAuth && <div className={'error_message'}>* {errorMessage}</div>}
                </fieldset>
                <button className={'btn btn-default'} name={'submit'} type="submit"  >Save</button>
                <Button
                    color="inherit"
                    type="submit"
                    component={Link}
                    to="/registration"
                >
                    Create an account
                </Button>
            </form>
           {/*<div className={'form_main'}>*/}
           {/*         <form onSubmit={handleSubmit}>*/}
           {/*             <fieldset>*/}
           {/*                 /!*<legend>Authorization</legend>*!/*/}
           {/*                 <label htmlFor="email">*/}
           {/*                     <input name={'email'} type="text" onChange={e => setEmail(e.target.value)}*/}
           {/*                            placeholder={'email'}/>*/}
           {/*                 </label>*/}
           {/*                 <label htmlFor="password">*/}
           {/*                     <input name={'password'} type="password" onChange={e => setPassword(e.target.value)}*/}
           {/*                            placeholder={'password'}/>*/}
           {/*                 </label>*/}
           {/*                 <button className={'btn'} name={'submit'} type="submit">Login</button>*/}
           {/*                 <span className={'span_link'}>*/}
           {/*                     {errorAuth && <div className={'error_message'}>* {errorMessage}</div>}*/}
           {/*                     <Link className={errorAuth ?'error_link' : 'auth_link'} to={'/registration'}>Registration</Link>*/}
           {/*                 </span>*/}
           {/*             </fieldset>*/}
           {/*         </form>*/}
           {/*         </div>*/}

        </>
    );
}

export default Auth;