import React, {useState, useEffect} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from "axios";
import './Carousel.css';
import noPicture from './image/No_Picture.jpg';

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({id}) => {
    const [photo, setPhoto] = useState([]);

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

    const items =(photo && photo.map((c) => (
        <div className={'carouselItem'}>
            {/*<a href={c.url} target={"_blank"}>*/}
            <img
                src={c.url || noPicture}
                alt='photo_rooms'
                onDragStart={handleDragStart}
                className={'carouselItem_img'}
            />
                <b className={'carouselItem_txt'}>{c?.name}</b>
            {/*    <span><img className={'carouselItem__img_big'} src={c.url} alt="photo_rooms"/></span>*/}
            {/*</a>*/}
        </div>
    )));
    const responsive = {
        0: {
            items: 1,
        },
        // 512: {
        //     items: 3,
        // },
        1024: {
            items: 3,
        },
    };
    const rootElement = {width: 700, height: 800};
    const rootElement2 = {width: 400, height: 250}
    const onSlideChange = (e) => {
        console.debug('Item`s position during a change: ', e.item)
        console.debug('Slide`s position during a change: ', e.slide)
    }

    const onSlideChanged = (e) => {
        console.debug('Item`s position after changes: ', e.item)
        console.debug('Slide`s position after changes: ', e.slide)
    }
    return (
        <AliceCarousel autoPlay
                       autoPlayInterval={1000}
                       animationDuration={2000}
                       responsive={responsive}
                       infinite
                       disableDotsControls
                       disableButtonsControls
                       mouseTracking items={items}
                       onSlideChange={onSlideChange}
                       onSlideChanged={onSlideChanged}
                       onResizeEvent={(e, prevProps, nextProps) => <div>{rootElement}</div>}
                       // fadeOutAnimation={true}
                       // mouseTrackingEnabled={true}
                       // playButtonEnabled={true}
                       // disableAutoPlayOnAction={true}
        />
    );
}

export default Carousel;