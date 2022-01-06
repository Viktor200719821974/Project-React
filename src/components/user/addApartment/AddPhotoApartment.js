import React from 'react';
import Button from "@mui/material/Button";

const AddPhotoApartment = () => {
    const addPhotoApartment = async (e) => {
        e.preventDefault();
        try{

        }catch (e) {
            console.log(e.message);
        }
    }
    return (
        <div>
            Виберіть файл
            <input type="file"/>
            <Button onClick={addPhotoApartment} variant="contained" color="success">Додати</Button>
        </div>
    );
};

export default AddPhotoApartment;