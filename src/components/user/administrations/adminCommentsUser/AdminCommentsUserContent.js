import React from 'react';
import "../../User.css";
import AdminCommentsUserModal from "./AdminCommentsUserModal";

const AdminCommentsUserContent = ({id, user, comments, name_user, photo_comments, rating, statusResponse,
                                      setStatusResponse}) => {
    return (
        <AdminCommentsUserModal key={id + 55} id={id} statusResponse={statusResponse}
                                setStatusResponse={setStatusResponse}>
            <b className={'title'}>Name user: {name_user}</b>
            <span className="subTitle"><strong>Comments:</strong><br/> {comments} </span>
            <span className="subTitle"><strong>Rating:</strong>{rating}</span>
            <span className="subTitle"><strong>Id user:</strong>{user} </span>
        </AdminCommentsUserModal>
    );
};

export default AdminCommentsUserContent;