import React from 'react';
import '../User.css';
import UserCommentsApartmentsModal from "./UserCommentsApartmentModal";

function CommentsApartment({id, email, name, comments, dateSelection, setStatusResponse, surname}) {
    return (

    <UserCommentsApartmentsModal key={id+345} id={id} comments={comments} email={email} dateSelection={dateSelection}
                                 setStatusResponse={setStatusResponse} >
             <div>
                 <span >{name} {surname}</span>
            </div>
        </UserCommentsApartmentsModal>

    );
}

export default CommentsApartment;