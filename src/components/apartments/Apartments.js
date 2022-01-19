import React, {useEffect, useState} from 'react';
import {getApartments} from "../../services/apartment_service";
import ApartmentContent from "../apartmentContent/ApartmentContent";
import CustomPagination from "../pagination/CustomPagination";
import "./Apartments.css";
import FiltersModal from "../filters/FiltersModal";
import ClearIcon from '@mui/icons-material/Clear';
import Button from "@mui/material/Button";

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
    const [filterBlock, setFilterBlock] = useState(false);
    // const [noFilters, setNoFilters] = useState(false);
    const [noApartments, setNoApartments] = useState(false);
    console.log(filterBlock);
    console.log(noApartments);
    // console.log(city, cityValue);
    // console.log(page, noFilters);
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
    // useEffect(()=> {
    //     if (countryValue || cityValue || regionValue || numbersPeopleValue || numbersRoomsValue || numbersSquaresValue
    //         || priceValue ){
    //         setFilterBlock(true);
    //     }
    //     if(apartments.length === 0 || undefined){
    //         setNoApartments(true);
    //         console.log(apartments.length);
    //     }
    //
    // }, [countryValue, cityValue, regionValue, numbersPeopleValue, numbersRoomsValue, numbersSquaresValue,
    //     priceValue, filterBlock, noApartments])

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
            if(apartments?.length === 0 || undefined){
                setNoApartments(true);
            }
            if (countryValue || cityValue || regionValue || numbersPeopleValue || numbersRoomsValue || numbersSquaresValue
                || priceValue ){
                setFilterBlock(true);
            }
        }catch (e){
            console.log(e.message);
        }
        setLoading(false);
    },[page, country, countryValue, city, cityValue, region, regionValue, numbers_people, numbersPeopleValue,
        numbers_rooms, numbersRoomsValue, numbers_squares, numbersSquaresValue, price, priceValue, noApartments, filterBlock])

    // if(apartments?.length === 0 || undefined){
    //     return filterBlock && <div>
    //         <Button onClick={delFilters} variant="outlined" color="success" startIcon={<ClearIcon/> }
    //                 sx={{fontWeight:800, marginTop: '20px'}}>
    //             Очистити фільтр
    //         </Button>
    //         <div className={'div_notFound'}>Not found</div>
    //     </div>
    // }
    if (loading){
        return <div>Loading...</div>
    }
    return (
        <>
            <div className={'Apartments_div_filters_modal'}>
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
                          filterBlock={filterBlock}
                          delFilters={delFilters}

            />
                {filterBlock && <div>
                    <Button onClick={delFilters} variant="outlined" color="success" startIcon={<ClearIcon/> }
                            sx={{fontWeight:800, marginLeft: "10px"}}>
                        Очистити фільтр
                    </Button>
                </div>}
            </div>
            {noApartments && filterBlock && <div className={'div_notFound'}>Not found</div>}
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

