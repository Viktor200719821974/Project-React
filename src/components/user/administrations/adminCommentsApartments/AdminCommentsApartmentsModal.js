import React, {useState} from 'react';
import "../../User.css";
import {makeStyles} from "@material-ui/styles";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import api from "../../../../services/api";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Alert from "@mui/material/Alert";
import FormChangeCommentApartment from "../formChangeComments/FormChangeCommentApartment";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "600px",
        height: "auto",
        maxHeight: "500px",
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

const AdminCommentsApartmentsModal = ({id, children, setStatusResponse, comment}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [changeComment, setChangeComment] = useState('');
    const [error, setError] = useState();
    const [deleteStatus, setDeleteStatus] = useState(false);
    const [changeStatus, setChangeStatus] = useState(false);

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
                setStatusResponse(true);
            }
        }catch (e) {
            if (e.response.status){
                setError(e.response.statusText);
            }
        }
    }
    const handleChangeComment = async (e) => {
        const obj = {'comments':changeComment};
        e.preventDefault();
        try{
            const res = await api.auth.changeCommentApartment(id, obj);
            if (res.status === 200){
                setChangeStatus(true);
                setStatusResponse(true);
            }
        }catch (e) {
            if (e.message){
                setError(e.message);
            }
        }
    }

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
            >
                <Fade in={open}>
                    {comment &&  (
                        <div className={classes.paper}>
                            {error && <Alert severity="error">
                                <strong>{error}</strong>
                            </Alert>}
                            {changeStatus && <Alert severity="success">
                                <strong>Comment change</strong>
                            </Alert>}
                            {deleteStatus && <Alert severity="success">
                                <strong>No content</strong>
                            </Alert>}
                            <FormChangeCommentApartment setChangeComment={setChangeComment} key={id + 65} id={id}
                                                   comment={comment.comments} changeComment={changeComment}
                                                        setStatusResponse={setStatusResponse}
                            />
                            <div>
                                <Button onClick={handleChangeComment} variant="outlined" color="success" startIcon={<ChangeCircleIcon/> }
                                        sx={{fontWeight:800, margin: '40px 120px 0 10px'}}>Change Comment </Button>
                                <Button onClick={handleDeletedComment} variant="outlined" color="error" startIcon={<DeleteIcon/> }
                                        sx={{fontWeight:800, margin: '40px 0 0 10px'}}>Deleted Comment </Button>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>
        </div>
    );
};

export default AdminCommentsApartmentsModal;