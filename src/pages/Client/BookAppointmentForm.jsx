import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAvailableTimeSlotApi } from '../../Utils/services/apis/User/AppointmentApi';
import { showAlert } from '../../redux/Slices/AlertToggleState';
import { useDispatch } from 'react-redux';

const BookAppointmentForm = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const currentTime = today.getHours() * 60 + today.getMinutes();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const dispatch = useDispatch();

  const { id } = useParams();
  const timeOptions = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'
  ];

  const durationOptions = ['15 min', '30 min', '45 min', '1 hour'];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(month, year);

  // Get the weekday (0-6) for the first day of the month to align the calendar
  const firstDayOfWeek = new Date(year, month, 1).getDay();



  const handlePrevMonth = () => {
    if (month > currentMonth || year > currentYear) {
      if (month === 0) {
        setMonth(11);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
      setSelectedDate(null);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    setSelectedDate(null);
  };

  useEffect(() => {
    if (month === currentMonth) {
      setSelectedDate(currentDate);
    }
  }, [month]);

  const getDateClass = (date) => {
    if (month === currentMonth && date < currentDate) {
      return 'text-gray-300 cursor-not-allowed';
    }

    if (month === currentMonth && date === currentDate) {
      const timeSlots = timeOptions.map(time => {
        const [hours, minutes] = time.split(':');
        const isPM = time.includes('PM');
        const adjustedHours = isPM && hours < 12 ? parseInt(hours) + 12 : parseInt(hours);
        const timeInMinutes = adjustedHours * 60 + parseInt(minutes.split(' ')[0]);

        return {
          timeSlot: time,
          isPassed: currentTime > timeInMinutes,
        };
      });

      return timeSlots.some(timeSlot => timeSlot.isPassed) ? 'bg-gray-300 text-gray-600' : '';
    }

    return '';
  };

  const proceedToPayment = async () => {
    navigate(`/user/payment-section/${id}`);
  };

  const getAvailableTimeSlot = async (date) => {
    try {
      let res = await getAvailableTimeSlotApi(id, date);
      if (res?.status) {
        setAvailableTimeSlots(res.availableTimeSlots)
      }
    } catch (error) {
      console.log(error);
      dispatch(showAlert({ message: error.response.data.error, type: "failed" }));
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    getAvailableTimeSlot(today);
  }, []);

  const handleDateClick = (date) => {
    if (month === currentMonth && date < currentDate) {
      return;
    }
    const mm = month + 1; // Adjust month to be 1-indexed
    const selectFullDate = `${year}-${mm.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
    console.log(selectFullDate);
    getAvailableTimeSlot(selectFullDate);
    setSelectedDate(date);
  };



  return (
    <div className="w-full my-5 mt-10">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-5xl p-8 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-semibold text-center my-2">Select Appointment Date</h3>

          <div className="flex justify-center items-center mb-6 mt-6">
            <button
              onClick={handlePrevMonth}
              className={`w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full text-xl font-medium ${month === currentMonth && year === currentYear ? 'cursor-not-allowed text-gray-400' : ''}`}
              disabled={month === currentMonth && year === currentYear}
            >
              {'<'}
            </button>
            <p className="text-3xl font-medium mx-4">{monthNames[month]}</p>
            <p className="text-black-500 text-lg">{year}</p>
            <button onClick={handleNextMonth} className="w-8 h-8 ml-6 flex items-center justify-center border border-gray-400 rounded-full text-xl font-medium">{'>'}</button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-black-600 mb-6">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-sm font-semibold">{day}</div>
            ))}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="py-2"></div> // Empty slots for alignment
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => (
              <div
                key={i}
                className={`py-2 rounded-full cursor-pointer 
                ${selectedDate === i + 1 ? 'bg-[#0148B1] text-white' : 'bg-black-200'} 
                ${getDateClass(i + 1)}`}
                onClick={() => handleDateClick(i + 1)}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* The rest of your form components */}
          <p className="text-black-600 font-semibold mb-3">Select Appointment Time</p>
          <div className="grid grid-cols-4 gap-3 mb-3">
            {availableTimeSlots.map((duration) => (
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

          <p className="text-black-600 font-semibold mb-4">Selected Appointment Details</p>
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

          <button className="w-full py-4 text-white font-semibold bg-[#0148B1] rounded-md" onClick={() => proceedToPayment()}>
            Proceed
          </button>
        </div>
      </div>
    </div>

  );
};

export default BookAppointmentForm;
