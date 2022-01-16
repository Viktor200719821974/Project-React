import * as React from 'react';
import Modal from '@mui/material/Modal';
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import {makeStyles} from "@material-ui/styles";
import "../CommentsApartment.css";

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

export default function ImageCommentApartmentModal({children, image}){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const classes = useStyles();
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
                    <img src={image}
                         alt='photo_comment_apartment'
                         className={'ImageCommentApartmentModal__portrait'}
                    />
                </Fade>
            </Modal>

        </>
    );
}
