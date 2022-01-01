import {Badge} from "@material-ui/core";
import ApartmentModel from '../apartmentModel/ApartmentModel';
import './ApartmentContent.css';
import noPicture from './image/No_Picture.jpg';
import {useEffect, useState} from "react";
import {commentsApartmentServices} from "../../services/commentsApartment_services";
import {count} from "../../hook/count";

const ApartmentContent = ({id, country, city, region, price, numbers_people, photo, isAuthenticated}) => {

    const  [comments, setComments] = useState([]);
    const [noRating, setNoRating] = useState(false);

    const filter = comments.filter(comments => comments.apartment === id).map(x=> x["rating"]);
    const rating = count(filter);

    useEffect(() => {
        commentsApartmentServices().then(value => setComments(value.data));
    },[])



    useEffect(() => {
        if(filter){
            setNoRating(true);
        }
    },[])
    return (
        <>
            <ApartmentModel  id={id} key={id} photo={photo} isAuthenticated={isAuthenticated}>

                {noRating && <Badge badgeContent={rating} color={rating > 6 ? "primary" : "secondary"}/>}
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