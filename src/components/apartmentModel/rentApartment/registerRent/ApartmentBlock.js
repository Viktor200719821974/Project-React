import React from 'react';

const ApartmentBlock = ({country, city, numbers_people, numbers_rooms, numbers_squares, photo, price, region, name, age,
    surname, phone
}) => {
    return (
        <div className={'div_ApartmentBlock_main'}>
            <div>
                <img className={'img_ApartmentBlock'} src={photo} alt="photo_room"/>
            </div>
            <div className={'div_ApartmentBlock_li'}>
                <li>Country: {country}</li>
                <li> City: {city}</li>
                <li>Region: {region}</li>
                <li>Numbers of people: {numbers_people}</li>
                <li> Numbers of rooms: {numbers_rooms}</li>
                <li>Numbers of squares: {numbers_squares}</li>
                <li>Price: {price}</li>
                <div>
                    <h3>Information of user:</h3>
                    <li>Name: {name}</li>
                    <li>Surname: {surname}</li>
                    <li>Age: {age}</li>
                    <li>Phone: {phone}</li>
                </div>
            </div>

        </div>
    );
};

export default ApartmentBlock;