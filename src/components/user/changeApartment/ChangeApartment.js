import React, {useState} from 'react';
import '../User.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {changeApartment} from "../../../services/changeAllApartment_services";

function ChangeApartment({id}) {
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [errorValue, setErrorValue] = useState();
    const [noError, setNoError] = useState();
    const [apartment, setApartment] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newApartment = await changeApartment ({
            key,
            value,
            id
        });
        try{
            // if (newApartment.key) {
            //     setErrorValue(newApartment.key);
            // }
            // if (newApartment.city){
            //     setErrorValue(newApartment.city);
            // }
            // if (newApartment.region){
            //     setErrorValue(newApartment.region);
            // }
            // if (newApartment.numbers_squares){
            //     setErrorValue(newApartment.numbers_squares);
            // }
            // if (newApartment.numbers_people){
            //     setErrorValue(newApartment.numbers_people);
            // }
            // if (newApartment.numbers_rooms){
            //     setErrorValue(newApartment.numbers_rooms);
            // }
            // if (newApartment.price){
            //     setErrorValue(newApartment.price);
            // }
        }catch (e){
            setNoError(e.message);
        }if (newApartment['id']){
            setApartment(true);
        }
    }
    return (
        <div>
            {apartment && <Alert severity="success">
                <AlertTitle>Вітаємо</AlertTitle>
                <strong>Данні про Вашу квартиру було змінено !!!</strong>
            </Alert>}
            {noError && !apartment && <div className={'noError'}>*{noError}</div>}
            <form className={'form_register'} onSubmit={handleSubmit}>
                <fieldset className={'register-group'}>
                    <legend>Змінити данні квартири, щоб змінити впишіть, що змінити і на що змінити.</legend>
                    <label htmlFor={'Що змінити'} className={!apartment && errorValue ? 'error_label': 'label'}>
                        Що змінити
                        <input className={!apartment && errorValue ?'error_input' : 'input'} name={'key'}
                               type="text" onChange={e =>
                            setKey(e.target.value)} placeholder={'Впишіть назву строки яку треба змінити'}/>
                    </label>
                    <label htmlFor={'На що змінити'} className={!apartment && errorValue ? 'error_label': 'label'}>
                        На що змінити {errorValue && errorValue}
                        <input className={!apartment && errorValue ?'error_input' : 'input'} name={'value'}
                               type="text" onChange={e =>
                            setValue(e.target.value)} placeholder={'Впишіть нове значення'}/>
                    </label>
                </fieldset>
                <button className={'btn btn-default'} name={'submit'} type="submit">Відправити</button>

            </form>
        </div>
    );
}

export default ChangeApartment;