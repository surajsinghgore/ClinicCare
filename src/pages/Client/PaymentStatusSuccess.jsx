import { useEffect } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage, removeLocalStorage } from '../../Utils/LocalStorage';

const PaymentStatusSuccess = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if (!getLocalStorage('selectedDate')) {
            navigate("/book-appointment")
        }

        setTimeout(() => {
            removeLocalStorage('selectedDate')
            removeLocalStorage('selectedDuration')
            removeLocalStorage('selectedTime')
        }, 5000)

    }, [])
    useEffect(() => {
        const handlePopState = () => {
            navigate(0);
        };

        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [navigate])
    return (
        <div className="w-full h-screen flex items-center justify-center bg-black-50">
            <div className="w-full max-w-md text-center p-8 bg-white shadow-lg rounded-md">
                <h2 className="text-xl font-semibold mb-6">Payment Status</h2>
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center">
                        <BsCheckCircle className="text-white text-4xl animate-bounce-scale" />
                    </div>
                </div>
                <p className="text-success text-lg font-medium mb-2">Payment Successful</p>
                <p className="text-black-600 mb-6">Your payment has been successfully done!!</p>
                <button onClick={() => navigate("/")} className="w-full py-3 text-black-700 font-semibold border border-black-300 rounded-lg hover:bg-black-100">
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentStatusSuccess;
