import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import api from "../../../../services/api";
import ApartmentBlock from "./ApartmentBlock";

const No = () => {
    const [register, setRegister] = useState(false);
    const [apartment, setApartment] = useState([]);
    const [user, setUser] = useState([]);
    const [photo, setPhoto] = useState([]);
    let params = useParams();
    let token = params.token_no;
    let apartment_id = params.apartment_id;
    let user_id = params.user_id;
    let photo_room = photo.map(c => c.url)[0];

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await api.auth.getApartment(apartment_id);
                if (res.status === 200){
                    setApartment(res.data);
                    setPhoto(res.data.photo_rooms);
                }
                const data = await api.auth.getUser(user_id);
                if (data.status === 200){
                    setUser(data.data.profile);
                }
                await api.auth.activateNo(token);
            } catch (e) {
                if (e.response?.status === 403){
                    setRegister(true);
                }
                console.log(e.message);
            }
        }
        fetchData();
    },[token, register])
    return (
        <div>
        <div className={'div_register'}>{!register ? <div>Ви відмовили в оренді квартири !!!!</div>
            : <div>Сторінка вже була відкрита</div> }
        </div>
            {!register && <div>
                {
                    apartment && <ApartmentBlock id={apartment.id}
                                                 country={apartment.country}
                                                 city={apartment.city}
                                                 region={apartment.region}
                                                 numbers_people={apartment.numbers_people}
                                                 numbers_rooms={apartment.numbers_rooms}
                                                 numbers_squares={apartment.numbers_squares}
                                                 price={apartment.price}
                                                 photo={photo_room}
                                                 name={user.name}
                                                 age={user.age}
                                                 phone={user.phone}
                                                 surname={user.surname}
                    />
                }
            </div>}
        </div>
    );
};

export default No;