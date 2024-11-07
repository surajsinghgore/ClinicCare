import { useState, useEffect } from 'react';

const BookAppointmentForm = () => {
  const today = new Date();
  const currentMonth = today.getMonth(); // 0-based (0 = January)
  const currentYear = today.getFullYear();
  const currentDate = today.getDate(); // Get today's date

  // Initialize selectedDate based on the current date and month
  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedTime, setSelectedTime] = useState(''); // Initialize selectedTime as an empty string
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

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

  // Get the number of days in the current month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate(); // Get the last day of the month
  };

  const daysInMonth = getDaysInMonth(month, year);

  // Handle date selection
  const handleDateClick = (date) => {
    // For the current month: Only allow selecting today and future dates
    if (month === currentMonth && date < currentDate) {
      return; // Don't allow past dates in the current month
    }

    // Otherwise, allow selecting any date in future months
    setSelectedDate(date);
  };

  // Handle previous and next month navigation
  const handlePrevMonth = () => {
    if (month > currentMonth || year > currentYear) { // Prevent going to past months
      if (month === 0) {
        setMonth(11); // December
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
      setSelectedDate(null); // Reset selected date when switching months
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0); // January
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    setSelectedDate(null); // Reset selected date when switching months
  };

  useEffect(() => {
    if (month === currentMonth) {
      // If we are in the current month, set today's date as the default selected date
      setSelectedDate(currentDate);
    }
  }, [month]);

  return (
    <div className='w-full my-5 mt-10'>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-5xl p-8 bg-white shadow-lg rounded-lg">
          {/* Heading Before Calendar */}
          <h3 className="text-2xl font-semibold text-center my-2">Select Appointment Date</h3>

          {/* Display Current Month and Year */}
          <div className="flex justify-center items-center  mb-6  mt-6">
            {/* Left Arrow */}
            <button
              onClick={handlePrevMonth}
              className={`w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full text-xl font-medium ${month === currentMonth && year === currentYear ? 'cursor-not-allowed text-gray-400' : ''}`}
              disabled={month === currentMonth && year === currentYear} // Disable previous button if we're on the current month
            >
              {'<'}
            </button>

            {/* Month and Year */}
            <p className="text-3xl font-medium mx-4">{monthNames[month]}</p>
            <p className="text-black-500 text-lg">{year}</p>

            {/* Right Arrow */}
            <button
              onClick={handleNextMonth}
              className="w-8 h-8  ml-6 flex items-center justify-center border border-gray-400 rounded-full text-xl font-medium"
            >
              {'>'}
            </button>
          </div>

          {/* Calendar */}
          <div className="grid grid-cols-7 gap-2 text-center text-black-600 mb-6">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-sm font-semibold">{day}</div>
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => (
              <div
                key={i}
                className={`py-2 rounded-full cursor-pointer 
                ${selectedDate === i + 1 ? 'bg-[#0148B1] text-white' : 'bg-black-200'} 
                ${month === currentMonth && i + 1 < currentDate ? 'text-gray-300 cursor-not-allowed' : ''} 
                ${month !== currentMonth ? 'cursor-pointer' : 'cursor-not-allowed'}`} // Disable past dates only in the current month
                style={{
                  cursor: month === currentMonth && i + 1 < currentDate ? 'not-allowed' : 'pointer', // Disable cursor on past dates
                }}
                onClick={() => handleDateClick(i + 1)}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Duration Buttons */}
          <p className="text-black-600 font-semibold mb-3">Select Appointment Time</p>
          <div className="grid grid-cols-4 gap-3 mb-3">
            {durationOptions.map((duration) => (
              <button
                key={duration}
                className={`py-3 rounded-md text-sm border border-black-300 mb-10 
                ${selectedDate === duration ? 'bg-[#0148B1] text-white' : 'text-black-600'}`}
                onClick={() => setSelectedDate(duration)}
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
                value={selectedDate ? `${monthNames[month]} ${selectedDate}, ${year}` : 'Selected date'}
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
    </div>
  );
};

export default BookAppointmentForm;
