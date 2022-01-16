import React, {useEffect, useState} from 'react';
import "../CommentsApartment.css";
import api from "../../../services/api";
import ImageCommentApartmentModal from "./ImageCommentApartmentModal";
import useAuth from "../../../hook/useAuth";

const ImageCommentApartment = ({id}) => {
    const [photo, setPhoto] = useState([]);
    const auth = useAuth();
    useEffect(() => {
        try{
            const res = api.auth.getCommentApartments(id);
            Promise.resolve(res).then(function (res){
                setPhoto(res.data.photo_comments_apartment);
            });

        }catch (e) {
            if (e.response.status === 401){
                auth.setRefreshToken(true);
            }
            console.log(e.message);
        }
    },[auth])
    return (
        <div className={'div_image_comment_apartment_main'}>
            {
                photo && photo.map((c, index) => <ImageCommentApartmentModal key={index} image={c.url}>
                    <div  className={'div_image_comment_apartment'}>
                    <img className={'image_comment_apartment'} src={c.url} alt="photo_comment_apartment"/>
                </div>
                </ImageCommentApartmentModal>)
            }
        </div>
    );
};

export default ImageCommentApartment;