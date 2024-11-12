import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';

import "swiper/css";
import { Link } from "react-router-dom";

const DoctorDetailsClinicCard = ({ ImagesArray, ClinicId }) => {
    return (
        <div className="h-90 overflow-hidden">
            <Swiper
                className="mySwiper h-full"
                modules={[Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
            >
                {ImagesArray.length !== 0 &&
                    ImagesArray.map((item, index) => (
                        <SwiperSlide key={index} className="">
                            <div className="bg-primary h-80 w-full">

                                <Link to={`/about-clinic/${ClinicId}`}>   <img
                                    src={item}
                                    alt="clinic"
                                    className="w-full h-full object-cover"
                                />
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default DoctorDetailsClinicCard;
