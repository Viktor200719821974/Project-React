import {Badge} from "@material-ui/core";
import ApartmentModel from '../apartmentModel/ApartmentModel';
import './ApartmentContent.css';
import noPicture from './image/No_Picture.jpg';
import {useEffect, useState} from "react";
import {count} from "../../hook/count";
import api from "../../services/api";
import useAuth from "../../hook/useAuth";

const ApartmentContent = ({id, country, city, region, price, numbers_people, photo}) => {

    const  [comments, setComments] = useState([]);
    const filter = comments.map(comments => comments.rating);
    const auth = useAuth();
    const rating = count(filter);

    useEffect(() => {
        async function fetchData(){
        try{
            const {data} = await api.auth.getApartment(id);
            setComments(data.comments_apartment);
        }catch (e) {
            if (e.response.status === 401){
                auth.setRefreshToken(true);
            }
            console.log(e.message);
        }
        }
        fetchData();
    },[id])
    return (
        <>
            <ApartmentModel  id={id} key={id} photo={photo} rating={rating}>

                <Badge badgeContent={rating} color={rating > 6 ? "primary" : "secondary"}/>
                <img className={'poster'} src={photo[0] || noPicture}
                alt={'photo_rooms'}/>
                <b className={'title'}>Country: {country}</b>
                <span className="subTitle">City: {city}
                    <span className="subTitle">Region: {region}</span>
            </span>
                <span className="subTitle">Price: {price}
                    <span className="subTitle">Number of people: {numbers_people}</span>
            </span>
        </ApartmentModel>
        </>
    )
}
export default ApartmentContent;