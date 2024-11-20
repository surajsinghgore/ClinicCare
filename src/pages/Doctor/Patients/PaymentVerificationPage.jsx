import { useEffect, useState } from "react";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { checkBookAppointmentPaymentStatusApi } from "../../../Utils/services/apis/Doctor/PatientApi";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

const PaymentVerificationPage = () => {
    const [status, setStatus] = useState(false);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const { transactionId } = useParams();

    const paymentStatusCheck = async () => {
        try {
            dispatch(showLoader());
            const res = await checkBookAppointmentPaymentStatusApi(transactionId);
            if (res?.status) {
                setStatus(res.data);
                if (res.data) {
                    setData(res.transactionDetails);
                }
            }
        } catch (error) {
            console.error(error);
            dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
        } finally {
            dispatch(hideLoader());
        }
    };

    useEffect(() => {
        paymentStatusCheck();

        // Polling mechanism with interval
        const interval = setInterval(() => {
            if (!status) {
                paymentStatusCheck();
            } else {
                clearInterval(interval); // Stop polling once payment is received
            }
        }, 15000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [status]); // Re-run effect only when `status` changes

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {status ? (
                <>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment Received</h1>
                    {data.length !== 0 && (
                        <>
                            <div className="my-2">
                                <img
                                    src={data.user?.profileUrl}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                            </div>
                            <div className="w-full max-w-3xl bg-white shadow-md overflow-hidden">
                                <table className="table-auto w-full text-left border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border border-gray-300 px-4 py-2">Field</th>
                                            <th className="border border-gray-300 px-4 py-2">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">Patient Name</td>
                                            <td className="border border-gray-300 px-4 py-2">{data.user?.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">Treatment Name</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {data.appointmentId?.service?.treatmentName}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">Appointment Date</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {data.appointmentId?.appointmentDate}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">Appointment Time</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {data.appointmentId?.appointmentTime}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">Fees</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                ₹ {data.appointmentId?.service?.fees}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">Platform Fee</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                ₹ {data.appointmentId?.service?.platformFee}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">Specialty</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {data.appointmentId?.service?.specialty}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">Txn Id</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {data.TransactionData?.txnId}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">Amount Received</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {(data.TransactionData?.amountReceived
                                                    / 100).toFixed(2)}

                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">Payment Status</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {data.TransactionData?.status}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">paymentType</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {data.TransactionData?.paymentType}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                    <div className="flex items-center space-x-4 mt-6">
                        <Link to={`/doctor/view-appointment/${data?.patientTreatmentId?._id}`}>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700">
                                Print Receipt
                            </button>
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment Confirmation Email Sent</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        &ldquo;An email for payment has been sent to patient&apos;s registered email. Please wait for
                        the confirmation.&ldquo;
                    </p>
                    <div className="flex items-center space-x-4">
                        <button
                            className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700"
                            onClick={() => paymentStatusCheck()}
                        >
                            Refresh
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentVerificationPage;
