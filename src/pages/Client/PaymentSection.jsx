import { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import phonepeLogo from '../../assets/phonepe-logo.png';

const PaymentSection = () => {
    const [selectedPayment, setSelectedPayment] = useState(null);

    const handlePaymentSelect = () => {
        setSelectedPayment('phonepe');
    };

    const handlePay = () => {
        // Add your payment handling logic here
        alert('Payment processing...');
    };

    return (
        <>
            <div className="w-full max-w-4xl mx-auto p-8 mt-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-black-800">Confirm and Pay</h2>

                <div className="flex items-center border-b border-black-200 pb-5 mb-5">
                    <img src="https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Shikara Hotel"
                        className="w-32 h-32 rounded-lg mr-6 object-cover shadow-md"
                    />
                    <div>
                        <h3 className="text-xl font-semibold text-black-700">Joe Clinic, Chandigarh</h3>
                        <p className="text-black-600">Mon, Nov 21, 2024 • 10:00 - 10:15 PM</p>
                        <a href='#' className="flex items-center text-black-500 mt-2 hover:text-info" title='View Clinic In Map'>
                            <FaMapMarkerAlt className="mr-2 text-black-400" />
                            <span>Chandigarh, Chandigarh</span>
                        </a>
                    </div>
                </div>

                <div className="border-b border-black-200 pb-5 mb-5">
                    <h4 className="text-lg font-semibold mb-4 text-black-700">Booked Service</h4>
                    <div className="flex justify-between items-center text-black-700 mb-2">
                        <span>Treatment Name: </span>
                        <span>Ortho</span>
                    </div>
                    <div className="flex justify-between items-center text-black-700 mb-2">
                        <span>Speciality: </span>
                        <span>X-ray</span>
                    </div>
                    <div className="flex justify-between items-center text-black-700 mb-2">
                        <span>Clinic Address: </span>
                        <span>Chandigarh Sector 21</span>
                    </div>
                    <div className="flex justify-between items-center font-semibold text-lg text-black-800 mt-4">
                        <span>Treatment Fees</span>
                        <span>$15.20</span>
                    </div>
                </div>

                <div className="border-b border-black-200 pb-5 mb-5">
                    <h4 className="text-lg font-semibold mb-4 text-black-700">Price details</h4>
                    <div className="flex justify-between items-center text-black-700 mb-2">
                        <span>Treatment Fees: 15 minutes</span>
                        <span>$15.00</span>
                    </div>
                    <div className="flex justify-between items-center text-black-700 mb-2">
                        <span>Platform Fee</span>
                        <span>$0.20</span>
                    </div>
                </div>

                <div className="flex justify-between border-b border-black-200 pb-5 items-center font-semibold text-lg text-black-800 mt-4">
                    <span>Grand Total</span>
                    <span>$15.20</span>
                </div>

                <div className="mt-5">
                    <h4 className="text-lg font-semibold mb-4 text-black-700">Pay with</h4>
                    <div
                        className={`flex items-center p-4 bg-black-100 rounded-lg cursor-pointer transition-all duration-200 ${selectedPayment === 'phonepe' ? 'border-2 border-blue-500' : 'border border-black-300'
                            } hover:shadow-md`}
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
                    Pay $15.20
                </button>
            </div>
        </>
    );
}

export default PaymentSection;
