import React from 'react';
import "../../User.css";
import AdminImageCommentApartment from "../adminCommentsApartments/imageCommentApartment/AdminImageCommentApartment";

const FormChangeCommentApartment = ({setChangeComment, comment, changeComment, id, setStatusResponse}) => {
    return (
        <div>
            <legend className={'label'}>Change Comment</legend>
            <textarea className={'changeComment_textarea'} name="comments" id="text_box" cols="70" rows="7" value={changeComment}
                      onChange={e => setChangeComment(e.target.value)}>{comment}</textarea>
            <h4>Comment:</h4>
            <div className={'changeComment_div'}>
                {comment}
            </div>
            <AdminImageCommentApartment key={id + 301} id={id} setStatusResponse={setStatusResponse}/>
        </div>
    );
};

export default FormChangeCommentApartment;