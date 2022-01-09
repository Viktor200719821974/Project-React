import React, {useState} from 'react';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import api from "../../../services/api";

const SendCommentUser = ({id, setStatusResponse}) => {
    console.log(id);
    const [comments, setComments] = useState('');
    const [rating, setRating] = useState();
    const [errorRating, setErrorRating] = useState();
    const [errorComments, setErrorComments] = useState();
    const [noError, setNoError] = useState();
    const [commentsOk, setCommentsOk] = useState(false);

    const handleSubmit = async (e) => {
        let obj = {comments, rating};
        e.preventDefault();
        try {
            const res = await api.auth.sendCommentUser(id, obj);
            if (res.status === 201){
                setCommentsOk(true);
                setStatusResponse(true);
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
    return (
        <div>
            {commentsOk && <Alert severity="success">
                <AlertTitle>Вітаємо</AlertTitle>
                <strong>Ваш відгук був добавлений!!!</strong>
            </Alert>}
            {noError && !commentsOk && <div className={'noError'}>*{noError}</div>}
            <form className={'form_register'} onSubmit={handleSubmit}>
                    <label htmlFor={'comments'} className={!commentsOk && errorComments ? 'error_label': 'label'}>
                        Коментар {errorComments && errorComments}
                        <textarea name="comments" id="text_box" cols="70" rows="7" value={comments}
                                  onChange={e => setComments(e.target.value)}/>
                    </label>
                <br/>
                    <label htmlFor="rating" className={!commentsOk && errorRating ? 'error_label': 'label'}>Поставте оцінку
                        {errorRating && errorRating}
                        <input className={!commentsOk && errorRating ?'error_input' : 'input_commentUser'} name={'rating'}
                               type="number" onChange={e => setRating(e.target.value)}
                               placeholder={'від 1 до 10'}/>
                    </label>
                <div className={'SendCommentUser_button_form'}>
                <button className={'btn btn-default'} name={'submit'} type="submit">Відправити</button>
                </div>
            </form>
        </div>
    );
};

export default SendCommentUser;