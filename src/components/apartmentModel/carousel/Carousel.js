import React, {useState, useEffect} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Carousel.css';
import noPicture from './image/No_Picture.jpg';
import ImageModal from "./ImageModal";
import api from "../../../services/api";
import {refreshToken} from "../../../hook/refresh_token";
import useAuth from "../../../hook/useAuth";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({id}) => {
    const [photo, setPhoto] = useState([]);
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    useEffect(async() => {
        setLoading(true);
        try{
            const { data } = await api.auth.getApartment(id);
            setPhoto(data.photo_rooms);
        }catch (e) {
            if (e.request.status === 401){
                const refreshToken = localStorage.getItem('refresh');
                let data = {['refresh']: refreshToken};
                try{
                    const token = await api.auth.refresh(data);
                    if (token.status === 200){
                        auth.setToken(token.data);
                    }
                    console.log(token.status);
                }catch (e) {
                    console.log(e.message);
                }
            }
            console.log(e.request.status);
        }
        setLoading(false);
        // eslint-disable-next-line
    }, []);

    if (loading){
        return <div>Loading...</div>
    }

    const items =(photo && photo.map((c) => (
        <div className={'carouselItem'}>
            <ImageModal image={c.url} key={c.id + 1100}>
            <img
                src={c.url || noPicture}
                alt='photo_rooms'
                onDragStart={handleDragStart}
                className={'carouselItem_img'}
            />
                {/*<b className={'carouselItem_txt'}>{c?.name}</b>*/}
        </ImageModal>
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
    // const rootElement = {width: 700, height: 800};
    // const rootElement2 = {width: 400, height: 250}
    // const onSlideChange = (e) => {
    //     console.debug('Item`s position during a change: ', e.item)
    //     console.debug('Slide`s position during a change: ', e.slide)
    // }
    //
    // const onSlideChanged = (e) => {
    //     console.debug('Item`s position after changes: ', e.item)
    //     console.debug('Slide`s position after changes: ', e.slide)
    // }
    return (
        <AliceCarousel autoPlay
                       autoPlayInterval={1000}
                       animationDuration={2000}
                       responsive={responsive}
                       infinite
                       disableDotsControls
                       disableButtonsControls
                       mouseTracking items={items}
                       // onSlideChange={onSlideChange}
                       // onSlideChanged={onSlideChanged}
                       // onResizeEvent={(e, prevProps, nextProps) => <div>{rootElement}</div>}
                       // fadeOutAnimation={true}
                       // mouseTrackingEnabled={true}
                       // playButtonEnabled={true}
                       // disableAutoPlayOnAction={true}
        />
    );
}

export default Carousel;