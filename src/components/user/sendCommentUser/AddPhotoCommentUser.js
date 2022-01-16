import React, {useState} from 'react';
import api from "../../../services/api";
import useAuth from "../../../hook/useAuth";

const AddPhotoCommentUser = ({id, setLoadedPhoto, setStatusResponse}) => {
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
        formData.append('photo_comments_user', files[0]);
        try{
            const res = api.auth.addPhotoCommentUser(id, formData);
            Promise.resolve(res).then(function (res){
                if (res.status === 200){
                    console.log(res);
                    setLoadedPhoto(true);
                    setStatusResponse(true);
                }
            });
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

export default AddPhotoCommentUser;