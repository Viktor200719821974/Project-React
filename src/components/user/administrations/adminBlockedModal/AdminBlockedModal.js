import React, {useEffect, useState} from 'react';
import "../../User.css";
import {makeStyles} from "@material-ui/styles";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import api from "../../../../services/api";
import Button from "@mui/material/Button";
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import useAuth from "../../../../hook/useAuth";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: "90%",
        height: "80%",
        padding: "20px",
        backgroundColor: "#39445a",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
    },
}));

const AdminBlockedModal = ({id, children, statusResponse, setStatusResponse}) => {
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
    const handleBlocked = async (e) => {
        e.preventDefault();
        try{
            const res = await api.auth.getUserBlocked(id);
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
    const handleActivate = async (e) => {
        e.preventDefault();
        try{
        const res = await api.auth.getUserActivate(id);
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
        async function fetchData(){
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
    },[statusResponse, id])
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
                                <Button onClick={handleBlocked} variant="outlined" color="success" startIcon={<BlockIcon/> }
                                        sx={{fontWeight:800, margin: '60px 0 0 10px'}}>Blocked user </Button>
                                <Button onClick={handleActivate} variant="outlined" color="success" startIcon={<CheckCircleOutlineIcon/> }
                                        sx={{fontWeight:800, margin: '60px 0 0 10px'}}>Activate user </Button>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>
        </div>
    );
};

export default AdminBlockedModal;