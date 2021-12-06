import React, {useEffect, useState} from 'react';

function CommentsApartment({id}) {
    const  [comments, setComments] = useState([]);
    console.log(comments);
    useEffect(() => {
        fetch('http://localhost:8000/api/v1/comments_apartment')
            .then(value => value.json())
            .then(value => setComments(value.data))
    },[])
    return (
        <div>
            {
                comments && comments.map(c =>
                <li>
                    {c.average_rating}
                </li>)
            }
        </div>
    );
}

export default CommentsApartment;