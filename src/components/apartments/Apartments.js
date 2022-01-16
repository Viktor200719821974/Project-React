import React, {useEffect, useState} from 'react';
import {getApartments} from "../../services/apartment_service";
import ApartmentContent from "../apartmentContent/ApartmentContent";
import CustomPagination from "../pagination/CustomPagination";
import "./Apartments.css";
import FiltersModal from "../filters/FiltersModal";
import ClearIcon from '@mui/icons-material/Clear';
import Button from "@mui/material/Button";
import useAuth from "../../hook/useAuth";

function Apartments() {
    const [apartments, setApartments] = useState([]);
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
    const [filtersBlock, setFilterBlock] = useState(false);
    const auth = useAuth();

    const delFilters = () => {
        setCountry('');
        setCountryValue('');
        setCity('');
        setCityValue('');
        setRegion('');
        setRegionValue('');
        setNumbersPeople('');
        setNumbersPeopleValue('');
        setNumbersRooms('');
        setNumbersRoomsValue('');
        setNumbersSquares('');
        setNumbersSquaresValue('');
        setPrice('');
        setPriceValue('');
        setFilterBlock(false);
    }
    useEffect(()=> {
        if (countryValue || cityValue || regionValue || numbersPeopleValue || numbersRoomsValue || numbersSquaresValue
            || priceValue ){
            setFilterBlock(true);
        }
    }, [countryValue, cityValue, regionValue, numbersPeopleValue, numbersRoomsValue, numbersSquaresValue, priceValue])

    useEffect(()=> {
        setLoading(true);
        try{
        getApartments(
            page, countryValue, country, city, cityValue, region, regionValue, numbers_people, numbersPeopleValue,
            numbers_rooms, numbersRoomsValue, numbers_squares, numbersSquaresValue, price, priceValue
        ).then(value => {
            setApartments(value.data);
            setNumOfPages(value.total_pages);
        });
        }catch (e){
            if (e.response.status === 401){
                auth.setRefreshToken(true);
            }
            console.log(e.message);
        }
        setLoading(false);
    },[page, country, countryValue, city, cityValue, region, regionValue, numbers_people, numbersPeopleValue,
        numbers_rooms, numbersRoomsValue, numbers_squares, numbersSquaresValue, price, priceValue, auth])
    if(apartments?.length === 0 || undefined){
        return filtersBlock && <div>
            <Button onClick={delFilters} variant="outlined" color="success" startIcon={<ClearIcon/> }
                    sx={{fontWeight:800, marginTop: '20px'}}>
                Очистити фільтр
            </Button>
            <div className={'div_notFound'}>Not found</div>
        </div>
    }
    if (loading){
        return <div>Loading...</div>
    }
    return (
        <>
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
                          setFilterBlock={setFilterBlock}
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
            />)}
            </div>
            {/*<div className={'pagination'}>*/}
            {numOfPages > 1 && <CustomPagination setPage={setPage} numOfPages={numOfPages}/>}
            {/*</div>*/}
        </>
    );
}

export default Apartments;

