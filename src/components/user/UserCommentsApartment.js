import React, {useState} from 'react';
import '../comments_apartment/CommentsApartment.css';


function CommentsApartment({comments, noComments}) {
    const [noPhoto, setNoPhoto] = useState(false);
    return (
        <div>
            {!noComments ? (<h3>No Comments</h3>) : (<h3>Comments:</h3>)}
            {
                comments && comments.map((c, index) =>
                    <div className={'div_comments_apartment'} key={index}>
                        <div className={'h5_text'}>{c.name_user}</div>
                        <div className={'h4_text'}>{c.comments}</div>

                        {noPhoto && <img className={'comments_photo'}
                                         src={c.photo_comments_apartment.map(x=> x["url"] )} alt="photo_comments_apartment" />}
                    </div>
                )
            }
        </div>
    );
}

export default CommentsApartment;