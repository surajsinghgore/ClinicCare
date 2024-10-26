import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
const MultiPhotoUploader = ({ title, onImageSelect }) => {
    const [images, setImages] = useState([]);
  
    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      const newImages = files.map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
      onImageSelect([...images, ...newImages]); // Pass the selected images to the parent
    };
  
    const removeImage = (index) => {
      setImages((prevImages) => {
        const updatedImages = prevImages.filter((_, i) => i !== index);
        onImageSelect(updatedImages); // Notify the parent of the updated images
        return updatedImages; // Update local state
      });
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
            <div key={index} className="relative h-56">
              <img src={image.url} alt={`uploaded ${index}`} className="w-full h-full object-cover rounded-md cursor-pointer" onClick={() => openImageInNewTab(image.url)} />
              <MdOutlineRemoveRedEye
                className="absolute top-0 left-4 bg-black-800 text-white p-1 rounded-full transform translate-y-2 -translate-x-2 text-2xl cursor-pointer hover:text-blue-500"
                onClick={() => openImageInNewTab(image.url)}
              />
              <button onClick={() => removeImage(index)} className="absolute top-1 right-4 text-black-900 p-1 rounded-full transform -translate-y-2 translate-x-2">
                &times;
              </button>
            </div>
          ))}
          <label className="cursor-pointer">
            <div className="w-24 h-24 flex items-center justify-center mt-6 bg-black-200 border-2 border-dashed border-black-400 rounded-md hover:bg-black-300">
              <span className="text-black-500">+</span>
            </div>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>
      </div>
    );
  };
export default MultiPhotoUploader;