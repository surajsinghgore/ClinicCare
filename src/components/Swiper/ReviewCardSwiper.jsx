import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import ReviewCard from "../ReviewCard";

const ReviewCardSwiper = ({ item }) => {

    return (
        <Swiper
            slidesPerView={1.4}
            spaceBetween={10}
            freeMode={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            breakpoints={{
                640: {
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
            }}
            modules={[FreeMode, Autoplay]}
            className="reviewCardSwiper"
        >
            <div className="flex space-x-4 overflow-x-auto">
                {item?.map((review, index) => (
                    <SwiperSlide key={index}>
                        <ReviewCard review={review} />
                    </SwiperSlide>
                ))}
            </div>
        </Swiper>
    );
};

export default ReviewCardSwiper;
