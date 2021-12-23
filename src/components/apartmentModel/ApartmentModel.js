import React from 'react';
import {makeStyles } from '@material-ui/styles';
import {useState, useEffect} from "react";
import Fade from '@mui/material/Fade';
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import './ApartmentModel.css';
import {unavailable} from "../../constans/constans";
import Carousel from "./carousel/Carousel";
import CommentsApartment from "../comments_apartment/CommentsApartment";
import noPicture from "./carousel/image/No_Picture.jpg";
import StarsRating from "../starsRating/StarsRating";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CommentsModal from "./CommentsModal";
import RentApartmentModal from "./rentApartment/RentApartmentModal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#39445a',
    border: '2px solid #000',
    boxShadow: 24,
    color: 'white',
    pt: 2,
    px: 4,
    pb: 3,
};

function ChildModal({id}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleOpen} variant="contained" color="success">Коментарі</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                disableScrollLock={true}
            >
                <Box sx={{ ...style, width: 600 }}>
                    {/*<h2 id="child-modal-title">Comments</h2>*/}
                    <CommentsApartment key={id+4} id={id}/>
                    <CommentsModal key={id+5} id={id}/>
                    <Button onClick={handleClose} variant="contained" color="success">Закрити коментарі</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: "90%",
        height: "80%",
        backgroundColor: "#39445a",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
    },
}));
export default function ApartmentModel({children, id, photo, isAuthenticated}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [apartment, setApartment] = useState([]);

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };
    const getApartment = async () => {
        const { data } = await axios.get(
            `http://localhost:8000/api/v1/apartments/${id}`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer" + localStorage.getItem("access")
                }
            });
        setApartment(data);
    };

    useEffect(() => {
        getApartment();
        // eslint-disable-next-line
    }, [id]);
    return (
        <>
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
                    {apartment && (
                        <div className={classes.paper}>
                            <div className={'ApartmentModal'}>

                                <img src={photo.length !== 0 ? photo[0] : unavailable}
                                     alt='photo_rooms'
                                     className={'ApartmentModal__portrait'}
                                />
                                <img src={photo.length !== 0 ? photo[0] : noPicture}
                                     alt='photo_rooms'
                                     className={'ApartmentModal__landscape'}
                                />
                                <div className={'ApartmentModal__about'}>
                                    <div className={'ApartmentModal_main_title'}>
                              <span className={'ApartmentModal__title'}>
                            <li>Country: {apartment.country }</li>
                                 <li> City: {apartment.city}</li>
                                  <li>Region: {apartment.region}</li>
                                  <li>Number of peoples: {apartment.numbers_people}</li>
                                  <li>Number of rooms: {apartment.numbers_rooms}</li>
                                  <li>Number of squares: {apartment.numbers_squares}</li>
                                  <li>Price: {apartment.price} UAH</li>
                                   </span>
                                    <div className={'ApartmentModal_button_rent'}>
                                        {isAuthenticated && <RentApartmentModal key={apartment.id + 1100} id={apartment.id}/>}
                                    </div>
                                    </div>
                            <StarsRating id={apartment.id} key={apartment.id + 7}/>
                                   <Carousel id={id} key={id+2}/>
                                    <ChildModal key={id+1} id={id}/>
                                </div>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>

        </>
    );
}
