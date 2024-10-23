import React, { useState } from 'react';
import BreadCrumbs from '../../components/Common/BreadCrumbs';
import { MdOutlineVerifiedUser } from "react-icons/md";
import { MdFeedback } from "react-icons/md";

const DoctorVerify2 = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const doctorData = {
        name: "John Doe",
        dob: "1990-01-01",
        gender: "Male",
        email: "john.doe@example.com",
        mobile: "+1234567890",
        hobbies: "Reading, Traveling",
        degree: "MD in Medicine",
        licenseNumber: "D123456789",
        experience: "5 years",
        specialization: "Cardiology",
        files: {
            selfImage: "https://images.pexels.com/photos/3873193/pexels-photo-3873193.jpeg?auto=compress&cs=tinysrgb&w=600",
            degreeImage: "https://forum.wordreference.com/attachments/rishi-doctor-of-medicine-diploma-jpg.32395/",
            licenseImage: "https://thelivenagpur.com/wp-content/uploads/2020/03/899995-driving-licenses.jpg",
            signImage: "https://cdn.simplystamps.com/media/catalog/product/1/5/15992-doctor-signature-stamp-Self-Inking.jpg",
        },
    };

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    return (
        <>
            <BreadCrumbs currentPath="Verify Doctor" />
            <div className="relative w-[90%] m-auto mt-10 mb-10 rounded-lg shadow-lg">

                <div className="w-full p-12 rounded-lg shadow-md">
                    <div className="pb-5 flex items-center gap-3 text-[#116AEF] mb-10 border-b border-black-400">
                        <MdOutlineVerifiedUser className='text-2xl' />
                        <h1 className="font-semibold text-3xl">Doctor Verification</h1>
                    </div>

                    {/* Div to Display Doctor Name, Gender, and Email */}
                    <div
                        className="p-4 mb-5 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                        onClick={handleModalOpen}
                    >
                        <h2 className="font-semibold text-xl">{doctorData.name}</h2>
                        <p className="text-lg">Gender: {doctorData.gender}</p>
                        <p className="text-lg">Email: {doctorData.email}</p>
                    </div>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg p-6 w-3/4 h-[500px] relative overflow-auto">
                                <button
                                    className="absolute top-2 right-2 text-xl"
                                    onClick={handleModalClose}
                                >
                                    &times;
                                </button>
                                <h1 className="font-semibold text-2xl mb-4">Doctor Details</h1>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className='mb-3'>
                                        <label className="block text-lg font-medium text-black-700">Name:</label>
                                        <input
                                            type="text"
                                            value={doctorData.name}
                                            readOnly
                                            className="mt-1 block w-full border border-black-300 rounded-md p-2 bg-gray-100"
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className="block text-lg font-medium text-black-700">Date of Birth:</label>
                                        <input
                                            type="text"
                                            value={doctorData.dob}
                                            readOnly
                                            className="mt-1 block w-full border border-black-300 rounded-md p-2 bg-gray-100"
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className="block text-lg font-medium text-black-700">Gender:</label>
                                        <input
                                            type="text"
                                            value={doctorData.gender}
                                            readOnly
                                            className="mt-1 block w-full border border-black-300 rounded-md p-2 bg-gray-100"
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className="block text-lg font-medium text-black-700">Email:</label>
                                        <input
                                            type="text"
                                            value={doctorData.email}
                                            readOnly
                                            className="mt-1 block w-full border border-black-300 rounded-md p-2 bg-gray-100"
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className="block text-lg font-medium text-black-700">Mobile Number:</label>
                                        <input
                                            type="text"
                                            value={doctorData.mobile}
                                            readOnly
                                            className="mt-1 block w-full border border-black-300 rounded-md p-2 bg-gray-100"
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className="block text-lg font-medium text-black-700">Hobbies:</label>
                                        <input
                                            type="text"
                                            value={doctorData.hobbies}
                                            readOnly
                                            className="mt-1 block w-full border border-black-300 rounded-md p-2 bg-gray-100"
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className="block text-lg font-medium text-black-700">Degree Name:</label>
                                        <input
                                            type="text"
                                            value={doctorData.degree}
                                            readOnly
                                            className="mt-1 block w-full border border-black-300 rounded-md p-2 bg-gray-100"
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className="block text-lg font-medium text-black-700">Doctor's License Number:</label>
                                        <input
                                            type="text"
                                            value={doctorData.licenseNumber}
                                            readOnly
                                            className="mt-1 block w-full border border-black-300 rounded-md p-2 bg-gray-100"
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className="block text-lg font-medium text-black-700">Experience:</label>
                                        <input
                                            type="text"
                                            value={doctorData.experience}
                                            readOnly
                                            className="mt-1 block w-full border border-black-300 rounded-md p-2 bg-gray-100"
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className="block text-lg font-medium text-black-700">Specialization:</label>
                                        <input
                                            type="text"
                                            value={doctorData.specialization}
                                            readOnly
                                            className="mt-1 block w-full border border-black-300 rounded-md p-2 bg-gray-100"
                                        />
                                    </div>

                                    {/* File Uploads */}
                                    <div className="col-span-2">
                                        <h3 className="text-2xl underline font-medium text-black-700 mt-12 mb-8">Uploaded Files:</h3>
                                        <div className="mt-2">
                                            <label className="block text-lg font-medium text-black-700">Self Image:</label>
                                            <img src={doctorData.files.selfImage} alt="Self" className="mt-1 w-80 mb-4" />

                                            <label className="block text-lg font-medium text-black-700">Degree Image:</label>
                                            <img src={doctorData.files.degreeImage} alt="Degree" className="mt-1 w-80 mb-4" />

                                            <label className="block text-lg font-medium text-black-700">License Image:</label>
                                            <img src={doctorData.files.licenseImage} alt="License" className="mt-1 w-80 mb-4" />

                                            <label className="block text-lg font-medium text-black-700">Signature Image:</label>
                                            <img src={doctorData.files.signImage} alt="Signature" className="mt-1 w-80 mb-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default DoctorVerify2;
