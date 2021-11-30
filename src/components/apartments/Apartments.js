import React, {useEffect, useState} from 'react';
import Apartment from "../apartment/Apartment";

function Apartments(props) {
    const [apartments, setApartments] = useState([]);
    const [photo, setPhoto] = useState([]);
    console.log(apartments, photo)
    useEffect(()=> {
       fetch('http://localhost:8000/api/v1/apartments').then(value => value.json()).then(value => setApartments(value.data))
        fetch('http://localhost:8000/api/v1/apartments').then(value => value.json()).then(value =>setPhoto(value.data.photo_rooms))

    },[])
    return (
        <>
        <div className={'trending'}>
            {apartments && apartments.map((c)=><Apartment
                key={c.id}
                id={c.id}
                country={c.country}
                city={c.city}
                region={c.region}
            />)}
       </div>
            <div>
                {photo && photo.map((b, index)=><Apartment key={index} photo={b[0].url}/>)}
            </div>
        </>
    );
}

export default Apartments;