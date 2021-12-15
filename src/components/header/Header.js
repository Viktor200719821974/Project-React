import "./Header.css";
import HomeIcon from "@mui/icons-material/Home";
import {Link} from "react-router-dom";
import React from "react";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Apartments from "../apartments/Apartments";

const Header = () => {

    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        // return <Apartments/>
    }
    return (
        <div className={'header'}>

            <Link to={'/'} className={'registration_link'}>
                <HomeIcon color="success" />Home Page
            </Link>

            <span className={'header_span'} onClick={() => window.scroll(0, 0)}>

                ЗНАЙДИ СОБІ ЖИТЛО
                {/*<img className={'img_header'} src={} alt="videoCamera"/>*/}
           </span>
            <div className={'header_button'}>
                <IconButton aria-label="add an alarm" size="large" sx={{ color: "white" }} onClick={logout}>
                    <LogoutIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default Header;