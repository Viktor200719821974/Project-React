import React, {useEffect, useState} from 'react';
import './Auth.css';
import {loginUser} from "../../services/login_services";
import {Link} from 'react-router-dom';
import AuthModal from "./AuthModal";
import {Button} from "@material-ui/core";
import useAuth from "../../hook/useAuth";
import {useHistory} from "react-router";
import api from "../../services/api";

function Auth() {
    const [token, setToken] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorAuth, setErrorAuth] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [errorEmail, setErrorEmail] = useState();
    const [errorPassword, setErrorPassword] = useState();
    const auth = useAuth();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let data = {email, password};
        try{
            const token = await api.auth.login(data);
            auth.setToken(token.data);

            if (token.status === 200){
                setToken(token);
                history.push("/");
            }

        }catch (e) {
            if (e.response.status === 422) {
                Object.keys(e.response.data.errors).forEach((key) => {
                    setErrorMessage(key, {
                        type: "manual",
                        message: [key],
                    });
                });
            }
            if (e.response.data.email){
                setErrorEmail(e.response.data.email);
            }
            if (e.response.data.password){
                setErrorPassword(e.response.data.password);
            }
            if (e.response.data.detail){
                setErrorMessage(e.response.data.detail);
                setErrorAuth(true);
            }
            console.log(e.message);
        } finally {
            setLoading(false);
        }
    }
    if (loading){
        return <div>Loading...</div>
    }
    return (
        <>
            <span className={'pageTitle'}>Authorization</span>
            {/*{isAuthenticated && <AuthModal key={email} isAuthenticated={isAuthenticated}/>}*/}
            <form className={'form_register'} onSubmit={handleSubmit}>
                <fieldset className={'register-group'}>
                    <label htmlFor={'email'} className={!auth.isLoaded && errorEmail ?'error_label' : 'label'}>Email
                        <input className={!auth.isLoaded && errorEmail ? 'error_input': 'input'} name={'email'}
                               type="text" onChange={e => setEmail(e.target.value)}
                               placeholder={errorEmail ? errorEmail : 'admin@gmail'}/>
                    </label>
                    <label htmlFor={'password'} className={!auth.isLoaded && errorPassword ?'error_label' : 'label'}>
                        Гасло
                        <input className={!auth.isLoaded && errorPassword ? 'error_input': 'input'} name={'password'}
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
        </>
    );
}

export default Auth;