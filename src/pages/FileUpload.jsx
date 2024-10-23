import React, { useState } from 'react';

const FileUpload = () => {
  const [files, setFiles] = useState({
    profile: null,
    sign: null,
    degree: null,
    license: null,
  });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    setFiles((prev) => ({ ...prev, [type]: file }));
    e.target.value = null;
  };

  const handleRemoveFile = (type) => {
    setFiles((prev) => ({ ...prev, [type]: null }));
  };

  const renderFileRow = (type, index) => {
    return (
      <div key={index} className="flex items-center justify-between p-3 border-b">
        <span className="w-8 text-sm text-center">{index + 1}</span>
        <span className="w-32 text-sm capitalize">{type}</span>
        <span className="w-40 text-sm">{files[type]?.name || 'No file chosen'}</span>
        <button
          className="w-10 text-black-500 hover:text-blue-500"
          onClick={() => files[type] && window.open(URL.createObjectURL(files[type]), '_blank')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12m-3 0a3 3 0 100-6 3 3 0 000 6zm0 0a9 9 0 110 18 9 9 0 010-18z" />
          </svg>
        </button>
        <button
          className="w-24 bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => document.getElementById(`${type}-file`).click()}
        >
          {files[type] ? 'Change' : 'Upload'}
        </button>
        <input
          id={`${type}-file`}
          type="file"
          className="hidden"
          onChange={(e) => handleFileChange(e, type)}
        />
        <button
          className="w-24 bg-orange-400 text-sm px-3 py-1 rounded hover:bg-orange-500 ml-2"
          onClick={() => handleRemoveFile(type)}
        >
          Delete
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-5 bg-white shadow-md rounded">
      <div className="flex items-center justify-between bg-gray-100 p-3 border-b">
        <span className="w-8 text-sm font-semibold text-center">№</span>
        <span className="w-32 text-sm font-semibold">Name</span>
        <span className="w-40 text-sm font-semibold">File</span>
        <span className="w-10 text-sm font-semibold text-center">Preview</span>
        <span className="w-24 text-sm font-semibold">Upload</span>
        <span className="w-24 text-sm font-semibold">Delete</span>
      </div>
      {['profile', 'sign', 'degree', 'license'].map((type, index) => renderFileRow(type, index))}
    </div>
  );
};

export default FileUpload;
