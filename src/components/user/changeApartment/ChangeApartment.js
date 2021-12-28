import React, {useEffect, useState} from 'react';
import '../User.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {changeApartment} from "../../../services/changeAllApartment_services";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import {InputLabel, Select} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";

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
        console.log(newApartment);
        try{

        }catch (e){
            setNoError(e.message);
        }if (newApartment['id']){
            setApartment(true);
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
                        Нащо змінити
                        <input className={!apartment && errorValue ?'error_input' : 'input'} name={'value'}
                               type="text" onChange={e =>
                            setValue(e.target.value)} placeholder={'Впишіть нове значення'}/>
                        {noError && noError}
                    </label>
                </fieldset>
                <button className={'btn btn-default'} name={'submit'} type="submit">Відправити</button>

            </form>
        </div>
    );
}

export default ChangeApartment;