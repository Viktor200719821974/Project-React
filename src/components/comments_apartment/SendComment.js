import React, {useState} from 'react';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import api from "../../services/api";
import useAuth from "../../hook/useAuth";

function SendComment({id, setStatusResponse}) {

    const [comments, setComments] = useState('');
    const [rating, setRating] = useState();
    const [errorRating, setErrorRating] = useState();
    const [errorComments, setErrorComments] = useState();
    const [noError, setNoError] = useState();
    const [commentsOk, setCommentsOk] = useState(false);
    const auth = useAuth();

    const handleSubmit = async (e) => {
        let obj = {comments, rating};
        e.preventDefault();
        try {
            const res = await api.auth.sendCommentsApartment(id, obj);
            if (res.status === 201){
                setCommentsOk(true);
                setStatusResponse(true);
            }
        }catch (e) {
            if (e.response.status === 401){
                auth.setRefreshToken(true);
            }
            if (e.response.data.comments){
                setErrorComments(e.response.data.comments);
            }
            if (e.response.data.rating){
                setErrorRating(e.response.data.rating);
            }
            setNoError(e.message);
        }
    }

    return (
        <div>
            {commentsOk && <Alert severity="success">
                <AlertTitle>Вітаємо</AlertTitle>
                <strong>Ваш відгук був добавлений!!!</strong>
            </Alert>}
            {noError && !commentsOk && <div className={'noError'}>*{noError}</div>}
            <form className={'form_register'} onSubmit={handleSubmit}>
                <fieldset className={'register-group'}>
                    <legend>Залиште свій коментар</legend>
                    <label htmlFor={'comments'} className={!commentsOk && errorComments ? 'error_label': 'label'}>
                        Коментар {errorComments && errorComments}
                        <input className={!commentsOk && errorComments ?'error_input' : 'input'} name={'comments'} type="text" onChange={e =>
                            setComments(e.target.value)} placeholder={'Напишіть щось...'}/>
                    </label>
                    <label htmlFor="rating" className={!commentsOk && errorRating ? 'error_label': 'label'}>Оцінка
                        {errorRating && errorRating}
                        <input className={!commentsOk && errorRating ?'error_input' : 'input'} name={'rating'}  type="number" onChange={e =>
                            setRating(e.target.value)} placeholder={'Поставте оцінку від 1 до 10'}/>
                    </label>
                </fieldset>
                <button className={'btn btn-default'} name={'submit'} type="submit">Відправити</button>

            </form>
        </div>
    );
}

export default SendComment;