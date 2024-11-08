import React from 'react';

const DoctorServicePlans = () => {
  return (
    <div className="w-[90%] mx-auto p-8 mt-14 shadow-lg rounded-xl">
    <h2 className="text-3xl font-bold text-center mb-4 text-black-800">Choose Your Service</h2>
    <p className="text-center text-black-500 mb-10 text-lg">
      Choose the service that suits your needs best.
    </p>

    <div className="flex items-start justify-start gap-8 flex-wrap">
      {/* Basic Plan */}
      <div className="w-[31.5%] p-6 bg-white border border-black-200 rounded-lg shadow-sm transform hover:scale-105 transition-transform duration-300 ease-out">
        <h3 className="text-2xl font-semibold mb-2 text-black-800">Basic</h3>
        <p className="text-black-500 mb-6">Perfect for individual projects</p>
        <p className="text-3xl font-bold mb-8 text-blue-600">$9.99 <span className="text-lg font-medium text-black-500">/ month</span></p>
        <ul className="mb-8 space-y-3 text-black-600">
          <li>• 10 Projects</li>
          <li>• Basic Support</li>
          <li>• 5 GB Storage</li>
        </ul>
        <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200">
          Book Appointment
        </button>
      </div>
    </div>
  </div>
  );
};

export default DoctorServicePlans;
