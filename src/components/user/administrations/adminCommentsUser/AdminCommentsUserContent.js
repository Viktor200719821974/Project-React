import React, {useEffect, useState} from 'react';
import "../../User.css";
import AdminCommentsUserModal from "./AdminCommentsUserModal";
import api from "../../../../services/api";

const AdminCommentsUserContent = ({id, user, comments, name_user, rating, statusResponse,
                                      setStatusResponse}) => {
    const [photo, setPhoto] = useState([]);
    const [comment, setComment] = useState([]);

    useEffect( () => {
        async function fetchData(){
            try{
                const res = await api.auth.getCommentUsers(id);
                setComment(res.data);
                setPhoto(res.data.photo_comments_user);
                if (statusResponse){
                    setStatusResponse(false);
                }
            }catch (e){
                console.log(e.message);
            }
        }
        fetchData();
    },[statusResponse, id])
    return (
        <AdminCommentsUserModal key={id + 55} id={id} statusResponse={statusResponse}
                                setStatusResponse={setStatusResponse} comment={comment}>
            <b className={'title'}>Name user: {name_user}</b>
            <span className="subTitle"><strong>Comments:</strong><br/> {comments} </span>
            <span className="subTitle"><strong>Rating:</strong>{rating}</span>
            <span className="subTitle"><strong>Id user:</strong>{user} </span>
            <div className={'div_image_comment_apartment_main'}>
                {photo && photo.map((c, index) =><div key={index} className={'div_image_comment_apartment'}>
                    <img className={'image_comment_apartment'} src={c.url} alt="photo_comment_apartment"/>
                </div>)}
            </div>
        </AdminCommentsUserModal>
    );
};

export default AdminCommentsUserContent;