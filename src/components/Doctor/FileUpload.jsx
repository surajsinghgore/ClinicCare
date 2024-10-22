import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const FileUpload = ({
    filePreview,
    handleRemove,
    handleFileChange,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    label,
    icon,     // Accepting icon
    heading   // Accepting heading
}) => {
    return (
        <div
            className={`border-2 ${isDragging ? 'border-blue-500' : 'border-gray-300'} border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="mb-2 flex items-center gap-2">
                {icon}
                <h1 className="text-lg font-bold">{heading}</h1> {/* Added Heading and Icon */}
            </div>
            {filePreview ? (
                <div className="relative">
                    <img src={filePreview} alt="Preview" className="w-24 h-24 object-cover rounded-full mb-2" />
                    <button
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                        onClick={handleRemove}
                    >
                        <FaTrashAlt />
                    </button>
                </div>
            ) : (
                <>
                    <label className="text-gray-500 cursor-pointer">
                        {label}
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </>
            )}
        </div>
    );
};

export default FileUpload;
