import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import phonepeLogo from '../../assets/phonepe-logo.png';
import { getPlatformFeeApi, getServiceByIdApi } from '../../Utils/services/apis/User/ServiceApi';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/Slices/LoaderState';
import { showAlert } from '../../redux/Slices/AlertToggleState';

const PaymentSection = () => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [doctor, setDoctor] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [fees, setFees] = useState(0);
    const [platformFee, setPlatformFee] = useState(0);

    const handlePaymentSelect = () => {
        setSelectedPayment('phonepe');
    };

    const handlePay = () => {
        if (!selectedPayment) {
            dispatch(showAlert({ message: "Please select payment method to pay", type: "failed" }));
            return;
        }
    };

    const fetchServiceData = async () => {
        try {
            dispatch(showLoader());
            let res = await getServiceByIdApi(id);
            if (res.success) {
                setDoctor(res.data);
                setFees(res.data.service.fees || 0); // Directly set the fees from response
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
        fetchServiceData();
        getPlatformFee();
    }, []);

    useEffect(() => {
        setGrandTotal(fees + platformFee);
    }, [fees, platformFee]);

    const openGoogleMaps = (lat, lng) => {
        const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        window.open(googleMapsUrl, '_blank');
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8 mt-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-black-800">Confirm and Pay</h2>
            <div className="flex items-center border-b border-black-200 pb-5 mb-5">
                <img
                    src={(doctor?.doctor?.profileUrl) ? doctor.doctor.profileUrl : "https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    alt="Doctor Profile"
                    className="w-32 h-32 rounded-lg mr-6 object-cover shadow-md"
                />
                <div>
                    <h3 className="text-xl font-semibold text-black-700">
                        {(doctor?.doctor?.name) ? doctor.doctor.name : ""}, {(doctor?.service?.clinicId?.city) ? doctor.service.clinicId.city : ""}
                    </h3>
                    <p className="text-black-600">Mon, Nov 21, 2024 • 10:00 - 10:15 PM</p>
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
                    <span>(Treatment Fees: {(doctor?.service?.duration) ? doctor.service.duration : ""} minutes)</span>
                    <span>₹ {(doctor?.service?.fees) ? doctor.service.fees : ""}</span>
                </div>
                <div className="flex justify-between items-center text-black-700 mb-2">
                    <span>Platform Fee</span>
                    <span>₹ {platformFee}</span>
                </div>
            </div>

            <div className="flex justify-between border-b border-black-200 pb-5 items-center font-semibold text-lg text-black-800 mt-4">
                <span>Grand Total</span>
                <span>₹ {grandTotal}</span>
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
