import React, {useEffect, useState} from 'react';
import "../User.css";
import {makeStyles} from "@material-ui/styles";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import api from "../../../services/api";
import Button from "@mui/material/Button";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "600px",
        height: "300px",
        margin: "auto",
    },
    paper: {
        width: "90%",
        height: "90%",
        padding: "20px",
        backgroundColor: "#39445a",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
    },
}));

const UserCommentsApartmentsModal = ({id, children, user_emailDate, comments}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState([]);
    const [error, setError] = useState();
    const [deleteStatus, setDeleteStatus] = useState(false);
    const [changeStatus, setChangeStatus] = useState(false);

    const filterComments = comments.filter(c => c.user_email === user_emailDate);
    console.log(filterComments);
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };
    const handleDeletedComment = async (e) => {
        e.preventDefault();
        try{
            const res = await api.auth.deleteCommentApartment(id);
            if (res.status === 204){
                setDeleteStatus(true);
            }
        }catch (e) {
            if (e.response.status){
                setError(e.response.statusText);
            }
        }
    }

    // useEffect(async () => {
    //     try{
    //         const res = await api.auth.getCommentApartments(id);
    //         setComment(res.data);
    //     }catch (e){
    //         console.log(e.message);
    //     }
    // },[])

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
                // BackdropComponent={Backdrop}
                // BackdropProps={{
                //     timeout: 500,
                // }}
            >
                <Fade in={open}>
                    {filterComments &&  (
                        <div className={classes.paper}>
                            {error && <Alert severity="error">
                                <strong>{error}</strong>
                            </Alert>}
                            {filterComments.map((c, index) =>
                                <div key={index}>
                                {/*<span >Date arrival: {c.date_arrival}</span>*/}
                                {/*<span >Date departure: {c.date_departure}</span>*/}
                                    <span >Email: {c.user_email}</span>
                                {/*    <span >Number of peoples: {c.number_peoples}</span>*/}
                            </div>
                            )}
                            <div>
                                <Button onClick={handleDeletedComment} variant="outlined" color="success" startIcon={<ChangeCircleIcon/> }
                                        sx={{fontWeight:800, margin: '60px 0 0 10px'}}>Change Comment </Button>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>
        </div>
    );
};

export default UserCommentsApartmentsModal;