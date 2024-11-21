import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const NearByClinicImagesCard = ({ Images }) => {
    return (
        <div className='bg-primary h-[300px] w-full m-auto'>
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                {Images && Images.length > 0 && (
                    Images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image}
                                alt={`Clinic Image ${index + 1}`}
                                className="w-full h-28 object-cover rounded-md"
                            />
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        </div>
    );
};

export default NearByClinicImagesCard;
