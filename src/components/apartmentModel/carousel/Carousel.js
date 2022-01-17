import React, {useState, useEffect} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Carousel.css';
import ImageModal from "./ImageModal";
import api from "../../../services/api";
import useAuth from "../../../hook/useAuth";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({id, setLoadedPhoto, loadedPhoto}) => {
    const [photo, setPhoto] = useState([]);
    const [loading, setLoading] = useState(false);
    const auth = useAuth();

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
            // if (e.response.status === 401){
            //     auth.setRefreshToken(true);
            // }
            console.log(e.message);
        }
        setLoading(false);
    }
    fetchData();
        // eslint-disable-next-line
    }, [loadedPhoto, auth]);

    if (loading){
        return <div>Loading...</div>
    }

    const items =(photo && photo.map((c) => (
        <div className={'carouselItem'}>
            <ImageModal image={c.url} key={c.id + 1100}>
            <img
                src={c.url}
                alt='photo_rooms'
                onDragStart={handleDragStart}
                className={'carouselItem_img'}
            />
        </ImageModal>
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

export default Carousel;