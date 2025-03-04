"use client";
import styles from "./articles.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Article from "./Article";

const Articles = () => {
    return (
        <div className={styles.container}>
            <p className={styles.title}>مقالات ما</p>
            <span className={styles.description}>دانستنی های جذاب دنیای قهوه</span>
            <main
                data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="6000"
            >
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    dir="rtl"
                    autoplay={{ delay: 1500, disableOnInteraction: false }}
                    //   rewind={true}
                    loop={true}
                    navigation={true}
                    modules={[Navigation, Autoplay]}
                    className="mySwiper articles_slider"
                >
                    <SwiperSlide>
                        <Article />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Article />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Article />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Article />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Article />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Article />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Article />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Article />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Article />
                    </SwiperSlide>
                </Swiper>
            </main>
        </div>
    );
};

export default Articles;
