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
        // boxShadow: theme.shadows[5],
        // padding: theme.spacing(1, 1, 3),
    },
}));
export default function ApartmentModel({children, id, photo}) {
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
                {/*<Button ></Button>*/}
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
                              <span className={'ApartmentModal__title'}>
                            <li>Country: {apartment.country }</li>
                                 <li> City: {apartment.city}</li>
                                  <li>Region: {apartment.region}</li>
                                  <li>Number of peoples: {apartment.numbers_people}</li>
                                  <li>Number of rooms: {apartment.numbers_rooms}</li>
                                  <li>Number of squares: {apartment.numbers_squares}</li>
                                  <li>Price: {apartment.price} UAH</li>

                           </span>
                            {/*        {content.tagline && (<i className="tagline">{content.tagline}</i>)}*/}
                                    <StarsRating rating={apartment.id} key={apartment.id}/>
                            {/*        <span className={'ContentModal__description'}>*/}
                            {/*{content.overview}*/}
                            {/*   </span>*/}
                                    <div>
                                        <Carousel id={apartment.id} key={apartment.id}/>
                                    </div>

                                    <div>
                                        <CommentsApartment id={apartment.id} key={apartment.id}/>
                                    </div>
                            {/*        <Button*/}
                            {/*            variant="contained"*/}
                            {/*            startIcon={<YouTubeIcon />}*/}
                            {/*            color="secondary"*/}
                            {/*            target="__blank"*/}
                            {/*            href={`https://www.youtube.com/watch?v=${video}`}*/}
                            {/*        >*/}
                            {/*            Watch the Trailer*/}
                            {/*        </Button>*/}
                                </div>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>

        </>
    );
}
