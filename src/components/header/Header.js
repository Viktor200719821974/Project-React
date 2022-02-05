import "./Header.css";
import HomeIcon from "@mui/icons-material/Home";
import {Link, useHistory} from "react-router-dom";
import React from "react";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "@mui/material/Button";
import useAuth from "../../hook/useAuth";
// import {useNavigate} from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const Header = () => {
    const auth = useAuth();
    // const navigate = useNavigate();
    const history = useHistory();
    const onLogOut = () => {
        auth.logOut();
        // navigate("/login");
        history.push('/');
    };
    return (
        <div className={'header'}>
                <Button color="success" component={Link} to="/" sx={{fontWeight: 'bold', marginTop: 5}}>
                    <HomeIcon color="success" /> Home
                </Button>
            {auth.isLoaded && <Button color="success" component={Link} to="/user" sx={{fontWeight: 'bold', marginTop: 5}}>
                 My page
            </Button>}
            <span className={'header_span'} onClick={() => window.scroll(0, 0)}>
                ЗНАЙДИ СОБІ ЖИТЛО
           </span>
            <div className={'header_button'}>
                        {!auth.isLoaded ? (
                            <>
                    <IconButton aria-label="add an alarm" size="large" sx={{ color: "green" }} component={Link} to="/login">
                        <LoginIcon />
                    </IconButton>
                            <IconButton aria-label="add an alarm" size="large" sx={{ color: "green" }} component={Link} to="/registration">
                        <AppRegistrationIcon />
                    </IconButton>
                            </>
                )
                    : (
                <>

                    <div className={'div_name'}>{auth.user?.profile.name}
                    <IconButton aria-label="add an alarm" size="large" sx={{ color: "green" }} onClick={onLogOut}>
                    <LogoutIcon />
                    </IconButton></div>
                </>
                )}
            </div>
        </div>
    );
}

export default Header;