import React, {useState} from 'react';
import api from "../../../services/api";
import useAuth from "../../../hook/useAuth";

const AddPhotoApartment = ({id, setLoadedPhoto}) => {
    const [drag, setDrag] = useState(false);
    const auth = useAuth();

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
               Promise.resolve(res).then(function (res){
                   if (res.status === 200){
                       setLoadedPhoto(true);
                   }
               });
            }
        }catch (e) {
            if (e.response.status === 401){
                auth.setRefreshToken(true);
            }
            console.log(e.message);
        }
        setDrag(false);
    }
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