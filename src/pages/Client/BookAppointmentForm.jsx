import React, { useState } from 'react';
import Header from '../../components/Common/Header';

const BookAppointmentForm = () => {
  // Get the current month and year
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0 = January, 11 = December
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");

  // Handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Preset time and duration options
  const timeOptions = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'
  ];
  const durationOptions = ['15 min', '30 min', '45 min', '1 hour'];

  // Month names for display
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <>
      <Header />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl p-8 mt-20 bg-white shadow-lg rounded-lg">
          {/* Heading Before Calendar */}
          <h3 className="text-2xl font-semibold text-center mb-8 mt-14">Select Appointment Date</h3>

          {/* Display Current Month and Year */}
          <div className="text-center mb-6">
            <p className="text-3xl font-medium">{monthNames[currentMonth]}</p>
            <p className="text-black-500 text-lg">{currentYear}</p>
          </div>


          {/* Calendar */}
          <div className="grid grid-cols-7 gap-2 text-center text-black-600 mb-6">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-sm font-semibold">{day}</div>
            ))}
            {Array.from({ length: 31 }, (_, i) => (
              <div
                key={i}
                className={`py-2 rounded-full cursor-pointer 
                ${selectedDate === i + 1 ? 'bg-[#0148B1] text-white' : 'bg-black-200'}
              `}
                onClick={() => handleDateClick(i + 1)}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Duration Buttons */}
          <p className="text-black-600 font-semibold mb-3">Duration</p>
          <div className="grid grid-cols-4 gap-3 mb-3">
            {durationOptions.map((duration) => (
              <button
                key={duration}
                className={`py-3 rounded-md text-sm border border-black-300 mb-10 
                ${selectedDuration === duration ? 'bg-[#0148B1] text-white' : 'text-black-600'}
              `}
                onClick={() => setSelectedDuration(duration)}
              >
                {duration}
              </button>
            ))}
          </div>


          {/* Selected Date and Time */}
          <p className="text-black-600 font-semibold mb-4">Eastern Standard Time</p>
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col w-1/2 pr-2">
              <label className="text-black-600 text-sm mb-1">Selected Date</label>
              <input
                type="text"
                value={selectedDate ? `${monthNames[currentMonth]} ${selectedDate}, ${currentYear}` : 'Selected date'}
                className="border border-black-300 rounded-md p-3 text-center"
                readOnly
              />
            </div>
            <div className="flex flex-col w-1/2 pl-2">
              <label className="text-black-600 text-sm mb-1">Set Time</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="border border-black-300 rounded-md p-3 text-center"
              >
                <option value="" disabled>Select Time</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>


          {/* Proceed Button */}
          <button className="w-full py-4 text-white font-semibold bg-[#0148B1] rounded-md">
            Proceed
          </button>
        </div>
      </div>
    </>
  );
};

export default BookAppointmentForm;
