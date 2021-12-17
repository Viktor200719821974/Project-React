import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#39445a',
    color: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddApartmentOk({apartment}) {
    const [open, setOpen] = useState(false);
    console.log(open, apartment);
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div >
                        <h2>Вітаємо, Ваша квартира добавлена!!!</h2>
                    </div>
                    {/*<div className={'div_addApartment'}>*/}
                        <Button onClick={handleClose} variant="contained" color="success">Закрити</Button>
                    {/*</div>*/}
                </Box>
            </Modal>
        </div>
    );
}
