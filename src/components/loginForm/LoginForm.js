import React, {useContext, useState} from 'react';
// import {Link} from "react-router-dom";
import {Context} from "../../index";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {store} = useContext(Context);
    return (
        <div>
            {/*<form onSubmit={handleSubmit}>*/}
                <fieldset>
                    <legend>Authorization</legend>
                    <label htmlFor="email">
                        <input name={'email'} type="text" onChange={e => setEmail(e.target.value)}
                               placeholder={'email'}/>
                    </label>
                    <label htmlFor="password">
                        <input name={'password'} type="password" onChange={e => setPassword(e.target.value)}
                               placeholder={'password'}/>
                    </label>
                    <button onClick={() => store.login(email, password)}>Login</button>
                    {/*<button onClick={()=> store.registration(email, password)}>Registration</button>*/}
                    {/*<span className={'span_link'}>*/}
                    {/*            <Link className={'auth_link'} to={'/registration'}>Registration</Link>*/}
                    {/*        </span>*/}
                </fieldset>
            {/*</form>*/}
        </div>
    );
};

export default LoginForm;