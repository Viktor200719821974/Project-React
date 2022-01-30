import React, {useEffect, useState} from 'react';
import RentBlockApartment from "../myRent/RentBlockApartment";
import moment from "moment";

const UserRentBlock = ({date_selection, date_departure}) => {
    const [active, setActive] = useState(false);
    let date = moment().format("YYYY-MM-DD")

    useEffect(() => {
        if (date_departure.map(c => c >= date)) {
            setActive(true);
        }
    },[active, date])
    return (
        <div>
            {date_selection && date_selection.map(c => <div key={c.id} className={'div_RentBlock_main' }>
                    <div className={active ? 'div_active_rent' : 'div_no_active_rent'}>

                    </div>
                    <span className={'span_RentBlockApartment'}><strong>Date of arrival:</strong> {c.date_arrival}</span>
                    <span className={'span_RentBlockApartment'}><strong>Date of departure:</strong> {c.date_departure}</span>
                    <span className={'span_RentBlockApartment'}><strong>Cost:</strong> {c.cost} грн</span>
                    <span className={'span_RentBlockApartment'}><strong>Number of days:</strong> {c.number_days}</span>
                    <span className={'span_RentBlockApartment'}><strong>Number of peoples:</strong> {c.number_peoples}</span>
                    <div className={'div_RentBlockApartment_main'}>
                        <RentBlockApartment id={c.apartment}/>
                    </div>
            </div>)}
        </div>
    );
};

export default UserRentBlock;