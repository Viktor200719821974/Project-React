import React, {useState} from 'react';
import Button from "@mui/material/Button";
import UserRentBlock from "./UserRentBlock";

const UserRent = ({date}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div>
            {!open && <Button onClick={handleOpen} variant="contained" color="success">User rent</Button>}
            <div className={'button_my_rent_close'}>
                {open && <Button onClick={handleClose} variant="contained" color="success">Close</Button>}
            </div>
            {open && <div className={'div_RentBlock'}>
                {date && date.map((c, index) => <UserRentBlock key={index} date_selection={c}
                                                               date_departure={c.map(c=>c.date_departure)}/>
                )}
            </div>}
        </div>
    );
};

export default UserRent;