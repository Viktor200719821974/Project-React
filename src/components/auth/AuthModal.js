import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Link} from 'react-router-dom';
import './Auth.css';
import HomeIcon from "@mui/icons-material/Home";
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

export default function AuthModal({isAuthenticated}) {

    return (
        <div>
            <Modal
                open={isAuthenticated}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div >
                        <h2>Вітаємо, Ви авторизувались!!! </h2>
                    </div>
                    <Button
                        component={Link} to="/"
                        variant="contained"
                        color="success"
                        type="submit"
                        // disabled={isLoading}
                    >
                       Закрити
                    </Button>
                    {/*<div className={'div_auth_main'}>*/}
                        {/*<Button color="primary"  sx={{fontWeight: 'bold', marginTop: 5}}>*/}
                        {/*   Закрити*/}
                        {/*</Button>*/}
                        {/*<div className={'div_auth_modal'}>*/}
                        {/*<Link to={'/user'} className={'link_auth_modal'}>Моя сторінка</Link>*/}
                        {/*</div>*/}
                        {/*<div className={'div_auth_modal'}>*/}
                        {/*<Link to={'/'} className={'link_auth_modal'}>Home Page</Link>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </Box>
            </Modal>
        </div>
    );
}