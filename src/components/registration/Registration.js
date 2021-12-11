import React, {useState} from 'react';
import './Registration.css'
import {registrationUser} from "../../services/registration_service";

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');

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
        if (registration['email'][0]){
            console.log(registration);
        }

    }


    return (
        <>
            <span className={'pageTitle'}>Registration</span>


            <form className={'form_register'} onSubmit={handleSubmit}>
                {/*method={'Link'} action={'http://localhost:3000'}*/}
                <fieldset className={'register-group'}>
                    {/*<legend>Registration</legend>*/}
                <label htmlFor={'email'} >Email
                    <input name={'email'} type="text" onChange={e => setEmail(e.target.value)} placeholder={'admin@gmail'}/>
                </label>
                <label htmlFor={'password'}>Password
                    <input name={'password'} type="password" onChange={e => setPassword(e.target.value)} placeholder={'************************'}/>
                </label>
                <label htmlFor="name">Name
                    <input name={'name'} type="text" onChange={e => setName(e.target.value)} placeholder={'A-Z a-z, max_length=30'}/>
            </label>
                <label htmlFor="surname">Surname
                    <input name={'surname'} type="text" onChange={e => setSurname(e.target.value)} placeholder={'A-Z a-z, max_length=30'}/>
            </label>
                <label htmlFor="age">Age
                    <input name={'age'}  onChange={e => setAge(e.target.value)} placeholder={'number'}/>
            </label>
                <label htmlFor="phone">Phone
                    <input name={'phone'} type="text" onChange={e => setPhone(e.target.value)} placeholder={'0955858666'}/>
            </label>
                </fieldset>
                    <button className={'btn btn-default'} name={'submit'} type="submit"  >Save</button>

            </form>
        </>
    );
}

export default Registration;