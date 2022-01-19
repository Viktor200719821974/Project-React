import React, {useState} from 'react';
import '../../user/User.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import api from "../../../services/api";

function RentApartment({id}) {
    const [date_arrival, setDateArrival] = useState('');
    const [date_departure, setDateDeparture] = useState('');
    const [number_peoples, setNumberPeoples] = useState('');
    const [errorDateArrival, setErrorDateArrival] = useState();
    const [errorDateDeparture, setErrorDateDeparture] = useState();
    const [errorNumberPeoples, setErrorNumberPeoples] = useState();
    const [errorDate, setErrorDate] = useState();
    const [apartment, setApartment] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        let obj = {date_arrival, date_departure, number_peoples};
        e.preventDefault();
        setLoading(true);
        try{
            const res = await api.auth.rentApartment(id, obj);
            if (res.status === 201){
                setApartment(true);
            }
        }catch (e) {
            if (e.response.data.date_arrival){
                setErrorDateArrival(e.response.data.date_arrival);
            }
            if (e.response.data.date_departure){
                setErrorDateDeparture(e.response.data.date_departure);
            }
            if (e.response.data.number_peoples){
                setErrorNumberPeoples(e.response.data.number_peoples);
            }
            setErrorDate(e.message);
        }
        setLoading(false);
    }
    if (loading){
        return <Alert severity="success" sx={{backgroundColor: '#39445a', color: 'white'}}>Ми відправили Ваше прохання
            зняти житло, відповідь отримаєте на електронну пошту</Alert>
    }
    return (
        <div>
            {apartment && <Alert severity="success">
                <AlertTitle>Вітаємо</AlertTitle>
                <strong>Ви орендували квартиру !!!</strong>
            </Alert>}
            {errorDate && <Alert severity="error">{errorDate}</Alert>}
            {/*{noError && !apartment && <div className={'noError'}>*{noError}</div>}*/}
            <form className={'form_register'} onSubmit={handleSubmit}>
                <fieldset className={'register-group'}>
                    <legend>Виберіть дати</legend>
                    <label htmlFor={' Дата заселення'} className={!apartment && errorDateArrival ? 'error_label': 'label'}>
                        Дата заселення {errorDateArrival && errorDateArrival}
                        <input className={!apartment && errorDateArrival ? 'error_input' : 'input'} name={'date_arrival'}
                               type="date" onChange={e =>
                            setDateArrival(e.target.value)} placeholder={'Дата заселення'}/>
                    </label>
                    <label htmlFor={' Дата виїзду'} className={!apartment && errorDateDeparture ? 'error_label': 'label'}>
                        Дата виїзду {errorDateDeparture && errorDateDeparture}
                        <input className={!apartment && errorDateDeparture ? 'error_input' : 'input'} name={'date_departure'}
                               type="date" onChange={e =>
                            setDateDeparture(e.target.value)} placeholder={'Дата виїзду'}/>
                    </label>
                    <label htmlFor={'Кількість гостей'} className={!apartment && errorNumberPeoples ? 'error_label': 'label'}>
                        Кількість гостей {errorNumberPeoples && errorNumberPeoples}
                        <input className={!apartment && errorNumberPeoples ? 'error_input' : 'input'} name={'date_departure'}
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