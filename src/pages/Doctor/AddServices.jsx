import React, { useState } from 'react';
import BreadCrumbs from '../../components/Common/BreadCrumbs';
import { TagsInput } from 'react-tag-input-component';

const AddServices = () => {
  const [selected, setSelected] = useState([]);

  return (
    <div>
      <BreadCrumbs currentPath="Add Services" />
      <div className="relative w-[95%] max-w-5xl m-auto mt-10 mb-10 bg-white rounded-lg shadow-lg p-10">
        <h2 className="text-3xl font-semibold mb-8 text-black-800">Add New Service</h2>
        <form>
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <label htmlFor="treatmentName" className="block mb-2 text-sm font-medium text-black-600">Treatment Name<span className="text-danger">*</span></label>
              <input type="text" id="treatmentName" className="border border-black-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="specialty" className="block mb-2 text-sm font-medium text-black-600">Specialty<span className="text-danger">*</span></label>
              <input type="text" id="specialty" className="border border-black-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="fees" className="block mb-2 text-sm font-medium text-black-600">Fees<span className="text-danger">*</span></label>
              <input type="number" id="fees" className="border border-black-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label htmlFor="duration" className="block mb-2 text-sm font-medium text-black-600">Duration (minutes)<span className="text-danger">*</span></label>
              <input type="number" id="duration" className="border border-black-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="clinic" className="block mb-2 text-sm font-medium text-black-600">Clinic<span className="text-danger">*</span></label>
              <select id="clinic" className="border border-black-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Clinic</option>
                <option value="clinic1">Clinic 1</option>
                <option value="clinic2">Clinic 2</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-black-600">Description<span className="text-danger">*</span></label>
            <TagsInput required value={selected} onChange={setSelected} name="decs" className="border border-black-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-lg transition duration-200 ease-in-out shadow-md hover:shadow-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddServices;
