import { useEffect, useState } from "react";
import BreadCrumbs from "../../components/Common/BreadCrumbs";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { fetchSingleDoctorSubmittedDataApi, updateDoctorApplicationApi } from "../../Utils/services/apis/Admin/Doctor/AdminDoctorApi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../redux/Slices/LoaderState";
import { showAlert } from "../../redux/Slices/AlertToggleState";

const DoctorVerify = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [doctorData, setDoctorData] = useState([]);
  const [dob, setDob] = useState();

  const [status, setStatus] = useState("completed");
  const [message, setMessage] = useState("");

  const fetchSingleData = async () => {
    try {
      dispatch(showLoader());

      const resData = await fetchSingleDoctorSubmittedDataApi(id);
 
      setDoctorData(resData.data);
      setDob(resData?.data?.dob ? new Date(resData?.data?.dob).toISOString().split("T")[0] : "");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoader());
    }
  };
  useEffect(() => {
    fetchSingleData();
  }, []);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleApprove = async () => {
    if ((status === "rejected" || status === "banned") && !message.trim()) {
      dispatch(showAlert({ message: "Please provide a message when the status is 'Rejected' or 'Banned'", type: "warning" }));
      return;
    }

    // Set default message to "Success" if status is "Completed" and no message is provided
    const finalMessage = status === "completed" && !message.trim() ? "Success" : message;

    const payload = {
      newStatus: status,
      adminMessage: finalMessage,
    };

    dispatch(showLoader());
    try {
      const response = await updateDoctorApplicationApi(id, payload);
      dispatch(showAlert({ message: response.message, type: "success" }));
      if (response.success) {
        setTimeout(() => {
          navigate("/admin/verify-doctor?page=1&limit=10");
        }, 2000);
      }
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message || "Failed to update application", type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <>
      <BreadCrumbs currentPath="Verify Doctor" />
      <div className="relative w-[90%] m-auto mt-10 mb-10 rounded-lg shadow-lg">
        <div className="w-full p-12 rounded-lg shadow-md">
          <div className="pb-5 flex items-center gap-3 text-[#116AEF] mb-10 border-b border-black-400">
            <MdOutlineVerifiedUser className="text-2xl" />
            <h1 className="font-semibold text-3xl">Doctor Verification</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-3">
              <label className="block text-lg font-medium text-black-700">Name:</label>
              <input type="text" value={doctorData?.name} readOnly className="mt-1 block w-3/4 border border-black-300 rounded-md p-2 bg-black-100" />
            </div>
            <div className="mb-3">
              <label className="block text-lg font-medium text-black-700">Date of Birth:</label>
              <input type="text" value={dob} readOnly className="mt-1 block w-3/4 border border-black-300 rounded-md p-2 bg-black-100" />
            </div>
            <div className="mb-3">
              <label className="block text-lg font-medium text-black-700">Gender:</label>
              <input type="text" value={doctorData?.gender} readOnly className="mt-1 block w-3/4 border border-black-300 rounded-md p-2 bg-black-100" />
            </div>
            <div className="mb-3">
              <label className="block text-lg font-medium text-black-700">Email:</label>
              <input type="text" value={doctorData?.email} readOnly className="mt-1 block w-3/4 border border-black-300 rounded-md p-2 bg-black-100" />
            </div>
            <div className="mb-3">
              <label className="block text-lg font-medium text-black-700">Mobile Number:</label>
              <input type="text" value={doctorData?.mobile} readOnly className="mt-1 block w-3/4 border border-black-300 rounded-md p-2 bg-black-100" />
            </div>
            <div className="mb-3">
              <label className="block text-lg font-medium text-black-700">Hobbies:</label>
              <input type="text" value={doctorData?.hobbies} readOnly className="mt-1 block w-3/4 border border-black-300 rounded-md p-2 bg-black-100" />
            </div>
            <div className="mb-3">
              <label className="block text-lg font-medium text-black-700">Highlights:</label>
              <input type="text" value={doctorData?.highlights} readOnly className="mt-1 block w-3/4 border border-black-300 rounded-md p-2 bg-black-100" />
            </div>
            <div className="mb-3">
              <label className="block text-lg font-medium text-black-700">Degree Name:</label>
              <input type="text" value={doctorData?.degree} readOnly className="mt-1 block w-3/4 border border-black-300 rounded-md p-2 bg-black-100" />
            </div>
            <div className="mb-3">
              <label className="block text-lg font-medium text-black-700">Doctor's License Number:</label>
              <input type="text" value={doctorData?.licenseNumber} readOnly className="mt-1 block w-3/4 border border-black-300 rounded-md p-2 bg-black-100" />
            </div>
            <div className="mb-3">
              <label className="block text-lg font-medium text-black-700">Experience:</label>
              <input type="text" value={doctorData?.experience} readOnly className="mt-1 block w-3/4 border border-black-300 rounded-md p-2 bg-black-100" />
            </div>
            <div className="mb-3">
              <label className="block text-lg font-medium text-black-700">Specialization:</label>
              <input type="text" value={doctorData?.specialization} readOnly className="mt-1 block w-3/4 border border-black-300 rounded-md p-2 bg-black-100" />
            </div>

            {/* File Uploads */}
            <div className="col-span-2">
              <h3 className="text-2xl underline font-medium text-black-700 mt-12 mb-8">Uploaded Files:</h3>
              <div className="mt-2">
                <div className="flex justify-between">
                  <div>
                    <h3 className="block text-lg font-medium text-black-700">Self Image:</h3>
                    <img src={doctorData?.profileUrl} alt="Self" className="mt-1 w-80 h-60 mb-16" />
                  </div>

                  <div>
                    <h3 className="block text-lg font-medium text-black-700">Signature Image:</h3>
                    <img src={doctorData?.signatureUrl} alt="Signature" className="mt-1 w-80 h-60 mb-8" />
                  </div>
                </div>

                <h3 className="block text-lg font-medium text-black-700">Degree Image:</h3>
                <img src={doctorData?.degreeUrl} alt="Degree" className="mt-1 w-full mb-16" />

                <h3 className="block text-lg font-medium text-black-700">License Image:</h3>
                <img src={doctorData?.licenseUrl} alt="License" className="mt-1 w-full mb-16" />
              </div>
            </div>

            {/* Status, Message, and Approve Button */}
            <div className="col-span-2 flex items-center w-full">
              {/* Main Container */}
              <div className="flex flex-col w-full p-6 rounded-xl border gap-6">
                <div className="flex items-center gap-2">
                  <MdFeedback className="text-2xl text-black-700" />
                  <h1 className="text-2xl text-black-700 font-semibold">Status & Feedback</h1>
                </div>
                {/* Status Card */}
                <div>
                  <label className="block text-lg font-medium text-black-700 mb-2">Status:</label>
                  <select
                    value={status}
                    onChange={handleStatusChange}
                    className="w-full border border-black-300 rounded-xl p-2 bg-white hover:bg-black-100 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                  >
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                    <option value="banned">Banned</option>
                  </select>
                </div>

                {/* Message Card */}
                <div>
                  <label className="block text-lg font-medium text-black-700 mb-2">Message:</label>
                  <textarea
                    value={message}
                    onChange={handleMessageChange}
                    className="block w-full h-20 border border-black-300 rounded-2xl p-2 bg-white resize-none hover:bg-black-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter a message..."
                  />
                </div>

                {/* Approve Button Card */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleApprove()}
                    className="py-3 px-6 rounded-[30px] bg-blue-400 text-white font-semibold transform transition-transform duration-200 hover:scale-105 hover:bg-primary focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorVerify;
