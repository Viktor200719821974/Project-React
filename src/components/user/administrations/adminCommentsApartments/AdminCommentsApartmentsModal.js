import React, {useEffect, useState} from 'react';
import "../../User.css";
import {makeStyles} from "@material-ui/styles";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import api from "../../../../services/api";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import FormChangeComment from "../formChangeComments/FormChangeComment";
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

const AdminCommentsApartmentsModal = ({id, children}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState([]);
    const [changeComment, setChangeComment] = useState('');
    const [error, setError] = useState();

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
            console.log(res.config);
        }catch (e) {
            if (e.response.status){
                setError(e.response.status);
            }
        }
    }
    const handleChangeComment = async (e) => {
        e.preventDefault();
        try{
            const res = await api.auth.changeCommentApartment(id, changeComment);
        }catch (e) {
            console.log(e.message);
        }
    }
    useEffect(async () => {
        try{
            const {data} = await api.auth.getCommentApartments(id);
                    setComment(data);
                    // console.log(data);
        }catch (e){
            console.log(e.message);
        }
    },[])
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
                    {comment &&  (
                        <div className={classes.paper}>
                            {error && <Alert severity="error">
                                <strong>{error}</strong>
                            </Alert>}
                            <FormChangeComment setChangeComment={setChangeComment} key={id + 65}
                                               comment={comment.comments} changeComment={changeComment}/>
                            <div>
                                <Button onClick={handleChangeComment} variant="outlined" color="success" startIcon={<ChangeCircleIcon/> }
                                        sx={{fontWeight:800, margin: '60px 0 0 10px'}}>Change Comment </Button>
                                <Button onClick={handleDeletedComment} variant="outlined" color="error" startIcon={<DeleteIcon/> }
                                        sx={{fontWeight:800, margin: '60px 0 0 10px'}}>Deleted Comment </Button>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>
        </div>
    );
};

export default AdminCommentsApartmentsModal;