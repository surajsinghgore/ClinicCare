import React, { useState } from 'react';

const BookAppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="flex flex-col items-center max-w-xs mx-auto p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Date</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="w-full p-2 text-center border border-gray-300 rounded-md mb-4"
      />
      <div className="flex justify-between w-full">
        <button
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={() => setSelectedDate('')}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900"
          onClick={() => alert(`Selected Date: ${selectedDate}`)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default BookAppointmentForm;
