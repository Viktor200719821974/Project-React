import "./Header.css";
import HomeIcon from "@mui/icons-material/Home";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "@mui/material/Button";
import useAuth from "../../hook/useAuth";
import {useHistory} from "react-router";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const Header = () => {
    // const [exit, setExit] = useState(false);
    const auth = useAuth();
    const history = useHistory();

    const onLogOut = () => {
        auth.logOut();
        history.push("/login");
    };
    // const logout = () => {
    //     localStorage.removeItem('access');
    //     localStorage.removeItem('refresh');
    //     setExit(true);
    // }
    return (
        <div className={'header'}>

            {/*<Link to={'/'} className={'registration_link'}>*/}
            {/*    <HomeIcon color="success" />Home Page*/}
            {/*</Link>*/}
            {/*<div >*/}
                <Button color="success" component={Link} to="/" sx={{fontWeight: 'bold', marginTop: 5}}>
                    <HomeIcon color="success" /> Home
                </Button>
            {/*</div>*/}
            <span className={'header_span'} onClick={() => window.scroll(0, 0)}>
                ЗНАЙДИ СОБІ ЖИТЛО
           </span>
            <div className={'header_button'}>
                {/*    (auth.user ? (*/}
                        {auth.isLoaded ? (
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
                        <IconButton aria-label="add an alarm" size="large" sx={{ color: "green" }} onClick={onLogOut}>
                    <LogoutIcon />
                    </IconButton>
                </>
                )}

                            {/*<Button color="inherit" component={Link} to="/profile">*/}
                            {/*    {auth.user.firstName} {auth.user.lastName}*/}
                {/*</Button>*/}
                            {/*<Button color="success" onClick={onLogOut}>*/}
                            {/*    Log out*/}
                            {/*</Button>*/}

                    {/*) : (*/}

                            {/*<Button color="success" component={Link} to="/login">*/}
                            {/*    Login*/}
                            {/*</Button>*/}
                            {/*<Button color="success" component={Link} to="/registration">*/}
                            {/*    Registration*/}
                            {/*</Button>*/}

                    {/*))}*/}
            </div>
        </div>
    );
}

export default Header;