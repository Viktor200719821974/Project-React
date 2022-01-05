import {Badge} from "@material-ui/core";
import ApartmentModel from '../apartmentModel/ApartmentModel';
import './ApartmentContent.css';
import noPicture from './image/No_Picture.jpg';
import {useEffect, useState} from "react";
import {count} from "../../hook/count";
import api from "../../services/api";

const ApartmentContent = ({id, country, city, region, price, numbers_people, photo}) => {

    const  [comments, setComments] = useState([]);
    const filter = comments.map(comments => comments.rating);
    const rating = count(filter);

    useEffect(async() => {
        try{
            const {data} = await api.auth.getApartment(id);
            setComments(data.comments_apartment);
        }catch (e) {
            console.log(e.message);
        }
    },[])
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