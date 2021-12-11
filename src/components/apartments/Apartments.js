import React, {useEffect, useState} from 'react';
import {getApartments} from "../../services/apartment_service";
import Auth from "../auth/Auth";
import '../auth/Auth.css';
import ApartmentContent from "../apartmentContent/ApartmentContent";
import jwt_decode from 'jwt-decode';
import {getUser} from "../../services/user_service";


function Apartments() {
    const [apartments, setApartments] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState();
    console.log(userId)
    const [user, setUser] = useState([]);
    console.log(user);

    useEffect(()=> {
        setLoading(true);
       getApartments().then(value => setApartments(value.data))
        setLoading(false);
    },[])

    useEffect(()=> {
        setLoading(true);
        if (localStorage.getItem('access')){
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, [])

    useEffect(() =>{
        if (isAuthenticated){
            const decoded = jwt_decode(localStorage.getItem("access"));
            console.log(decoded)
            setUserId(decoded.user_id);
        }
    },[])

    useEffect(() => {
        const c = getUser(userId).then(value => setUser(value.data))
        console.log(c);
    },[])

    if (loading){
        return <div>Loading...</div>
    }
    function userList(e) {
        e.preventDefault();
        // return <User/>
    }

    return (
        <>
            <span className={'pageTitle'}>Apartments</span>
            <div className={'div_apartments'}>
            <h3 className={'h_apartments'}>{isAuthenticated ? 'Aвторизований'  : 'Авторизуйтесь'}</h3>
                {isAuthenticated && <button className={'button_apartments'} onClick={userList}>User</button>}
                {isAuthenticated && <button className={'button_apartments'}>Admin</button>}
                {isAuthenticated && <button className={'button_apartments'}>SuperAdmin</button>}
             </div>
            {!isAuthenticated && <Auth/> }
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

