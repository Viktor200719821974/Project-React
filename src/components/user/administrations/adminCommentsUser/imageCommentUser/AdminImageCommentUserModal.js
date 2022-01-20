import * as React from 'react';
import Modal from '@mui/material/Modal';
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import {makeStyles} from "@material-ui/styles";
import "../../../../comments_apartment/CommentsApartment.css";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";
import api from "../../../../../services/api";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: "#39445a",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
    },
}));

export default function AdminImageCommentUserModal({children, image, setStatusResponse, setDeletePhoto, id}){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [error, setError] = useState();
    const classes = useStyles();

    const delPhoto = async(e) => {
        e.preventDefault();
        try{
            const res = await api.auth.deletePhotoCommentUser(id);
            if (res.status === 204){
                setStatusResponse(true);
                setDeletePhoto(true);
            }
        }catch (e) {
            if (e.message){
                setError(e.message);
            }
        }
    }
    return (
        <>
            <div className={'ImageCommentApartmentModal_media'} onClick={handleOpen}>
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
                    <div className={'ImagePhotoApartment_div_main'}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <div className={'ImagePhotoApartment_div_button'}>
                            <Button onClick={delPhoto} variant="contained" color="error"
                                    startIcon={<DeleteIcon /> }>
                                Видалити
                            </Button>
                        </div>
                        <img src={image}
                             alt='photo_comment_apartment'
                             className={'ImageCommentApartmentModal__portrait'}
                        />
                    </div>
                </Fade>
            </Modal>

        </>
    );
}