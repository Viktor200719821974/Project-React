import React, {useState} from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import RentApartment from "./RentApartment";

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

function RentApartmentModal({id}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <Button onClick={handleOpen} variant="outlined" color="success" startIcon={<BedroomParentIcon /> }>
                Орендувати квартиру
            </Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                disableScrollLock={true}
            >
                <Box sx={{ ...style, width: 600 }}>
                    <RentApartment id={id} key={id + 1200}/>
                    <Button onClick={handleClose} variant="contained" color="success">Закрити</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default RentApartmentModal;