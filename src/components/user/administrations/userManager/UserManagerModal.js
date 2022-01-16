import React, {useEffect, useState} from 'react';
import "../../User.css";
import {makeStyles} from "@material-ui/styles";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import api from "../../../../services/api";
import Button from "@mui/material/Button";
import BlockIcon from '@mui/icons-material/Block';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import useAuth from "../../../../hook/useAuth";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        boxSizing: "border-box",
        margin: "60px auto auto auto",
        width: 800,
    },
    paper: {
        width: "90%",
        height: "85%",
        padding: "10px 30px",
        backgroundColor: "#39445a",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
    },
}));

const UserManagerModal = ({id, children, setStatusResponse}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const auth = useAuth();

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };
    const handleUserNoManager = async (e) => {
        e.preventDefault();
        try{
            const res = await api.auth.changeUserNoManager(id);
            if (res.status === 200){
                setStatusResponse(true);
            }
        }catch (e) {
            if (e.response.status === 401){
                auth.setRefreshToken(true);
            }
            console.log(e.message);
        }
    }
    const handleUserManager = async (e) => {
        e.preventDefault();
        try{
            const res = await api.auth.changeUserManager(id);
            if (res.status === 200){
                setStatusResponse(true);
            }
        }catch (e) {
            if (e.response.status === 401){
                auth.setRefreshToken(true);
            }
            console.log(e.message);
        }
    }
    useEffect( () => {
        async function fetchData (){
        try{
            const res = await api.auth.getUser(id);
            setUser(res.data);
            setProfile(res.data.profile);
        }catch (e){
            if (e.response.status === 401){
                auth.setRefreshToken(true);
            }
            console.log(e.message);
        }
    }
    fetchData();
    },[id, auth])

    return (
        <div>
            <div className={'media'} onClick={handleOpen}>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {user &&  (
                        <div className={classes.paper}>
                            <b className={'AdminModal_title'}>Email: {user.email}</b>
                            <span className="AdminModal_subTitle">Date create: {user.created_at} </span>
                            <span className="AdminModal_subTitle">Date update: {user.updated_at}</span>
                            <span className="AdminModal_subTitle">Active: {user.is_active ? 'Yes' : 'No'} </span>
                            <span className="AdminModal_subTitle">Admin: {user.is_staff ? 'Yes' : 'No'}</span>
                            <span className={'AdminModal_subTitle'}>Super Admin: {user.is_superuser ? 'Yes' : 'No'}</span>
                            {profile && (<div>
                                <b className={'AdminModal_title'}>Profile:</b>
                                <span className="AdminModal_subTitle">Name: {profile.name} </span>
                                <span className="AdminModal_subTitle">Surname: {profile.surname} </span>
                                <span className="AdminModal_subTitle">Age: {profile.age} </span>
                                <span className="AdminModal_subTitle">Phone: {profile.phone} </span>
                            </div>  )}
                            <div>
                                <Button onClick={handleUserNoManager} variant="outlined" color="success"
                                        startIcon={<BlockIcon/> }
                                        sx={{fontWeight:800, margin: '60px 0 0 10px'}}>User not manager </Button>
                                <Button onClick={handleUserManager} variant="outlined" color="success"
                                        startIcon={<AdminPanelSettingsIcon/> }
                                        sx={{fontWeight:800, margin: '60px 0 0 10px'}}>User Manager </Button>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>
        </div>
    );
};

export default UserManagerModal;
