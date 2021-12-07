import React, {useEffect, useState} from 'react';
import './CommentsApartment.css';

function CommentsApartment({id}) {
    const  [comments, setComments] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/api/v1/comments_apartment')
            .then(value => value.json())
            .then(value => setComments(value.data))

    },[])

    const filter = comments.filter(comments => comments.apartment === id);
    return (
        <div>
            {filter.length !== 0 ? (<h3>Comments:</h3>) : (<h3>No Comments</h3>)}
            {
                filter && filter.map((c) =>
                <ul>
                <li >
                    {c.comments}
                    <img className={'comments_photo'}
                         src={c.photo_comments_apartment.map(x=> x["url"]) !== undefined
                             ? c.photo_comments_apartment.map(x=> x["url"]) : 'null'} alt="photo_comments_apartment"/>
                </li>
                </ul>
                )
            }
        </div>
    );
}

export default CommentsApartment;