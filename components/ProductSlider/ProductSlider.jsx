// core
import React, { useEffect, useRef, useState } from 'react'

// library
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Thumbs } from "swiper";

// components
import { ModalLayout } from "../../components";
import { authActions } from "../../redux/auth/actions";
import { getShowModal } from "../../redux/auth/selectors";

export const ProductSlider = ({product, styles}) => {
    SwiperCore.use([Pagination, Navigation, Thumbs]);

    const dispatch = useDispatch();

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0);

    let fullScreenSlideRef = useRef(null);
    let mainSliderRef = useRef(null);

    const showModal = useSelector(getShowModal);

    const setShowModal = (state) => dispatch(authActions.setShowModal(state));

    useEffect(() => {
        if (fullScreenSlideRef.current !== null && fullScreenSlideRef.current.swiper !== null) {
            fullScreenSlideRef.current.swiper.slideTo(activeSlide);
        }
    }, [activeSlide]);

    return (
        <>
            <Swiper
                ref={mainSliderRef}
                mainSlider
                thumbs={{swiper: thumbsSwiper}}
                // navigation={{clickable: true}}
                slidesPerView={1}
                loop={true}
                clickable='true'
                onSlideChange={(e) => setActiveSlide(e.activeIndex)}>
                {product.images && product.images.map((img, index) => (
                    <SwiperSlide
                        key={index}
                        onClick={() => setShowModal('swiper-zoom')}>
                        {img.url ? <img className={styles.swiper} src={img.url} alt='' /> :
                            <img className={styles.swiper} src={img} alt='' />}
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* Thumbs Swiper -> store swiper instance */}
            {/* It is also required to set watchSlidesVisibility and watchSlidesProgress props */}
            <div className={classNames('product-slider', 'product-thumbsSlider')}>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    watchSlidesVisibility
                    watchSlidesProgress
                    spaceBetween={10}
                    slidesPerView={4}>
                    {product.images && product.images.map((img, index) => (
                        <SwiperSlide key={index}>
                            {img.url ? <img className={styles.thumbs} src={img.url} alt='' /> :
                                <img className={styles.thumbs}
                                     src={img}
                                     alt=''
                                     onMouseOver={() => setThumbsSwiper(mainSliderRef.current.swiper.slideTo(index + 1))} />}
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div
                    className={classNames('product-slider', 'product-fullScreen', (showModal !== 'swiper-zoom') ? 'd-hidden' : '')}>
                    <ModalLayout
                        maxWidth='1081px'
                        showPopup={() => {
                            setShowModal('')
                        }}
                        classname={'product-fullScreenInner'}>
                        <Swiper
                            ref={fullScreenSlideRef}
                            initialSlide={activeSlide}
                            spaceBetween={10}
                            slidesPerView={1}
                            loop={true}
                            thumbs={{swiper: thumbsSwiper}}
                            navigation={{clickable: true}}
                            clickable='true'
                            pagination={{clickable: true}}>
                            {product.images && product.images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    {img.url ? <img className={styles.thumbs} src={img.url} alt='' /> :
                                        <img className={styles.thumbs} src={img} alt='' />}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </ModalLayout>
                </div>
            </div>
        </>
    )
};