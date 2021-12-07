import React, {useState, useEffect} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from "axios";
import './Carousel.css';
import noPicture from './image/No_Picture.jpg';

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({id}) => {
    const [photo, setPhoto] = useState();
    const items =(photo && photo.map((c) => (
        <div className={'carouselItem'}>
            <img
                src={c.url || noPicture}
                alt='photo_rooms'
                onDragStart={handleDragStart}
                className={'carouselItem_img'}
            />
            <b className={'carouselItem_txt'}>{c?.name}</b>
        </div>
    )));
    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 7,
        },
    };
    const fetchPhoto = async () => {
        const { data } = await axios(
            `http://localhost:8000/api/v1/apartments/${id}`
        );
        setPhoto(data.photo_rooms);
    };

    useEffect(() => {
        fetchPhoto();
        // eslint-disable-next-line
    }, []);

    return (
        <AliceCarousel autoPlay
                       responsive={responsive}
                       infinite
                       disableDotsControls
                       disableButtonsControls
                       mouseTracking items={items} />
    );
}

export default Carousel;