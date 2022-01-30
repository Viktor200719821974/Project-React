import React, {useEffect, useState} from 'react';
import RentBlockApartment from "./RentBlockApartment";
import moment from "moment";

const RentBlock = ({date_arrival, apartment_id, date_departure, cost, number_days, number_peoples}) => {
    const [active, setActive] = useState(false);

    let date = moment().format("YYYY-MM-DD")

    useEffect(() => {
        if (date_departure >= date){
            setActive(true);
        }
    },[active, date, date_departure])

    return (
        <div className={'div_RentBlock_main'}>
            <div className={active ? 'div_active_rent' : 'div_no_active_rent'}>

            </div>
            <span className={'span_RentBlockApartment'}><strong>Date of arrival:</strong> {date_arrival}</span>
            <span className={'span_RentBlockApartment'}><strong>Date of departure:</strong> {date_departure}</span>
            <span className={'span_RentBlockApartment'}><strong>Cost:</strong> {cost} грн</span>
            <span className={'span_RentBlockApartment'}><strong>Number of days:</strong> {number_days}</span>
            <span className={'span_RentBlockApartment'}><strong>Number of peoples:</strong> {number_peoples}</span>
        <div className={'div_RentBlockApartment_main'}>
        <RentBlockApartment id={apartment_id}/>
        </div>

        </div>
    );
};

export default RentBlock;