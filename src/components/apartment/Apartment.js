import React from 'react';
import './Apartment.css';

function Apartment({id, photo, city, country, region}) {
    return (
        <div>

            <img className={'poster'}
                 src="http://localhost:8000/media/vik200719821974@gmail.com/photo_rooms/0709715a-5367-11ec-a58f-1c7508d2f1da.png"
                 alt="photo"/>
            <span className="subTitle">Country: {country}</span>
            <span className="subTitle">City: {city}</span>
            <span className="subTitle">Region: {region}</span>
        </div>
    );
}

export default Apartment;