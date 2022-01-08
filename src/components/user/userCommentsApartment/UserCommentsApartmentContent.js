import React, {useEffect, useState} from 'react';
import '../../comments_apartment/CommentsApartment.css';
import UserCommentsApartmentsModal from "./UserCommentsApartmentModal";

function CommentsApartment({id, noComments, date_arrival, date_departure, user_emailDate, number_days, number_peoples,
                               count, comments}) {
    const [noPhoto, setNoPhoto] = useState(false);
    console.log(noComments);
    return (
        <UserCommentsApartmentsModal key={id+345} id={id} user_emailDate={user_emailDate} comments={comments} >

            <div>
                {comments.map(c => <span>{c.name_user}</span>)}
                {/*<span >Date arrival: {date_arrival}</span>*/}
                {/*<span >Date departure: {date_departure}</span>*/}
                {/*<span >Number of days: {number_days}</span>*/}
                {/*<span >Number of peoples: {number_peoples}</span>*/}
                {/*<span >Email: {user_emailDate}</span>*/}
                    {/*{apartment && apartment.map(c => c.country)}*/}
                    {/*   <h3>Date arrival:</h3> {date_arrival}*/}
                    {/*<h3>Date departure:</h3> {date_departure}*/}
                    {/*    <div className={'div_comments_apartment'} >*/}
                    {/*        <div className={'h5_text'}>{name}</div>*/}
                    {/*        <div className={'h4_text'}>{comment}</div>*/}

                    {/*{noPhoto && <img className={'comments_photo'}*/}
                    {/*                 src={c.photo_comments_apartment.map(x=> x["url"] )} alt="photo_comments_apartment" />}*/}
                    {/*    </div>*/}
            </div>
        </UserCommentsApartmentsModal>

    );
}

export default CommentsApartment;