import React, {useEffect, useState} from 'react';
import api from "../../../services/api";

const AddPhotoApartment = ({id}) => {
    const [loadedPhoto, setLoadedPhoto] = useState(false);
    const [drag, setDrag] = useState(false);

    function dragStartHandler (e) {
        e.preventDefault();
        setDrag(true);
    }
    function dragLeaveHandler (e) {
        e.preventDefault();
        setDrag(false);
    }
    function onDropHandler(e){
        e.preventDefault();
        let files = [...e.dataTransfer.files];
        const formData = new FormData();
        formData.append('photo_rooms', files[0]);
        try{
            const res = api.auth.addPhotoRooms(id, formData);
            if (res){

            }
            console.log(res);
        }catch (e) {

            console.log(e.response.status);
        }
        setDrag(false);
    }
    useEffect(() => {

    },[])
    return (
    <div>
        {drag ? <div className={'drop-area'}
                     onDragStart={e => dragStartHandler(e)}
                     onDragLeave={e => dragLeaveHandler(e)}
                     onDragOver={e => dragStartHandler(e)}
                     onDrop={e => onDropHandler(e)}
            >Відпустіть файл, щоб його завантажити</div> :
            <div className={'drop-area'}
                 onDragStart={e => dragStartHandler(e)}
                 onDragLeave={e => dragLeaveHandler (e)}
                 onDragOver={e => dragStartHandler(e)}
            >Перенесіть файл, щоб його завантажити</div>
        }
        </div>
    );
};

export default AddPhotoApartment;