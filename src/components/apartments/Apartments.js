import React, {useContext, useEffect, useState} from 'react';
import {getApartments} from "../../services/apartment_service";
import Auth from "../auth/Auth";
import '../auth/Auth.css';
import ApartmentContent from "../apartmentContent/ApartmentContent";

function Apartments(props) {
    const [apartments, setApartments] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState();

    useEffect(()=> {
       getApartments().then(value => setApartments(value.data))
    },[])

    useEffect(()=> {
        if (localStorage.getItem('access')){
            setIsAuthenticated(true);
        }
    }, [])
    const token = localStorage.getItem('access');
    // let json = JSON.parse(token);
    console.log(typeof (token));
    return (
        <>
            <h3 className={'h_apartments'}>{isAuthenticated ? 'Пользователь авторизован' : 'Авторизируйтесь'}</h3>
            {!isAuthenticated && <Auth/>}
            <div className={'trending'}>
            {apartments && apartments.map((c, index)=><ApartmentContent
                key={index}
                id={c.id}
                photo={c.photo_rooms.map(x=> x["url"])}
                country={c.country}
                city={c.city}
                region={c.region}
                price={c.price}
                numbers_people={c.numbers_people}
            />)}
            </div>
        </>
    );
}

export default Apartments;

