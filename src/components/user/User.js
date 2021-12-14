import React, {useEffect, useState} from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";

const tokenDecoded = () =>{
    const decoded = jwt_decode(localStorage.getItem("access"));
    return decoded.user_id;
}
function User() {
    const [user, setUser] = useState([]);
    console.log(user);

    const getUser = async () => {
        if (localStorage.getItem('access')) {
            const id = tokenDecoded();
            const res = await axios.get(
            `http://localhost:8000/api/v1/users/${id}`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer" + localStorage.getItem("access")
                }
            });
            setUser(res.data);
        }
    };
    useEffect(() => {
        getUser();
    },[])
    return (
        <div>
            <span className={'pageTitle'}>User</span>
        </div>
    );
}

export default User;