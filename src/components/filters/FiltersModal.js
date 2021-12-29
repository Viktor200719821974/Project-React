import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Filters from "./Filters";
import FilterListIcon from '@mui/icons-material/FilterList';

const style = {
    position: 'absolute',
    top: '57%',
    left: '10%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    height: 650,
    overflow: 'scroll',
    bgcolor: '#39445a',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function FiltersModal({country, setCountry, setCountryValue, setCityValue, setCity, city, region,
                                         setRegion, setRegionValue, setNumbersPeopleValue, numbers_people,
                                         setNumbersPeople, numbers_rooms, setNumbersRooms, setNumbersRoomsValue,
                                         numbers_squares, setNumbersSquares, setNumbersSquaresValue, price, setPrice,
                                         setPriceValue}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} variant="outlined" color="success" startIcon={<FilterListIcon /> }
                    sx={{fontWeight:800}}>
                Filters
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={false}
            >
                <Box sx={style}>
                    <Filters
                        setCountryValue={setCountryValue}
                        setCountry={setCountry}
                        country={country}
                        setCityValue={setCityValue}
                        setCity={setCity}
                        city={city}
                        setNumbersPeopleValue={setNumbersPeopleValue}
                        numbers_people={numbers_people}
                        setNumbersPeople={setNumbersPeople}
                        region={region}
                        setRegion={setRegion}
                        setRegionValue={setRegionValue}
                        numbers_rooms={numbers_rooms}
                        setNumbersRooms={setNumbersRooms}
                        setNumbersRoomsValue={setNumbersRoomsValue}
                        numbers_squares={numbers_squares}
                        setNumbersSquares={setNumbersSquares}
                        setNumbersSquaresValue={setNumbersSquaresValue}
                        price={price}
                        setPrice={setPrice}
                        setPriceValue={setPriceValue}
                    />
                </Box>
            </Modal>
        </div>
    );
}




