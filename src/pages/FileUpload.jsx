import React, { useState } from 'react';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        
            setFilePreview(URL.createObjectURL(file));
        }
        
    };
    console.log(selectedFile);

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setFilePreview(null);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            setFilePreview(URL.createObjectURL(file));
        }
        setIsDragging(false);
    };

    return (
        <div className="w-full max-w-sm mx-auto p-4 border rounded-lg shadow-md bg-white">
            {filePreview ? (
                <div className="relative">
                    <img
                        src={filePreview}
                        alt="File Preview"
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                    <button
                        onClick={handleRemoveFile}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    >
                        ✕
                    </button>
                </div>
            ) : (
                <div
                    className={`flex flex-col justify-center items-center w-full h-48 border-2 ${
                        isDragging ? 'border-blue-400' : 'border-gray-300'
                    } border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
                        isDragging ? 'bg-blue-50' : 'bg-gray-50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                    <span className="text-gray-500 text-sm mb-2">
                        Drag & Drop or Click to Upload
                    </span>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
