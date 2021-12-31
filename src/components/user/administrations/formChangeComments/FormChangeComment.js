import React from 'react';
import "../../User.css";

const FormChangeComment = ({setChangeComment, comment, changeComment}) => {
    return (
        <div>
            <label htmlFor={'Comments'} className={'label'}>
                Change Comments
                <input type="text" className={'changeComment_input'} name={'value'} value={changeComment} onChange={e =>
                    setChangeComment(e.target.value)} placeholder={comment}/>
            </label>
        </div>
    );
};

export default FormChangeComment;