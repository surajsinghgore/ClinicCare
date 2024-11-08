import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAvailableTimeSlotApi } from '../../Utils/services/apis/User/AppointmentApi';
import { showAlert } from '../../redux/Slices/AlertToggleState';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/Slices/LoaderState';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../Utils/LocalStorage';

const BookAppointmentForm = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();
  const currentTime = today.getHours() * 60 + today.getMinutes();

  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [duration, setDuration] = useState(0)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(month, year);
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  useEffect(() => {
    const storedDate = getLocalStorage("selectedDate");
    const storedTime = getLocalStorage("selectedTime");

    if (storedDate && storedTime) {
      const [storedYear, storedMonth, storedDay] = storedDate.split('-').map(Number);
      const [storedHours, storedMinutes] = storedTime.split(/[:\s]/).slice(0, 2).map(Number);
      const isPM = storedTime.toLowerCase().includes('pm');

      // Adjust for PM times
      const storedTimeInMinutes = (storedHours % 12 + (isPM ? 12 : 0)) * 60 + storedMinutes;

      // Check if the stored date is today and the time has passed
      if (
        storedYear === currentYear &&
        storedMonth - 1 === currentMonth &&
        storedDay === currentDate &&
        storedTimeInMinutes < currentTime
      ) {
        removeLocalStorage("selectedDate");
        removeLocalStorage("selectedTime");
      } else {
        setSelectedDate(storedDay);
        setSelectedTime(storedTime);
        setMonth(storedMonth - 1);
        setYear(storedYear);

        // Fetch available time slots for the stored date
        const fetchAvailableTimeSlots = async () => {
          dispatch(showLoader());
          try {
            const res = await getAvailableTimeSlotApi(id, storedDate);
            if (res?.status) {
              setDuration(res.duration)
              setAvailableTimeSlots(res.availableTimeSlots);
            }
          } catch (error) {
            dispatch(showAlert({ message: error.response?.data?.error || "Error fetching time slots", type: "failed" }));
            setAvailableTimeSlots([]);
          } finally {
            dispatch(hideLoader());
          }
        };
        fetchAvailableTimeSlots();
      }
    }
  }, [currentYear, currentMonth, currentDate, currentTime, dispatch, id]);

  const handleMonthChange = (increment) => {
    const newMonth = month + increment;
    const newYear = year + (newMonth < 0 ? -1 : newMonth > 11 ? 1 : 0);
    setMonth((newMonth + 12) % 12);
    setYear(newYear);
    setSelectedDate(null);
  };

  const handleDateClick = async (date) => {
    const selectedFullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    if (month === currentMonth && date < currentDate) return;

    dispatch(showLoader());
    try {
      const res = await getAvailableTimeSlotApi(id, selectedFullDate);
      if (res?.status) {
        setDuration(res.duration)
        setSelectedDate(date);
        setAvailableTimeSlots(res.availableTimeSlots);
      }
    } catch (error) {
      dispatch(showAlert({ message: error.response?.data?.error || "Error fetching time slots", type: "failed" }));
      setAvailableTimeSlots([]);
    } finally {
      dispatch(hideLoader());
    }
  };

  const proceedToPayment = () => {
    if (!selectedDate) {
      dispatch(showAlert({ message: "Please select an appointment date", type: "failed" }));
      return;
    }
    if (!selectedTime) {
      dispatch(showAlert({ message: "Please select an appointment time", type: "failed" }));
      return;
    }

    setLocalStorage("selectedDate", `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`);
    setLocalStorage("selectedTime", selectedTime);
    setLocalStorage("selectedDuration", duration);
    navigate(`/user/payment-section/${id}`);
  };

  return (
    <div className="w-full my-5 mt-10">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-5xl p-8 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-semibold text-center my-2">Select Appointment Date</h3>

          <div className="flex justify-center items-center mb-6 mt-6">
            <button
              onClick={() => handleMonthChange(-1)}
              className={`w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full text-xl font-medium ${month === currentMonth && year === currentYear ? 'cursor-not-allowed text-gray-400' : ''}`}
              disabled={month === currentMonth && year === currentYear}
            >
              {'<'}
            </button>
            <p className="text-3xl font-medium mx-4">{monthNames[month]}</p>
            <p className="text-black-500 text-lg">{year}</p>
            <button onClick={() => handleMonthChange(1)} className="w-8 h-8 ml-6 flex items-center justify-center border border-gray-400 rounded-full text-xl font-medium">{'>'}</button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-black-600 mb-6">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-sm font-semibold">{day}</div>
            ))}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="py-2"></div>
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => (
              <div
                key={i}
                className={`py-2 rounded-full cursor-pointer ${selectedDate === i + 1 ? 'bg-[#0148B1] text-white' : 'bg-black-200'} ${month === currentMonth && i + 1 < currentDate ? 'text-gray-300 cursor-not-allowed' : ''}`}
                onClick={() => handleDateClick(i + 1)}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <p className="text-black-600 font-semibold mb-3">Select Appointment Time</p>
          <div className="grid grid-cols-4 gap-3 mb-3">
            {availableTimeSlots.map((slot) => (
              <button
                key={slot}
                className={`py-3 rounded-md text-sm border border-black-300 ${selectedTime === slot ? 'bg-[#0148B1] text-white' : 'text-black-600'}`}
                onClick={() => setSelectedTime(slot)}
              >
                {slot}
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
                className="border border-black-300 rounded-md p-3 text-sm"
                readOnly
              />
            </div>
            <div className="flex flex-col w-1/2 pl-2">
              <label className="text-black-600 text-sm mb-1">Selected Time</label>
              <input
                type="text"
                value={selectedTime || 'Selected time'}
                className="border border-black-300 rounded-md p-3 text-sm"
                readOnly
              />
            </div>
          </div>
          <button
            onClick={proceedToPayment}
            className="w-full py-3 bg-[#0148B1] text-white rounded-md font-medium"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentForm;
