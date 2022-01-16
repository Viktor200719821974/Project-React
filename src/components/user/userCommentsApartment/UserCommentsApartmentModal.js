import React, {useEffect, useState} from 'react';
import "../User.css";
import {makeStyles} from "@material-ui/styles";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import SendCommentUserModal from "../sendCommentUser/SendCommentUserModal";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "800px",
        margin: "auto",
    },
    paper: {
        width: "90%",
        backgroundColor: "#39445a",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
        height: "600px",
        overflow: "auto",
    },
}));

const UserCommentsApartmentsModal = ({children, email, comments, dateSelection, setStatusResponse}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [noComments, setNoComments] =useState(false);
    const [noDate, setNoDate] =useState(false);

    const filterComments = comments.filter(c => c.user_email === email);
    const filterDate = dateSelection.filter(c => c.user_email === email);
    const userId = filterDate.map(c => c.user_id)[0];

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };
    useEffect(() => {
        if (filterComments.length !== 0) {
            setNoComments(true);
        }
        if (filterDate.length !== 0){
            setNoDate(true);
        }
    },[noComments, noDate, filterComments.length, filterDate.length])
    return (
        <div>
            <div className={'media_comments'} onClick={handleOpen}>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                     {(filterComments || filterDate)  &&
                (<div className={classes.paper}>
                        <div className={'UserCommentsApartmentModal_title'}>Information of rented:</div>
                            {filterDate && noDate ? filterDate.map((c, index) => <div key={index}>
                                <div  className={'UserCommentsApartmentModal_date_main'}>
                                    <div className={'UserCommentsApartmentModal_date_div'}>
                                        <h3>Date arrival</h3>
                                         <div className={'UserCommentsApartmentModal_date_value'}> {c.date_arrival}</div>
                                    </div>
                                    <div className={'UserCommentsApartmentModal_date_div'}>
                                        <h3>Date departure</h3>
                                        <div className={'UserCommentsApartmentModal_date_value'}> {c.date_departure}</div>
                                    </div>
                                    <div className={'UserCommentsApartmentModal_date_div'}>
                                        <h3>Number of days</h3>
                                        <div className={'UserCommentsApartmentModal_date_value'}>{c.number_days}</div>
                                    </div>
                                    <div className={'UserCommentsApartmentModal_date_div'}>
                                        <h3>Number of peoples</h3>
                                        <div className={'UserCommentsApartmentModal_date_value'}>{c.number_peoples}</div>
                                    </div>
                                    <div className={'UserCommentsApartmentModal_date_div'}>
                                        <h3>Cost</h3>
                                        <div className={'UserCommentsApartmentModal_date_value'}>{c.cost} UAH</div>
                                    </div>
                                </div>
                            </div>) : <h3 className={'noDate_comment_user'}>No date</h3>}
                        <div className={'UserCommentsApartmentModal_title'}>Comments:</div>
                            {filterComments && noComments ? filterComments.map((c, index) =>
                                <div key={index} className={'UserCommentsApartmentModal_comment_main'}>
                                    <div className={'UserCommentsApartmentModal_comment_value'}> {c.comments}</div>
                                    <div className={'UserCommentsApartmentModal_comment_rating'}>Rating: {c.rating}</div>
                                </div>
                            ) : <h3 className={'noDate_comment_user'}>No comments</h3>}
                        <div className={'UserCommentsApartmentModal_button_sendComment'}>
                            <SendCommentUserModal key={userId + 567} id={userId} setStatusResponse={setStatusResponse}/>
                        </div>
                        </div>
                    )}
                </Fade>
            </Modal>
        </div>
    );
};

export default UserCommentsApartmentsModal;