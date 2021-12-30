import React from 'react';
import AdminModal from "./AdminModal";
import "../../User.css";

const AdminContent = ({id, email, created_at, updated_at, is_active, is_staff, is_superuser}) => {
    return (
            <AdminModal key={id + 35} id={id}>
                <b className={'title'}>Email: {email}</b>
                <span className="subTitle">Date create:<br/>{created_at} </span>
                    <span className="subTitle">Date update:<br/>{updated_at}</span>
                <span className="subTitle">Active:<br/> {is_active ? 'Yes' : 'No'}
                    <span className="subTitle">Admin:<br/> {is_staff ? 'Yes' : 'No'}</span>
                    <span className={'subTitle'}>Super Admin: <br/>{is_superuser ? 'Yes' : 'No'}</span>
            </span>
            </AdminModal>
    );
};

export default AdminContent;