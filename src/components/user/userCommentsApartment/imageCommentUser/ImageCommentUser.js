import React, {useEffect, useState} from 'react';
import "../../../comments_apartment/CommentsApartment.css";
import api from "../../../../services/api";
import ImageCommentUserModal from "./ImageCommentUserModal";

const ImageCommentUser = ({id}) => {
    const [photo, setPhoto] = useState([]);

    useEffect(() => {
        try{
            const res = api.auth.getCommentUsers(id);
            Promise.resolve(res).then(function (res){
                setPhoto(res.data.photo_comments_user);
            });
        }catch (e) {
            console.log(e.message);
        }
    },[id])
    return (
        <div className={'div_image_comment_apartment_main'}>
            {
                photo && photo.map((c, index) => <ImageCommentUserModal key={index} image={c.url}
                                                                  id={id} >
                    <div  className={'div_image_comment_apartment'}>
                        <img className={'image_comment_apartment'} src={c.url} alt="photo_comment_user"/>
                    </div>
                </ImageCommentUserModal>)
            }
        </div>
    );
};

export default ImageCommentUser;