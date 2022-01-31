import React, {useState} from 'react';
import api from "../../../services/api";

const RentBlockApartment = ({id}) => {

    const [apartment, setApartment] = useState([]);
    const [rentBlock, setRentBlock] = useState(false);

    const datailsDate = async (e) => {
        e.preventDefault();
        try{
            const res = await api.auth.getApartment(id);
            setApartment(res.data);
            if (res.status === 200){
                setRentBlock(true);
            }
        }catch (e) {
            console.log(e.message);
        }
    }
    const closeBlock = () => {
        setRentBlock(false);
    }
    return (
        <div>
            {!rentBlock && <div className={'button_my_rent_details'}>
                <button onClick={datailsDate}>details</button>
            </div>}

            {rentBlock && <div className={'div_RentBlockApartment'}>
                <span className={'span_RentBlockApartment'}><strong> Country:</strong> {apartment.country}</span>
                <span className={'span_RentBlockApartment'}><strong>City:</strong> {apartment.city}</span>
                <span className={'span_RentBlockApartment'}><strong>Region:</strong> {apartment.region}</span>
                <span className={'span_RentBlockApartment'}><strong>Numbers of rooms:</strong> {apartment.numbers_rooms}</span>
                <span className={'span_RentBlockApartment'}><strong>Numbers of people:</strong> {apartment.numbers_people}</span>
                <span className={'span_RentBlockApartment'}><strong>Numbers of squares:</strong> {apartment.numbers_squares}</span>
                <span className={'span_RentBlockApartment'}><strong>Price:</strong> {apartment.price} грн</span>
            </div>}
            {rentBlock && <button onClick={closeBlock}>close</button>}
        </div>
    );
};

export default RentBlockApartment;