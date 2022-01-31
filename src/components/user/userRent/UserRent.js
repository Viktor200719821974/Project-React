import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import UserRentBlockActive from "./UserRentBlockActive";

const UserRent = ({date}) => {
    const [openClose, setOpenClose] = useState(false);
    const [noRent, setNoRent] = useState(false);

    const handleOpen = () => {
        setOpenClose(true);
    }
    const handleClose = () => {
        setOpenClose(false);
    }
    const x = date.map(c => c.length).filter(c => c !== 0).length;

    useEffect(() => {
        if (x !== 0){
            setNoRent(true);
        }
    },[x, noRent])

    return (
        <div>
            {!openClose && <Button onClick={handleOpen} variant="contained" color="success">User rent</Button>}
            <div className={'button_my_rent_close'}>
                {openClose && <Button onClick={handleClose} variant="contained" color="success">Close</Button>}
            </div>
            {openClose && !noRent && <div className={'div_NoRent'}>No rent</div>}
            {openClose && <div className={'div_RentBlock'}>
                {date && date.map((c, index) => <UserRentBlockActive key={index} date_selection={c}/>
                )}
            </div>}
        </div>
    );
};

export default UserRent;