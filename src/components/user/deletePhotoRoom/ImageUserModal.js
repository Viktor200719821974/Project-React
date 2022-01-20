import * as React from 'react';
import Modal from '@mui/material/Modal';
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import {makeStyles} from "@material-ui/styles";
import "../../apartmentModel/carousel/Carousel.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import api from "../../../services/api";
import {useState} from "react";
import Alert from "@mui/material/Alert";

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

export default function ImageUserModal({children, image, id, setLoadedPhoto, setStatusResponse}){

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [error, setError] = useState();
    const classes = useStyles();

    const delPhotoRoom = async(e) => {
        e.preventDefault();
        try{
            const res = await api.auth.deleteApartmentPhotoRooms(id);
            if (res.status === 204){
                setStatusResponse(true);
                setLoadedPhoto(true);
            }
        }catch (e) {
            if (e.message){
                setError(e.message);
            }
        }
    }
    return (
        <>
            <div className={'ImageModal_media'} onClick={handleOpen}>
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
                        <Button onClick={delPhotoRoom} variant="contained" color="error"
                                startIcon={<DeleteIcon /> }>
                            Видалити
                        </Button>
                        </div>
                        <img src={image}
                             alt='photo_rooms'
                             className={'ImageModal__portrait'}
                        />
                    </div>
                </Fade>
            </Modal>

        </>
    );
}