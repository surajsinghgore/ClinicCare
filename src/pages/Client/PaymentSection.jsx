import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import phonepeLogo from '../../assets/phonepe-logo.png';
import { getPlatformFeeApi, getServiceByIdApi } from '../../Utils/services/apis/User/ServiceApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/Slices/LoaderState';
import { showAlert } from '../../redux/Slices/AlertToggleState';
import { bookAppointmentTempApi } from '../../Utils/services/apis/User/AppointmentApi';
import { getLocalStorage } from '../../Utils/LocalStorage';
import { createPaymentApi } from '../../Utils/services/apis/User/TransactionApi';

const PaymentSection = () => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [doctor, setDoctor] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [fees, setFees] = useState(0);
    const [platformFee, setPlatformFee] = useState(0);

    const navigate = useNavigate();

    const handlePaymentSelect = () => {
        setSelectedPayment('phonepe');
    };

    const handlePay = async () => {
        if (!selectedPayment) {
            dispatch(showAlert({ message: "Please select payment method to pay", type: "failed" }));
            return;
        }
        let payload = { selectedDate: getLocalStorage("selectedDate"), selectedTime: getLocalStorage("selectedTime"), serviceId: id }
        try {
            dispatch(showLoader());
            let res = await bookAppointmentTempApi(payload)


            if (res.status) {
                // start making payment
                let paymentPayload = {

                    MUID: "MUIDW" + Date.now(),
                    transactionId: "T" + Date.now(),
                    appointmentId: res.appointmentId

                }
                try {
                    dispatch(showLoader());

                    let paymentRes = await createPaymentApi(paymentPayload)
                    if (paymentRes.status) {
                        window.location.href = paymentRes.data.data.instrumentResponse.redirectInfo.url;
                    }
                } catch (error) {
                    console.log(error)
                    dispatch(showAlert({ message: error.response?.data?.message, type: "failed" }));

                } finally {
                    dispatch(hideLoader());

                }

            }
        } catch (error) {
            console.log(error)
            dispatch(showAlert({ message: error.response?.data?.message, type: "failed" }));

        }
        finally {
            dispatch(hideLoader());

        }
    };

    const fetchServiceData = async () => {
        try {
            dispatch(showLoader());
            let res = await getServiceByIdApi(id);
            if (res.success) {
                setDoctor(res.data);
                setFees(res.data.service.fees || 0);
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(hideLoader());
        }
    };

    const getPlatformFee = async () => {
        try {
            dispatch(showLoader());
            let res = await getPlatformFeeApi(id);
            if (res?.success) {
                setPlatformFee(res.fees);
            }
        } catch (error) {
            console.log(error);
            dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
        } finally {
            dispatch(hideLoader());
        }
    };

    useEffect(() => {
        // Check if the necessary values are in localStorage, if not navigate to /book-appointment
        const selectedDate = localStorage.getItem('selectedDate');
        const selectedDuration = localStorage.getItem('selectedDuration');
        const selectedTime = localStorage.getItem('selectedTime');

        if (!selectedDate || !selectedDuration || !selectedTime) {
            navigate('/book-appointment');
        } else {
            fetchServiceData();
            getPlatformFee();
        }
    }, [navigate]);

    useEffect(() => {
        setGrandTotal(fees + platformFee);
    }, [fees, platformFee]);

    const openGoogleMaps = (lat, lng) => {
        const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        window.open(googleMapsUrl, '_blank');
    };

    const selectedDate = localStorage.getItem('selectedDate');
    const selectedDuration = localStorage.getItem('selectedDuration');
    const selectedTime = localStorage.getItem('selectedTime');

    // Check if selectedDate, selectedDuration, and selectedTime exist before parsing or using them
    if (!selectedDate || !selectedDuration || !selectedTime) {
        // Handle case where these values are missing
        navigate('/book-appointment');
        return null;
    }

    // Helper function to format date and time
    const formatTime = (dateObj) => {
        return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    // Parse selectedDate and selectedTime
    const dateObj = new Date(selectedDate);
    const [time, period] = selectedTime.split(' '); // Split the time and AM/PM

    // Split the time into hours and minutes
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    // Adjust hours based on AM/PM
    if (period.toLowerCase() === 'pm' && hours < 12) {
        hours += 12; // Convert PM times to 24-hour format
    } else if (period.toLowerCase() === 'am' && hours === 12) {
        hours = 0; // Convert 12 AM to 00:00
    }

    // Set the selected time in the date object
    dateObj.setHours(hours);
    dateObj.setMinutes(minutes);

    // Calculate the end time by adding the selected duration
    const endDateObj = new Date(dateObj);
    endDateObj.setMinutes(endDateObj.getMinutes() + parseInt(selectedDuration)); // Add the duration

    // Format the date and time for the display
    const formattedStartTime = formatTime(dateObj);
    const formattedEndTime = formatTime(endDateObj);

    // Format the date as "Mon, Nov 21, 2024"
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'short', // 'Mon'
        year: 'numeric',  // '2024'
        month: 'short',   // 'Nov'
        day: 'numeric'    // '21'
    });

    // Create the final formatted string
    const formattedTimeRange = `${formattedDate} • ${formattedStartTime} - ${formattedEndTime}`;

    return (
        <div className="w-full max-w-4xl mx-auto p-8 mt-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-black-800">Confirm and Pay</h2>
            <div className="flex items-center border-b border-black-200 pb-5 mb-5">
                <Link to={`/doctor-details/${doctor?.doctor?._id}`} > <img
                    src={(doctor?.doctor?.profileUrl) ? doctor.doctor.profileUrl : "https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    alt="Doctor Profile"
                    className="w-32 h-32 rounded-lg mr-6 object-cover shadow-md"
                /></Link>
                <div>
                    <Link to={`/doctor-details/${doctor?.doctor?._id}`} >   
                    <h3 className="text-xl font-semibold text-black-700">
                        {(doctor?.doctor?.name) ? doctor.doctor.name : ""}, {(doctor?.service?.clinicId?.city) ? doctor.service.clinicId.city : ""}
                    </h3></Link>
                    <p className="text-black-600">{formattedTimeRange}</p>
                    <a href='#' className="flex items-center text-black-500 mt-2 hover:text-info" title='View Clinic In Map'>
                        <FaMapMarkerAlt className="mr-2 text-black-400" />
                        <span onClick={() => openGoogleMaps(doctor?.service?.clinicId?.lat, doctor?.service?.clinicId?.long)}>
                            {(doctor?.service?.clinicId?.city) ? doctor.service.clinicId.city + " " : ""}
                            {(doctor?.service?.clinicId?.state) ? doctor.service.clinicId.state + ", " : ""}
                            {(doctor?.service?.clinicId?.country) ? doctor.service.clinicId.country : ""}
                        </span>
                    </a>
                </div>
            </div>

            <div className="border-b border-black-200 pb-5 mb-5">
                <h4 className="text-lg font-semibold mb-4 text-black-700">Booked Service</h4>
                <div className="flex justify-between items-center text-black-700 mb-2">
                    <span>Treatment Name: </span>
                    <span>{(doctor?.service?.treatmentName) ? doctor.service.treatmentName : ""}</span>
                </div>
                <div className="flex justify-between items-center text-black-700 mb-2">
                    <span>Specialty:</span>
                    <span>{(doctor?.service?.specialty) ? doctor.service.specialty : ""}</span>
                </div>
                <div className="flex justify-between items-center text-black-700 mb-2">
                    <span>Clinic Address: </span>
                    <span>{(doctor?.service?.clinicId?.address) ? doctor.service.clinicId.address : ""}</span>
                </div>
                <div className="flex justify-between items-center font-semibold text-lg text-black-800 mt-4">
                    <span>Treatment Fees</span>
                    <span>₹ {(doctor?.service?.fees) ? doctor.service.fees : ""}</span>
                </div>
            </div>

            <div className="border-b border-black-200 pb-5 mb-5">
                <h4 className="text-lg font-semibold mb-4 text-black-700">Price details</h4>
                <div className="flex justify-between items-center text-black-700 mb-2">
                    <span>Consultation Fee:</span>
                    <span>₹ {fees}</span>
                </div>
                <div className="flex justify-between items-center text-black-700 mb-2">
                    <span>Platform Fee:</span>
                    <span>₹ {platformFee}</span>
                </div>
                <div className="flex justify-between items-center text-black-700 font-semibold text-lg mt-4">
                    <span>Grand Total:</span>
                    <span>₹ {grandTotal}</span>
                </div>
            </div>

            <div className="mt-5">
                <h4 className="text-lg font-semibold mb-4 text-black-700">Pay with</h4>
                <div
                    className={`flex items-center p-4 bg-black-100 rounded-lg cursor-pointer transition-all duration-200 ${selectedPayment === 'phonepe' ? 'border-2 border-blue-500' : 'border border-black-300'} hover:shadow-md`}
                    onClick={handlePaymentSelect}
                >
                    <img src={phonepeLogo} alt="PhonePe" className="w-8 h-8 object-cover mr-3" />
                    <span className="text-black-700 font-medium">PhonePe</span>
                    <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment === 'phonepe'}
                        onChange={handlePaymentSelect}
                        className="ml-auto h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                </div>
            </div>

            <button
                onClick={handlePay}
                className="w-full mt-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Pay ₹ {grandTotal}
            </button>
        </div>
    );
};

export default PaymentSection;
