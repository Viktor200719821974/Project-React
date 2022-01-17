import React, {useEffect, useState} from 'react';
import "../../../comments_apartment/CommentsApartment.css";
import api from "../../../../services/api";
import useAuth from "../../../../hook/useAuth";
import ImageCommentUserModal from "./ImageCommentUserModal";

const ImageCommentUser = ({id}) => {
    const [photo, setPhoto] = useState([]);
    const auth = useAuth();

    useEffect(() => {
        try{
            const res = api.auth.getCommentUsers(id);
            // Promise.resolve(res).then(function (res){
            //     setPhoto(res.data.photo_comments_user);
            // });
            new Promise((resolve) => {
                resolve(res.then(function (res){
                    if (res.status === 200){
                        setPhoto(res.data.photo_comments_user);
                    }
                }));
            }).catch(e =>{
                if (e.response.status === 401){
                    auth.setRefreshToken(true);
                }
            })
        }catch (e) {
            console.log(e.message);
        }
    },[auth, id])
    return (
        <div className={'div_image_comment_apartment_main'}>
            {
                photo && photo.map((c, index) => <ImageCommentUserModal key={index} image={c.url}>
                    <div  className={'div_image_comment_apartment'}>
                        <img className={'image_comment_apartment'} src={c.url} alt="photo_comment_user"/>
                    </div>
                </ImageCommentUserModal>)
            }
        </div>
    );
};

export default ImageCommentUser;