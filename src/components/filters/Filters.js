import React from 'react';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {InputLabel, Select} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import "./Filters.css";

const Filters = ({setCountry, setCountryValue, country, city, setCityValue, setCity, region, setRegion, setRegionValue,
                     setNumbersPeopleValue, numbers_people, setNumbersPeople, numbers_rooms, setNumbersRooms,
                     setNumbersRoomsValue, numbers_squares, setNumbersSquares, setNumbersSquaresValue, price, setPrice,
                     setPriceValue}) => {

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };
    const handleNumbersPeopleChange = (event) => {
        setNumbersPeople(event.target.value);
    };
    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    };
    const handleNumbersRoomsChange = (event) => {
        setNumbersRooms(event.target.value);
    };
    const handleNumbersSquaresChange = (event) => {
        setNumbersSquares(event.target.value);
    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    return (
        <>
        <div className={'filter_div'}>
                    <Box sx={{ minWidth: 120 }} >
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: '#648880',  fontWeight: 400}}>Country</InputLabel>
                            <Select
                                sx={{color: 'black', backgroundColor: 'white', fontWeight: 800, height: 30, width: 200}}
                                value={country}
                                label="country"
                                onChange={handleCountryChange}
                            >
                                <MenuItem value={'country'} sx={{color: 'black', fontWeight: 800}}>country</MenuItem>
                                <MenuItem value={'country_istartswith'} sx={{color: 'black', fontWeight: 800}}>country_istartswith</MenuItem>
                                <MenuItem value={'country_iendswith'} sx={{color: 'black', fontWeight: 800}}>country_iendswith</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <label htmlFor={'value'} className={'label'}>
                       {/*Value*/}
                        <input className={'filter_input'} name={'value'}
                               type="text" onChange={e =>
                            setCountryValue(e.target.value)} placeholder={'Що шукати?'}/>
                    </label>
        </div>
        <div className={'filter_div'}>
        <Box sx={{ minWidth: 120 }} >
            <FormControl fullWidth>
                <InputLabel sx={{ color: '#648880',  fontWeight: 400}}>City</InputLabel>
                <Select
                    sx={{color: 'black', backgroundColor: 'white', fontWeight: 800, height: 30, width: 200}}
                    value={city}
                    label="city"
                    onChange={handleCityChange}
                >
                    <MenuItem value={'city'} sx={{color: 'black', fontWeight: 800}}>city</MenuItem>
                    <MenuItem value={'city_istartswith'} sx={{color: 'black', fontWeight: 800}}>city_istartswith</MenuItem>
                    <MenuItem value={'city_iendswith'} sx={{color: 'black', fontWeight: 800}}>city_iendswith</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <label htmlFor={'value'} className={'label'}>
            {/*Value*/}
            <input className={'filter_input'} name={'value'}
                   type="text" onChange={e =>
                setCityValue(e.target.value)} placeholder={'Що шукати?'}/>
        </label>
        </div>
            <div className={'filter_div'}>
                <Box sx={{ minWidth: 120 }} >
                    <FormControl fullWidth>
                        <InputLabel sx={{ color: '#648880',  fontWeight: 400}}>Region</InputLabel>
                        <Select
                            sx={{color: 'black', backgroundColor: 'white', fontWeight: 800, height: 30, width: 200}}
                            value={region}
                            label="city"
                            onChange={handleRegionChange}
                        >
                            <MenuItem value={'region'} sx={{color: 'black', fontWeight: 800}}>region</MenuItem>
                            <MenuItem value={'region_istartswith'} sx={{color: 'black', fontWeight: 800}}>region_istartswith</MenuItem>
                            <MenuItem value={'region_iendswith'} sx={{color: 'black', fontWeight: 800}}>region_iendswith</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <label htmlFor={'value'} className={'label'}>
                    {/*Value*/}
                    <input className={'filter_input'} name={'value'}
                           type="text" onChange={e =>
                        setRegionValue(e.target.value)} placeholder={'Що шукати?'}/>
                </label>
            </div>
            <div className={'filter_div'}>
                <Box sx={{ minWidth: 120 }} >
                    <FormControl fullWidth>
                        <InputLabel sx={{ color: '#648880',  fontWeight: 400}}>Numbers of people</InputLabel>
                        <Select
                            sx={{color: 'black', backgroundColor: 'white', fontWeight: 800, height: 30, width: 200}}
                            value={numbers_people}
                            label="country"
                            onChange={handleNumbersPeopleChange}
                        >
                            <MenuItem value={'numbers_people'} sx={{color: 'black', fontWeight: 800}}>numbers_people </MenuItem>
                            <MenuItem value={'numbers_people_gt'} sx={{color: 'black', fontWeight: 800}}>numbers_people_gt</MenuItem>
                            <MenuItem value={'numbers_people_lt'} sx={{color: 'black', fontWeight: 800}}>numbers_people_lt </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <label htmlFor={'value'} className={'label'}>
                    {/*Value*/}
                    <input className={'filter_input'} name={'value'}
                           type="text" onChange={e =>
                        setNumbersPeopleValue(e.target.value)} placeholder={'Що шукати?'}/>
                </label>
            </div>
            <div className={'filter_div'}>
                <Box sx={{ minWidth: 120 }} >
                    <FormControl fullWidth>
                        <InputLabel sx={{ color: '#648880',  fontWeight: 400}}>Numbers of rooms</InputLabel>
                        <Select
                            sx={{color: 'black', backgroundColor: 'white', fontWeight: 800, height: 30, width: 200}}
                            value={numbers_rooms}
                            label="country"
                            onChange={handleNumbersRoomsChange}
                        >
                            <MenuItem value={'numbers_rooms'} sx={{color: 'black', fontWeight: 800}}>numbers_rooms </MenuItem>
                            <MenuItem value={'numbers_rooms_gt'} sx={{color: 'black', fontWeight: 800}}>numbers_rooms_gt</MenuItem>
                            <MenuItem value={'numbers_rooms_lt'} sx={{color: 'black', fontWeight: 800}}>numbers_rooms_lt </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <label htmlFor={'value'} className={'label'}>
                    {/*Value*/}
                    <input className={'filter_input'} name={'value'}
                           type="text" onChange={e =>
                        setNumbersRoomsValue(e.target.value)} placeholder={'Що шукати?'}/>
                </label>
            </div>
            <div className={'filter_div'}>
                <Box sx={{ minWidth: 120, marginTop: 5 }} >
                    <FormControl fullWidth>
                        <InputLabel sx={{ color: '#648880',  fontWeight: 400}}>Numbers of squares</InputLabel>
                        <Select
                            sx={{color: 'black', backgroundColor: 'white', fontWeight: 800, height: 30, width: 200}}
                            value={numbers_squares}
                            label="country"
                            onChange={handleNumbersSquaresChange}
                        >
                            <MenuItem value={'numbers_squares'} sx={{color: 'black', fontWeight: 800}}>numbers_squares </MenuItem>
                            <MenuItem value={'numbers_squares_gt'} sx={{color: 'black', fontWeight: 800}}>numbers_squares_gt</MenuItem>
                            <MenuItem value={'numbers_squares_lt'} sx={{color: 'black', fontWeight: 800}}>numbers_squares_lt </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <label htmlFor={'value'} className={'label'}>
                    {/*Value*/}
                    <input className={'filter_input'} name={'value'}
                           type="text" onChange={e =>
                        setNumbersSquaresValue(e.target.value)} placeholder={'Що шукати?'}/>
                </label>
            </div>
            <div className={'filter_div'}>
                <Box sx={{ minWidth: 120, marginTop: 5 }} >
                    <FormControl fullWidth>
                        <InputLabel sx={{ color: '#648880',  fontWeight: 400}}>Price</InputLabel>
                        <Select
                            sx={{color: 'black', backgroundColor: 'white', fontWeight: 800, height: 30, width: 200}}
                            value={price}
                            label="country"
                            onChange={handlePriceChange}
                        >
                            <MenuItem value={'price'} sx={{color: 'black', fontWeight: 800}}>price</MenuItem>
                            <MenuItem value={'price_gt'} sx={{color: 'black', fontWeight: 800}}>price_gt</MenuItem>
                            <MenuItem value={'price_lt'} sx={{color: 'black', fontWeight: 800}}>price_lt</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <label htmlFor={'value'} className={'label'}>
                    {/*Value*/}
                    <input className={'filter_input'} name={'value'}
                           type="text" onChange={e =>
                        setPriceValue(e.target.value)} placeholder={'Що шукати?'}/>
                </label>
            </div>
        </>
    );
};

export default Filters;