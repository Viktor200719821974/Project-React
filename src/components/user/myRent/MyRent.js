import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import api from '../../../services/api';
import RentBlock from "./RentBlock";

const MyRent = ({id}) => {
    const [date, setDate] = useState([]);
    const [openClose, setOpenClose] = useState(false);
    const [noRent, setNoRent] = useState(false);

    const handleOpen = async (e) => {
        e.preventDefault();
        try{
            const res = await api.auth.getDateSelection();
            setDate(res.data.data);
            if (res.status === 200){
                setOpenClose(true);
            }
        }catch (e) {
            console.log(e.message);
        }
    }
    const handleClose = () => {
        setOpenClose(false);
    }
    const filterDate = date.filter(c => c.user_id === id);

    useEffect(() => {
        if (filterDate.length !== 0){
          setNoRent(true);
        }
    },[filterDate, noRent])
    return (
        <div className={'button_my_rent_open'}>
            {!openClose && <Button onClick={handleOpen} variant="contained" color="success">My rent</Button>}
            <div className={'button_my_rent_close'}>
                {openClose && <Button onClick={handleClose} variant="contained" color="success">Close</Button>}
            </div>
            {openClose && !noRent && <div className={'div_NoRent'}>No rent</div>}
            {openClose && <div className={'div_RentBlock'}>
                {filterDate && filterDate.map(c => <RentBlock key={c.id}
                                                          date_arrival={c.date_arrival}
                                                          date_departure={c.date_departure}
                                                          apartment_id={c.apartment}
                                                          cost={c.cost}
                                                          number_days={c.number_days}
                                                          number_peoples={c.number_peoples}
            />)}
            </div>}
        </div>
    );
};

export default MyRent;