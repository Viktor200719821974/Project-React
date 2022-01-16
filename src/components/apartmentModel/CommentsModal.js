import React, {useState} from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import SendComment from "../comments_apartment/SendComment";
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

function CommentsModal({id, setStatusResponse, statusResponse}) {

    const [open, setOpen] = useState(false);
    const auth = useAuth();
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            {auth.isLoaded && <Button onClick={handleOpen} sx={{marginRight: "200px"}} variant="contained"
                                      color="success">Залишити відгук</Button>}
            <Modal

                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                closeAfterTransition
            >
                <Box sx={{ ...style,}}>
                    <SendComment key={id+6} id={id} setStatusResponse={setStatusResponse} statusResponse={statusResponse}/>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default CommentsModal;