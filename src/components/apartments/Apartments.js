import React, {useEffect, useState} from 'react';
import {getApartments} from "../../services/apartment_service";
import Auth from "../auth/Auth";
import '../auth/Auth.css';
import ApartmentContent from "../apartmentContent/ApartmentContent";
import User from "../user/User";


function Apartments() {
    const [apartments, setApartments] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        if (localStorage.getItem('access')){
            setIsAuthenticated(true);
        }
    }, [])

    useEffect(()=> {
        setLoading(true);
        getApartments().then(value => setApartments(value.data))
        setLoading(false);
    },[])

    if (loading){
        return <div>Loading...</div>
    }
   const userList = (e) => {
        e.preventDefault();
        return <User/>
    }

    return (
        <>
            {!isAuthenticated && <span className={'pageTitle'}>Apartments</span>}
            <div className={'div_apartments'}>
            <h3 className={'h_apartments'}>{isAuthenticated ? 'Aвторизований'  : 'Авторизуйтесь'}</h3>
                {isAuthenticated && <button className={'button_apartments'} onClick={userList}>User</button>}
             </div>
            {!isAuthenticated && <Auth key={apartments.id + 8} id={apartments.id}/> }
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

