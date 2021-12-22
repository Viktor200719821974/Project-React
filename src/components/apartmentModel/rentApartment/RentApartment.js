import React, {useState} from 'react';
import '../../user/User.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {choiceDate} from "../../../services/choiceDate";
import {tokenRefresh} from "../../../services/login_services";

function RentApartment({id}) {
    const [date_arrival, setDateArrival] = useState('');
    const [date_departure, setDateDeparture] = useState('');
    const [number_peoples, setNumberPeoples] = useState('');
    const [errorDateArrival, setErrorDateArrival] = useState();
    const [errorDateDeparture, setErrorDateDeparture] = useState();
    const [errorNumberPeoples, setErrorNumberPeoples] = useState();
    const [errorDate, setErrorDate] = useState();
    const [noError, setNoError] = useState();
    const [apartment, setApartment] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const rentApartment = await choiceDate ({
            date_arrival,
            date_departure,
            number_peoples,
            id
        });
        try{
            if (rentApartment.code === 'token_not_valid'){
               const token = tokenRefresh();
            }
            if (rentApartment){
                setErrorDateArrival(rentApartment.date_arrival);
            }
            if (rentApartment.date_departure){
                setErrorDateDeparture(rentApartment.date_departure);
            }
            if (rentApartment.number_peoples){
                setNumberPeoples(rentApartment.number_peoples);
            }
            if (typeof (rentApartment) === "string"){
                setErrorDate(rentApartment);
            }

        }catch (e){
            setNoError(e.message);
        }if (rentApartment['id']) {
            setApartment(true);
        }
        setLoading(false);
    }
    if (loading){
        return <Alert severity="success">Ми відправили Ваше прохання зняти житло, відповідь отримаєте
            на електронну почту</Alert>
    }
    return (
        <div>
            {apartment && <Alert severity="success">
                <AlertTitle>Вітаємо</AlertTitle>
                <strong>Ви орендували квартиру !!!</strong>
            </Alert>}
            {errorDate && <Alert severity="error">{errorDate}</Alert>}
            {noError && !apartment && <div className={'noError'}>*{noError}</div>}
            <form className={'form_register'} onSubmit={handleSubmit}>
                <fieldset className={'register-group'}>
                    <legend>Виберіть дати</legend>
                    <label htmlFor={' Дата заселення'} className={!apartment && errorDateArrival ? 'error_label': 'label'}>
                        Дата заселення {errorDateArrival && errorDateArrival}
                        <input className={!apartment && errorDateArrival ?'error_input' : 'input'} name={'date_arrival'}
                               type="date" onChange={e =>
                            setDateArrival(e.target.value)} placeholder={'Дата заселення'}/>
                    </label>
                    <label htmlFor={' Дата виїзду'} className={!apartment && errorDateDeparture ? 'error_label': 'label'}>
                        Дата виїзду {errorDateDeparture && errorDateDeparture}
                        <input className={!apartment && errorDateDeparture ?'error_input' : 'input'} name={'date_departure'}
                               type="date" onChange={e =>
                            setDateDeparture(e.target.value)} placeholder={'Дата виїзду'}/>
                    </label>
                    <label htmlFor={'Кількість гостей'} className={!apartment && errorNumberPeoples ? 'error_label': 'label'}>
                        Кількість гостей {errorNumberPeoples && errorNumberPeoples}
                        <input className={!apartment && errorNumberPeoples ?'error_input' : 'input'} name={'date_departure'}
                               type="number" onChange={e =>
                            setNumberPeoples(e.target.value)} placeholder={'Кількість гостей'}/>
                    </label>
                </fieldset>
                <button className={'btn btn-default'} name={'submit'} type="submit">Відправити</button>

            </form>
        </div>
    );
}

export default RentApartment;