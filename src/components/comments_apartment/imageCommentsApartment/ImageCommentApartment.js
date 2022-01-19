import React, {useEffect, useState} from 'react';
import "../CommentsApartment.css";
import api from "../../../services/api";
import ImageCommentApartmentModal from "./ImageCommentApartmentModal";

const ImageCommentApartment = ({id}) => {
    const [photo, setPhoto] = useState([]);

    useEffect(() => {
        try{
            const res = api.auth.getCommentApartments(id);
            Promise.resolve(res).then(function (res){
                setPhoto(res.data.photo_comments_apartment);
            });
        }catch (e) {
            console.log(e.message);
        }
    },[id])
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