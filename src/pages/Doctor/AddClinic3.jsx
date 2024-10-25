import React, { useState } from 'react'
import BreadCrumbs from '../../components/Common/BreadCrumbs'
import { FaHospitalUser } from 'react-icons/fa';
import { CiCalendarDate } from 'react-icons/ci';
import { FaImages } from 'react-icons/fa';
import { CiImageOn } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from 'react-router-dom';




const MultiPhotoUploader = ({ title }) => {
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            url: URL.createObjectURL(file),
            file,
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const removeImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const openImageInNewTab = (url) => {
        window.open(url, "_blank");
    };

    return (
        <div className="mb-10">
            <h3 className="text-xl font-semibold flex items-center gap-2 underline">
                <CiImageOn className="text-2xl" />
                {title}
            </h3>
            <div className="flex flex-wrap gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative w-40 h-40">
                        <img
                            src={image.url}
                            alt={`uploaded ${index}`}
                            className="w-full h-full object-cover rounded-md cursor-pointer"
                            onClick={() => openImageInNewTab(image.url)}
                        />
                        <MdOutlineRemoveRedEye
                            className="absolute top-0 left-0 bg-black-800 text-white p-1 rounded-full transform translate-y-2 -translate-x-2 text-2xl cursor-pointer hover:text-blue-500"
                            onClick={() => openImageInNewTab(image.url)}
                        />
                        <button
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-4 text-black-900 p-1 rounded-full transform -translate-y-2 translate-x-2"
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <label className="cursor-pointer">
                    <div className="w-24 h-24 flex items-center justify-center mt-6 bg-black-200 border-2 border-dashed border-black-400 rounded-md hover:bg-black-300">
                        <span className="text-black-500">+</span>
                    </div>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
            </div>
        </div>
    );
};


const AddClinic3 = () => {
    return (
        <div>
            <BreadCrumbs currentPath="Add Clinic" />
            <div className="relative w-[97%] m-auto mt-10 mb-10 rounded-lg shadow-lg p-5">
                {/* form list */}
                <div className="flex p-3 border-b border-black-400 bg-white">
                    <div className="flex gap-10 p-4 select-none">


                        <div className="flex items-center gap-2">
                            <FaHospitalUser className="text-black-500 text-2xl" />
                            <span className="text-black-500 font-medium">Clinic Details</span>
                        </div>


                        <div className="flex items-center gap-2">
                            <CiCalendarDate className="text-black-500 text-2xl" />
                            <span className="text-black-500 font-medium">Availability</span>
                        </div>

                        <div className="flex items-center gap-2 border-b-2 border-blue-400 pb-1">
                            <FaImages className="text-blue-500 text-2xl" />
                            <div className="flex flex-col items-center">
                                <span className="text-blue-500 font-medium">Upload File</span>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="p-6 bg-white mt-10 text-2xl ">
                    <MultiPhotoUploader title="Clinic Photo" />
                    <MultiPhotoUploader title="Work Photo" />
                </div>



                <Link to={"/doctor/add-clinic2"}
                    className="ml-auto bg-secondary duration-200 text-white m-8 shadow-lg font-bold py-2 px-3 rounded-md absolute bottom-5 right-44"
                >
                    Back
                </Link>

                <button className="bg-blue-500 hover:bg-blue-700 duration-200 text-white m-8 shadow-lg font-semibold py-2 px-3 rounded-md ml-[86%]">
                    Final Submit
                </button>
            </div>
        </div>
    )
}

export default AddClinic3