import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import api from "../../../services/api";
import axios from "axios";

const AddPhotoApartment = ({id}) => {
    const [file, setFile] = useState();
    console.log(file);
    const UploadContent = (event) => {
        event.preventDefault();
        if (event.target.files[0]) {
            setFile(event.target.files[0]);
        }
        console.log(event.target.files[0]);
    };

    const OnSumbit = (event) => {
        const accessToken = localStorage.getItem('access');
        const formData = new FormData();
        formData.append('photo_rooms', file);
        console.log(formData);
        axios.patch(
            `http://localhost:8000/api/v1/apartments/${id}/photo_rooms`,
            formData,
            {
                headers: {
                    "Content-type": "multipart/form-data",
                    Authorization: `Bearer ${accessToken}`
                },
            }
        )
            .then(res => {
                console.log(`Success` + res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
    <div>
        <h1 >Зона тестов</h1>
        <input
            accept="image/jpeg"
            id="contained-button-content"
            multiple
            type="file"
            onChange={UploadContent}
        />
        <Button variant="contained" color="primary" onClick={OnSumbit}>
            Сохранить и закрыть
        </Button>
    </div>
    // uploadFile(event) {
    //
    //     var reader = new FileReader();
    //     reader.onload = (function(theFile) {
    //
    //         return function(e) {
    //
    //             axios({
    //                 method: 'post',
    //                 url: 'http://localhost:5000/api/upload/',
    //                 params: {
    //                     name: theFile.name,
    //                     file: e.target.result
    //                 }
    //             })
    //                 .then(res => console.log(res))
    //                 .catch(err => console.log(err));
    //
    //         };
    //
    //     })(event.target.files[0]);
    //
    //     reader.readAsDataURL(event.target.files[0]);
    //
    // }
       // ##########################################################################################
    // const [url, setUrl] = useState([]);
    // const [photo_rooms, setPhotoRooms] = useState();
    // const [file, setFiles] = useState(null)
    // const inputRef = useRef()
    //
    // useCustomFetchHook(file)
    // const fileInput = React.createRef();
    // console.log(photo_rooms);
    // const addPhotoApartment = async (e) => {
    //     // let obj = {['url'] : url};
    //     e.preventDefault();
    //
    // }
   // const handleSubmit = (event) => {
   //      event.preventDefault();
   //         setPhotoRooms(fileInput.current.files[0].name);
   //          console.log(fileInput);
   //  }
    // useEffect(async() => {
    //     try{
    //         const res = await api.auth.addPhotoRooms(id, photo_rooms);
    //     }catch (e) {
    //         console.log(e.message);
    //     }
    // },[photo_rooms]);
    // const handleAddPhoto = (e) => {
    //     setPhotoRooms(e.target.value);
    //     console.log(e.target.file);
    // }
    // return (
    //     <div>
    //         <form onSubmit={handleSubmit}>
    //         {/*<input type="file" ref={fileInput}/>*/}
    //         {/*onInput={(e) => setPhotoRooms(e.target.files[0]['name'])}*/}
    //
    //             <button type="submit">Submit</button>
    //         </form>
    //         {/*<Button onClick={addPhotoApartment} variant="contained" color="success">Додати</Button>*/}
    //     </div>
    );
};

export default AddPhotoApartment;