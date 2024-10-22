import React, { useState } from 'react';
import BreadCrumbs from '../../components/Common/BreadCrumbs';
import { RxCross2 } from "react-icons/rx";
import { FaUserShield, FaAddressCard } from 'react-icons/fa';
import { FaFileUpload } from "react-icons/fa";

const DoctorVerification3 = () => {
    const [profileFile, setProfileFile] = useState(null);
    const [degreeFile, setDegreeFile] = useState(null);
    const [licenseFile, setLicenseFile] = useState(null);
    const [signatureFile, setSignatureFile] = useState(null);

    const handleFileChange = (event, setFile) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const handleRemoveFile = (setFile) => {
        setFile(null);
    };

    return (
        <>
            <BreadCrumbs currentPath="Doctor Verification" />

            <div className='relative docDiv w-[85%] h-full m-auto mt-10 rounded-lg overflow-hidden'>


            <div className='flex p-3 border-b border-black-400 bg-white'>
                    <div className='flex gap-10 p-4 select-none'>

                        {/* Navigation Item */}
                        <div className='flex items-center gap-2 '>
                            <FaUserShield className='text-black-500 text-2xl' />
                            <span className='text-black-500 font-medium'>Personal Details</span>
                        </div>


                        {/* Navigation Item */}
                        <div className='flex items-center gap-2 '>
                            <FaAddressCard className='text-black-500 text-2xl ' />
                            <span className='text-black-500 font-medium '>Profile and Bio</span>
                        </div>

                        {/* Active Navigation Item */}
                        <div className='flex items-center gap-2 border-b-2 border-blue-400 pb-1'>
                            <FaFileUpload className='text-blue-500 text-2xl' />
                            <div className='flex flex-col items-center'>
                                <span className='text-blue-500 font-medium'>Upload File</span>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="max-w-md m-7 p-4">
                    <h1 className="text-2xl font-bold mb-12">Upload Your Documents</h1>

                    {/* File Uploads in Two Columns */}
                    <div className="grid grid-cols-1 gap-4">
                        {/* Profile Upload */}
                        <div className="flex flex-col mb-4">
                            <label className="block text-xl font-medium text-black-700">1. Upload Profile</label>
                            <input
                                required
                                type="file"
                                accept="application/pdf, image/*"
                                onChange={(e) => handleFileChange(e, setProfileFile)}
                                className="mt-1 block w-full text-sm text-black-500 file:mr-4 file:py-2 file:px-4
                                   file:rounded-md file:border-0 file:text-sm file:font-semibold
                                   file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                            />
                            {profileFile && (
                                <div className="mt-2 flex items-center">
                                    <img src={URL.createObjectURL(profileFile)} alt="Profile Preview" className="h-40 w-40 object-cover mr-2" />
                                    <p className="text-sm text-black-600 mr-2">Uploaded: {profileFile.name}</p>
                                    <RxCross2 onClick={() => handleRemoveFile(setProfileFile)} className="cursor-pointer text-red-600" />
                                </div>
                            )}
                        </div>

                        {/* Degree Upload */}
                        <div className="flex flex-col mb-4">
                            <label className="block text-xl font-medium text-black-700">2. Upload Degree</label>
                            <input
                                required
                                type="file"
                                accept="application/pdf, image/*"
                                onChange={(e) => handleFileChange(e, setDegreeFile)}
                                className="mt-1 block w-full text-sm text-black-500 file:mr-4 file:py-2 file:px-4
                                   file:rounded-md file:border-0 file:text-sm file:font-semibold
                                   file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                            />
                            {degreeFile && (
                                <div className="mt-2 flex items-center">
                                    <img src={URL.createObjectURL(degreeFile)} alt="Degree Preview" className="h-40 w-40 object-cover mr-2" />
                                    <p className="text-sm text-black-600 mr-2">Uploaded: {degreeFile.name}</p>
                                    <RxCross2 onClick={() => handleRemoveFile(setDegreeFile)} className="cursor-pointer text-red-600" />
                                </div>
                            )}
                        </div>

                        {/* License Upload */}
                        <div className="flex flex-col mb-4">
                            <label className="block text-xl font-medium text-black-700">3. Upload License</label>
                            <input
                                required
                                type="file"
                                accept="application/pdf, image/*"
                                onChange={(e) => handleFileChange(e, setLicenseFile)}
                                className="mt-1 block w-full text-sm text-black-500 file:mr-4 file:py-2 file:px-4
                                   file:rounded-md file:border-0 file:text-sm file:font-semibold
                                   file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                            />
                            {licenseFile && (
                                <div className="mt-2 flex items-center">
                                    <img src={URL.createObjectURL(licenseFile)} alt="License Preview" className="h-40 w-40 object-cover mr-2" />
                                    <p className="text-sm text-black-600 mr-2">Uploaded: {licenseFile.name}</p>
                                    <RxCross2 onClick={() => handleRemoveFile(setLicenseFile)} className="cursor-pointer text-red-600" />
                                </div>
                            )}
                        </div>

                        {/* Signature Upload */}
                        <div className="flex flex-col mb-4">
                            <label className="block text-xl font-medium text-black-700">4. Upload Signature/Stamp</label>
                            <input
                                required
                                type="file"
                                accept="application/pdf, image/*"
                                onChange={(e) => handleFileChange(e, setSignatureFile)}
                                className="mt-1 block w-full text-sm text-black-500 file:mr-4 file:py-2 file:px-4
                                   file:rounded-md file:border-0 file:text-sm file:font-semibold
                                   file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                            />
                            {signatureFile && (
                                <div className="mt-2 flex items-center">
                                    <img src={URL.createObjectURL(signatureFile)} alt="Signature Preview" className="h-40 w-40 object-cover mr-2" />
                                    <p className="text-sm text-black-600 mr-2">Uploaded: {signatureFile.name}</p>
                                    <RxCross2 onClick={() => handleRemoveFile(setSignatureFile)} className="cursor-pointer text-red-600" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <button className='ml-auto bg-blue-500 hover:bg-blue-700 duration-200 text-white m-8 shadow-lg font-bold py-2 px-3 rounded-md absolute bottom-0 right-0'>
                    Final Submit
                </button>
            </div>
        </>
    );
}

export default DoctorVerification3;
