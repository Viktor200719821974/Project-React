import React from 'react';
import './CommentsApartment.css';
import ImageCommentApartment from "./imageCommentsApartment/ImageCommentApartment";

function CommentsApartment({filter, noComments}) {
    return (
        <div>
            {!noComments ? (<h3>No Comments</h3>) : (<h3>Comments:</h3>)}
            {
                filter && filter.map((c, index) =>
                <div className={'div_comments_apartment'} key={index}>
                    <div className={'h5_text'}>{c.name_user}</div>
                    <div className={'h4_text'}>{c.comments}</div>
                    <ImageCommentApartment key={c.id + 566} id={c.id}/>
                </div>
                )
            }
        </div>
    );
}

export default CommentsApartment;