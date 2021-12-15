import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../services/user_service";
import {FETCH_USER} from "../redux/actions/actionTypes";


function User() {
    let {user} = useSelector(state => state);
    let dispatch =  useDispatch();
    // const [user, setUser] = useState([]);

    useEffect(() => {
        getUser().then(value =>  {
            dispatch({type: FETCH_USER, payload: value});
        });
    },[])
    return (
        <div>
            { <button className={'button_apartments'}>Admin</button>}
            { <button className={'button_apartments'}>SuperAdmin</button>}
            {
                user.map((c, index) =>
                        <div key={index}>
                            <span className={'pageTitle'}>{c.email}</span>


                </div>
            )
            }
        </div>
    );
}

export default User;