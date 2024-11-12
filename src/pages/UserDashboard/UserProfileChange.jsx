import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { FaUpload } from "react-icons/fa6";

const UserProfileChange = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
    } else {
      alert("Please select an image file.");
    }
  };

  return (
    <div className="w-full my-10 p-8">
      {/* Heading */}
      <h1 className="flex gap-4 text-3xl text-[#0148B1] font-semibold text-left ml-10 mb-3">Upload New Profile <FaUpload /></h1>
      <p className='ml-10 mb-7 text-black-400'>Upload your profile image here to update your profile.</p>

      {/* File Input and Image Preview */}
      <div className="flex items-center justify-around mb-6">
        {/* Upload Section */}
        <div className="flex flex-col items-center">
          <label
            htmlFor="imageUpload"
            className="flex items-center justify-center cursor-pointer bg-black-100 rounded-full text-xl py-2 px-4 border border-black-300 text-black-600"
          >
            <FaCloudUploadAlt className="mr-2 text-[#0148B1] text-xl" />
            Select Profile
          </label>
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {/* Image Preview */}
        <div className="flex flex-col items-center">
          <p className="mb-2 text-lg font-medium">Profile Image</p>
          <img
            src={selectedImage || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"}
            alt="Profile"
            className="w-[250px] h-[250px] rounded-full object-cover shadow-md"
          />
        </div>
      </div>

      {/* Upload Button */}
      <div className="flex justify-center">
        <button
          className="w-[200px] py-3 bg-[#0148B1] text-white rounded-full hover:bg-blue-500 transition duration-150"
        >
          Click to upload
        </button>
      </div>
    </div>
  );
};

export default UserProfileChange;
