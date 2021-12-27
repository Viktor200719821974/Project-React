import React, {useEffect, useState} from 'react';
import {getApartments} from "../../services/apartment_service";
import ApartmentContent from "../apartmentContent/ApartmentContent";
import CustomPagination from "../pagination/CustomPagination";
import "./Apartments.css";

function Apartments() {
    const [apartments, setApartments] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();

    const accessToken = localStorage.getItem('access');

    useEffect(()=> {
        if (accessToken){
            setIsAuthenticated(true);
        }
    }, [setIsAuthenticated])

    useEffect(()=> {
        setLoading(true);
        getApartments(page).then(value => {
            console.log(value);
            setApartments(value.data);
            setNumOfPages(value.total_pages);
        });

        setLoading(false);
    },[page])

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

