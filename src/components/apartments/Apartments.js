import React, {useEffect, useState} from 'react';
import {getApartments} from "../../services/apartment_service";
import Auth from "../auth/Auth";
import '../auth/Auth.css';
import ApartmentContent from "../apartmentContent/ApartmentContent";

function Apartments(props) {
    const [apartments, setApartments] = useState([]);
    const [photo, setPhoto] = useState([]);
    console.log(photo);
    useEffect(()=> {
       getApartments().then(value => setApartments(value.data))
       //  getApartments().then(value => setPhoto(value.data.photo_rooms))
    },[])
    useEffect(()=> {
        // getApartments().then(value => setApartments(value.data))
         getApartments().then(value => setPhoto(value.data.photo_rooms))
    },[])

    return (
        <>
            <Auth/>
            <div className={'trending'}>
            {apartments && apartments.map((c)=><ApartmentContent
                key={c.id}
                id={c.id}
                photo={c.photo_rooms.map(x=> x["url"])}
                country={c.country}
                city={c.city}
                region={c.region}
                price={c.price}
                numbers_people={c.numbers_people}
            />)}
            {/*{photo && photo.map((c, index)=><ApartmentContent key={index} photo={c.url}/>)}*/}
            </div>
        </>
    );
}

export default Apartments;

