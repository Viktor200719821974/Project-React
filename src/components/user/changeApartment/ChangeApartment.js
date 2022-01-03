import React, {useState} from 'react';
import '../User.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import {InputLabel, Select} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import api from "../../../services/api";

function ChangeApartment({id, setStatusResponse}) {
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [errorValue, setErrorValue] = useState();
    const [noError, setNoError] = useState();
    const [apartment, setApartment] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let obj = {[key]: value};
        try{
            const res = await api.auth.changeApartment(id, obj);
            if(res.status === 200){
                setApartment(true);
                setStatusResponse(true);
            }
        }catch (e) {
                if (e.response.data.country) {
                    setErrorValue(e.response.data.country);
                }
                if (e.response.data.city) {
                    setErrorValue(e.response.data.city);
                }
                if (e.response.data.region) {
                    setErrorValue(e.response.data.region);
                }
                if (e.response.data.numbers_squares) {
                    setErrorValue(e.response.data.numbers_squares);
                }
                if (e.response.data.numbers_people) {
                    setErrorValue(e.response.data.numbers_people);
                }
                if (e.response.data.numbers_rooms) {
                    setErrorValue(e.response.data.numbers_rooms);
                }
                if (e.response.data.price) {
                    setErrorValue(e.response.data.price);
                }
            setNoError(e.response.statusText);
        }
    }
    const handleChange = (event) => {
        setKey(event.target.value);
    };

    return (
        <div>
            {apartment && <Alert severity="success">
                <AlertTitle>Вітаємо</AlertTitle>
                <strong>Данні про Вашу квартиру було змінено !!!</strong>
            </Alert>}
            {noError && !apartment && <div className={'noError'}>*{noError}</div>}
            <form className={'form_register'} onSubmit={handleSubmit}>
                <fieldset className={'register-group'}>
                    <legend>Щоб змінити виберіть, що змінити і впишіть нащо змінити.</legend>
                    <Box sx={{ minWidth: 120 }} >
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: '#648880',  fontWeight: 400}}>Що змінити</InputLabel>
                            <Select
                                sx={{color: 'black', backgroundColor: 'white', fontWeight: 800, height: 30, width: 200}}
                                // labelId="demo-simple-select-label"
                                // id="demo-simple-select"
                                value={key}
                                label="Що змінити"
                                onChange={handleChange}
                            >
                                <MenuItem value={'country'} sx={{color: 'black', fontWeight: 800}}>country</MenuItem>
                                <MenuItem value={'city'} sx={{color: 'black', fontWeight: 800}}>city</MenuItem>
                                <MenuItem value={'region'} sx={{color: 'black', fontWeight: 800}}>region</MenuItem>
                                <MenuItem value={'numbers_people'} sx={{color: 'black', fontWeight: 800}}>numbers_people</MenuItem>
                                <MenuItem value={'numbers_rooms'} sx={{color: 'black', fontWeight: 800}}>numbers_rooms</MenuItem>
                                <MenuItem value={'numbers_squares'} sx={{color: 'black', fontWeight: 800}}>numbers_squares</MenuItem>
                                <MenuItem value={'price'} sx={{color: 'black', fontWeight: 800}}>price</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <label htmlFor={'На що змінити'} className={!apartment && errorValue ? 'error_label': 'label'}>
                        Нащо змінити {errorValue && errorValue}
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