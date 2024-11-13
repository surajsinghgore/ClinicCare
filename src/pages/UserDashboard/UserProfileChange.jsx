import { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { FaUpload } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/Slices/LoaderState';
import { updateMeUserProfileByIdApi } from '../../Utils/services/apis/User/UserPersonalApi';
import { showAlert } from '../../redux/Slices/AlertToggleState';
import { fetchMyUserDetails } from '../../redux/Slices/GetMyActiveUserDetails';

const UserProfileChange = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { getMyUserDetails } = useSelector((state) => state.getMyUserDetails);
  const dispatch = useDispatch();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      dispatch(showAlert({ message: "Please select an image file..", type: "failed" }));

    }
  };

  const updateUserProfilePhoto = async () => {
    if (!selectedImage) {
      dispatch(showAlert({ message: "Please upload the newly updated photo.", type: "failed" }));
      return;
    }

    let formData = new FormData();
    formData.append('profileImage', selectedImage);

    dispatch(showLoader());

    try {
      const res = await updateMeUserProfileByIdApi(formData);

      if (res.success) {
        dispatch(fetchMyUserDetails());
        setSelectedImage([])
        dispatch(showAlert({ message: res.message, type: "success" }));
      }

    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message || "Failed to update profile image", type: "failed" }));
    } finally {
      dispatch(hideLoader());
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
            src={selectedImage ? URL.createObjectURL(selectedImage) : getMyUserDetails?.profileUrl}  // Show the uploaded image or the current one
            alt="Profile"
            className="w-[250px] h-[250px] rounded-full object-cover shadow-md"
          />
        </div>
      </div>

      {/* Upload Button */}
      <div className="flex justify-center">
        <button
          onClick={updateUserProfilePhoto}
          className="w-[200px] py-3 bg-[#0148B1] text-white rounded-full hover:bg-blue-500 transition duration-150"
        >
          Click to upload
        </button>
      </div>
    </div>
  );
};

export default UserProfileChange;
