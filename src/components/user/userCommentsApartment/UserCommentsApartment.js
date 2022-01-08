import React, {useEffect, useState} from 'react';
import api from '../../../services/api';
import {tokenDecoded} from "../../../hook/token_user_id";
import UserCommentsApartmentContent from "./UserCommentsApartmentContent";

const UserCommentsApartment = () => {
    const [apartment, setApartment] = useState([]);

    const token = localStorage.getItem('access');

    useEffect(async () => {
        try{
            let id = tokenDecoded(token);
            const res = await api.auth.getUser(id);
            setApartment(res.data.apartment);
            console.log(res.data);
        }catch (e) {
            console.log(e.message);
        }
    },[])
    return (
        <div>
            {
                apartment && apartment.map((c, index) => <UserCommentsApartmentContent
                    key={index}
                    id={c.id}
                    country={c.country}
                    city={c.city}
                    region={c.region}
                    price={c.price}
                    numbers_people={c.numbers_people}
                    numbers_rooms={c.numbers_rooms}
                />)
            }
        </div>
    );
};

export default UserCommentsApartment;