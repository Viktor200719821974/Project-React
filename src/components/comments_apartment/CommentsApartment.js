import React, {useEffect, useState} from 'react';
import './CommentsApartment.css';

function CommentsApartment({id}) {
    const [comments, setComments] = useState([]);
    const [noPhoto, setNoPhoto] = useState(false);
    // const [loading, setLoading] = useState(false);
    console.log(comments)
    useEffect(() => {
        fetch('http://localhost:8000/api/v1/comments_apartment')
            .then(value => value.json())
            .then(value => setComments(value.data))

    },[])

    const filter = comments.filter(comments => comments.apartment === id);
    const photo = filter.map(y => y['photo_comments_apartment']);
    const b = photo.map(x => x.length !==0);
    // const c = b.map(x => x);
    // console.log(c)
    // useEffect(() =>{
    //     if (b === true){
    //         setNoPhoto(true);
    // }
    // },[])

    return (
        <div>
            {filter.length === 0 ? (<h3>No Comments</h3>) : (<h3>Comments:</h3>)}
            {
                filter && filter.map((c, index) =>
                <div className={'div_comments_apartment'} key={index}>
                    <h5 className={'h5_text'}>{c.name_user}</h5>
                {/*<span className={'span_comments_apartment'}>*/}
                    <h4 className={'h4_text'}>{c.comments}</h4>
                    {noPhoto && <img className={'comments_photo'}
                         src={c.photo_comments_apartment.map(x=> x["url"] )} alt="photo_comments_apartment" />}
                    {/*{noPhoto && <img className={'comments_photo'}*/}
                    {/*                src={'hello'} alt="photo_comments_apartment" />}*/}
                {/*</span>*/}
                </div>
                )
            }
        </div>
    );
}

export default CommentsApartment;