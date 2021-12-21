import React, {useState} from 'react';
import '../User.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {changeAllApartment} from "../../../services/changeAllApartment_services";

function ChangeAllApartment({id}) {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [numbers_squares, setNumbersSquares] = useState('');
    const [numbers_people, setNumbersPeople] = useState('');
    const [numbers_rooms, setNumbersRooms] = useState('');
    const [price, setPrice] = useState('');
    const [errorCountry, setErrorCountry] = useState();
    const [errorCity, setErrorCity] = useState();
    const [errorRegion, setErrorRegion] = useState();
    const [errorNumbers_squares, setErrorNumbersSquares] = useState();
    const [errorNumbers_people, setErrorNumbersPeople] = useState();
    const [errorNumbers_rooms, setErrorNumbersRooms] = useState();
    const [errorPrice, setErrorPrice] = useState();
    const [noError, setNoError] = useState();
    const [apartment, setApartment] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newApartment = await changeAllApartment ({
            country,
            city,
            region,
            numbers_squares,
            numbers_people,
            numbers_rooms,
            price,
            id
        });
        try{
            if (newApartment.country){
                setErrorCountry(newApartment.country);
            }
            if (newApartment.city){
                setErrorCity(newApartment.city);
            }
            if (newApartment.region){
                setErrorRegion(newApartment.region);
            }
            if (newApartment.numbers_squares){
                setErrorNumbersSquares(newApartment.numbers_squares);
            }
            if (newApartment.numbers_people){
                setErrorNumbersPeople(newApartment.numbers_people);
            }
            if (newApartment.numbers_rooms){
                setErrorNumbersRooms(newApartment.numbers_rooms);
            }
            if (newApartment.price){
                setErrorPrice(newApartment.price);
            }
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
                <strong>Ваша квартира була змінена !!!</strong>
            </Alert>}
            {noError && !apartment && <div className={'noError'}>*{noError}</div>}
            <form className={'form_register'} onSubmit={handleSubmit}>
                <fieldset className={'register-group'}>
                    <legend>Додайте квартиру</legend>
                    <label htmlFor={'country'} className={!apartment && errorCountry ? 'error_label': 'label'}>Країна {errorCountry && errorCountry}
                        <input className={!apartment && errorCountry ?'error_input' : 'input'} name={'country'} type="text" onChange={e =>
                            setCountry(e.target.value)} placeholder={'Country must be A-Z, a-z, max-length=30'}/>
                    </label>
                    <label htmlFor={'city'} className={!apartment && errorCity ? 'error_label': 'label'}>Місто {errorCity && errorCity}
                        <input className={!apartment && errorCity ?'error_input' : 'input'} name={'city'}  type="text" onChange={e =>
                            setCity(e.target.value)} placeholder={'City must be A-Z, a-z, max-length=30'}/>
                    </label>
                    <label htmlFor={'region'} className={!apartment && errorRegion ? 'error_label': 'label'}>Регіон {errorRegion && errorRegion}
                        <input className={!apartment && errorRegion ?'error_input' : 'input'} name={'region'} type="text" onChange={e =>
                            setRegion(e.target.value)} placeholder={'Region must be A-Z, a-z, max-length=30'}/>
                    </label>
                    <label htmlFor={'numbers_squares'} className={!apartment && errorNumbers_squares ? 'error_label': 'label'}>
                        Площа квартири {errorNumbers_squares && errorNumbers_squares}
                        <input className={!apartment && errorNumbers_squares ?'error_input' : 'input'} name={'numbers_squares'}  type="number" onChange={e =>
                            setNumbersSquares(e.target.value)} placeholder={'Numbers of squares must be min value 30'}/>
                    </label>
                    <label htmlFor={'numbers_people'} className={!apartment && errorNumbers_people ? 'error_label': 'label'}>
                        Максимальна кількість людей {errorNumbers_people && errorNumbers_people}
                        <input className={!apartment && errorNumbers_squares ?'error_input' : 'input'} name={'numbers_people'}  type="number" onChange={e =>
                            setNumbersPeople(e.target.value)} placeholder={'Numbers of people must be min value 1'}/>
                    </label>
                    <label htmlFor={'numbers_rooms'} className={!apartment && errorNumbers_rooms ? 'error_label': 'label'}>
                        Кількість кімнат {errorNumbers_rooms && errorNumbers_rooms}
                        <input className={!apartment && errorNumbers_rooms ?'error_input' : 'input'} name={'numbers_rooms'}  type="number" onChange={e =>
                            setNumbersRooms(e.target.value)} placeholder={'Numbers of rooms must be min value 1'}/>
                    </label>
                    <label htmlFor={'price'} className={!apartment && errorPrice ? 'error_label': 'label'}>Ціна квартири за день {errorPrice && errorPrice}
                        <input className={!apartment && errorPrice ?'error_input' : 'input'} name={'price'}  type="number" onChange={e =>
                            setPrice(e.target.value)} placeholder={'Укажіть ціну квартири...'}/>
                    </label>
                </fieldset>
                <button className={'btn btn-default'} name={'submit'} type="submit">Відправити</button>

            </form>
        </div>
    );
}

export default ChangeAllApartment;