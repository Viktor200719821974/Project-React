import React, {useState} from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddPhotoApartment from "./AddPhotoApartment";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#39445a',
    border: '2px solid #000',
    boxShadow: 24,
    color: 'white',
    pt: 2,
    px: 4,
    pb: 3,
};
const AddPhotoApartmentModal = ({id, setLoadedPhoto, setStatusResponse}) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleOpen} variant="outlined" color="success"
                    startIcon={<AddAPhotoIcon/> }>
                Додати фото
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style }}>
                    <AddPhotoApartment key={id+567} id={id}
                                       setLoadedPhoto={setLoadedPhoto}
                                       setStatusResponse={setStatusResponse}
                    />
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default AddPhotoApartmentModal;