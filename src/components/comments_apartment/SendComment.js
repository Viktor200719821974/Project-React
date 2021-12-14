import React, {useState} from 'react';
import {sendCommentApartment} from "../../services/sendCommentApartment_service";

function SendComment({id}) {
    const [comments, setComments] = useState('');
    const [rating, setRating] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sendComment = await sendCommentApartment ({
           comments,
            rating,
            id
        });

    }
    return (
        <div>
            <form className={'form_register'} onSubmit={handleSubmit}>
                <fieldset className={'register-group'}>
                    <legend>Залиште свій коментар</legend>
                    <label htmlFor={'comments'} className={'send_label'}>Коментар
                        <input className={'send_input'} name={'comments'} type="text" onChange={e => setComments(e.target.value)} placeholder={'Напишіть щось...'}/>
                    </label>
                    <label htmlFor="rating" className={'send_label'}>Оцінка
                        <input className={'send_input'} name={'rating'}  type="number" onChange={e => setRating(e.target.value)} placeholder={'Поставте оцінку від 1 до 10'}/>
                    </label>
                </fieldset>
                <button className={'btn btn-default'} name={'submit'} type="submit">Відправити</button>

            </form>
        </div>
    );
}

export default SendComment;