import React, {useEffect, useState} from 'react';
import "./User.css";
import UserApartmentContent from "./UserApartmentContent";
import UserRating from "./UserRating";
import AddApartmentModal from "./addApartment/AddApartmentModal";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import api from "../../services/api";
import {tokenDecoded} from "../../hook/token_user_id";
import {refreshToken} from "../../hook/refresh_token";
import useAuth from "../../hook/useAuth";

function User() {
    const [user, setUser] = useState({});
    const [isStaff, setIsStaff] = useState(false);
    const [isSuperUser, setIsSuperUser] = useState(false);
    const [apartment, setApartment] = useState([]);
    const [comments, setComments] = useState([]);
    const [profile, setProfile] = useState([]);
    const [statusResponse, setStatusResponse] = useState(false);
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const token = localStorage.getItem('access');

    useEffect( async() => {
        setLoading(true);
        try{
        const id = tokenDecoded(token);
        const res = await api.auth.getUser(id);
        setComments(res.data.comments_user);
        setApartment(res.data.apartment);
        setProfile(res.data.profile);
        setUser(res.data);
        // console.log(res.status);
        if (statusResponse){
            setStatusResponse(false);
        }
        if (res.data.is_staff === true){
            setIsStaff(true);
        }
        if (res.data.is_superuser === true){
            setIsSuperUser(true);
        }
    }catch (e) {
            if (e.request.status === 401){
                const refreshToken = localStorage.getItem('refresh');
                let data = {['refresh']: refreshToken};
                try{
                    const token = await api.auth.refresh(data);
                    if (token.status === 200){
                        auth.setToken(token.data);
                    }
                    console.log(token.status);
                }catch (e) {
                    console.log(e.message);
                }
            }
            console.log(e.request.status);
        }
        setLoading(false);
    },[statusResponse])

    if (loading){
        return <div>Loading...</div>
    }
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
                                    setStatusResponse={setStatusResponse}
                                    statusResponse={statusResponse}
                                />)}
                            </div>
            {user && (<div key={user.id + 1000} className={'div_add_modal'}>
                <div className={'user_rating'}>
                <UserRating comments={comments} key={user.id + 800} profile={profile}/>
            </div>
                <AddApartmentModal key={user.id + 700} id={user.id} statusResponse={statusResponse}
                                   setStatusResponse={setStatusResponse}/>
            </div>)}

            <div>
                <span className={'pageTitle'}>Коментарі:</span>
                {comments && comments.map((c) => <div key={c.id +900}>
                   <div className={'div_comments_user_main'}>
                       <div className={'div_comments_user_name'}>
                           {c.user_name}
                       </div>

                        <div className={'div_comments_user'}>
                            {c.comments}
                            <div className={'div_comments_user_rating'}>
                             Rating: {c.rating}
                            </div>
                        </div>
                   </div>
                </div>)}
            </div>
        </div>
                );
}

export default User;