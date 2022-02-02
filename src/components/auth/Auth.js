import React, {useState} from 'react';
import './Auth.css';
import {Link} from 'react-router-dom';
import {Button} from "@material-ui/core";
import useAuth from "../../hook/useAuth";
import {useNavigate} from "react-router-dom";
import api from "../../services/api";

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorAuth, setErrorAuth] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [errorEmail, setErrorEmail] = useState();
    const [errorPassword, setErrorPassword] = useState();
    const [setValue] = useState('checking value...');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        // let abortController = new AbortController();
        e.preventDefault();
        let isMounted = true;
        setLoading(true);
        let data = {email, password};
        try{
            const token = await api.auth.login(data);
            if(isMounted ){
                setValue("done!"); // no more error
            }
            if (token.status === 200){
                auth.setToken(token.data);
                navigate("/");
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
            if (e.response.data.email) {
                setErrorEmail(e.response.data.email);
            }
            if (e.response.data.password) {
                setErrorPassword(e.response.data.password);
            }
            if (e.response.data.detail) {
                setErrorMessage(e.response.data.detail);
                setErrorAuth(true);
            }
            console.log(e.message);
        }finally {
            setLoading(false);
        }

        // return () => {
        //     abortController.abort();
        // }
        return () => {
            isMounted = false;
        };
    }

    if (loading){
        return <div>Loading...</div>
    }
    return (
        <>
            <span className={'pageTitle'}>Authorization</span>
            <form className={'form_register'} onSubmit={handleSubmit}>
                    <label htmlFor={'email'} className={!auth.isLoaded && errorEmail ?'error_label' : 'label'}>Email
                        <input className={!auth.isLoaded && errorEmail ? 'error_input': 'input'} name={'email'}
                               type="text" onChange={e => setEmail(e.target.value)}
                               placeholder={errorEmail ? errorEmail : 'email@gmail.com'}/>
                    </label>
                    <label htmlFor={'password'} className={!auth.isLoaded && errorPassword ?'error_label' : 'label'}>
                        Гасло
                        <input className={!auth.isLoaded && errorPassword ? 'error_input': 'input'} name={'password'}
                               type="password" onChange={e => setPassword(e.target.value)}
                               placeholder={errorPassword ? errorPassword : '************************'}/>
                    </label>
                    {errorAuth && <div className={'error_message'}>* {errorMessage}</div>}
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