import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";

const DoctorDetailsClinicCard = ({ ImagesArray, ClinicName }) => {

    return (
        <Swiper
            className="mySwiper"
            modules={[Autoplay]} // Enable the Autoplay module
            autoplay={{
                delay: 3000, // Set the delay for each slide (in milliseconds)
                disableOnInteraction: false, // Continue autoplay even after user interaction
            }}
        >
            {ImagesArray.length !== 0 &&
                ImagesArray.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={item}
                            alt="clinic"
                            className="w-full h-full object-cover"
                        />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default DoctorDetailsClinicCard;
