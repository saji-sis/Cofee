"use client";
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';


function Banner() {
    return (
        <>
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                rewind={true}
                loop={true}
                autoplay={{ delay: 2500 }}
                modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                className="mySwiper home-slider"
            >
                <SwiperSlide>
                    <img
                        src="/images/sliders/1.jpg"
                        alt="Slide"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/sliders/2.jpg"
                        alt="Slide"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/sliders/3.jpg"
                        alt="Slide"
                    />
                </SwiperSlide>
            </Swiper>
        </>)
}

export default Banner