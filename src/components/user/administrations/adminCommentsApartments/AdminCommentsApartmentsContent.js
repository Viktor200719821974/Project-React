import React from 'react';
import "../../User.css";
import AdminCommentsApartmentsModal from "./AdminCommentsApartmentsModal";

const AdminCommentsApartmentsContent = ({id, apartment, comments, name_user, photo_comments, rating}) => {
    return (

         <AdminCommentsApartmentsModal key={id + 45} id={id}>
            <b className={'title'}>Name user: {name_user}</b>
            <span className="subTitle"><strong>Comments:</strong> {comments} </span>
            <span className="subTitle"><strong>Rating:</strong> {rating}</span>
            <span className="subTitle"><strong>Id apartment:</strong> {apartment} </span>
         </AdminCommentsApartmentsModal>

    );
};

export default AdminCommentsApartmentsContent;