import {Badge} from "@material-ui/core";
import '../apartmentContent/ApartmentContent.css';
import noPicture from '../apartmentContent/image/No_Picture.jpg';
import UserApartmentModel from "./UserApartmentModel";

const UserApartmentContent = ({id, country, city, region, price, numbers_people, photo}) => {

    return (
        <>
            <UserApartmentModel  id={id} key={id} photo={photo}>
                {/*<Badge badgeContent={vote_average} color={vote_average >6 ? "primary" : "secondary"}/>*/}
                <img className={'poster'} src={photo[0] || noPicture}
                     alt={'photo_rooms'}/>
                <b className={'title'}>Country: {country}</b>

                <span className="subTitle">City: {city}
                    <span className="subTitle">Region: {region}</span>
            </span>
                <span className="subTitle">Price: {price}
                    <span className="subTitle">Number of people: {numbers_people}</span>
            </span>
            </UserApartmentModel>
        </>
    )
}
export default UserApartmentContent;