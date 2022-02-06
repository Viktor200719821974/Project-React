import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import api from "../../services/api";

const Register = () => {
    const [register, setRegister] = useState(false);
    let params = useParams();
    let token = params.token;
    useEffect(() => {
        async function fetchData() {
            try {
              await api.auth.activateAccount(token);
            } catch (e) {
                if (e.response.status === 403){
                  setRegister(true);
                }
                console.log(e.message);
            }
        }
        fetchData();
    },[token])
    return (
         <div className={'div_register'}>{!register ? <div>Вітаємо, Ви підтвердили свою електронну адресу !!!!</div>
           : <div>Ваша адреса вже підтверджена!!!!</div> }
        </div>
    );
};

export default Register;