import React, {useEffect, useState} from 'react';
import Apartment from "../apartment/Apartment";
import {getApartments} from "../../services/apartment_service";
import Auth from "../auth/Auth";

function Apartments(props) {
    const [apartments, setApartments] = useState([]);
    // const [photo, setPhoto] = useState([]);

    useEffect(()=> {
       getApartments().then(value => setApartments(value.data))

    },[])
    return (
        <>
            <Auth/>
        <div className={'trending'}>
            {apartments && apartments.map((c)=><Apartment
                key={c.id}
                id={c.id}
                photo={c.photo_rooms}
                country={c.country}
                city={c.city}
                region={c.region}
            />)}
       </div>
            {/*<div>*/}
            {/*    {photo && photo.map((b, index)=><Apartment key={index} photo={b[0].url}/>)}*/}
            {/*</div>*/}
        </>
    );
}

export default Apartments;