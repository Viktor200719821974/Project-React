import React, {useEffect, useState} from 'react';
import {getApartments} from "../../services/apartment_service";
import Auth from "../auth/Auth";
import '../auth/Auth.css';
import ApartmentContent from "../apartmentContent/ApartmentContent";
import jwt_decode from 'jwt-decode';
import {axiosUser, getUser} from "../../services/user_service";

const tokenDecoded = () =>{
    const decoded = jwt_decode(localStorage.getItem("access"));
    console.log(decoded);
    return decoded.user_id;
}

function Apartments() {
    const [apartments, setApartments] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [userId, setUserId] = useState();
    // const [user, setUser] = useState([]);
    // console.log(user);

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

    useEffect(()=>{
        (async () =>{
            if (localStorage.getItem('access')){
                const id = tokenDecoded();
                console.log(id);
                const res = await axiosUser(`/${id}`);
                console.log(res);
            }
        })();
    },[]);
    // useEffect(() => {
    //     if (localStorage.getItem('access')){
    //         const id = tokenDecoded();
    //         console.log(id);
    //         const c = getUser(id).then(value => setUser(value.data))
    //
    //     }
    // },[])

    if (loading){
        return <div>Loading...</div>
    }
    function userList(e) {
        e.preventDefault();
        // return <User/>
    }

    return (
        <>
            {!isAuthenticated && <span className={'pageTitle'}>Apartments</span>}
            <div className={'div_apartments'}>
            <h3 className={'h_apartments'}>{isAuthenticated ? 'Aвторизований'  : 'Авторизуйтесь'}</h3>
                {isAuthenticated && <button className={'button_apartments'} onClick={userList}>User</button>}
                {isAuthenticated && <button className={'button_apartments'}>Admin</button>}
                {isAuthenticated && <button className={'button_apartments'}>SuperAdmin</button>}
             </div>
            {!isAuthenticated && <Auth key={apartments.id}/> }
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

