import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import SendComment from "../comments_apartment/SendComment";

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

function CommentsModal({id, setStatusResponse, statusResponse, setNoComments, noComments, comments, manyComments,
                           setManyComments}) {
    const [open, setOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() =>{
        if (localStorage.getItem('access')){
            setIsAuthenticated(true);
        }
        if (comments.length !== 0){
            setNoComments(true);
        }
        if (comments.length > 4){
            setManyComments(true);
        }
    },[])
    return (
        <React.Fragment>
            {isAuthenticated && <Button onClick={handleOpen} variant="contained" color="success">Залишити відгук</Button>}
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                disableScrollLock={true}
            >
                <Box sx={{ ...style, width: 600 }}>
                    <SendComment key={id+6} id={id} setStatusResponse={setStatusResponse} statusResponse={statusResponse}/>
                    <Button onClick={handleClose} variant="contained" color="success">Закрити</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default CommentsModal;