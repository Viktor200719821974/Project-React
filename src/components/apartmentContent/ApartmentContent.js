import {Badge} from "@material-ui/core";
import ApartmentModel from '../apartmentModel/ApartmentModel';
import './ApartmentContent.css';

const ApartmentContent = ({id, country, city, region, price, numbers_people, photo:{url}}) => {
    console.log(url);
    return (
        <>
            <ApartmentModel  id={id} key={id}>

                {/*<Badge badgeContent={vote_average} color={vote_average >6 ? "primary" : "secondary"}/>*/}
                <img className={'poster'} src="http://localhost:8000/media/vik200719821974@gmail.com/photo_rooms/0709715a-5367-11ec-a58f-1c7508d2f1da.png"
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