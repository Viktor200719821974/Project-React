import {Badge} from "@material-ui/core";
import ApartmentModel from '../apartmentModel/ApartmentModel';
import './ApartmentContent.css';
import noPicture from './image/No_Picture.jpg';
import {Link} from 'react-router-dom';

const ApartmentContent = ({id, country, city, region, price, numbers_people, photo}) => {

    return (
        <>
            <ApartmentModel  id={id} key={id} photo={photo}>

            {/*<Link to={'/apartment'}>*/}
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
            {/*</Link>*/}
        </ApartmentModel>
        </>
    )
}
export default ApartmentContent;