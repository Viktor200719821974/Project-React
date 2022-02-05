import React, {useEffect} from 'react';
import {useParams} from "react-router";
import api from "../../services/api";

const Register = () => {
    let params = useParams();
    useEffect(async() => {
        let data = {uid: params.uid, token: params.token};
        try{
            const res = await api.auth.activateAccount(data);
            console.log(res);
        }catch (e) {
            console.log(e.message);
        }
    },[])
    return (
        <div className={'div_register'}>
           Вітаємо, Ви підтвердили свою електронну адресу !!!!
        </div>
    );
};

export default Register;