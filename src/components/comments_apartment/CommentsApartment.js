import React, {useEffect, useState} from 'react';
import './CommentsApartment.css';

function CommentsApartment({id}) {

    const [comments, setComments] = useState([]);
    const [noPhoto, setNoPhoto] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8000/api/v1/comments_apartment')
            .then(value => value.json())
            .then(value => setComments(value.data));
        setLoading(false);
    },[])

    const filter = comments.filter(comments => comments.apartment === id);
    const photo = filter.map(y => y['photo_comments_apartment']);
    // const b = photo.map(x => x.length !==0);

    // useEffect(() => {
    //     if (b.map(x => console.log(x))){
    //         setNoPhoto(true);
    //     }
    // },[])

    if (loading){
        return <div>Loading...</div>
    }
    return (
        <div>
            {filter.length === 0 ? (<h3>No Comments</h3>) : (<h3>Comments:</h3>)}
            {
                filter && filter.map((c, index) =>
                <div className={'div_comments_apartment'} key={index}>
                    <h5 className={'h5_text'}>{c.name_user}</h5>
                    <h4 className={'h4_text'}>{c.comments}</h4>

                    {noPhoto && <img className={'comments_photo'}
                         src={c.photo_comments_apartment.map(x=> x["url"] )} alt="photo_comments_apartment" />}
                </div>
                )
            }
        </div>
    );
}

export default CommentsApartment;