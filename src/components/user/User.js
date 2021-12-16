import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../services/user_service";
import {FETCH_USER} from "../redux/actions/actionTypes";
import {tokenRefresh} from "../../services/login_services";
import UserApartmentContent from "./UserApartmentContent";
import UserRating from "./UserRating";


function User() {
    let {user} = useSelector(state => state);
    let dispatch =  useDispatch();
    const [isStaff, setIsStaff] = useState(false);
    const [isSuperUser, setIsSuperUser] = useState(false);
    const [apartment, setApartment] = useState([]);
    const [comments, setComments] = useState([]);
    const [profile, setProfile] = useState([]);
    // console.log(apartment);
    // console.log(user);
    useEffect(() => {
        getUser().then(value =>  {
            if (value.code === 'token_not_valid'){
                tokenRefresh();
            }
            if (value.is_staff === true){
                setIsStaff(true);
            }
            if (value.is_superuser === true){
                setIsSuperUser(true);
            }
            if (value.apartment){
                setApartment(value.apartment);
            }
            if (value.comments_user){
                setComments(value.comments_user);
            }
            if (value.profile){
                setProfile(value.profile);
            }
            dispatch({type: FETCH_USER, payload: value});
        });

    },[])
    return (
        <div>
            {isStaff && <button className={'button_apartments'}>Admin</button>}
            {isSuperUser && <button className={'button_apartments'}>SuperAdmin</button>}
            {user && user.map((c) =>(
                        <div key={c.id + 12}>
                            <span className={'pageTitle'}>{c.email}</span>
                        </div>))}
            <UserRating comments={comments} key={comments.id + 13} profile={profile}/>
            <span className={'pageTitle'}>Ваші квартири:</span>
            <button>Додати квартиру</button>
                            <div className={'trending'}>
                                {apartment && apartment.map((c, index) => <UserApartmentContent
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
            <div>
                <span className={'pageTitle'}>Коментарі:</span>
                {comments && comments.map((c) => <div key={c.id +14}>

                    <span >
                    {c.comments}
                    {c.rating}
                    </span>
                </div>)}
            </div>
                      </div>
                );
}


export default User;