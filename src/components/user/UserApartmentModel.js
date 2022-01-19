import React from 'react';
import './User.css';
import {makeStyles } from '@material-ui/styles';
import {useState, useEffect} from "react";
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import {unavailable} from "../../constans/constans";
import Carousel from "../apartmentModel/carousel/Carousel";
import noPicture from "../apartmentModel/carousel/image/No_Picture.jpg";
import StarsRating from "../starsRating/StarsRating";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeAllApartmentModal from "./changeApartment/ChangeAllApartmentModal";
import ChangeApartmentModal from "./changeApartment/ChangeApartmentModal";
import api from "../../services/api";
import AddPhotoApartmentModal from "./addApartment/AddPhotoApartmentModal";
import UserCommentsApartmentContent from "./userCommentsApartment/UserCommentsApartmentContent";
import CloseIcon from '@mui/icons-material/Close';

function ChildModal({id, comments, noComments, dateSelection, setStatusResponse, noDate}) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const  filterEmail = dateSelection.map(c => c.user_email);
    const filterName = comments.map(c => c.name_user);
    let uniqueEmail = [...new Set(filterEmail)];
    let uniqueName = [...new Set(filterName)];

    return (
        <React.Fragment>

            <Button onClick={handleOpen} variant="contained" color="success">Коментарі</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                    <div className={'UserApartmentModal_child_main'}>
                            {(noDate || noComments) ? <div className={'UserApartmentModal__button_text_title'}>Виберіть юзера:</div>
                                : <h2 className={'noDate_noComment_user'}>No date of rented and no comments</h2>}
                        <div className={(noDate || noComments) ? 'UserApartmentModal__button_close' :
                            'UserApartmentModal__button_close_noComment_noDate'}>
                        <Button onClick={handleClose} variant="text" color="success" startIcon={<CloseIcon/> }>
                        </Button>
                        </div>
                        <div className={'UserApartmentModal_child_div'}>
                    {uniqueEmail && uniqueEmail.map((c, index) =>
                        <UserCommentsApartmentContent key={index}
                                                      id={id}
                                                      noComments={noComments}
                                                      name={uniqueName}
                                                      email={c}
                                                      setStatusResponse={setStatusResponse}
                                                      comments={comments}
                                                      dateSelection={dateSelection}
                        />
                    )}
                        </div>
                </div>
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
export default function UserApartmentModel({children, id, photo, setStatusResponse, statusResponse}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [apartment, setApartment] = useState([]);
    const [comments, setComments] = useState([]);
    const [noComments, setNoComments] =useState(false);
    const [dateSelection, setDateSelection] = useState([]);
    const [noDate, setNoDate] = useState(false);
    const [loadedPhoto, setLoadedPhoto] = useState(false);

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
        setComments(res.data.comments_apartment);
        setDateSelection(res.data.date_selection);
        if (loadedPhoto){
            setLoadedPhoto(false);
        }
        if (res.data.comments_apartment.length !== 0){
            setNoComments(true);
        }
        if (res.data.date_selection.length !== 0) {
            setNoDate(true);
        }
        }catch (e) {
            console.log(e.message);
        }
        }
        fetchData();
    }, [loadedPhoto, id, statusResponse]);

    const delApartment = async (e) => {
        e.preventDefault();
        try{
        const res = await api.auth.deleteApartment(id);
        if (res.status === 204){
            setStatusResponse(true);
        }
        }catch (e) {
            console.log(e.message);
        }
    }
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
                                    <div className={'UserApartmentModal__button_main'}>
                              <span className={'ApartmentModal__title'}>
                            <li>Country: {apartment.country }</li>
                                 <li> City: {apartment.city}</li>
                                  <li>Region: {apartment.region}</li>
                                  <li>Number of peoples: {apartment.numbers_people}</li>
                                  <li>Number of rooms: {apartment.numbers_rooms}</li>
                                  <li>Number of squares: {apartment.numbers_squares}</li>
                                  <li>Price: {apartment.price} UAH</li>
                                   </span>
                                    <div>
                                        <div className={'UserApartmentModal__button'}>
                                            <ChangeApartmentModal key={id + 400} id={id}
                                                                  setStatusResponse={setStatusResponse}/>
                                        </div>
                                        <div className={'UserApartmentModal__button'}>
                                            <Button onClick={delApartment} variant="outlined" color="success"
                                                    startIcon={<DeleteIcon /> }>
                                                Видалити
                                            </Button>
                                        </div>

                                        <div className={'UserApartmentModal__button'}>
                                       <ChangeAllApartmentModal id={id} key={id + 250}
                                                                setStatusResponse={setStatusResponse}/>
                                        </div>
                                        <div className={'UserApartmentModal__button'}>
                                            <AddPhotoApartmentModal id={id} key={id + 350}
                                                                    setLoadedPhoto={setLoadedPhoto}
                                                                    setStatusResponse={setStatusResponse}/>
                                        </div>
                                    </div>
                                    </div>
                                    <StarsRating id={apartment.id} key={apartment.id + 7}/>
                                    <Carousel id={id} key={id+2}
                                              setLoadedPhoto={setLoadedPhoto}
                                              loadedPhoto={loadedPhoto}
                                    />
                                    <ChildModal key={id+456} id={id}
                                                comments={comments}
                                                dateSelection={dateSelection}
                                                noComments={noComments}
                                                setStatusResponse={setStatusResponse}
                                                noDate={noDate}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>

        </>
    );
}
