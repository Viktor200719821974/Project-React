import React from 'react';
import "../../User.css";

const FormChangeComment = ({setChangeComment, comment, changeComment}) => {
    console.log(comment);
    return (
        <div>
            {/*<form action="">*/}
                <legend className={'label'}>Change Comments</legend>
                <textarea name="comments" id="text_box" cols="70" rows="7" value={changeComment}
                          onChange={e => setChangeComment(e.target.value)}>{comment}</textarea>

            {/*</form>*/}
        </div>
    );
};

export default FormChangeComment;