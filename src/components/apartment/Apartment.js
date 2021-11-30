import React from 'react';
import './Apartment.css';

function Apartment({id, photo, city, country, region}) {
    return (
        <div>
            <img className={'poster'}
                 src="http://localhost:8000/media/admin%40gmail.com/photo_rooms/c42b6cfc-4405-11ec-9553-1c7508d2f1da.jfif"
                 alt=""/>
            <span className="subTitle">Country: {country}</span>
            <span className="subTitle">City: {city}</span>
            <span className="subTitle">Region: {region}</span>
        </div>
    );
}

export default Apartment;