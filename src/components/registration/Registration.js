import React, {useState} from 'react';
import './Registration.css'
import {registrationUser} from "../../services/registration_service";
import YouRegistration from "./YouRegistration";

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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const registration = await registrationUser({
            email,
            password,
            profile:{
            name,
            surname,
            age,
            phone}
        });
        try{
            if (registration.email){
                setErrorEmail(registration.email);
            }if (registration.password){
                setErrorPassword(registration.password);
            }if (registration.profile.name){
                setErrorName(registration.profile.name);
            }if (registration.profile.surname){
                setErrorSurname(registration.profile.surname);
            }if (registration.profile.age){
                setErrorAge(registration.profile.age);
            }if (registration.profile.phone){
                setErrorPhone(registration.profile.phone);
            }
        }catch (e){
            if (e.message){
                setNoError(e.message);
            }
        }if (registration['id']){
            setYouRegistration(true);
        }
    }
    return (
        <>
            <span className={'pageTitle'}>Registration</span>
            {noError && !youRegistration && <div className={'noError'}>*{noError}</div>}
            {youRegistration && <YouRegistration key={email} youRegistration={youRegistration}/>}
            <form className={'form_register'} onSubmit={handleSubmit}>
                <fieldset className={'register-group'}>
                <label htmlFor={'email'} className={!youRegistration && errorEmail ?'error_label' : 'label'}>Email
                    <input className={!youRegistration && errorEmail ? 'error_input': 'input'} name={'email'}
                           type="text" onChange={e => setEmail(e.target.value)}
                           placeholder={errorEmail ? errorEmail : 'admin@gmail'}/>
                </label>
                <label htmlFor={'password'} className={!youRegistration && errorPassword ? 'error_label' : 'label'}>
                    Гасло
                    <input className={!youRegistration && errorPassword ? 'error_input' : 'input'} name={'password'}
                           type="password" onChange={e => setPassword(e.target.value)}
                           placeholder={errorPassword ? errorPassword : '************************'}/>
                </label>
                <label htmlFor="name" className={!youRegistration && errorName ? 'error_label' : 'label'}>Ім'я
                    <input className={!youRegistration && errorName ? 'error_input' : 'input'} name={'name'}
                           type="text" onChange={e => setName(e.target.value)}
                           placeholder={errorName ? errorName : 'A-Z a-z, max_length=30'}/>
            </label>
                <label htmlFor="surname" className={!youRegistration && errorSurname ? 'error_label' : 'label'}>Прізвище
                    <input className={!youRegistration && errorSurname ? 'error_input' : 'input'} name={'surname'}
                           type="text" onChange={e => setSurname(e.target.value)}
                           placeholder={errorSurname ? errorSurname : 'A-Z a-z, max_length=30'}/>
            </label>
                <label htmlFor="age" className={!youRegistration && errorAge ? 'error_label' : 'label'}>Вік
                    <input className={!youRegistration && errorAge ? 'error_input' : 'input'} name={'age'}
                           onChange={e => setAge(e.target.value)} placeholder={errorAge ? errorAge : 'number'}/>
            </label>
                <label htmlFor="phone" className={!youRegistration && errorPhone ? 'error_label' : 'label'}>Телефон
                    <input className={!youRegistration && errorPhone ? 'error_input' : 'input'} name={'phone'}
                           type="text" onChange={e => setPhone(e.target.value)}
                           placeholder={errorPhone ? errorPhone : '0955858666'}/>
            </label>
                </fieldset>
                    <button className={'btn btn-default'} name={'submit'} type="submit"  >Save</button>

            </form>
        </>
    );
}

export default Registration;