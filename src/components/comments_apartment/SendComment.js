import React, {useState} from 'react';
import {sendCommentApartment} from "../../services/sendCommentApartment_service";
import {number} from "prop-types";

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
                {/*method={'Link'} action={'http://localhost:3000'}*/}
                <fieldset className={'register-group'}>
                    <legend>Залиште свій коментар</legend>
                    <label htmlFor={'comments'} >Коментар
                        <input name={'comments'} type="text" onChange={e => setComments(e.target.value)} placeholder={'Напишіть щось...'}/>
                    </label>
                    <label htmlFor="rating">Оцінка
                        <input name={'rating'}  type="number" onChange={e => setRating(e.target.value)} placeholder={'Поставте оцінку від 1 до 10'}/>
                    </label>
                </fieldset>
                <button className={'btn btn-default'} name={'submit'} type="submit">Відправити</button>

            </form>
        </div>
    );
}

export default SendComment;