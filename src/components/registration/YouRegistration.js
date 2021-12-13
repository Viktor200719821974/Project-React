import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Link} from 'react-router-dom';

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

export default function YouRegistration({youRegistration}) {

    return (
        <div>
            <Modal
                open={youRegistration}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div >
                        <h2>Вітаємо, Ви зареєструвались. Підтвердіть електрону адресу!!!</h2>
                    </div>
                    <div className={'div_youregistration'}>
                    <Link to={'/'} className={'link_youregistration'}>Закрити</Link>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}



