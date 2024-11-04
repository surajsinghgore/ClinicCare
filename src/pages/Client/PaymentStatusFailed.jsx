import React from 'react';
import { BsXCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const PaymentStatusFailed = () => {

    const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black-50">
      <div className="w-full max-w-md text-center p-8 bg-white shadow-lg rounded-md">
        <h2 className="text-xl font-semibold mb-6">Payment Status</h2>
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-danger rounded-full flex items-center justify-center">
            <BsXCircle className="text-white text-4xl animate-bounce-scale" />
          </div>
        </div>
        <p className="text-danger text-lg font-medium mb-2">Payment Failed</p>
        <p className="text-black-600 mb-6">Your payment could not be completed. Please try again.</p>
        <button onClick={() => navigate("/")} className="w-full py-3 text-black-700 font-semibold border border-black-300 rounded-lg hover:bg-black-100">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentStatusFailed;
