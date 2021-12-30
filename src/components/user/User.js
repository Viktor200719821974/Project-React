import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../services/user_service";
import {FETCH_USER} from "../redux/actions/actionTypes";
import {tokenRefresh} from "../../services/login_services";
import UserApartmentContent from "./UserApartmentContent";
import UserRating from "./UserRating";
import AddApartmentModal from "./addApartment/AddApartmentModal";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

function User() {
    let {user} = useSelector(state => state);
    let dispatch =  useDispatch();
    const [isStaff, setIsStaff] = useState(false);
    const [isSuperUser, setIsSuperUser] = useState(false);
    const [apartment, setApartment] = useState([]);
    const [comments, setComments] = useState([]);
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        getUser().then(value =>  {
            if (value.code === 'token_not_valid'){
                const refresh = tokenRefresh();
                console.log(refresh);
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
            {isStaff && <Button component={Link} to="/admin" variant="outlined" color="success" startIcon={<AdminPanelSettingsIcon /> }
                                sx={{fontWeight:800, margin: '10px 0 0 10px', float: 'right'}}>Admin</Button>}
            {isSuperUser && <Button component={Link} to="/superAdmin" variant="outlined" color="success" startIcon={<SupervisorAccountIcon /> }
                sx={{fontWeight:800, float: 'right', margin: '10px 0 0 10px'}}>SuperAdmin</Button>}
            <span className={'pageTitle'}>Ваші квартири:</span>
                            <div className={'trending'}>
                                {apartment && apartment.map((c) => <UserApartmentContent
                                    key={c.id + 600}
                                    id={c.id}
                                    photo={c.photo_rooms.map(x=> x["url"])}
                                    country={c.country}
                                    city={c.city}
                                    region={c.region}
                                    price={c.price}
                                    numbers_people={c.numbers_people}
                                />)}
                            </div>
            {user && user.map(c => <div key={c.id + 1000} className={'div_add_modal'}>
                <div className={'user_rating'}>
                <UserRating comments={comments} key={c.id + 800} profile={profile}/>
            </div>
                <AddApartmentModal key={c.id + 700} id={c.id}/>
            </div>)}

            <div>
                <span className={'pageTitle'}>Коментарі:</span>
                {comments && comments.map((c) => <div key={c.id +900}>
                    <div >
                        {c.user_name}
                    </div>
                        <div>
                            {c.comments}
                        </div>
                   <div>
                       {c.rating}
                   </div>


                </div>)}
            </div>
                      </div>
                );
}


export default User;