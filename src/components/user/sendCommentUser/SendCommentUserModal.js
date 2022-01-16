import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddCommentIcon from "@mui/icons-material/AddComment";
import SendCommentUser from "./SendCommentUser";

export default function SendCommentUserModal({id, setStatusResponse}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} variant="outlined" color="success" sx={{fontWeight: 800}}
                    startIcon={<AddCommentIcon />}>
                Write Comment
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={'SendCommentUserModal_div_main'}>
                <SendCommentUser key={id + 678} id={id} setStatusResponse={ setStatusResponse}/>
                </div>
            </Modal>
        </div>
    );
}
