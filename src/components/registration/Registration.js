import React, {useState} from 'react';
import './Registration.css'
// import YouRegistration from "./YouRegistration";
import api from "../../services/api";
import Alert from "@mui/material/Alert";
// import {useNavigate} from "react-router-dom";
import useAuth from "../../hook/useAuth";
import {useHistory} from "react-router-dom";

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [errorEmail, setErrorEmail] = useState();
    const [errorPassword, setErrorPassword] = useState();
    const [errorName, setErrorName] = useState();
    const [errorSurname, setErrorSurname] = useState();
    const [errorAge, setErrorAge] = useState();
    const [errorPhone, setErrorPhone] = useState();
    const [noError, setNoError] = useState();
    const [youRegistration, setYouRegistration] = useState(false);
    // const navigate = useNavigate();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // e.target.reset();
        const data = {email, password, profile:{name, surname, age, phone}}
        try{
            const res = await api.auth.registration(data);
            if (res.status === 201){
                setYouRegistration(true);
                // navigate('/');
                history.push('/');
            }
        }catch (e) {
                console.log(e.response.data);
                if (e.response.data.email){
                    setErrorEmail(e.response.data.email);
                }if (e.response.data.password){
                    setErrorPassword(e.response.data.password);
                }if (e.response.data.profile?.name){
                    setErrorName(e.response.data.profile?.name);
                }if (e.response.data.profile?.surname){
                    setErrorSurname(e.response.data.profile?.surname);
                }if (e.response.data.profile?.age){
                    setErrorAge(e.response.data.profile?.age);
                }if (e.response.data.profile?.phone){
                    setErrorPhone(e.response.data.profile?.phone);
                }
                if (e.message){
                        setNoError(e.response.statusText);
                }
            console.log(e.message);
        }
    }

    const resetOnClick = () => {
        setErrorEmail('');
        setErrorPassword('');
        setErrorName('');
        setErrorSurname('');
        setErrorAge('');
        setErrorPhone('');
        setNoError('');
    }

    return (
        <>
            <span className={'pageTitle'}>Registration</span>
            <div className={'div_Registration_noError'}>{noError && !youRegistration && <Alert severity="error">{noError}</Alert>}</div>
            {/*{!youRegistration && <YouRegistration key={email} youRegistration={youRegistration}/>}*/}
            <form className={'form_register'} onSubmit={handleSubmit}>
                <fieldset className={'register-group'}>
                <label htmlFor={'email'} className={!youRegistration && errorEmail ?'error_label' : 'label'}>Email
                    {errorEmail && <div>* {errorEmail}</div>}
                    <input className={!youRegistration && errorEmail ? 'error_input': 'input'} name={'email'}
                           type="text" onChange={e => setEmail(e.target.value)}
                           placeholder={'admin@gmail'}/>
                </label>
                <label htmlFor={'password'} className={!youRegistration && errorPassword ? 'error_label' : 'label'}>
                    Гасло  {errorPassword && <div>* {errorPassword}</div>}
                    <input className={!youRegistration && errorPassword ? 'error_input' : 'input'} name={'password'}
                           type="password" onChange={e => setPassword(e.target.value)}
                           placeholder={errorPassword ? errorPassword : '************************'}/>
                </label>
                <label htmlFor="name" className={!youRegistration && errorName ? 'error_label' : 'label'}>Ім'я
                    {errorName && <div>* {errorName}</div>}
                    <input className={!youRegistration && errorName ? 'error_input' : 'input'} name={'name'}
                           type="text" onChange={e => setName(e.target.value)}
                           placeholder={'A-Z a-z, max_length=30'}/>
            </label>
                <label htmlFor="surname" className={!youRegistration && errorSurname ? 'error_label' : 'label'}>Прізвище
                    {errorSurname && <div>* {errorSurname}</div>}
                    <input className={!youRegistration && errorSurname ? 'error_input' : 'input'} name={'surname'}
                           type="text" onChange={e => setSurname(e.target.value)}
                           placeholder={'A-Z a-z, max_length=30'}/>
            </label>
                <label htmlFor="age" className={!youRegistration && errorAge ? 'error_label' : 'label'}>Вік
                    {errorAge && <div>* {errorAge}</div>}
                    <input className={!youRegistration && errorAge ? 'error_input' : 'input'} name={'age'}
                           onChange={e => setAge(e.target.value)} placeholder={'18'}/>
            </label>
                <label htmlFor="phone" className={!youRegistration && errorPhone ? 'error_label' : 'label'}>Телефон
                    {errorPhone && <div>* {errorPhone}</div>}
                    <input className={!youRegistration && errorPhone ? 'error_input' : 'input'} name={'phone'}
                           type="text" onChange={e => setPhone(e.target.value)}
                           placeholder={'0955858666'}/>
            </label>
                </fieldset>
                    <button className={'btn btn-default'} name={'submit'} type={'submit'} onClick={resetOnClick}>Submit</button>

            </form>
        </>
    );
}

export default Registration;