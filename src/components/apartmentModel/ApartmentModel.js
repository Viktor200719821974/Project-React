import React from 'react';
import {makeStyles } from '@material-ui/styles';
import {useState, useEffect} from "react";
import Fade from '@mui/material/Fade';
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
import api from "../../services/api";
import useAuth from "../../hook/useAuth";

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
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noComments, setNoComments] = useState(false);
    const [manyComments, setManyComments] = useState(false);
    const [statusResponse, setStatusResponse] = useState(false);
    const auth = useAuth();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect( () => {
        async function fetchData(){
        setLoading(true);
        try{
            const {data} = await api.auth.getApartment(id);
            setComments(data.comments_apartment);
            if (data.comments_apartment.length !== 0){
                setNoComments(true);
            }
            if (data.comments_apartment.length > 4){
                setManyComments(true);
            }
        }catch (e) {
            if (e.response.status === 401){
                auth.setRefreshToken(true);
            }
            console.log(e.message);
        }
        }
        fetchData();
        setLoading(false);
    },[statusResponse, noComments, id, auth])

    if (loading){
        return <div>Loading...</div>
    }
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
                <Box sx={{ ...style,}}>
                    <div className={manyComments && noComments ? 'div_comments_apartment_modal' : 'div_comments_apartment_modal_noComments'}>
                    <CommentsApartment key={id+4} filter={comments} noComments={noComments}/>
                    <CommentsModal key={id+5} id={id} setStatusResponse={setStatusResponse}
                                   statusResponse={statusResponse} comments={comments} noComments={noComments}
                                   setNoComments={setNoComments} setManyComments={setManyComments} manyComments={manyComments}/>
                    <Button onClick={handleClose} variant="contained" color="success">Закрити коментарі</Button>
                    </div>
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
export default function ApartmentModel({children, id, photo, rating}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [apartment, setApartment] = useState([]);
    const auth = useAuth();

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };
    useEffect(() => {
        async function fetchData (){
            try{
                const res = await api.auth.getApartment(id);
                setApartment(res.data);

            }catch (e) {
                if (e.response.status === 401) {
                    auth.setRefreshToken(true);
                }
                console.log(e.message);
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [id, auth]);
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
                                        {auth.isLoaded && <RentApartmentModal key={apartment.id + 1100} id={apartment.id}/>}
                                    </div>
                                    </div>
                            <StarsRating id={apartment.id} key={apartment.id + 7} rating={rating}/>
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
