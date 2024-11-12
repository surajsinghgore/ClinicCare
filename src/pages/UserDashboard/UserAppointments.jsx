import React, { useState } from 'react';
import TodaysAppointments from './TodaysAppointments';
import AllAppointments from './AllAppointments';
import { SlCalender } from "react-icons/sl";

const UserAppointments = () => {
  const [activeTab, setActiveTab] = useState('today');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-[95%] mx-auto p-6">
      {/* Tab Navigation*/}
      <div className="flex w-[50%] mx-auto justify-between items-center mb-6 p-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md">
        <button
          className={`text-lg font-semibold py-2 px-5 flex items-center gap-3 rounded-md transition duration-300 ${activeTab === 'today' ? 'bg-white text-blue-500' : 'hover:bg-white hover:text-blue-500'}`}
          onClick={() => handleTabClick('today')}
        >
          Today's Appointments <SlCalender className='text-2xl ' />
        </button>
        <button
          className={`text-lg font-semibold py-2 px-8 flex items-center gap-3 rounded-md transition duration-300 ${activeTab === 'all' ? 'bg-white text-blue-500' : 'hover:bg-white hover:text-blue-500'}`}
          onClick={() => handleTabClick('all')}
        >
          All Appointments <SlCalender className='text-2xl ' />
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'today' ? <TodaysAppointments /> : <AllAppointments />}
      </div>
    </div>
  );
};

export default UserAppointments;
