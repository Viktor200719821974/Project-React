import React, {useEffect, useState} from 'react';
import "../../../../comments_apartment/CommentsApartment.css";
import api from "../../../../../services/api";
import AdminImageCommentApartmentModal from "./AdminImageCommentApartmentModal";

const AdminImageCommentApartment = ({id, setStatusResponse}) => {
    const [photo, setPhoto] = useState([]);
    const [deletePhoto, setDeletePhoto] = useState(false);

    useEffect(() => {
        try{
            const res = api.auth.getCommentApartments(id);
            Promise.resolve(res).then(function (res){
                setPhoto(res.data.photo_comments_apartment);
                if (deletePhoto){
                    setDeletePhoto(false);
                }
            });
        }catch (e) {
            console.log(e.message);
        }
    },[id, deletePhoto])
    return (
        <div className={'div_image_comment_apartment_main'}>
            {
                photo && photo.map((c, index) => <AdminImageCommentApartmentModal key={index}
                                                                                  image={c.url}
                                                                                  id={c.id}
                                                                                  setStatusResponse={setStatusResponse}
                                                                                  setDeletePhoto={setDeletePhoto}
                >
                    <div  className={'div_image_comment_apartment'}>
                        <img className={'image_comment_apartment'} src={c.url} alt="photo_comment_apartment"/>
                    </div>
                </AdminImageCommentApartmentModal>)
            }
        </div>
    );
};

export default AdminImageCommentApartment;