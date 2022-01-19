import React, {useEffect, useState} from 'react';
import "./CommentsApartment.css";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import api from "../../services/api";
import AddPhotoCommentApartmentModal from "./AddPhotoCommentApartmentModal";

function SendComment({id, setStatusResponse}) {

    const [comments, setComments] = useState('');
    const [rating, setRating] = useState();
    const [errorRating, setErrorRating] = useState();
    const [errorComments, setErrorComments] = useState();
    const [noError, setNoError] = useState();
    const [commentsOk, setCommentsOk] = useState(false);
    const [returnComment, setReturnComment] = useState([]);
    const [loadedPhoto, setLoadedPhoto] = useState(false);

    const handleSubmit = async (e) => {
        let obj = {comments, rating};
        e.preventDefault();
        try {
            const res = await api.auth.sendCommentsApartment(id, obj);
            if (res.status === 201){
                setCommentsOk(true);
                setReturnComment(res.data);
                setStatusResponse(false);
            }
        }catch (e) {
            if (e.response.data.comments){
                setErrorComments(e.response.data.comments);
            }
            if (e.response.data.rating){
                setErrorRating(e.response.data.rating);
            }
            setNoError(e.message);
        }
    }
    useEffect(() => {
        if (loadedPhoto){
            setLoadedPhoto(false);
        }
    },[loadedPhoto, id])

    return (
        <div>
            {!loadedPhoto && commentsOk && <Alert severity="success">
                <AlertTitle>Вітаємо</AlertTitle>
                <strong>Ваш відгук був добавлений!!!</strong>
            </Alert>}
            {loadedPhoto && <Alert severity="success">
                <strong>Фото було додано до відгуку!!!</strong>
            </Alert>}
            {noError && !commentsOk && <Alert severity="error">{noError}</Alert>}
            <form className={'form_register'} onSubmit={handleSubmit}>
                    <label htmlFor={'comments'} className={!commentsOk && errorComments ? 'error_label': 'label'}>
                        Коментар {errorComments && errorComments}
                        <textarea name="comments" id="text_box" cols="80" rows="7" value={comments}
                                  onChange={e => setComments(e.target.value)}/>
                    </label>
                    <br/>
                    <label htmlFor="rating" className={!commentsOk && errorRating ? 'error_label': 'label'}>
                        Поставте оцінку
                        {errorRating && errorRating}
                        <input className={!commentsOk && errorRating ?'error_input' : 'input_commentUser'}
                               name={'rating'}
                               type="number" onChange={e =>
                            setRating(e.target.value)} placeholder={'від 1 до 10'}/>
                    </label>
                {!commentsOk && <button className={'btn btn-default'} name={'submit'} type="submit">Відправити</button>}
            </form>
            {commentsOk && <div className={'div_sendComment_apartment_button'}>
                  <AddPhotoCommentApartmentModal id={returnComment.id} key={returnComment.id + 76}
                                                 setLoadedPhoto={setLoadedPhoto} setStatusResponse={setStatusResponse}/>
            </div>
            }
        </div>
    );
}

export default SendComment;