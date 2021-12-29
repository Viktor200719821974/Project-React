import React, {useEffect, useState} from 'react';
import {getApartments} from "../../services/apartment_service";
import ApartmentContent from "../apartmentContent/ApartmentContent";
import CustomPagination from "../pagination/CustomPagination";
import "./Apartments.css";
import FiltersModal from "../filters/FiltersModal";

function Apartments() {
    const [apartments, setApartments] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();
    const [country, setCountry] = useState('');
    const [countryValue, setCountryValue] = useState('');
    const [city, setCity] = useState('');
    const [cityValue, setCityValue] = useState('');
    const [region, setRegion] = useState('');
    const [regionValue, setRegionValue] = useState('');
    const [numbers_people,setNumbersPeople] = useState('');
    const [numbersPeopleValue, setNumbersPeopleValue] = useState('');
    const [numbers_rooms, setNumbersRooms] = useState('');
    const [numbersRoomsValue, setNumbersRoomsValue] = useState('');
    const [numbers_squares, setNumbersSquares] = useState('');
    const [numbersSquaresValue, setNumbersSquaresValue] = useState('');
    const [price, setPrice] = useState('');
    const [priceValue, setPriceValue] = useState('');

    const accessToken = localStorage.getItem('access');

    useEffect(()=> {
        if (accessToken){
            setIsAuthenticated(true);
        }
    }, [setIsAuthenticated])

    useEffect(()=> {
        setLoading(true);
        try{
        getApartments(
            page, countryValue, country, city, cityValue, region, regionValue, numbers_people, numbersPeopleValue,
            numbers_rooms, numbersRoomsValue, numbers_squares, numbersSquaresValue, price, priceValue
        ).then(value => {
            setApartments(value.data);
            setNumOfPages(value.total_pages);
            // if (value.data.length === 0){
            //     return <div>Not found</div>
            // }
            console.log(value);
        });
        }catch (e){
            console.log(e);
        }
        setLoading(false);
    },[page, country, countryValue, city, cityValue, region, regionValue, numbers_people, numbersPeopleValue,
        numbers_rooms, numbersRoomsValue, numbers_squares, numbersSquaresValue, price, priceValue
    ])

    if (loading){
        return <div>Loading...</div>
    }

    return (
        <>
            {/*{!isAuthenticated && <span className={'pageTitle'}>Apartments</span>}*/}
            {/*<div className={'div_apartments'}>*/}
            {/*<h3 className={'h_apartments'}>{isAuthenticated ? 'Aвторизований'  : 'Авторизуйтесь'}</h3>*/}
            {/*    {isAuthenticated && <button className={'button_apartments'} onClick={userList}>User</button>}*/}
             {/*</div>*/}
            {/*{!isAuthenticated && <Auth key={apartments.id + 8} id={apartments.id}/> }*/}
            <FiltersModal setCountryValue={setCountryValue}
                          setCountry={setCountry}
                          country={country}
                          setCityValue={setCityValue}
                          setCity={setCity}
                          city={city}
                          setNumbersPeopleValue={setNumbersPeopleValue}
                          numbers_people={numbers_people}
                          setNumbersPeople={setNumbersPeople}
                          region={region}
                          setRegion={setRegion}
                          setRegionValue={setRegionValue}
                          numbers_rooms={numbers_rooms}
                          setNumbersRooms={setNumbersRooms}
                          setNumbersRoomsValue={setNumbersRoomsValue}
                          numbers_squares={numbers_squares}
                          setNumbersSquares={setNumbersSquares}
                          setNumbersSquaresValue={setNumbersSquaresValue}
                          price={price}
                          setPrice={setPrice}
                          setPriceValue={setPriceValue}
            />
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
                isAuthenticated={isAuthenticated}
            />)}
            </div>
            {/*<div className={'pagination'}>*/}
            {numOfPages > 1 && <CustomPagination setPage={setPage} numOfPages={numOfPages}/>}
            {/*</div>*/}
        </>
    );
}

export default Apartments;

