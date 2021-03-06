import React, {useState, useEffect} from 'react';
import "../../apartmentModel/carousel/Carousel.css";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ImageUserModal from "../deletePhotoRoom/ImageUserModal";
import api from "../../../services/api";

const handleDragStart = (e) => e.preventDefault();

const CarouselUser = ({id, setLoadedPhoto, loadedPhoto, setStatusResponse}) => {
    const [photo, setPhoto] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData(){
            setLoading(true);
            try{
                const { data } = await api.auth.getApartment(id);
                setPhoto(data.photo_rooms);
                if (loadedPhoto){
                    setLoadedPhoto(false);
                }
            }catch (e) {
                console.log(e.message);
            }
            setLoading(false);
        }
        fetchData();
        // eslint-disable-next-line
    }, [loadedPhoto, id]);

    if (loading){
        return <div>Loading...</div>
    }

    const items =(photo && photo.map((c) => (
        <div className={'carouselItem'}>
            <ImageUserModal image={c.url} key={c.id + 1100} id={c.id} setStatusResponse={setStatusResponse}
                            setLoadedPhoto={setLoadedPhoto}>
                <img
                    src={c.url}
                    alt='photo_rooms'
                    onDragStart={handleDragStart}
                    className={'carouselItem_img'}
                />
            </ImageUserModal>
        </div>
    )));
    const responsive = {
        0: {
            items: 1,
        },
        512: {
            items: 3,
        },
        1024: {
            items: 5,
        },
    };
    return (
        <AliceCarousel autoPlay
                       autoPlayInterval={1000}
                       animationDuration={2000}
                       responsive={responsive}
                       infinite
                       disableDotsControls
                       disableButtonsControls
                       mouseTracking items={items}
        />
    );
}

export default CarouselUser;